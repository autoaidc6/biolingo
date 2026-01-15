import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useLearningRecommendation } from '../hooks/useLearningRecommendation';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { LoadingSpinnerIcon } from './ui/Icons';
import { Mascot } from './ui/Mascot';

export const RecommendedLesson: React.FC = () => {
    const { recommendation, isLoading, error } = useLearningRecommendation();

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    if (isLoading) {
        return (
            <motion.div variants={itemVariants}>
                <Card className="flex items-center gap-4 bg-yellow-50/70 border-yellow-200">
                    <Mascot size={50} expression="thinking" />
                    <div>
                        <h3 className="font-bold text-yellow-800">Thinking...</h3>
                        <p className="text-sm text-yellow-700 font-medium">Picking your perfect lesson.</p>
                    </div>
                </Card>
            </motion.div>
        );
    }

    if (error || !recommendation) return null;

    const linkTo = recommendation.recommendationType === 'lesson'
        ? `/lesson/${recommendation.id}`
        : `/course/${recommendation.id}`;

    return (
        <motion.div variants={itemVariants}>
            <Card className="bg-yellow-50/70 border-yellow-200 overflow-hidden relative">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                       <Mascot size={80} expression="happy" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-yellow-900">Ustaza's Pick</h2>
                        <h3 className="font-semibold text-brand-text mt-1">{recommendation.title}</h3>
                        <p className="text-sm text-yellow-800 font-medium mt-1 italic">"{recommendation.reason}"</p>
                        <Link to={linkTo} className="mt-4 inline-block">
                            <Button size="sm">
                                {recommendation.recommendationType === 'lesson' ? 'Let\'s go!' : 'Start Course'}
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};
