import React from 'react';
import { motion, Variants } from 'framer-motion';

export type MascotExpression = 'idle' | 'happy' | 'thinking' | 'talking' | 'collapsed' | 'wave' | 'celebrate';

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
  // Enhanced Color Palette using new brand tokens
  const colors = {
    body: '#22D3EE', // Cyan 400
    bodyDark: '#0891B2', // Cyan 600
    gill: '#F472B6', // Pink 400
    eye: '#0F172A', // Slate 900
    scarfWhite: '#FFFFFF',
    scarfBlue: '#6366F1', // Indigo 500
    blush: '#FDA4AF'  // Rose 300
  };

  const mascotVariants: Variants = {
    idle: { y: [0, -6, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
    thinking: { scale: [1, 1.05, 1], rotate: [-2, 2, -2], transition: { duration: 2, repeat: Infinity } },
    happy: { scale: [1, 1.15, 1], rotate: [0, 10, -10, 0], transition: { duration: 0.6 } },
    celebrate: { y: [0, -20, 0], scale: [1, 1.2, 1], transition: { duration: 0.5, repeat: 3 } },
    talking: { y: [0, -3, 0], transition: { duration: 0.2, repeat: Infinity } },
  };

  if (expression === 'collapsed') {
    return (
      <div className={`relative flex items-center justify-center rounded-2xl bg-white border-2 border-brand-stroke p-1 shadow-sm ${className}`} style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
           <circle cx="50" cy="50" r="40" fill={colors.body} />
           <circle cx="35" cy="45" r="7" fill={colors.eye} />
           <circle cx="65" cy="45" r="7" fill={colors.eye} />
           <path d="M40 65 Q50 78 60 65" stroke={colors.eye} strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ width: size }}>
      {showBubble && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white border-2 border-brand-stroke rounded-2xl px-5 py-3 shadow-xl z-10 whitespace-nowrap"
        >
          <p className="text-sm font-extrabold text-brand-text uppercase tracking-wide">{showBubble}</p>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-brand-stroke rotate-45" />
        </motion.div>
      )}
      
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-lg"
        variants={mascotVariants}
        animate={expression in mascotVariants ? expression : 'idle'}
      >
        {/* Gills */}
        {[60, 140].map((x, i) => (
          <motion.g key={x} animate={{ rotate: [0, i === 0 ? 15 : -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
             <path d={`M${x} 70 Q${i === 0 ? x-30 : x+30} 50 ${i === 0 ? x-20 : x+20} 90`} stroke={colors.gill} strokeWidth="10" fill="none" strokeLinecap="round" />
             <path d={`M${x-5} 85 Q${i === 0 ? x-40 : x+40} 75 ${i === 0 ? x-25 : x+25} 105`} stroke={colors.gill} strokeWidth="10" fill="none" strokeLinecap="round" />
             <path d={`M${x+5} 105 Q${i === 0 ? x-35 : x+35} 110 ${i === 0 ? x-20 : x+20} 130`} stroke={colors.gill} strokeWidth="10" fill="none" strokeLinecap="round" />
          </motion.g>
        ))}

        {/* Body/Head */}
        <ellipse cx="100" cy="110" rx="65" ry="58" fill={colors.body} />
        
        {/* Scarf with brand-blue (Indigo) */}
        <path d="M45 135 Q100 165 155 135 L145 155 Q100 185 55 155 Z" fill={colors.scarfWhite} />
        <path d="M65 145 L80 155 M100 156 L120 152 M140 145 L135 155" stroke={colors.scarfBlue} strokeWidth="8" strokeLinecap="round" />

        {/* Eyes */}
        <motion.g animate={expression === 'thinking' ? { scaleY: [1, 0.2, 1] } : {}}>
          <circle cx="72" cy="105" r="11" fill={colors.eye} />
          <circle cx="128" cy="105" r="11" fill={colors.eye} />
          <circle cx="68" cy="101" r="4" fill="white" />
          <circle cx="124" cy="101" r="4" fill="white" />
        </motion.g>

        {/* Mouth */}
        <motion.path 
          d={expression === 'happy' || expression === 'celebrate' ? "M80 128 Q100 148 120 128" : "M85 132 Q100 140 115 132"} 
          stroke={colors.eye} 
          strokeWidth="4" 
          fill="none" 
          strokeLinecap="round"
          animate={expression === 'talking' ? { d: ["M85 132 Q100 140 115 132", "M80 135 Q100 155 120 135", "M85 132 Q100 140 115 132"] } : {}}
          transition={{ duration: 0.15, repeat: Infinity }}
        />

        {/* Blush */}
        <circle cx="55" cy="122" r="7" fill={colors.blush} opacity="0.4" />
        <circle cx="145" cy="122" r="7" fill={colors.blush} opacity="0.4" />
      </motion.svg>
    </div>
  );
};