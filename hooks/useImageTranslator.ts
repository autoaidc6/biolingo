import { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

export interface TranslationResult {
    detectedText: string;
    detectedLanguage: string;
    translatedText: string;
    translatedLanguage: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
    type: Type.OBJECT,
    properties: {
        detectedText: { type: Type.STRING, description: 'The exact text extracted from the image.' },
        detectedLanguage: { type: Type.STRING, description: 'The language of the extracted text (e.g., "English", "Spanish").' },
        translatedText: { type: Type.STRING, description: 'The translation of the extracted text.' },
        translatedLanguage: { type: Type.STRING, description: 'The language of the translated text (e.g., "English", "Spanish"). Will be empty if no translation was performed.' },
    },
    required: ["detectedText", "detectedLanguage", "translatedText", "translatedLanguage"]
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
                text: `You are a text extractor and translator. Your task is to extract text from an image, identify its language, and translate it.
1. Extract all visible text from the image.
2. Identify the language of the extracted text.
3. - If the language is Spanish, translate the text to English. Set 'translatedLanguage' to "English".
   - If the language is English, translate the text to Spanish. Set 'translatedLanguage' to "Spanish".
   - If the language is neither Spanish nor English, set 'translatedText' to an empty string and 'translatedLanguage' to an empty string.
4. If no text is found in the image, return empty strings for all fields.`
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

            if (!resultJson.translatedText) {
                 setError(`Translation from ${resultJson.detectedLanguage} is not supported. Please use an image with English or Spanish text.`);
                 // Still show the user what was detected.
                 setResult({ ...resultJson, translatedText: '', translatedLanguage: '' });
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