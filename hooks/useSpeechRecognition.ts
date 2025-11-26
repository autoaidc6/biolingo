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
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false; // Stop after a single phrase for chat-like interaction
        recognitionRef.current.interimResults = true; // Show results in real-time
        recognitionRef.current.lang = language;
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
    
    // Stop any existing session
    try {
        recognitionRef.current.stop();
    } catch(e) {
        // Ignore error if not running
    }

    recognitionRef.current.onstart = () => setIsListening(true);
    
    // When the speech recognition service stops (either automatically or manually)
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
            alert("Microphone access blocked. Please enable permissions.");
        }
        setIsListening(false);
    };

    try {
        recognitionRef.current.start();
    } catch(e) {
        console.error("Could not start recognition", e);
        setIsListening(false);
    }
  }, []);

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