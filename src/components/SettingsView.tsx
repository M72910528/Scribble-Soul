/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Edit, Bell, CheckCircle, Trash2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { UserProfile, JournalEntry } from '../types';

interface SettingsViewProps {
  profile: UserProfile;
  entries: JournalEntry[];
  onUpdateProfile: (profile: Partial<UserProfile>) => void;
  onClearArchive: () => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150', // Elena Moretti
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150', // Luca
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150', // Jane
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150', // Alex
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150', // Chloe
];

export const SettingsView: React.FC<SettingsViewProps> = ({
  profile,
  entries,
  onUpdateProfile,
  onClearArchive,
}) => {
  const { theme, setTheme, themeConfig } = useTheme();
  
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [avatar, setAvatar] = useState(profile.avatarUrl);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [isClearingCheck, setIsClearingCheck] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveProfile = () => {
    onUpdateProfile({
      name: name.trim(),
      bio: bio.trim(),
      avatarUrl: avatar,
    });
    showToast('Profile identifier updated.');
  };

  const handleToggleReminder = () => {
    onUpdateProfile({
      reminderEnabled: !profile.reminderEnabled
    });
    showToast(!profile.reminderEnabled ? 'Whisper reminders enabled.' : 'Whisper reminders disabled.');
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      showToast('Popup blocker prevented action.');
      return;
    }

    const entriesHTML = entries.map(entry => `
      <div style="margin-bottom: 2.5rem; page-break-inside: avoid; border-bottom: 1px solid #e1e1e1; padding-bottom: 2rem;">
        <div style="font-family: 'Inter', sans-serif; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: #767676; margin-bottom: 0.4rem;">
          ${entry.date} at ${entry.time} &bull; MOOD: ${entry.mood.toUpperCase()}
        </div>
        <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 1.8rem; color: #121212; margin-bottom: 0.8rem; font-weight: normal; tracking-tight">
          ${entry.title}
        </h2>
        <div style="font-family: 'Inter', sans-serif; font-size: 0.95rem; color: #121212; line-height: 1.7; white-space: pre-wrap;">
          ${entry.content}
        </div>
      </div>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${profile.name || 'My'} Archive</title>
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
          <style>
            body {
              background-color: #ffffff;
              color: #121212;
              padding: 4rem;
              max-width: 750px;
              margin: 0 auto;
              font-family: 'Plus Jakarta Sans', sans-serif;
            }
            header {
              text-align: left;
              margin-bottom: 5rem;
              border-b: 1px solid #121212;
              padding-bottom: 2.5rem;
            }
            h1 {
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 2.8rem;
              color: #121212;
              margin: 0 0 0.5rem 0;
              font-weight: normal;
            }
            .bio {
              font-size: 0.85rem;
              text-transform: uppercase;
              letter-spacing: 0.2em;
              color: #767676;
            }
          </style>
        </head>
        <body>
          <header>
            <h1>Scribble & Soul</h1>
            <div class="bio">TRANSCRIPT ARCHIVE OF ${profile.name.toUpperCase()}</div>
            <p style="font-size: 0.75rem; opacity: 0.6; margin-top: 1rem; letter-spacing: 0.1em;">EXPORTED ON ${new Date().toLocaleDateString()}</p>
          </header>
          <main>
            ${entriesHTML}
          </main>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const confirmClearArchive = () => {
    onClearArchive();
    setIsClearingCheck(false);
    showToast('Memory database cells dissolved to zero.');
  };

  return (
    <div className="w-full">
      {/* Toast Notification - minimal absolute flat capsule */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 15, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 10, x: '-50%' }}
            className="fixed bottom-24 md:bottom-10 left-1/2 bg-black text-[#FFFFFF] px-6 py-3 border border-neutral-800 font-sans text-[11px] uppercase tracking-widest z-50 text-center font-bold"
          >
            [!] {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header section with starting subtitle */}
      <header className="mb-12 border-b border-neutral-100 pb-8">
        <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-2">INDEX SECTION 03</div>
        <h2 className="font-serif text-[40px] leading-tight text-[#121212] tracking-tighter" style={{ color: themeConfig.textColor ?? themeConfig.text }}>
          System Configuration
        </h2>
        <p className="font-sans text-[13px] text-neutral-500 mt-1 uppercase tracking-wider">
          Establish system settings and customize structural aesthetics.
        </p>
      </header>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Profile Card */}
        <section 
          className="md:col-span-8 p-8 relative overflow-hidden border flex flex-col justify-between"
          style={{ backgroundColor: themeConfig.card, borderColor: themeConfig.border, color: themeConfig.text }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <div className="relative">
              <img 
                alt="Profile Avatar" 
                src={avatar} 
                className="w-24 h-24 object-cover border border-neutral-200 image-transition"
              />
              <button 
                onClick={() => setIsAvatarPickerOpen(true)}
                className="absolute -bottom-1.5 -right-1.5 bg-black p-2 text-white border border-neutral-800 hover:bg-neutral-800 active:scale-95 transition-all outline-none"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="flex-grow text-center sm:text-left">
              <h3 className="font-serif text-2xl font-normal tracking-tight leading-tight mb-2">{profile.name}</h3>
              <p className="text-[11px] uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1 text-neutral-400 font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-neutral-500" /> Identity: {profile.email}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-1.5">Identifier / Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleSaveProfile}
                className="w-full bg-transparent border-0 border-b py-2 focus:border-black focus:ring-0 text-sm font-sans transition-all outline-none"
                style={{ borderColor: themeConfig.border, color: themeConfig.text }}
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block mb-1.5">Transcription Purpose</label>
              <input 
                type="text" 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                onBlur={handleSaveProfile}
                placeholder="Why do you write?"
                className="w-full bg-transparent border-0 border-b py-2 focus:border-black focus:ring-0 text-sm font-sans transition-all outline-none"
                style={{ borderColor: themeConfig.border, color: themeConfig.text }}
              />
            </div>
          </div>
        </section>

        {/* Reminders widget */}
        <section 
          className="md:col-span-4 p-8 border flex flex-col justify-between min-h-[260px]"
          style={{ 
            backgroundColor: `${themeConfig.border}15`, 
            borderColor: themeConfig.border, 
            color: themeConfig.text 
          }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <Bell className="w-4 h-4 text-neutral-600" />
              <span className="text-[9px] uppercase tracking-widest border border-neutral-300 px-2 py-0.5 font-bold" style={{ borderColor: themeConfig.text }}>
                SCHEDULER
              </span>
            </div>
            <h4 className="font-serif text-lg leading-tight mb-2">Chronicle Reminder</h4>
            <p className="font-sans text-[12px] opacity-80 leading-relaxed mb-6">
              Establish a daily checkpoint mechanism to catalog reflections before the day expires.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-60">DAILY AT {profile.reminderTime}</span>
            <button 
              onClick={handleToggleReminder}
              className={`w-12 h-6 p-0.5 border transition-colors outline-none cursor-pointer ${profile.reminderEnabled ? 'bg-black border-black text-white' : 'bg-transparent border-neutral-300'}`}
            >
              <div 
                className={`w-4.5 h-4.5 transition-all duration-200 ${profile.reminderEnabled ? 'translate-x-6 bg-white' : 'translate-x-[1px] bg-neutral-400'}`} 
              />
            </button>
          </div>
        </section>

        {/* Appearance presets */}
        <section 
          className="md:col-span-12 p-8 border"
          style={{ backgroundColor: themeConfig.card, borderColor: themeConfig.border, color: themeConfig.text }}
        >
          <h3 className="font-serif text-2xl font-normal tracking-tight mb-6">Structural Theme Skins</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* parchment */}
            <div 
              onClick={() => setTheme('parchment')}
              className={`group cursor-pointer border p-2 transition-all ${theme === 'parchment' ? 'border-black' : 'border-neutral-200'}`}
            >
              <div className="aspect-video bg-[#ffffff] border border-neutral-100 mb-3 relative flex flex-col justify-end p-4 shadow-none">
                <div className="space-y-2">
                  <div className="h-[2px] bg-[#121212] w-full opacity-10"></div>
                  <div className="h-[2px] bg-[#121212] w-3/4 opacity-10"></div>
                  <div className="h-[2px] bg-[#121212] w-1/2"></div>
                </div>
                {theme === 'parchment' && (
                  <div className="absolute top-3 right-3 text-[9px] uppercase tracking-widest font-bold border border-black px-2 py-0.5 bg-white">SELECTED</div>
                )}
              </div>
              <p className="text-[11px] uppercase tracking-widest text-center font-bold">01 // Architectural White</p>
            </div>

            {/* midnight */}
            <div 
              onClick={() => setTheme('midnight')}
              className={`group cursor-pointer border p-2 transition-all ${theme === 'midnight' ? 'border-black' : 'border-neutral-200'}`}
            >
              <div className="aspect-video bg-[#0a0a0a] border border-[#262626] mb-3 relative flex flex-col justify-end p-4 shadow-none">
                <div className="space-y-2">
                  <div className="h-[2px] bg-[#f5f5f5] w-full opacity-15"></div>
                  <div className="h-[2px] bg-[#f5f5f5] w-3/4 opacity-15"></div>
                  <div className="h-[2px] bg-[#f5f5f5] w-1/2"></div>
                </div>
                {theme === 'midnight' && (
                  <div className="absolute top-3 right-3 text-[9px] uppercase tracking-widest font-bold border border-white px-2 py-0.5 bg-black text-white">SELECTED</div>
                )}
              </div>
              <p className="text-[11px] uppercase tracking-widest text-center font-bold">02 // Absolute Obsidian</p>
            </div>

            {/* rose */}
            <div 
              onClick={() => setTheme('rose')}
              className={`group cursor-pointer border p-2 transition-all ${theme === 'rose' ? 'border-black' : 'border-neutral-200'}`}
            >
              <div className="aspect-video bg-[#fafaf9] border border-[#e7e5e4] mb-3 relative flex flex-col justify-end p-4 shadow-none">
                <div className="space-y-2">
                  <div className="h-[2px] bg-[#1c1917] w-full opacity-10"></div>
                  <div className="h-[2px] bg-[#1c1917] w-3/4 opacity-10"></div>
                  <div className="h-[2px] bg-[#8a7a6e] w-1/2"></div>
                </div>
                {theme === 'rose' && (
                  <div className="absolute top-3 right-3 text-[9px] uppercase tracking-widest font-bold border border-black px-2 py-0.5 bg-white">SELECTED</div>
                )}
              </div>
              <p className="text-[11px] uppercase tracking-widest text-center font-bold">03 // Travertine Linen</p>
            </div>

          </div>
        </section>

        {/* Memory Archive actions */}
        <section 
          className="md:col-span-12 p-8 border border-dashed flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          style={{ backgroundColor: `${themeConfig.border}08`, borderColor: themeConfig.border }}
        >
          <div>
            <h3 className="font-serif text-2xl font-normal mb-2">Primary Export</h3>
            <p className="font-sans text-[13px] opacity-80 max-w-xl">
              Portability is core to durability. Render your combined transcription history as an architectural index sheets PDF document, cleanly structured and index-referenced.
            </p>
          </div>
          <button 
            onClick={handleExportPDF}
            className="px-6 py-3 border border-black hover:bg-black hover:text-white font-sans text-xs font-bold uppercase tracking-widest transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" /> <span>Export Portfolio</span>
            </div>
          </button>
        </section>

        {/* Danger zone close and clear */}
        <section className="md:col-span-12 border-t pt-8 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ borderColor: themeConfig.border }}>
          <p className="text-[10px] uppercase tracking-widest opacity-50">MANAGE CORE DATABASE CELLS AND UNLEASH MEMORY SPACE</p>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsClearingCheck(true)}
              className="text-red-600 hover:text-red-700 font-sans text-xs font-bold uppercase tracking-widest underline decoration-1 underline-offset-4"
            >
              Exterminate Memory Registers
            </button>
          </div>
        </section>
      </div>

      {/* Avatar Selection Dialog */}
      <AnimatePresence>
        {isAvatarPickerOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            onClick={() => setIsAvatarPickerOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="w-full max-w-[400px] p-8 text-center bg-white border border-neutral-300"
              style={{ backgroundColor: themeConfig.paperBg, color: themeConfig.text }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-xl font-normal mb-2">Configure Silhouette</h3>
              <p className="text-[11px] uppercase tracking-wider opacity-60 mb-6">Select a profile register identifier portrait.</p>
              
              <div className="grid grid-cols-5 gap-3 justify-center mb-8">
                {PRESET_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAvatar(url);
                      setIsAvatarPickerOpen(false);
                      onUpdateProfile({ avatarUrl: url });
                      showToast('Silhouette updated.');
                    }}
                    className={`aspect-square overflow-hidden border relative ${avatar === url ? 'border-black scale-105' : 'border-neutral-200'} transition-transform active:scale-95`}
                  >
                    <img src={url} alt="avatar option" className="w-full h-full object-cover image-transition" />
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setIsAvatarPickerOpen(false)}
                className="px-5 py-2 border border-neutral-200 text-neutral-500 text-xs font-bold uppercase tracking-widest bg-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exterminate Confirmation Dialog */}
      <AnimatePresence>
        {isClearingCheck && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            onClick={() => setIsClearingCheck(false)}
          >
            <motion.div 
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="w-full max-w-[400px] p-8 text-center bg-white border border-neutral-300"
              style={{ backgroundColor: themeConfig.paperBg, color: themeConfig.text }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-10 border border-red-200 flex items-center justify-center mx-auto mb-4 bg-red-50">
                <Trash2 className="w-4 h-4 text-red-600" />
              </div>
              <h3 className="font-serif text-xl font-normal mb-2 text-red-600">Purge Complete Dataset</h3>
              <p className="text-[12px] opacity-80 mb-6 uppercase tracking-wider text-neutral-500">This action dissolves all journals, entries, and indexes into basic null records.</p>
              
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setIsClearingCheck(false)}
                  className="px-4 py-2 border border-neutral-200 text-neutral-500 text-xs font-bold uppercase tracking-widest bg-white"
                >
                  Regain Control
                </button>
                <button 
                  onClick={confirmClearArchive}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest"
                >
                  Dissolve Registry
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default SettingsView;
