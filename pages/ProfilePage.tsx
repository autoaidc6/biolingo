import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { AwardIcon, FlameIcon, GemIcon, TargetIcon } from '../components/ui/Icons';

// Mock achievements data
const achievements = [
  { id: 1, title: 'Perfect Start', icon: <TargetIcon className="w-8 h-8 text-blue-500" />, unlocked: true },
  { id: 2, title: 'Streak Starter', icon: <FlameIcon className="w-8 h-8 text-orange-500" />, unlocked: true },
  { id: 3, title: 'Weekend Warrior', icon: <AwardIcon className="w-8 h-8 text-green-500" />, unlocked: true },
  { id: 4, title: 'Point Collector', icon: <GemIcon className="w-8 h-8 text-purple-500" />, unlocked: false },
];

const learningGoals = [
    "Travel",
    "Career",
    "Connect with Family",
    "Brain Training",
    "Just for Fun"
];

export const ProfilePage: React.FC = () => {
  const { user, logout, updateLearningGoal } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const badgeContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 15 },
    },
  };

  if (!user) {
    return null;
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex flex-col items-center" variants={itemVariants}>
        <motion.img
          src={user.avatarUrl}
          alt={user.name}
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <h1 className="text-3xl font-bold text-brand-text mt-4">{user.name}</h1>
        <p className="text-gray-500">{user.email}</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="text-left">
          <h2 className="text-xl font-bold text-brand-text mb-2">My Learning Goal</h2>
          <p className="text-gray-500 mb-4 text-sm">Select a goal to get personalized lesson recommendations.</p>
          <select 
            value={user.learningGoal || ''}
            onChange={(e) => updateLearningGoal(e.target.value)}
            className="w-full bg-gray-100 border-2 border-brand-stroke rounded-xl p-4 text-brand-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            <option value="" disabled>Select a goal...</option>
            {learningGoals.map(goal => (
                <option key={goal} value={goal}>{goal}</option>
            ))}
          </select>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="text-left">
          <h2 className="text-xl font-bold text-brand-text mb-4">Statistics</h2>
          <div className="flex justify-around text-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-500">{user.streak}</p>
              <p className="text-sm text-gray-500">Day Streak</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-500">{user.points}</p>
              <p className="text-sm text-gray-500">Total Points</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">3</p>
              <p className="text-sm text-gray-500">Courses Started</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="text-left">
          <h2 className="text-xl font-bold text-brand-text mb-4">Achievements</h2>
          <motion.div
            className="grid grid-cols-4 gap-2 sm:gap-4"
            variants={badgeContainerVariants}
          >
            {achievements.map((ach) => (
              <motion.div
                key={ach.id}
                className={`flex flex-col items-center justify-center p-2 rounded-lg aspect-square ${ach.unlocked ? 'bg-yellow-100' : 'bg-gray-100'}`}
                variants={badgeVariants}
                title={ach.title}
              >
                <div className={!ach.unlocked ? 'opacity-30' : ''}>
                  {ach.icon}
                </div>
                <p className={`text-xs mt-1 font-semibold text-center ${ach.unlocked ? 'text-yellow-800' : 'text-gray-500'}`}>
                  {ach.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button variant="outline" fullWidth onClick={logout}>
          Log Out
        </Button>
      </motion.div>
    </motion.div>
  );
};