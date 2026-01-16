
import React from 'react';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-brand-snow py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-black text-brand-text tracking-tighter uppercase mb-4">Privacy Policy</h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">Last Updated: June 15, 2025</p>
          </header>

          <Card className="p-8 md:p-12 space-y-10 border-b-8">
            <section>
              <h2 className="text-2xl font-black text-brand-purple mb-4">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                At Biolingo, your privacy is a top priority. This Privacy Policy explains how we collect, use, and protect your personal information when you use our Spanish language learning application. By using Biolingo, you agree to the practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-brand-purple mb-4">2. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-3 text-slate-600 font-medium">
                <li><strong>Account Information:</strong> When you sign up, we collect your name and email address.</li>
                <li><strong>Learning Progress:</strong> We track lessons completed, quiz scores, and streaks to provide a personalized experience.</li>
                <li><strong>AI Interaction:</strong> Text and audio inputs provided to Ustaza AI are processed via the Google Gemini API to generate learning responses.</li>
                <li><strong>Device Data:</strong> We may collect basic diagnostic information to improve app performance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-brand-purple mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed font-medium mb-4">
                We use the information collected to:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-slate-600 font-medium">
                <li>Maintain your learning streak and points.</li>
                <li>Personalize lesson recommendations using our neural AI models.</li>
                <li>Provide real-time translations through our visual scanning feature.</li>
                <li>Improve the accuracy and helpfulness of our AI tutor, Ustaza.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-brand-purple mb-4">4. Third-Party Services</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                We use Supabase for authentication and database management, and Google Gemini API for all AI-powered interactions. These services have their own privacy policies which govern how they handle your data during processing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-brand-purple mb-4">5. Your Rights</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                You have the right to access, update, or delete your account information at any time. You can reset your progress or delete your profile directly from the Settings menu in the Biolingo app.
              </p>
            </section>

            <section className="pt-8 border-t border-brand-stroke">
              <p className="text-sm text-slate-400 font-bold text-center">
                Questions about this policy? Contact us at privacy@biolingo.com
              </p>
            </section>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
