import { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useAuth } from './useAuth';
import { useCourses } from '../contexts/CourseContext';
import { Course, Lesson } from '../types';

interface Recommendation {
  recommendationType: 'lesson' | 'course';
  id: string;
  reason: string;
  title: string;
  item: Lesson | Course;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
    type: Type.OBJECT,
    properties: {
        recommendationType: { type: Type.STRING, description: 'Either "lesson" or "course".' },
        id: { type: Type.STRING, description: 'The ID of the recommended lesson or course.' },
        reason: { type: Type.STRING, description: 'A short, encouraging, one-sentence reason for the recommendation based on user goals.' }
    },
    required: ["recommendationType", "id", "reason"]
};

export const useLearningRecommendation = () => {
    const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const { courses, getLessonById, getCourseById } = useCourses();

    useEffect(() => {
        const fetchRecommendation = async () => {
            if (!user || !courses.length) {
                setIsLoading(false);
                return;
            }

            // Simple caching to avoid re-fetching on every dashboard visit
            const cachedRec = sessionStorage.getItem(`rec_${user.id}_${user.learningGoal}`);
            if (cachedRec) {
                const parsedRec = JSON.parse(cachedRec);
                const item = parsedRec.recommendationType === 'lesson' 
                    ? getLessonById(parsedRec.id)?.lesson 
                    : getCourseById(parsedRec.id);
                if (item) {
                     setRecommendation({ ...parsedRec, title: item.title, item });
                     setIsLoading(false);
                     return;
                }
            }

            setIsLoading(true);
            setError(null);
            
            try {
                const simplifiedCourses = courses.map(c => ({
                    id: c.id,
                    title: c.title,
                    description: c.description,
                    lessons: c.lessons.map(l => ({
                        id: l.id,
                        title: l.title,
                        completed: l.completed
                    }))
                }));

                const prompt = `You are a language learning assistant for an app called Biolingo.
Your task is to recommend the next best learning unit (either a single lesson or a whole course) for a user.

User's learning goal: "${user.learningGoal || 'General Improvement'}"

All available courses and their lessons (including completion status):
${JSON.stringify(simplifiedCourses, null, 2)}

Based on the user's goal and their completed lessons, suggest the single most relevant and helpful next lesson or course that they have not yet completed. Prioritize suggesting an uncompleted lesson from a started course before suggesting a new course. Find the very first uncompleted lesson in the user's path and suggest that if it aligns with their goal. If no goal is specified, just find the next logical uncompleted lesson.
`;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: {
                        responseMimeType: 'application/json',
                        responseSchema: schema,
                    }
                });

                const resultJson = JSON.parse(response.text);
                const { recommendationType, id, reason } = resultJson;

                if (recommendationType && id && reason) {
                    const item = recommendationType === 'lesson' 
                        ? getLessonById(id)?.lesson 
                        : getCourseById(id);
                    
                    if (item) {
                        const newRec = { recommendationType, id, reason, title: item.title, item };
                        setRecommendation(newRec);
                        sessionStorage.setItem(`rec_${user.id}_${user.learningGoal}`, JSON.stringify(newRec));
                    } else {
                        throw new Error("Recommended item not found in course data.");
                    }
                } else {
                    throw new Error("Invalid response from AI.");
                }

            } catch (err) {
                console.error("Failed to get recommendation:", err);
                setError("Couldn't generate a recommendation right now. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendation();
    }, [user, courses, getLessonById, getCourseById]);

    return { recommendation, isLoading, error };
};