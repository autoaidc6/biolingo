import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MOCK_VIDEOS } from '../constants';
import { ProficiencyLevel } from '../types';
import { Button } from '../components/ui/Button';

export const VideoLibraryPage: React.FC = () => {
  const [filterLevel, setFilterLevel] = useState<ProficiencyLevel | 'All'>('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredVideos = MOCK_VIDEOS.filter(video => 
    filterLevel === 'All' || video.level === filterLevel
  ).slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const getLevelColor = (level: ProficiencyLevel) => {
    switch (level) {
      case ProficiencyLevel.BEGINNER: return 'bg-brand-green';
      case ProficiencyLevel.INTERMEDIATE: return 'bg-brand-blue';
      case ProficiencyLevel.ADVANCED: return 'bg-brand-yellow';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="space-y-10 pb-10">
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-black text-brand-text tracking-tight uppercase">Videos</h1>
          <p className="text-slate-400 font-bold mt-4 leading-relaxed text-lg max-w-2xl">
            Welcome to the Video Library. Find Youtube videos organized by learner level, each with transcripts to enhance your learning.
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="relative group">
            <select 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value as any)}
              className="appearance-none bg-white border-2 border-brand-stroke rounded-2xl pl-6 pr-12 py-4 font-black text-sm text-brand-text focus:outline-none focus:ring-4 focus:ring-brand-purple/10 transition-all cursor-pointer shadow-sm"
            >
              <option value="All">Proficiency Level</option>
              {Object.values(ProficiencyLevel).map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              layout
            >
              <Link to={`/video/${video.id}`} className="group block h-full">
                <Card className="p-0 overflow-hidden border-2 border-brand-stroke rounded-[32px] hover:shadow-2xl hover:border-brand-purple/30 transition-all h-full flex flex-col group border-b-[6px]">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <div className="w-12 h-12 bg-brand-purple text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 shadow-xl">
                        <span className="ml-1 text-xl">▶</span>
                      </div>
                    </div>
                    {/* Level Badge */}
                    <div className={`absolute bottom-3 left-3 ${getLevelColor(video.level)} text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider`}>
                      {video.level}
                    </div>
                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-black px-2 py-1 rounded-md">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <h3 className="font-black text-brand-text leading-tight text-lg group-hover:text-brand-purple transition-colors mb-2">
                      {video.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {visibleCount < MOCK_VIDEOS.length && (
        <div className="flex justify-center mt-12 py-12 border-t-2 border-brand-stroke">
          <Button onClick={handleLoadMore} size="lg" className="bg-brand-purple border-brand-purple/80 px-12">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};