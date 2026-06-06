/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Plus, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { JournalBook } from '../types';

interface JournalsViewProps {
  journals: JournalBook[];
  activeJournalId: string;
  onSelectJournal: (id: string) => void;
  onCreateJournal: (journal: Partial<JournalBook>) => void;
}

export const JournalsView: React.FC<JournalsViewProps> = ({
  journals,
  activeJournalId,
  onSelectJournal,
  onCreateJournal,
}) => {
  const { themeConfig } = useTheme();
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newVolume, setNewVolume] = useState('Volume I');
  const [newDesc, setNewDesc] = useState('');
  const [newColor, setNewColor] = useState('#121212');
  const [isLocked, setIsLocked] = useState(false);

  // Locked state unlocking simulation
  const [unlockId, setUnlockId] = useState<string | null>(null);
  const [passphrase, setPassphrase] = useState('');
  const [unlockError, setUnlockError] = useState(false);

  const colors = [
    { label: 'Obsidian', value: '#121212' },
    { label: 'Granite', value: '#44403c' },
    { label: 'Concrete', value: '#737373' },
    { label: 'Sand', value: '#a3a3a3' },
    { label: 'Linen', value: '#e5e5e5' },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      onCreateJournal({
        title: newTitle.trim(),
        volume: newVolume.trim() || 'Volume I',
        description: newDesc.trim() || 'A structured canvas for timeless entries.',
        coverColor: newColor,
        isLocked: isLocked,
        iconName: isLocked ? 'dark_mode' : 'spa',
      });
      setIsCreatorOpen(false);
      setNewTitle('');
      setNewVolume('Volume I');
      setNewDesc('');
      setNewColor('#121212');
      setIsLocked(false);
    }
  };

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase.trim() === 'whisper' || passphrase.trim() === 'secret') {
      if (unlockId) {
        onSelectJournal(unlockId);
      }
      setUnlockId(null);
      setPassphrase('');
      setUnlockError(false);
    } else {
      setUnlockError(true);
    }
  };

  return (
    <div className="w-full">
      {/* Header section with starting subtitle */}
      <header className="mb-12 flex justify-between items-end flex-wrap gap-6 border-b border-neutral-100 pb-8">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-2">INDEX SECTION 01</div>
          <h2 className="font-serif text-[40px] leading-tight text-[#121212] tracking-tighter" style={{ color: themeConfig.textColor ?? themeConfig.text }}>
            My Journals
          </h2>
          <p className="font-sans text-[13px] text-neutral-500 mt-1 uppercase tracking-wider">
            Select a bound structure to transcribe your thoughts. 
          </p>
        </div>
        <button 
          onClick={() => setIsCreatorOpen(true)}
          className="border border-black hover:bg-black hover:text-white px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-widest transition-colors duration-200"
          style={{ 
            borderColor: themeConfig.primary,
            color: themeConfig.text,
          }}
        >
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> <span>Bind New Journal</span>
          </div>
        </button>
      </header>

      {/* Bento-inspired Library Grid with Clean Minimalism borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
        
        {/* Create placeholder inside shelf */}
        <motion.div 
          whileHover={{ y: -3 }}
          onClick={() => setIsCreatorOpen(true)}
          className="group relative bg-[#F9F9F9] border border-dashed border-neutral-300 flex flex-col items-center justify-center p-8 min-h-[350px] cursor-pointer hover:border-black transition-colors"
        >
          <div className="w-12 h-12 border border-dashed border-neutral-400 flex items-center justify-center mb-4 group-hover:border-black transition-all">
            <Plus className="text-neutral-500 group-hover:text-black w-5 h-5 transition-colors" />
          </div>
          <h3 className="font-serif text-[18px] text-neutral-800 font-medium tracking-tight">Create Volume</h3>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 text-center mt-2">A blank canvas for your story</p>
          
          <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest font-bold text-neutral-300">
            [+] NEW
          </div>
        </motion.div>

        {/* Notebook Book List Render */}
        {journals.map((book) => {
          const isActive = activeJournalId === book.id;
          
          return (
            <motion.div 
              key={book.id}
              whileHover={{ y: -3 }}
              onClick={() => {
                if (book.isLocked && !isActive) {
                  setUnlockId(book.id);
                  setUnlockError(false);
                } else {
                  onSelectJournal(book.id);
                }
              }}
              className="relative overflow-hidden flex flex-col min-h-[350px] cursor-pointer transition-all border"
              style={{ 
                backgroundColor: themeConfig.card,
                borderColor: isActive ? themeConfig.text : themeConfig.border
              }}
            >
              {/* Journal Spine representation using thin, stark geometry */}
              <div 
                className="absolute inset-y-0 left-0 w-2.5 z-10"
                style={{ backgroundColor: book.coverColor }}
              ></div>

              {/* Cover Face Details */}
              <div className="relative flex-1 p-8 pl-10 flex flex-col justify-between">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    {/* Minimal category ID */}
                    <div className="text-[10px] font-mono uppercase text-neutral-400">
                      VOLUME // {book.volume.replace('Volume ', '')}
                    </div>

                    {isActive ? (
                      <span className="text-[9px] uppercase tracking-widest font-extrabold px-2 py-0.5 border border-black text-black">
                        Active
                      </span>
                    ) : (
                      <span className="text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 border border-neutral-200 text-neutral-400">
                        Select
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-serif text-2xl font-normal leading-tight tracking-tight mb-2" style={{ color: themeConfig.text }}>
                    {book.title}
                  </h3>
                  
                  <p className="text-[11px] uppercase tracking-widest font-semibold opacity-60 mb-4">
                    {book.isLocked ? '[Private Archive]' : `[${book.totalEntries} Sections]`}
                  </p>
                  
                  <p className="font-sans text-[12px] opacity-70 leading-relaxed mb-4">
                    {book.description}
                  </p>
                </div>

                {/* Progress bar or sample quote for reflection journals */}
                {book.chapterProgress ? (
                  <div className="w-full mt-4">
                    <div className="w-full h-[2px] bg-neutral-100">
                      <div className="h-full bg-black transition-all duration-300" style={{ width: `${book.chapterProgress}%`, backgroundColor: themeConfig.text }}></div>
                    </div>
                    <span className="text-[9px] opacity-50 mt-1.5 block uppercase tracking-widest font-mono font-bold">{book.chapterProgress}% TRANSCRIBED</span>
                  </div>
                ) : (
                  <div className="mt-4 border-l border-neutral-200 pl-3">
                    <p className="text-[11px] opacity-75 italic line-clamp-2" style={{ color: themeConfig.muted }}>
                      "{book.lastEntryText || 'No transcribed passages.'}"
                    </p>
                  </div>
                )}
              </div>

              {/* Spine Footer details action */}
              <div 
                className="p-4 pl-10 flex justify-between items-center border-t"
                style={{ borderColor: themeConfig.border, backgroundColor: '#FDFDFD' }}
              >
                <span className="text-[10px] uppercase tracking-widest font-semibold opacity-50" style={{ color: themeConfig.text }}>
                  {book.isLocked ? 'ENCRYPTED' : 'READING FLUID_'}
                </span>
                
                <span style={{ color: themeConfig.text }}>
                  {book.isLocked && !isActive ? (
                    <Lock className="w-3.5 h-3.5 text-neutral-400" />
                  ) : (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  )}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Unlock Dialog Box overlay */}
      <AnimatePresence>
        {unlockId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            onClick={() => setUnlockId(null)}
          >
            <motion.div 
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="w-full max-w-[400px] p-8 text-center bg-white border border-neutral-300"
              style={{ backgroundColor: themeConfig.paperBg, color: themeConfig.text }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-10 border border-neutral-200 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-4 h-4 text-neutral-600" />
              </div>
              <h3 className="font-serif text-xl mb-2">Decrypt Volume</h3>
              <p className="text-[12px] opacity-75 mb-6 uppercase tracking-wider">Provide authority credentials to lift security seal.</p>
              
              <form onSubmit={handleUnlockSubmit} className="space-y-5">
                <div>
                  <input 
                    type="password" 
                    id="phrase"
                    autoFocus
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    placeholder="Enter 'whisper' or 'secret'..."
                    className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b border-neutral-300 py-2 focus:ring-0 focus:border-black text-center text-sm outline-none font-sans"
                  />
                  {unlockError && (
                    <p className="text-red-600 text-[10px] uppercase tracking-widest mt-2 font-bold">INCORRECT DECRYPTION PHRASE.</p>
                  )}
                </div>

                <div className="flex gap-3 justify-center pt-4">
                  <button 
                    type="button"
                    onClick={() => setUnlockId(null)}
                    className="px-4 py-2 border border-neutral-200 text-neutral-500 text-xs font-bold uppercase tracking-widest bg-white"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest"
                  >
                    Break Seal
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start New Journal Maker Dialog */}
      <AnimatePresence>
        {isCreatorOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            onClick={() => setIsCreatorOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="w-full max-w-[460px] p-8 border border-neutral-300"
              style={{ backgroundColor: themeConfig.paperBg, color: themeConfig.text }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-2xl mb-2">Bind New Companion</h3>
              <p className="text-[12px] opacity-60 uppercase tracking-widest mb-6">Allocate cover color and specify system attributes.</p>
              
              <form onSubmit={handleCreate} className="space-y-5">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 block mb-1.5" htmlFor="book-title">Journal Title</label>
                  <input 
                    type="text" 
                    id="book-title"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Architectures of Silence"
                    className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b border-neutral-200 py-2 focus:border-black focus:ring-0 text-sm font-sans outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 block mb-1.5" htmlFor="book-volume">Volume / Index</label>
                  <input 
                    type="text" 
                    id="book-volume"
                    value={newVolume}
                    onChange={(e) => setNewVolume(e.target.value)}
                    placeholder="e.g. Volume II"
                    className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b border-neutral-200 py-2 focus:border-black focus:ring-0 text-sm font-sans outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 block mb-1.5" htmlFor="book-desc">Description</label>
                  <input 
                    type="text" 
                    id="book-desc"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Describe this book's calling..."
                    className="w-full bg-transparent border-t-0 border-l-0 border-r-0 border-b border-neutral-200 py-2 focus:border-black focus:ring-0 text-sm font-sans outline-none"
                  />
                </div>

                {/* Color swatch picker */}
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 block mb-2">Spine Garment Tone</span>
                  <div className="flex gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setNewColor(c.value)}
                        className={`w-8 h-8 relative border ${newColor === c.value ? 'border-black scale-105' : 'border-neutral-200'} transition-transform active:scale-90`}
                        style={{ backgroundColor: c.value }}
                      >
                        {newColor === c.value && (
                          <span className="absolute inset-0 flex items-center justify-center text-white text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Secure Lock Toggle */}
                <div className="flex items-center justify-between p-3.5 border border-neutral-100 bg-neutral-50">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-neutral-600" />
                    <div className="text-left">
                      <span className="text-xs font-bold block leading-none uppercase tracking-wider">Passphrase Lock</span>
                      <span className="text-[9px] opacity-60 block mt-1 uppercase tracking-widest">Protects content behind login gate.</span>
                    </div>
                  </div>
                  <input 
                    type="checkbox"
                    checked={isLocked}
                    onChange={(e) => setIsLocked(e.target.checked)}
                    className="border-neutral-300 text-black focus:ring-black rounded-none"
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsCreatorOpen(false)}
                    className="px-4 py-2 border border-neutral-200 text-neutral-500 text-xs font-bold uppercase tracking-widest bg-white"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest"
                  >
                    Bind Journal
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default JournalsView;
