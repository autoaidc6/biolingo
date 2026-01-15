import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import { MainLayout } from '../components/layout/MainLayout';
import { LandingLayout } from '../components/layout/LandingLayout';

// Lazy load app pages
const DashboardPage = lazy(() => import('../pages/DashboardPage').then(module => ({ default: module.DashboardPage })));
const CoursesPage = lazy(() => import('../pages/CoursesPage').then(module => ({ default: module.CoursesPage })));
const CourseDetailPage = lazy(() => import('../pages/CourseDetailPage').then(module => ({ default: module.CourseDetailPage })));
const LessonPage = lazy(() => import('../pages/LessonPage').then(module => ({ default: module.LessonPage })));
const ChatPage = lazy(() => import('../pages/ChatPage').then(module => ({ default: module.ChatPage })));
const ProfilePage = lazy(() => import('../pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const ScanPage = lazy(() => import('../pages/ScanPage').then(module => ({ default: module.ScanPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

// Lazy load marketing pages
const HomePage = lazy(() => import('../pages/landing/HomePage').then(module => ({ default: module.HomePage })));
const FeaturesPage = lazy(() => import('../pages/landing/FeaturesPage').then(module => ({ default: module.FeaturesPage })));
const PricingPage = lazy(() => import('../pages/landing/PricingPage').then(module => ({ default: module.PricingPage })));
const TestimonialsPage = lazy(() => import('../pages/landing/TestimonialsPage').then(module => ({ default: module.TestimonialsPage })));
const FAQPage = lazy(() => import('../pages/landing/FAQPage').then(module => ({ default: module.FAQPage })));
const LoginPage = lazy(() => import('../pages/LoginPage').then(module => ({ default: module.LoginPage })));

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
          {/* Public Marketing Routes */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
          </Route>

          {/* Protected App Routes */}
          <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/lesson/:id" element={<LessonPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/scan" element={<ScanPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};
