import React from 'react';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { SpeakerIcon, StopIcon, LoadingSpinnerIcon } from '../ui/Icons';

interface AudioParagraphProps {
  text: string;
}

export const AudioParagraph: React.FC<AudioParagraphProps> = ({ text }) => {
  const { togglePlay, isLoading, isPlaying } = useTextToSpeech(text);

  return (
    <div className="flex items-start gap-3">
      <button 
        onClick={togglePlay} 
        className="p-2 text-gray-500 hover:text-brand-blue transition-colors mt-1 flex-shrink-0 disabled:opacity-50 disabled:cursor-wait"
        aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
        disabled={isLoading}
      >
        {isLoading ? <LoadingSpinnerIcon className="w-6 h-6" /> : isPlaying ? <StopIcon className="w-6 h-6 text-brand-blue" /> : <SpeakerIcon className="w-6 h-6" />}
      </button>
      <p className="text-lg text-brand-text leading-relaxed">
        {text}
      </p>
    </div>
  );
};
