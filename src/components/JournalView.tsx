/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, BookOpen, Trash2, Edit3, Plus, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { JournalEntry, MoodType } from '../types';
import { MOODS } from '../data';

interface JournalViewProps {
  entries: JournalEntry[];
  onSelectEntryToEdit: (entry: JournalEntry) => void;
  onDeleteEntry: (id: string) => void;
  onStartNewEntry: () => void;
  onToggleFavorite: (id: string) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  entries,
  onSelectEntryToEdit,
  onDeleteEntry,
  onStartNewEntry,
  onToggleFavorite,
}) => {
  const { themeConfig } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'month' | 'favorites'>('all');
  
  // Selected entry to view in detail
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  // Filter & Search logic
  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = 
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (!matchesSearch) return false;

    if (activeFilter === 'favorites') {
      return entry.isFavorite;
    }
    if (activeFilter === 'month') {
      return entry.timestamp > Date.now() - 1000 * 60 * 60 * 24 * 30;
    }
    return true;
  });

  const getMoodSticker = (mood: MoodType) => {
    return MOODS[mood]?.icon || '🌙';
  };

  const parseMonthDay = (dateStr: string) => {
    const parts = dateStr.split(' ');
    if (parts.length >= 2) {
      const month = parts[0].toUpperCase();
      const day = parts[1].replace(',', '');
      return { month, day };
    }
    return { month: 'OCT', day: '24' };
  };

  return (
    <div className="w-full">
      {/* Search and Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-neutral-100 pb-8">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-2">INDEX SECTION 02</div>
          <h2 className="font-serif text-[40px] leading-tight text-[#121212] tracking-tighter" style={{ color: themeConfig.textColor ?? themeConfig.text }}>
            My Paper Trail
          </h2>
          <p className="font-sans text-[13px] text-neutral-500 mt-1 uppercase tracking-wider">
            A chronological timeline of stored moments and quiet thoughts.
          </p>
        </div>

        {/* Search bar - crisp rectangle with razor outline */}
        <div 
          className="w-full md:max-w-xs relative bg-[#FFFFFF] border p-1" 
          style={{ borderColor: themeConfig.border }}
        >
          <label className="sr-only" htmlFor="search">Search entries</label>
          <input 
            type="text" 
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search words..."
            className="w-full bg-transparent border-0 py-2 pl-9 pr-4 text-xs font-sans uppercase tracking-wider outline-none"
          />
          <Search className="absolute left-3 top-3.5 w-3.5 h-3.5 text-neutral-400" />
        </div>
      </div>

      {/* Entry Category Navigation Chips - stark architectural filters */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {(['all', 'month', 'favorites'] as const).map((filter) => {
          const active = activeFilter === filter;
          const labels = {
            all: '01 / ALL ENTRIES',
            month: '02 / RECENT 30 DAYS',
            favorites: '03 / ANCHORED INSIDE'
          };
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="px-5 py-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.18em] transition-colors duration-200 outline-none"
              style={{
                backgroundColor: active ? themeConfig.text : 'transparent',
                color: active ? themeConfig.bg : themeConfig.text,
                border: `1px solid ${themeConfig.text}`
              }}
            >
              {labels[filter]}
            </button>
          );
        })}
      </div>

      {/* Shelf Grid of Letters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create Card placeholder */}
        <motion.div 
          whileHover={{ y: -3 }}
          onClick={onStartNewEntry}
          className="bg-[#F9F9F9] border border-dashed p-8 min-h-[260px] flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-black group"
          style={{ borderColor: themeConfig.border }}
        >
          <div className="w-10 h-10 border border-dashed flex items-center justify-center group-hover:border-black transition-all mb-3" style={{ borderColor: themeConfig.text }}>
            <Plus className="w-4 h-4" style={{ color: themeConfig.text }} />
          </div>
          <h3 className="font-serif text-lg font-normal">New Transcription</h3>
          <p className="text-[10px] uppercase tracking-widest text-neutral-400 text-center mt-2">Press pen to canvas</p>
        </motion.div>

        {filteredEntries.map((entry) => {
          const { month, day } = parseMonthDay(entry.date);
          return (
            <motion.div 
              key={entry.id}
              whileHover={{ y: -3 }}
              onClick={() => setSelectedEntry(entry)}
              className="p-6 relative flex flex-col justify-between shadow-none cursor-pointer border transition-all group min-h-[260px]"
              style={{ 
                backgroundColor: themeConfig.card,
                borderColor: themeConfig.border, 
                color: themeConfig.text 
              }}
            >
              {/* Minimal stamp ID */}
              <div className="absolute top-5 left-5 flex gap-1 items-center">
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[9px] uppercase tracking-[0.2em] opacity-40 leading-none mb-0.5">{month}</span>
                  <span className="font-mono text-sm font-bold leading-none">{day}</span>
                </div>
              </div>

              {/* Mood Badge - stark modern offset */}
              <div className="absolute top-5 right-5 w-8 h-8 border border-neutral-100 bg-neutral-50 flex items-center justify-center text-sm shadow-none group-hover:border-neutral-400 transition-colors">
                {getMoodSticker(entry.mood)}
              </div>

              {/* Card Meta Content */}
              <div className="mt-12 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-normal leading-snug group-hover:underline decoration-1 underline-offset-4 transition-colors mt-3">
                    {entry.title}
                  </h3>
                  <p className="font-sans text-[13px] opacity-75 mt-3 line-clamp-3 leading-relaxed">
                    {entry.content}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t" style={{ borderColor: themeConfig.border }}>
                  <span className="text-[10px] opacity-55 uppercase tracking-widest font-semibold">{entry.time}</span>
                  <div className="flex items-center gap-2.5">
                    {entry.isFavorite && (
                      <Heart className="w-3.5 h-3.5 fill-current text-neutral-800" />
                    )}
                    <BookOpen className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-20 bg-neutral-50 border border-dashed mt-6" style={{ borderColor: themeConfig.border }}>
          <Sparkles className="w-5 h-5 mx-auto mb-3 opacity-40" />
          <h3 className="font-serif text-lg font-normal mb-1">A silent matrix of parchment</h3>
          <p className="text-[11px] uppercase tracking-widest text-neutral-400">No storage points match your search filter.</p>
        </div>
      )}

      {/* Reader Modal Overlay (Modern Structural Slate Glass) */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div 
              initial={{ scale: 0.98, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 10 }}
              className="w-full max-w-[640px] p-8 relative flex flex-col border border-neutral-300"
              style={{ backgroundColor: themeConfig.paperBg, color: themeConfig.text }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Reader Header */}
              <div className="flex justify-between items-start gap-4 mb-6 border-b border-neutral-100 pb-5">
                <div>
                  <div className="flex items-center gap-2 opacity-50 mb-1">
                    <span className="text-[10px] uppercase tracking-widest font-mono font-bold">{selectedEntry.date}</span>
                    <span className="text-xs opacity-50">•</span>
                    <span className="text-[10px] uppercase tracking-widest font-mono font-bold">{selectedEntry.time}</span>
                  </div>
                  <h3 className="font-serif text-3xl font-normal leading-tight">{selectedEntry.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 border border-neutral-200 bg-neutral-50 flex items-center justify-center text-sm shadow-none">
                    {getMoodSticker(selectedEntry.mood)}
                  </div>
                  <button 
                    onClick={() => {
                      onToggleFavorite(selectedEntry.id);
                      setSelectedEntry((prev) => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
                    }}
                    className="w-8 h-8 border border-neutral-200 bg-white flex items-center justify-center hover:bg-neutral-50 transition-all shadow-none" 
                  >
                    <Heart className={`w-3.5 h-3.5 ${selectedEntry.isFavorite ? 'fill-current text-black' : 'opacity-50'}`} />
                  </button>
                </div>
              </div>

              {/* Minimal Line Structured Reader Box */}
              <div 
                className="flex-1 overflow-y-auto max-h-[350px] pr-2 text-sm leading-[2.1rem] py-2 mb-8 focus:outline-none scrollbar-thin"
                style={{ 
                  color: themeConfig.text, 
                  backgroundImage: `linear-gradient(${themeConfig.border} 1px, transparent 1px)`,
                  backgroundSize: '100% 2.1rem',
                  lineHeight: '2.1rem',
                }}
              >
                {selectedEntry.content}
              </div>

              {/* Reader Footer Controls */}
              <div className="flex flex-wrap justify-between items-center border-t pt-5 border-neutral-100">
                <button 
                  onClick={() => {
                    onDeleteEntry(selectedEntry.id);
                    setSelectedEntry(null);
                  }}
                  className="px-4 py-2 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Purge Volume
                </button>
                
                <div className="flex gap-2.5">
                  <button 
                    onClick={() => setSelectedEntry(null)}
                    className="px-4 py-2 border border-neutral-200 text-neutral-500 text-[10px] uppercase tracking-widest font-bold"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      onSelectEntryToEdit(selectedEntry);
                      setSelectedEntry(null);
                    }}
                    className="px-5 py-2 bg-black hover:bg-neutral-800 text-white text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5"
                    style={{ backgroundColor: themeConfig.text, color: themeConfig.bg }}
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Passage
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default JournalView;
