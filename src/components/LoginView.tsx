/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLogin: (name: string, email: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [name, setName] = useState('Elena Moretti');
  const [email, setEmail] = useState('elena.m@gmail.com');
  const [passphrase, setPassphrase] = useState('');
  const [isSignMode, setIsSignMode] = useState(false); // Sign up vs login toggle

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && name.trim()) {
      onLogin(name, email);
    }
  };

  const handleGoogleSignIn = () => {
    onLogin(name || 'Elena Moretti', 'elena.m@gmail.com');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#FFFFFF] text-[#121212] relative font-sans">
      {/* Structural architecture grid background lines */}
      <div className="absolute inset-0 pointer-events-none z-0 border-[24px] border-neutral-50 flex items-center justify-center">
        <div className="absolute top-0 bottom-0 left-[25%] w-[1px] bg-neutral-100"></div>
        <div className="absolute top-0 bottom-0 left-[75%] w-[1px] bg-neutral-100"></div>
        <div className="absolute left-0 right-0 top-[25%] h-[1px] bg-neutral-100"></div>
        <div className="absolute left-0 right-0 top-[75%] h-[1px] bg-neutral-100"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-[420px] w-full flex flex-col items-center relative z-10"
      >
        {/* Brand Identity */}
        <div className="mb-8 text-center w-full">
          <div className="text-[11px] uppercase tracking-[0.3em] font-bold text-neutral-400 mb-3">SYSTEM & CHRONICLE</div>
          
          <h1 className="font-serif text-[42px] leading-tight text-[#1A1A1A] tracking-tighter font-normal italic">
            Scribble & Soul
          </h1>
          <p className="font-sans text-[12px] uppercase tracking-widest text-neutral-500 mt-2">
            Form follows reflection.
          </p>
        </div>

        {/* Minimalist Card Container */}
        <div className="w-full bg-[#FFFFFF] border border-neutral-200 p-8 md:p-10 relative">
          {/* Abstract small corner ticks */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-neutral-300"></div>
          <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-neutral-300"></div>
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-neutral-300"></div>
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-neutral-300"></div>

          <div className="relative z-10">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[#121212] font-semibold mb-6 text-center">
              {isSignMode ? '01 // Initialize Archive' : '01 // Authorize Identity'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignMode && (
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-1.5" htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Elena Moretti"
                    className="w-full bg-transparent border-0 border-b border-neutral-200 py-2 focus:border-black focus:ring-0 transition-colors text-sm font-sans outline-none"
                  />
                </div>
              )}
              
              <div>
                <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-1.5" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@letter.com"
                  className="w-full bg-transparent border-0 border-b border-neutral-200 py-2 focus:border-black focus:ring-0 transition-colors text-sm font-sans outline-none"
                />
              </div>

              {!isSignMode && (
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-1.5" htmlFor="password">Passphrase</label>
                  <input 
                    type="password" 
                    id="password" 
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent border-0 border-b border-neutral-200 py-2 focus:border-black focus:ring-0 transition-colors text-sm font-sans outline-none"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="border-neutral-300 text-black focus:ring-black rounded-none" />
                  <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium select-none">Remember</span>
                </label>
                <span className="text-[11px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors cursor-pointer font-medium">
                  Forgotten?
                </span>
              </div>

              <button 
                type="submit"
                className="w-full mt-4 py-3 bg-[#121212] hover:bg-neutral-800 text-white font-sans text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200 focus:outline-none"
              >
                {isSignMode ? 'Sealed & Created' : 'Open Vault'}
              </button>
            </form>

            <div className="relative my-6 flex items-center">
              <div className="w-full border-t border-neutral-100"></div>
              <span className="absolute bg-[#FFFFFF] px-3 left-1/2 transform -translate-x-1/2 text-[10px] uppercase tracking-widest text-neutral-400 font-semibold whitespace-nowrap">
                or authenticate with
              </span>
            </div>

            <button 
              onClick={handleGoogleSignIn}
              className="w-full py-3 flex items-center justify-center space-x-2.5 bg-[#FFFFFF] border border-neutral-200 text-xs font-bold uppercase tracking-[0.15em] text-[#121212] hover:bg-neutral-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#121212"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#121212"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#121212"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#121212"></path>
              </svg>
              <span>Identity Sync</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <p className="mt-6 text-xs text-neutral-500 uppercase tracking-widest font-medium">
          {isSignMode ? 'Ready? ' : 'First time here? '}
          <span 
            onClick={() => setIsSignMode(!isSignMode)} 
            className="text-black font-bold cursor-pointer hover:underline underline-offset-4 decoration-1 decoration-neutral-400 ml-1"
          >
            {isSignMode ? 'Sign In // Back' : 'Create Entry // Start'}
          </span>
        </p>

        <div className="mt-12 flex space-x-6 text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">
          <span className="hover:text-black transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-black transition-colors cursor-pointer">Terms of Use</span>
          <span className="hover:text-black transition-colors cursor-pointer font-bold">Studio Studio_</span>
        </div>
      </motion.div>
    </div>
  );
};
export default LoginView;
