import { useState, useEffect, useRef, useCallback } from 'react';

export const useSpeechRecognition = (language: string = 'es-ES') => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSupported(true);
        try {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false; // Capture one phrase at a time for better chat UX
            recognitionRef.current.interimResults = true; // Show results as they are spoken
            recognitionRef.current.lang = language;
        } catch (e) {
            console.error("Failed to initialize SpeechRecognition:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
        recognitionRef.current.lang = language;
    }
  }, [language]);

  const startListening = useCallback((onResult: (text: string) => void) => {
    if (!recognitionRef.current) return;
    
    // Prevent starting if already active
    if (isListening) return;

    // Reset handlers to current context
    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);
    
    recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }
        
        const text = finalTranscript || interimTranscript;
        if (text) {
            onResult(text);
        }
    };

    recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            alert("Microphone access blocked. Please allow microphone permissions.");
        }
        setIsListening(false);
    };

    try {
        recognitionRef.current.start();
    } catch(e) {
        console.error("Could not start recognition", e);
        setIsListening(false);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
        try {
            recognitionRef.current.stop();
        } catch (e) {
            console.error("Error stopping recognition", e);
        }
    }
  }, []);

  return { isListening, isSupported, startListening, stopListening };
};