
import React from 'react';
import { Card } from '../../components/ui/Card';
import { motion } from 'framer-motion';

export const TermsOfServicePage: React.FC = () => {
  return (
    <div className="bg-brand-snow py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-black text-brand-text tracking-tighter uppercase mb-4">Terms of Service</h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm">Effective Date: June 15, 2025</p>
          </header>

          <Card className="p-8 md:p-12 space-y-10 border-b-8 border-brand-blue">
            <section>
              <h2 className="text-2xl font-black text-brand-blue mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                By accessing or using Biolingo, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-brand-blue mb-4">2. Use of the App</h2>
              <p className="text-slate-600 leading-relaxed font-medium mb-4">
                Biolingo provides language learning tools and AI-driven interactions. You agree to use the app only for lawful purposes and in a way that does not infringe the rights of others.
              </p>
              <ul className="list-disc pl-6 space-y-3 text-slate-600 font-medium">
                <li>You must be at least 13 years old to create an account.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You may not attempt to reverse engineer or scrape content from the app.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-black text-brand-blue mb-4">3. AI Content Disclaimer</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Biolingo uses Google Gemini AI models to generate conversational responses and translations. While we strive for accuracy, AI-generated content may occasionally contain errors or inconsistencies. Users are encouraged to verify critical information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-brand-blue mb-4">4. Subscriptions & Payments</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Biolingo offers a Premium "Full Access" plan. Subscriptions are billed monthly and may include a free trial period. You can cancel your subscription at any time through your app store settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-brand-blue mb-4">5. Intellectual Property</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                All content within Biolingo, including curriculum structure, graphics, and the "Biolingo" brand, is the property of Biolingo Inc. and is protected by copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black text-brand-blue mb-4">6. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                Biolingo is provided "as is." We are not liable for any damages resulting from your use of the app, including learning outcomes or data loss due to service interruptions.
              </p>
            </section>

            <section className="pt-8 border-t border-brand-stroke">
              <p className="text-sm text-slate-400 font-bold text-center">
                Need help? Contact our legal team at legal@biolingo.com
              </p>
            </section>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
