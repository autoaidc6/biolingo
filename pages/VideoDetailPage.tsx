import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_VIDEOS } from '../constants';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const VideoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const video = MOCK_VIDEOS.find(v => v.id === id);
  const recommended = MOCK_VIDEOS.filter(v => v.id !== id).slice(0, 8);

  if (!video) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-black text-brand-text uppercase">Video not found</h1>
        <Button onClick={() => navigate('/videos')} className="mt-8">Back to Library</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 pb-20 pt-4">
      {/* Main Content (Left) */}
      <div className="flex-grow space-y-8">
        {/* Video Player Section */}
        <div className="aspect-video w-full rounded-[40px] overflow-hidden border-2 border-brand-stroke bg-black relative shadow-2xl group border-b-[10px]">
           <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0&modestbranding=1&rel=0`} 
            title={video.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
          {/* Overlay elements like the #1 badge in the screenshot */}
          <div className="absolute top-6 left-6 bg-white text-brand-text font-black text-5xl px-6 py-3 rounded-2xl shadow-2xl border-2 border-brand-stroke">
            #1
          </div>
        </div>

        {/* Info & Transcript Section */}
        <div className="space-y-8 px-2">
          {/* Transcript - Styled like the screenshot with blue highlights for speakers/key terms */}
          <div className="bg-white/40 rounded-3xl p-8 border-2 border-brand-stroke/50">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Interactive Transcript</h3>
            <div className="text-brand-text/80 font-medium text-2xl leading-[1.6] whitespace-pre-wrap">
              {video.transcript.split('\n').map((line, i) => (
                <p key={i} className="mb-4">
                  {/* Simulate the highlighting style from the screenshot */}
                  <span className="text-brand-purple font-black hover:bg-brand-purple/10 cursor-pointer rounded px-1 transition-all">
                    {line.split('(')[0]}
                  </span>
                  <span className="text-slate-400 text-lg ml-2">
                    {line.includes('(') ? `(${line.split('(')[1]}` : ''}
                  </span>
                </p>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t-2 border-brand-stroke pt-8">
            <h2 className="text-3xl font-black text-brand-text leading-tight">
              {video.title}
            </h2>
            <a 
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-snow border-2 border-brand-stroke px-6 py-3 rounded-2xl text-brand-purple font-black uppercase text-sm hover:bg-white transition-all shadow-sm"
            >
              View on YouTube <span className="text-xs">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Recommended Sidebar (Right) */}
      <aside className="w-full lg:w-[400px] flex-shrink-0">
        <Card className="p-8 border-2 border-brand-stroke rounded-[40px] border-b-[8px] shadow-xl sticky top-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-brand-text text-2xl tracking-tight uppercase">Recommended</h3>
            <div className="relative">
              <select className="appearance-none bg-brand-snow border-2 border-brand-stroke rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest focus:outline-none cursor-pointer pr-10">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</div>
            </div>
          </div>

          <div className="space-y-6">
            {recommended.map(v => (
              <Link key={v.id} to={`/video/${v.id}`} className="flex gap-5 group items-start">
                <div className="relative w-36 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-brand-stroke group-hover:shadow-lg transition-all">
                  <img 
                    src={v.thumbnail} 
                    alt={v.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute bottom-1.5 left-1.5 bg-brand-green text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">
                    {v.level}
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[8px] font-black px-1 rounded">
                    {v.duration}
                  </div>
                </div>
                <div className="flex flex-col justify-center pt-1">
                  <h4 className="text-base font-black text-brand-text leading-[1.2] group-hover:text-brand-purple transition-colors line-clamp-2">
                    {v.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
          
          <Button variant="outline" fullWidth size="md" className="mt-8 py-3 rounded-2xl border-brand-stroke text-slate-400 hover:text-brand-purple">
            Explore All Videos
          </Button>
        </Card>
      </aside>
    </div>
  );
};