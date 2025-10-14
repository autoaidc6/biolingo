import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { MOCK_COURSES } from '../constants';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FlameIcon, GemIcon, CheckCircleIcon, ArrowRightIcon } from '../components/ui/Icons';

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; color: string }> = ({ icon, label, value, color }) => (
    <Card className={`flex-1 ${color}`}>
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="font-bold text-xl text-brand-text">{value}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </Card>
);

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  
  // Calculate total completed lessons from all courses
  const lessonsCompleted = MOCK_COURSES.flatMap(c => c.lessons).filter(l => l.completed).length;

  if (!user) return null;
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header variants={itemVariants}>
        <h1 className="text-3xl font-bold text-brand-text">Hola, {user.name}!</h1>
        <p className="text-gray-500">Let's continue learning.</p>
      </motion.header>
      
      <motion.div className="flex gap-4" variants={itemVariants}>
        <StatCard icon={<FlameIcon className="w-8 h-8 text-orange-500"/>} label="Day Streak" value={user.streak} color="bg-orange-50/80" />
        <StatCard icon={<GemIcon className="w-8 h-8 text-blue-500"/>} label="Total Points" value={user.points} color="bg-blue-50/80" />
        <StatCard icon={<CheckCircleIcon className="w-8 h-8 text-green-500"/>} label="Lessons Done" value={lessonsCompleted} color="bg-green-50/80" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="bg-brand-blue text-white">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🤖</div>
            <div>
              <h2 className="text-xl font-bold">Ustaza AI</h2>
              <p className="opacity-80">Today's plan: Review verb conjugations and practice 10 new words.</p>
            </div>
          </div>
          <Link to="/chat" className="block mt-4">
            <Button variant="secondary" fullWidth className="bg-white text-brand-blue border-b-4 border-gray-200 hover:bg-gray-100 flex items-center justify-center gap-2">
                Start Chat <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </Link>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 className="text-xl font-bold text-brand-text mb-2">Your Courses</h2>
        {MOCK_COURSES.slice(0, 2).map(course => (
          <Link to={`/course/${course.id}`} key={course.id}>
            <Card className="mb-3 flex items-center gap-4 hover:bg-gray-100 transition-colors">
              <div className={`text-3xl p-3 rounded-lg ${course.color}`}>{course.icon}</div>
              <div>
                <h3 className="font-bold text-brand-text">{course.title}</h3>
                <p className="text-sm text-gray-500">{course.description}</p>
              </div>
            </Card>
          </Link>
        ))}
        <Link to="/courses">
           <Button variant="outline" fullWidth>View All Courses</Button>
        </Link>
      </motion.div>

    </motion.div>
  );
};
