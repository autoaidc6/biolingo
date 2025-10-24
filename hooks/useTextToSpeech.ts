import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { decode, decodeAudioData } from '../utils/audio';

// FIX: Cast window to `any` to allow access to vendor-prefixed `webkitAudioContext` for broader browser compatibility.
const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const audioCache = new Map<string, AudioBuffer>();

// This will hold the 'stop' function of the currently playing audio hook.
let stopCurrentlyPlaying: (() => void) | null = null;

export const useTextToSpeech = (text: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

    // Using a ref to hold the stop function to avoid stale closures.
    const stopRef = useRef(() => {});

    stopRef.current = () => {
        if (sourceNodeRef.current) {
            sourceNodeRef.current.stop();
            sourceNodeRef.current.disconnect();
            sourceNodeRef.current = null;
        }
        setIsPlaying(false);
        if (stopCurrentlyPlaying === stopRef.current) {
            stopCurrentlyPlaying = null;
        }
    };
    
    const stop = useCallback(() => {
        stopRef.current();
    }, []);

    const togglePlay = useCallback(async () => {
        if (isPlaying) {
            stop();
            return;
        }
        
        // If another audio is playing, stop it first.
        if (stopCurrentlyPlaying) {
            stopCurrentlyPlaying();
        }

        if (!text || !text.trim()) {
            console.warn("TTS requested for empty text.");
            return;
        }

        let audioBuffer: AudioBuffer | undefined = audioCache.get(text);

        if (!audioBuffer) {
            setIsLoading(true);
            try {
                if (!process.env.API_KEY) {
                  throw new Error("API key not configured.");
                }
                const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash-preview-tts",
                    contents: text,
                    config: {
                        responseModalities: [Modality.AUDIO],
                        speechConfig: {
                            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
                        },
                    },
                });
                const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
                if (!base64Audio) throw new Error("No audio data received");
                
                const decodedBytes = decode(base64Audio);
                const buffer = await decodeAudioData(decodedBytes, audioContext, 24000, 1);
                audioCache.set(text, buffer);
                audioBuffer = buffer;
            } catch (error) {
                console.error("TTS generation failed:", error);
                setIsLoading(false);
                return;
            } finally {
                setIsLoading(false);
            }
        }
        
        if (audioBuffer) {
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.onended = () => {
                // onended might be called when we manually stop it, so we use a check
                if (stopCurrentlyPlaying === stopRef.current) {
                    setIsPlaying(false);
                    stopCurrentlyPlaying = null;
                }
            };
            source.start();
            sourceNodeRef.current = source;
            setIsPlaying(true);
            // Register this instance's stop function as the current one.
            stopCurrentlyPlaying = stopRef.current;
        }
    }, [text, stop, isPlaying]);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            // Check if this instance is the one currently playing before stopping
            if (stopCurrentlyPlaying === stopRef.current) {
               stop();
            }
        };
    }, [stop]);

    return { togglePlay, isLoading, isPlaying };
};