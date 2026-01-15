import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { FlameIcon, GemIcon, ArrowRightIcon } from '../components/ui/Icons';
import { useCourses } from '../contexts/CourseContext';
import { RecommendedLesson } from '../components/RecommendedLesson';
import { Mascot } from '../components/ui/Mascot';

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string; accent: string }> = ({ icon, label, value, color, accent }) => (
    <div className={`flex-1 p-5 rounded-3xl ${color} border-b-4 ${accent} shadow-sm`}>
      <div className="flex flex-col items-center text-center gap-1">
        <div className="mb-1">{icon}</div>
        <p className="font-extrabold text-2xl text-brand-text leading-none">{value}</p>
        <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">{label}</p>
      </div>
    </div>
);

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { courses } = useCourses();
  
  if (!user) return null;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="space-y-8 max-w-md mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header variants={itemVariants} className="flex justify-between items-center px-2">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-text tracking-tight">Hola, {user.name}!</h1>
          <p className="text-gray-400 font-bold text-sm">READY FOR YOUR SPANISH RECAP?</p>
        </div>
        <div className="p-1 rounded-2xl bg-white border-2 border-brand-stroke shadow-sm hover:scale-110 transition-transform">
           <Mascot size={52} expression="collapsed" />
        </div>
      </motion.header>
      
      <motion.div className="flex gap-4" variants={itemVariants}>
        <StatCard icon={<FlameIcon className="w-7 h-7 text-brand-yellow"/>} label="Streak" value={user.streak} color="bg-brand-yellow/10" accent="border-brand-yellow" />
        <StatCard icon={<GemIcon className="w-7 h-7 text-brand-blue"/>} label="Points" value={user.points} color="bg-brand-blue/10" accent="border-brand-blue" />
      </motion.div>

      <RecommendedLesson />

      <motion.div variants={itemVariants}>
        <Link 
          to="/chat" 
          className="group block w-full p-6 rounded-3xl bg-white border-2 border-brand-stroke border-b-8 hover:border-brand-blue transition-all duration-300"
        >
            <div className="flex items-center gap-5">
                <div className="bg-brand-blue/10 p-2 rounded-2xl">
                    <Mascot size={70} expression="idle" />
                </div>
                <div className="flex-grow">
                    <h2 className="text-xl font-extrabold text-brand-text leading-tight">Practice with Ustaza</h2>
                    <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-wide">AI CHAT COMPANION</p>
                </div>
                <div className="bg-brand-snow p-2 rounded-full group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
            </div>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-extrabold text-brand-text uppercase tracking-wider">Courses</h2>
            <Link to="/courses" className="text-brand-blue font-extrabold text-sm uppercase">See all</Link>
        </div>
        {courses.slice(0, 2).map(course => (
          <Link to={`/course/${course.id}`} key={course.id}>
            <Card className="flex items-center gap-5 hover:translate-x-1 hover:border-brand-blue active:translate-x-0 transition-all border-b-8">
              <div className={`text-3xl p-4 rounded-2xl ${course.color} shadow-sm border-2 border-white`}>{course.icon}</div>
              <div>
                <h3 className="font-extrabold text-lg text-brand-text leading-tight">{course.title}</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{course.lessons.length} LESSONS</p>
              </div>
            </Card>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
};