import React from 'react';
import { motion } from 'framer-motion';

export type MascotExpression = 'idle' | 'happy' | 'thinking' | 'talking' | 'collapsed' | 'wave';

interface MascotProps {
  expression?: MascotExpression;
  className?: string;
  size?: number | string;
  showBubble?: string;
}

export const Mascot: React.FC<MascotProps> = ({ 
  expression = 'idle', 
  className = '', 
  size = 120,
  showBubble
}) => {
  // SVG Color Palette based on the image provided
  const colors = {
    body: '#76D7C4', // Mint/Teal
    bodyDark: '#5DADE2', // Belly/Shadow
    gill: '#FF8A80', // Pinkish Coral
    eye: '#1C2833',
    scarfWhite: '#FFFFFF',
    scarfBlue: '#85C1E9',
  };

  const variants = {
    idle: { y: [0, -4, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
    thinking: { scale: [1, 1.02, 1], transition: { duration: 2, repeat: Infinity } },
    happy: { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0], transition: { duration: 0.5 } },
    talking: { y: [0, -2, 0], transition: { duration: 0.2, repeat: Infinity } },
  };

  const gillVariants = {
    idle: { rotate: [0, 10, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
    thinking: { opacity: [0.7, 1, 0.7], transition: { duration: 1, repeat: Infinity } }
  };

  if (expression === 'collapsed') {
    return (
      <div className={`relative flex items-center justify-center rounded-full bg-white border-2 border-brand-stroke p-1 shadow-sm ${className}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
           {/* Simplified Head for Collapsed View */}
           <circle cx="50" cy="50" r="40" fill={colors.body} />
           <circle cx="35" cy="45" r="6" fill={colors.eye} />
           <circle cx="65" cy="45" r="6" fill={colors.eye} />
           <path d="M40 65 Q50 75 60 65" stroke={colors.eye} strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ width: size }}>
      {showBubble && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white border-2 border-brand-stroke rounded-2xl p-3 shadow-lg z-10 whitespace-nowrap"
        >
          <p className="text-sm font-bold text-brand-text">{showBubble}</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-brand-stroke rotate-45" />
        </motion.div>
      )}
      
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        variants={variants[expression === 'talking' || expression === 'happy' || expression === 'thinking' ? expression : 'idle']}
        animate="animate"
      >
        {/* Gills Left */}
        <motion.g variants={gillVariants} animate="idle">
          <path d="M60 70 Q30 50 40 90" stroke={colors.gill} strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M55 85 Q20 75 35 105" stroke={colors.gill} strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M65 105 Q30 110 45 130" stroke={colors.gill} strokeWidth="8" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* Gills Right */}
        <motion.g variants={gillVariants} animate="idle">
          <path d="M140 70 Q170 50 160 90" stroke={colors.gill} strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M145 85 Q180 75 165 105" stroke={colors.gill} strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M135 105 Q170 110 155 130" stroke={colors.gill} strokeWidth="8" fill="none" strokeLinecap="round" />
        </motion.g>

        {/* Body/Head */}
        <ellipse cx="100" cy="110" rx="60" ry="55" fill={colors.body} />
        
        {/* Scarf */}
        <path d="M50 135 Q100 160 150 135 L140 155 Q100 175 60 155 Z" fill={colors.scarfWhite} />
        <path d="M70 145 L85 152 M105 153 L120 150 M135 145 L130 155" stroke={colors.scarfBlue} strokeWidth="6" />

        {/* Eyes */}
        <motion.g animate={expression === 'thinking' ? { scaleY: [1, 0.1, 1], transition: { duration: 3, repeat: Infinity } } : {}}>
          <circle cx="75" cy="105" r="10" fill={colors.eye} />
          <circle cx="125" cy="105" r="10" fill={colors.eye} />
          {/* Eye Highlights */}
          <circle cx="72" cy="102" r="3" fill="white" />
          <circle cx="122" cy="102" r="3" fill="white" />
        </motion.g>

        {/* Mouth */}
        <motion.path 
          d={expression === 'happy' ? "M85 125 Q100 140 115 125" : "M90 130 Q100 135 110 130"} 
          stroke={colors.eye} 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round"
          animate={expression === 'talking' ? { d: ["M90 130 Q100 135 110 130", "M85 132 Q100 145 115 132", "M90 130 Q100 135 110 130"] } : {}}
          transition={{ duration: 0.2, repeat: Infinity }}
        />

        {/* Blush */}
        <circle cx="60" cy="120" r="6" fill={colors.gill} opacity="0.3" />
        <circle cx="140" cy="120" r="6" fill={colors.gill} opacity="0.3" />
      </motion.svg>
    </div>
  );
};
