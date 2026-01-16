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

  return (
    <div className="space-y-10 pb-10">
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-black text-brand-text tracking-tight uppercase">Videos</h1>
          <p className="text-slate-400 font-bold mt-4 leading-relaxed text-lg">
            Welcome to the Video Library. Find Youtube videos organized by learner level, each with transcripts to enhance your learning.
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="relative group">
            <select 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value as any)}
              className="appearance-none bg-white border-2 border-brand-stroke rounded-2xl pl-6 pr-12 py-3 font-black text-sm text-brand-text focus:outline-none focus:ring-4 focus:ring-brand-purple/10 transition-all cursor-pointer"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              layout
            >
              <Link to={`/video/${video.id}`}>
                <Card className="p-0 overflow-hidden border-2 border-brand-stroke hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="relative aspect-video">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-brand-green text-white text-[10px] font-black px-2 py-1 rounded">
                      {video.level}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <h3 className="font-bold text-brand-text leading-tight group-hover:text-brand-purple transition-colors mb-2">
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
        <div className="flex justify-center mt-12 border-t border-brand-stroke pt-12">
          <Button onClick={handleLoadMore} size="lg" className="bg-brand-blue border-brand-blue-dark px-10">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};