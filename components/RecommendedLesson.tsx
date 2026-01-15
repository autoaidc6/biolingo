import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useLearningRecommendation } from '../hooks/useLearningRecommendation';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
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
                <Card className="flex items-center gap-5 bg-brand-snow/50 border-dashed border-2">
                    <Mascot size={60} expression="thinking" />
                    <div>
                        <h3 className="font-extrabold text-brand-text uppercase tracking-wider">Choosing...</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">AI IS CURATING YOUR PATH</p>
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
            <Card className="bg-white border-2 border-brand-stroke border-b-8 hover:border-brand-yellow transition-all p-0 overflow-hidden">
                <div className="flex p-6 gap-5">
                    <div className="flex-shrink-0">
                       <Mascot size={85} expression="happy" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.2em] mb-1">Ustaza's Recommendation</span>
                        <h3 className="font-extrabold text-xl text-brand-text leading-tight">{recommendation.title}</h3>
                        <p className="text-xs text-gray-500 font-bold mt-2 leading-relaxed">"{recommendation.reason}"</p>
                    </div>
                </div>
                <div className="p-4 bg-brand-snow border-t-2 border-brand-stroke">
                  <Link to={linkTo}>
                      <Button size="md" fullWidth>Continue Journey</Button>
                  </Link>
                </div>
            </Card>
        </motion.div>
    );
};