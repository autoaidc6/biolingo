import React, { useState, useRef, ChangeEvent } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CameraIcon, UploadIcon, LoadingSpinnerIcon, SpeakerIcon, StopIcon } from '../components/ui/Icons';
import { useImageTranslator, TranslationResult } from '../hooks/useImageTranslator';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { motion, AnimatePresence } from 'framer-motion';

const fileToBase64 = (file: File): Promise<{ data: string; mimeType: string; src: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const src = reader.result as string;
            const data = src.split(',')[1];
            resolve({ data, mimeType: file.type, src });
        };
        reader.onerror = (error) => reject(error);
    });
};

const ResultCard: React.FC<{ result: TranslationResult }> = ({ result }) => {
    const { togglePlay, isLoading: isAudioLoading, isPlaying } = useTextToSpeech(result.translatedText);
    
    return (
        <div className="space-y-4">
             <Card>
                <h3 className="font-bold text-gray-500 mb-2">Detected Text ({result.detectedLanguage})</h3>
                <p className="text-brand-text text-lg italic">"{result.detectedText}"</p>
            </Card>
            {result.translatedText && result.translatedLanguage && (
                 <Card>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-gray-500 mb-2">Translation ({result.translatedLanguage})</h3>
                            <p className="text-brand-text text-lg font-semibold">"{result.translatedText}"</p>
                        </div>
                        <button 
                            onClick={togglePlay} 
                            className="p-2 text-gray-500 hover:text-brand-blue transition-colors flex-shrink-0 disabled:opacity-50"
                            aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
                            disabled={isAudioLoading}
                        >
                            {isAudioLoading ? <LoadingSpinnerIcon className="w-6 h-6" /> : isPlaying ? <StopIcon className="w-6 h-6 text-brand-blue" /> : <SpeakerIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </Card>
            )}
        </div>
    )
}

export const ScanPage: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const { result, isLoading, error, processImage, reset } = useImageTranslator();
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const uploadInputRef = useRef<HTMLInputElement>(null);

    const handleImageCapture = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const { data, mimeType, src } = await fileToBase64(file);
                setImageSrc(src);
                processImage(data, mimeType);
            } catch (err) {
                console.error("Error processing file:", err);
            }
        }
        // Reset input value to allow re-selection of the same file
        event.target.value = '';
    };

    const handleReset = () => {
        setImageSrc(null);
        reset();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-brand-text">Scan & Translate</h1>
            
            <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleImageCapture} className="hidden" />
            <input type="file" accept="image/*" ref={uploadInputRef} onChange={handleImageCapture} className="hidden" />

            <AnimatePresence mode="wait">
                {!imageSrc ? (
                    <motion.div key="initial" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                        <Card className="flex flex-col items-center justify-center text-center p-8 space-y-4">
                            <p className="text-gray-600">Use your camera to instantly translate signs, menus, and more between Spanish and English.</p>
                            <Button size="lg" onClick={() => cameraInputRef.current?.click()} className="gap-2">
                                <CameraIcon />
                                Scan with Camera
                            </Button>
                            <Button variant="outline" size="md" onClick={() => uploadInputRef.current?.click()} className="gap-2">
                                <UploadIcon />
                                Upload an Image
                            </Button>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
                        <img src={imageSrc} alt="Scanned content" className="rounded-2xl w-full max-h-64 object-cover border-2 border-brand-stroke" />
                        
                        {isLoading && (
                             <Card className="flex items-center gap-4">
                                <LoadingSpinnerIcon className="w-6 h-6 text-brand-blue" />
                                <div>
                                    <h3 className="font-bold text-brand-text">Analyzing Image...</h3>
                                    <p className="text-sm text-gray-500 font-medium">Extracting and translating text.</p>
                                </div>
                            </Card>
                        )}
                        
                        {error && <Card className="bg-red-50 border-red-200 text-red-700 font-medium">{error}</Card>}

                        {result && <ResultCard result={result} />}

                        <Button variant="outline" fullWidth onClick={handleReset}>
                            Scan another image
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};