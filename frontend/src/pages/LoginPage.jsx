import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

export const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen w-full flex flex-col md:flex-row bg-cafe-bg overflow-hidden"
    >
      {/* Left decorative panel (hidden on mobile, 40% width on desktop) */}
      <div className="hidden md:flex md:w-[40%] bg-cafe-surface border-r border-cafe-border flex-col justify-between p-12 relative overflow-hidden select-none">
        {/* Subtle background glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-cafe-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cafe-accent/5 blur-[120px]" />

        {/* Top brand mark */}
        <div className="flex items-center gap-2">
          <Coffee className="h-8 w-8 text-cafe-accent" />
          <span className="font-display font-bold text-xl text-cafe-text-primary">Odoo Cafe POS</span>
        </div>

        {/* Big centered typography */}
        <div className="my-auto space-y-6 z-10">
          <div className="inline-block transform -rotate-2 bg-cafe-accent text-cafe-bg px-5 py-2 font-display font-bold text-4xl lg:text-5xl rounded-lg shadow-accent">
            Odoo Cafe
          </div>
          <p className="font-sans font-normal text-base lg:text-lg text-cafe-text-secondary leading-relaxed max-w-sm">
            Every order, handled with precision. Fast, reliable, and tailored for our daily kitchen rush.
          </p>
        </div>

        {/* Bottom floating badges */}
        <div className="flex flex-wrap gap-2.5 z-10">
          {['15 Tables', 'Real-time Kitchen', 'Smart Receipts'].map((badge) => (
            <span
              key={badge}
              className="px-3.5 py-1.5 bg-cafe-surface-raised border border-cafe-border text-cafe-text-primary font-sans font-medium text-xs rounded-full shadow-card"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Right form panel (60% width on desktop, full-width on mobile) */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* Mobile radial glow */}
        <div className="absolute top-0 left-0 w-full h-full md:hidden bg-[radial-gradient(ellipse_at_top_left,rgba(245,166,35,0.06),transparent_50%)] pointer-events-none" />

        <div className="w-full max-w-md bg-cafe-surface border border-cafe-border rounded-2xl p-8 shadow-elevated z-10">
          {/* Header */}
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <Coffee className="h-8 w-8 text-cafe-accent" />
            <h1 className="font-display font-bold text-2xl text-cafe-text-primary">Odoo Cafe POS</h1>
          </div>

          {/* Form Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-cafe-surface-raised p-1 rounded-lg mb-6 border border-cafe-border/50">
              <TabsTrigger
                value="login"
                className={`font-display font-semibold text-sm rounded-md py-2 transition-all ${
                  activeTab === 'login'
                    ? 'bg-cafe-accent text-cafe-bg shadow-sm'
                    : 'text-cafe-text-secondary hover:text-cafe-text-primary'
                }`}
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className={`font-display font-semibold text-sm rounded-md py-2 transition-all ${
                  activeTab === 'signup'
                    ? 'bg-cafe-accent text-cafe-bg shadow-sm'
                    : 'text-cafe-text-secondary hover:text-cafe-text-primary'
                }`}
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="focus-visible:outline-none">
              <LoginForm />
            </TabsContent>

            <TabsContent value="signup" className="focus-visible:outline-none">
              <SignupForm onSuccess={() => setActiveTab('login')} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
};
export default LoginPage;
