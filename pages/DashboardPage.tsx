import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { FlameIcon, GemIcon, CheckCircleIcon, ArrowRightIcon } from '../components/ui/Icons';
import { useCourses } from '../contexts/CourseContext';
import { RecommendedLesson } from '../components/RecommendedLesson';
import { Mascot } from '../components/ui/Mascot';

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string }> = ({ icon, label, value, color }) => (
    <div className={`flex-1 p-4 rounded-2xl ${color}`}>
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="font-bold text-xl text-brand-text">{value}</p>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
        </div>
      </div>
    </div>
);

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { courses } = useCourses();
  
  const lessonsCompleted = courses.flatMap(c => c.lessons).filter(l => l.completed).length;

  if (!user) return null;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header variants={itemVariants} className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-brand-text">Hola, {user.name}!</h1>
          <p className="text-gray-500 font-medium">Let's continue learning.</p>
        </div>
        <div className="bg-white p-1 rounded-full border-2 border-brand-stroke shadow-sm">
           <Mascot size={48} expression="collapsed" />
        </div>
      </motion.header>
      
      <motion.div className="flex gap-4" variants={itemVariants}>
        <StatCard icon={<FlameIcon className="w-8 h-8 text-orange-500"/>} label="Day Streak" value={user.streak} color="bg-orange-100/70" />
        <StatCard icon={<GemIcon className="w-8 h-8 text-blue-500"/>} label="Total Points" value={user.points} color="bg-blue-100/70" />
      </motion.div>

      <RecommendedLesson />

      <motion.div variants={itemVariants}>
        <Link 
          to="/chat" 
          className="group block w-full p-5 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-400 text-white hover:shadow-lg transition-all duration-300"
          aria-label="Start a chat with Ustaza AI"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-sm">
                        <Mascot size={60} expression="idle" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">Chat with Ustaza</h2>
                        <p className="text-sm opacity-90">Practice your Spanish conversation skills.</p>
                    </div>
                </div>
                <ArrowRightIcon className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-brand-text mb-2">Your Courses</h2>
        {courses.slice(0, 2).map(course => (
          <Link to={`/course/${course.id}`} key={course.id}>
            <Card className="mb-3 flex items-center gap-4 hover:bg-white/80 hover:shadow-md transition-all duration-300 rounded-2xl">
              <div className={`text-3xl p-3 rounded-xl ${course.color}`}>{course.icon}</div>
              <div>
                <h3 className="font-bold text-brand-text">{course.title}</h3>
                <p className="text-sm text-gray-500 font-medium">{course.description}</p>
              </div>
            </Card>
          </Link>
        ))}
        <Link to="/courses">
           <Button variant="outline" size="md" fullWidth>View All Courses</Button>
        </Link>
      </motion.div>

    </motion.div>
  );
};
