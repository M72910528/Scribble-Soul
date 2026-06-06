/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MoveRight, Check, Eye } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { JournalEntry, MoodType, JournalBook } from '../types';
import { MOODS, INSPIRATIONS, DAILY_PROMPTS } from '../data';

interface TodayViewProps {
  userName: string;
  activeJournal: JournalBook;
  onSaveEntry: (entry: Partial<JournalEntry>) => void;
  initialEditEntry?: JournalEntry | null;
  onDoneEditing?: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({ 
  userName, 
  activeJournal, 
  onSaveEntry,
  initialEditEntry = null,
  onDoneEditing
}) => {
  const { themeConfig } = useTheme();
  
  // Local active entry state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType>('quiet');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Inspiration and prompt of the day
  const [inspiration, setInspiration] = useState({ quote: '', author: '' });
  const [dailyPrompt, setDailyPrompt] = useState('');
  
  // Reference for textarea to handle auto-resize
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize editing or new entry
  useEffect(() => {
    if (initialEditEntry) {
      setTitle(initialEditEntry.title);
      setContent(initialEditEntry.content);
      setSelectedMood(initialEditEntry.mood);
      setIsSaved(false);
    } else {
      setTitle('');
      setContent('');
      setSelectedMood('quiet');
      setIsSaved(false);
    }
  }, [initialEditEntry]);

  // Load random prompt and quote
  useEffect(() => {
    const randomQuote = INSPIRATIONS[Math.floor(Math.random() * INSPIRATIONS.length)];
    setInspiration(randomQuote);
    
    // Choose prompt based on current date
    const pIndex = new Date().getDate() % DAILY_PROMPTS.length;
    setDailyPrompt(DAILY_PROMPTS[pIndex]);
  }, []);

  // Format today's date
  const getTodayDateString = () => {
    if (initialEditEntry) {
      return initialEditEntry.date;
    }
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const handleSave = () => {
    if (!content.trim()) {
      showToast('Empty passage content detected.');
      return;
    }

    setIsSaving(true);
    
    // Simulate beautiful save timing
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      
      const cleanTitle = title.trim() || (content.trim().split('\n')[0].substring(0, 30) + '...');
      const dateStr = initialEditEntry ? initialEditEntry.date : getTodayDateString();
      const timeStr = initialEditEntry ? initialEditEntry.time : new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      onSaveEntry({
        id: initialEditEntry?.id,
        journalId: activeJournal.id,
        title: cleanTitle,
        content: content,
        mood: selectedMood,
        date: dateStr,
        time: timeStr,
      });

      showToast(initialEditEntry ? 'Passage updated in registry.' : 'Moment captured successfully.');

      // Clear editor state if creating a new entry
      if (!initialEditEntry) {
        setTitle('');
        setContent('');
        setSelectedMood('quiet');
        setTimeout(() => setIsSaved(false), 2000);
      } else {
        if (onDoneEditing) {
          setTimeout(() => {
            onDoneEditing();
          }, 1500);
        }
      }
    }, 1200);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const usePromptInDiary = () => {
    const promptHeader = `\n\n[PROMPT REFERENCE: ${dailyPrompt}]\n`;
    setContent((prev) => prev.trim() + promptHeader);
    showToast('Prompt woven into draft.');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Adjust content height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Toast Notification */}
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

      {/* Main Journal Letter Shell */}
      <section 
        className="relative w-full max-w-[800px] p-8 md:p-14 overflow-hidden mb-8 transition-colors duration-300 border"
        style={{ 
          backgroundColor: themeConfig.card,
          borderColor: themeConfig.border,
          color: themeConfig.text
        }}
      >
        {/* Stationery Decorative Accents */}
        <div className="absolute top-6 left-6 flex items-center gap-3 opacity-60">
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: themeConfig.textColor }}>
            RECORDING // {getTodayDateString().toUpperCase()}
          </span>
          <span className="text-[10px] opacity-40">•</span>
          <span className="text-[10px] uppercase tracking-widest font-bold border border-neutral-200 px-2 py-0.5">
            {activeJournal.title}
          </span>
        </div>

        {/* Diagonal Washi Tape replacement index */}
        <div className="absolute top-6 right-6 text-[10px] font-mono uppercase text-neutral-300">
          TERMINAL_S.04
        </div>

        {/* Mood Tracker Header */}
        <div className="mt-12 mb-12 flex flex-col items-center border-b border-neutral-100 pb-8">
          <p className="text-xs uppercase tracking-widest font-semibold mb-6 text-neutral-400">
            Select Active Sentiment Register
          </p>
          
          <div className="grid grid-cols-5 gap-3 w-full max-w-[500px]">
            {(Object.keys(MOODS) as MoodType[]).map((key) => {
              const active = selectedMood === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedMood(key)}
                  className={`py-3 flex flex-col items-center justify-center border transition-all ${
                    active ? 'border-black bg-neutral-900 text-white' : 'border-neutral-200 bg-transparent text-neutral-600 hover:border-neutral-400'
                  }`}
                  style={{
                    borderColor: active ? themeConfig.text : undefined,
                    backgroundColor: active ? themeConfig.text : undefined,
                    color: active ? themeConfig.bg : undefined,
                  }}
                >
                  <span className="text-xl mb-1.5">{MOODS[key].icon}</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold font-sans">
                    {MOODS[key].label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Letter Page Ruled Paper Sheet */}
        <div className="relative pt-4">
          <div className="font-serif text-[22px] font-normal italic mb-6">Dear Diary,</div>
          
          <input 
            type="text" 
            placeholder="Give this moment a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent border-0 border-b py-2 mb-4 focus:ring-0 font-serif text-2xl font-normal placeholder:opacity-30 outline-none"
            style={{ 
              borderColor: themeConfig.border,
              color: themeConfig.text
            }}
          />

          <textarea 
            ref={textareaRef}
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Let the words flow from your heart..."
            className="w-full bg-transparent border-0 focus:ring-0 resize-none p-0 overflow-hidden font-sans text-[15px] leading-[2.1rem] min-h-[350px] placeholder:opacity-30 outline-none"
            style={{ 
              color: themeConfig.text,
              backgroundImage: `linear-gradient(${themeConfig.border} 1px, transparent 1px)`,
              backgroundSize: '100% 2.1rem',
              lineHeight: '2.1rem',
            }}
          />
        </div>

        {/* Signature & Wax Seal */}
        <div className="flex justify-between items-end mt-12 pt-8 border-t border-neutral-100">
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest text-[#767676] mb-1">Authenticated by</p>
            <p className="font-serif text-xl font-normal italic">{userName || 'The Writer'}</p>
          </div>

          {/* Secure Submit Button */}
          <button 
            id="save-btn"
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-200 cursor-pointer"
            style={{ backgroundColor: themeConfig.text, color: themeConfig.bg }}
          >
            <div className="flex items-center gap-2">
              {isSaving ? (
                <>
                  <div className="w-3 h-3 border border-white border-t-transparent animate-spin"></div>
                  <span>SEALING...</span>
                </>
              ) : isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>TRANSCRIBED!</span>
                </>
              ) : (
                <span>SAVE WORK</span>
              )}
            </div>
          </button>
        </div>
      </section>

      {/* Inspirational Sidebar/Grid (Asymmetric Layout) */}
      <aside className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[800px] px-1">
        {/* Quote Block */}
        <div 
          className="p-8 border flex flex-col justify-center"
          style={{ 
            backgroundColor: `${themeConfig.border}10`, 
            borderColor: themeConfig.border, 
            color: themeConfig.text 
          }}
        >
          <div className="text-[9px] uppercase tracking-widest text-neutral-400 mb-3 block">01 / DYNAMIC CITATION</div>
          <p className="font-serif text-[15px] leading-relaxed italic text-neutral-800" style={{ color: themeConfig.text }}>
            "{inspiration.quote}"
          </p>
          <p className="text-[10px] font-sans mt-4 uppercase tracking-[0.15em] font-bold text-neutral-500">
            — {inspiration.author}
          </p>
        </div>

        {/* Daily Journal Prompt Block */}
        <div 
          className="p-8 border flex flex-col justify-between"
          style={{ 
            backgroundColor: `${themeConfig.border}08`, 
            borderColor: themeConfig.border,
            color: themeConfig.text
          }}
        >
          <div>
            <div className="text-[9px] uppercase tracking-widest text-neutral-400 mb-3 block">02 / DAILY CONTEXTUAL PROMPT</div>
            <p className="font-sans text-[13.5px] leading-relaxed font-normal">
              {dailyPrompt}
            </p>
          </div>
          <button 
            type="button"
            onClick={usePromptInDiary}
            className="mt-6 font-sans text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 hover:underline decoration-1 underline-offset-4 self-start cursor-pointer outline-none"
          >
            <span>INTEGRATE DISCOURSE</span> <MoveRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </div>
  );
};
export default TodayView;
