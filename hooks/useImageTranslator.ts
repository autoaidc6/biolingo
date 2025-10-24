import { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

export interface TranslationResult {
    detectedText: string;
    detectedLanguage: string;
    translatedText: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
    type: Type.OBJECT,
    properties: {
        detectedText: { type: Type.STRING, description: 'The exact text extracted from the image.' },
        detectedLanguage: { type: Type.STRING, description: 'The language of the extracted text (e.g., "English", "French").' },
        translatedText: { type: Type.STRING, description: 'The translation of the extracted text into Spanish.' },
    },
    required: ["detectedText", "detectedLanguage", "translatedText"]
};

export const useImageTranslator = () => {
    const [result, setResult] = useState<TranslationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const processImage = async (base64Image: string, mimeType: string) => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            if (!process.env.API_KEY) {
                throw new Error("API key is not configured.");
            }

            const imagePart = {
                inlineData: {
                    data: base64Image,
                    mimeType: mimeType,
                },
            };

            const textPart = {
                text: `Extract the text from this image, identify its language, and translate it to Spanish. If no text is found, return empty strings for all fields.`
            };
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart, textPart] },
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: schema,
                }
            });

            const resultJson = JSON.parse(response.text);
            
            if (!resultJson.detectedText) {
                setError("No text could be found in the image. Please try another one.");
                return;
            }

            setResult(resultJson);

        } catch (err) {
            console.error("Failed to process image:", err);
            setError("Sorry, something went wrong while analyzing the image. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const reset = () => {
        setResult(null);
        setIsLoading(false);
        setError(null);
    }

    return { result, isLoading, error, processImage, reset };
};
