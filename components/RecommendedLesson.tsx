
import React from 'react';
import { Link } from 'react-router-dom';
// FIX: Import `Variants` type from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';
import { useLearningRecommendation } from '../hooks/useLearningRecommendation';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { LightbulbIcon, LoadingSpinnerIcon } from './ui/Icons';

export const RecommendedLesson: React.FC = () => {
    const { recommendation, isLoading, error } = useLearningRecommendation();

    // FIX: Explicitly type `itemVariants` with the `Variants` type to resolve TypeScript error with transition properties.
    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            }
        }
    };

    if (isLoading) {
        return (
            <motion.div variants={itemVariants}>
                <Card className="flex items-center gap-4 bg-yellow-50/70 border-yellow-200">
                    <LoadingSpinnerIcon className="w-6 h-6 text-yellow-600" />
                    <div>
                        <h3 className="font-bold text-yellow-800">Just for you...</h3>
                        <p className="text-sm text-yellow-700 font-medium">Finding your next lesson...</p>
                    </div>
                </Card>
            </motion.div>
        );
    }

    if (error || !recommendation) {
        // Don't show an error, just hide the component to not clutter the UI.
        // The error is logged to the console in the hook.
        return null;
    }

    const linkTo = recommendation.recommendationType === 'lesson'
        ? `/lesson/${recommendation.id}`
        : `/course/${recommendation.id}`;

    return (
        <motion.div variants={itemVariants}>
            <Card className="bg-yellow-50/70 border-yellow-200">
                <div className="flex items-start gap-4">
                    <LightbulbIcon className="w-8 h-8 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                        <h2 className="text-lg font-bold text-yellow-900">Recommended For You</h2>
                        <h3 className="font-semibold text-brand-text mt-2">{recommendation.title}</h3>
                        <p className="text-sm text-yellow-800 font-medium mt-1 italic">"{recommendation.reason}"</p>
                        <Link to={linkTo} className="mt-4 inline-block">
                            <Button size="sm">
                                {recommendation.recommendationType === 'lesson' ? 'Start Lesson' : 'View Course'}
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};
