import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_VIDEOS } from '../constants';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const VideoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const video = MOCK_VIDEOS.find(v => v.id === id);
  const recommended = MOCK_VIDEOS.filter(v => v.id !== id).slice(0, 7);

  if (!video) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Video not found</h1>
        <Button onClick={() => navigate('/videos')} className="mt-4">Back to Library</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-20">
      <div className="flex-grow space-y-6">
        {/* Video Player Section */}
        <div className="aspect-video w-full rounded-3xl overflow-hidden border-2 border-brand-stroke bg-black relative shadow-lg group">
           <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=0`} 
            title={video.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
          {/* Overlay elements like the #1 badge in the screenshot */}
          <div className="absolute top-4 left-4 bg-white text-brand-text font-black text-4xl px-4 py-2 rounded-xl shadow-lg">
            #1
          </div>
        </div>

        {/* Transcript Section */}
        <div className="space-y-4">
          <div className="text-brand-purple font-medium text-lg leading-relaxed whitespace-pre-wrap px-2">
            {video.transcript}
          </div>
          
          <div className="flex items-center gap-2 pt-4">
            <h2 className="text-xl font-bold text-brand-text">{video.title} |</h2>
            <a 
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-blue font-bold underline hover:text-brand-blue-dark transition-colors"
            >
              View on YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Recommended Sidebar */}
      <aside className="w-full lg:w-96 space-y-6">
        <Card className="p-6 border-b-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-brand-text text-xl">Recommended</h3>
            <div className="relative">
              <select className="appearance-none bg-white border border-brand-stroke rounded-lg px-3 py-1 text-xs font-bold focus:outline-none cursor-pointer">
                <option>Beginner</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {recommended.map(v => (
              <Link key={v.id} to={`/video/${v.id}`} className="flex gap-4 group">
                <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-brand-stroke">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute bottom-1 left-1 bg-brand-green text-white text-[8px] font-black px-1 rounded">
                    {v.level}
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] font-bold px-1 rounded">
                    {v.duration}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-brand-text leading-tight group-hover:text-brand-blue transition-colors">
                    {v.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
};