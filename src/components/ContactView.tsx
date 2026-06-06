/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Landmark, Compass, Send, Check } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const ContactView: React.FC = () => {
  const { themeConfig } = useTheme();
  
  // Form input state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('01'); // Option dropdown selection
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('All message parameters required.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      showToast('Message sealed and dispatched.');
      
      // Reset after a brief space
      setTimeout(() => {
        setIsSent(false);
        setName('');
        setEmail('');
        setMessage('');
        setSubject('01');
      }, 1800);
    }, 1200);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto py-4">
      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 15, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="fixed bottom-24 md:bottom-10 left-1/2 bg-black text-[#FFFFFF] px-6 py-3 border border-neutral-800 font-sans text-[11px] uppercase tracking-widest z-50 text-center font-bold"
          >
            [!] {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header section */}
      <header className="mb-12 border-b border-neutral-100 pb-8 text-left">
        <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-2">METRIC REFLECTION 02</div>
        <h2 className="font-serif text-[40px] leading-tight text-[#121212] tracking-tighter" style={{ color: themeConfig.text }}>
          Establish Contact
        </h2>
        <p className="font-sans text-[13px] text-neutral-500 mt-1 uppercase tracking-wider">
          Establish technical communication pathways with our curators.
        </p>
      </header>

      {/* Main Grid content layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Coordinates */}
        <section 
          className="md:col-span-4 p-8 border flex flex-col justify-between min-h-[350px]"
          style={{ backgroundColor: `${themeConfig.border}15`, borderColor: themeConfig.border, color: themeConfig.text }}
        >
          <div>
            <div className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 mb-6">// COORDINATES</div>
            
            <div className="space-y-6">
              <div className="flex gap-3 items-start">
                <Mail className="w-4 h-4 mt-0.5 text-neutral-500" />
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Electronic Mail</h4>
                  <p className="text-[12px] font-mono mt-1">curators@scribblesoul.io</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Landmark className="w-4 h-4 mt-0.5 text-neutral-500" />
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Physical Registry</h4>
                  <p className="text-[12px] opacity-80 mt-1 leading-relaxed">
                    Module 4A, Travertine Grid Road<br />
                    Bologna, Italy
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Compass className="w-4 h-4 mt-0.5 text-neutral-500" />
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Operational Hours</h4>
                  <p className="text-[12px] opacity-80 mt-1 leading-relaxed">
                    08:00 AM – 04:00 PM UTC
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[9px] font-mono opacity-30 mt-6 md:mt-0">SECURE SIGNAL DOCKET</div>
        </section>

        {/* Dispatch Form Component with high-contrast text inputs */}
        <section 
          className="md:col-span-8 p-8 border relative overflow-hidden"
          style={{ backgroundColor: themeConfig.card, borderColor: themeConfig.border, color: themeConfig.text }}
        >
          {/* Delicate architectural corner markers */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-neutral-300"></div>
          <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-neutral-300"></div>
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-neutral-300"></div>
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-neutral-300"></div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label htmlFor="contact-name" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-1.5">Identification / Name</label>
              <input 
                id="contact-name"
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elena Moretti"
                className="w-full bg-transparent border-0 border-b py-2 focus:border-black focus:ring-0 text-sm font-sans outline-none transition-colors"
                style={{ borderColor: themeConfig.border, color: themeConfig.textColor ?? themeConfig.text }}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-1.5">Registry Email Address</label>
              <input 
                id="contact-email"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@letter.com"
                className="w-full bg-transparent border-0 border-b py-2 focus:border-black focus:ring-0 text-sm font-sans outline-none transition-colors"
                style={{ borderColor: themeConfig.border, color: themeConfig.textColor ?? themeConfig.text }}
              />
            </div>

            <div>
              <label htmlFor="contact-subject" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-1.5">Inquiry Classification</label>
              <select 
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b py-2 focus:border-black focus:ring-0 text-sm font-sans outline-none transition-colors"
                style={{ borderColor: themeConfig.border, color: themeConfig.textColor ?? themeConfig.text }}
              >
                <option value="01" className="bg-white text-black">01 // Architectural Styling Support</option>
                <option value="02" className="bg-white text-black">02 // Encryption & Authority Seals</option>
                <option value="03" className="bg-white text-black">03 // Library Portfolio Exportation</option>
                <option value="04" className="bg-white text-black">04 // General Philosophical Discourse</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-1.5">Dispatch Message</label>
              <textarea 
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Transcribe your feedback or inquiry..."
                className="w-full bg-transparent border-0 border-b py-2 focus:border-black focus:ring-0 text-sm font-sans outline-none transition-colors resize-none"
                style={{ borderColor: themeConfig.border, color: themeConfig.textColor ?? themeConfig.text }}
              />
            </div>

            <button 
              type="submit"
              disabled={isSending}
              className="w-full py-3 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-250 cursor-pointer"
              style={{ backgroundColor: themeConfig.text, color: themeConfig.bg }}
            >
              <div className="flex items-center justify-center gap-2">
                {isSending ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent animate-spin"></div>
                    <span>SEALING DISPATCH...</span>
                  </>
                ) : isSent ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>DISPATCH SENT!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>EMIT DISPATCH</span>
                  </>
                )}
              </div>
            </button>
          </form>
        </section>

      </div>
    </div>
  );
};
export default ContactView;
