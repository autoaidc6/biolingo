import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { MainLayout } from '../components/layout/MainLayout';
import { Onboarding } from '../components/Onboarding';

// Lazy load pages for code-splitting
const DashboardPage = lazy(() => import('../pages/DashboardPage').then(module => ({ default: module.DashboardPage })));
const CoursesPage = lazy(() => import('../pages/CoursesPage').then(module => ({ default: module.CoursesPage })));
const CourseDetailPage = lazy(() => import('../pages/CourseDetailPage').then(module => ({ default: module.CourseDetailPage })));
const LessonPage = lazy(() => import('../pages/LessonPage').then(module => ({ default: module.LessonPage })));
const ChatPage = lazy(() => import('../pages/ChatPage').then(module => ({ default: module.ChatPage })));
const ProfilePage = lazy(() => import('../pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const ScanPage = lazy(() => import('../pages/ScanPage').then(module => ({ default: module.ScanPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));


const FullscreenLoader: React.FC = () => (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-green"></div>
    </div>
);

export const AppRouter: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if(isLoading) {
      return <FullscreenLoader />;
  }

  return (
    <HashRouter>
      <Suspense fallback={<FullscreenLoader />}>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="courses" element={<CoursesPage />} />
              <Route path="course/:id" element={<CourseDetailPage />} />
              <Route path="lesson/:id" element={<LessonPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="scan" element={<ScanPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<Onboarding />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Suspense>
    </HashRouter>
  );
};