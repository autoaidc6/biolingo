import React from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { motion } from 'framer-motion';
import { AudioParagraph } from './AudioParagraph';

interface ReadingLessonProps {
  content: string[];
  onComplete: () => void;
}

export const ReadingLesson: React.FC<ReadingLessonProps> = ({ content, onComplete }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto pr-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="space-y-2">
            {content.map((paragraph, index) => (
              <AudioParagraph key={index} text={paragraph} />
            ))}
          </Card>
        </motion.div>
      </div>
      <div className="mt-auto pt-4">
        <Button fullWidth onClick={onComplete}>
          Continue
        </Button>
      </div>
    </div>
  );
};
