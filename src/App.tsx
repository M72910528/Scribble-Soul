/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Feather, Scroll, Library, Settings, LogOut, Palette } from 'lucide-react';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { LoginView } from './components/LoginView';
import { TodayView } from './components/TodayView';
import { JournalView } from './components/JournalView';
import { JournalsView } from './components/JournalsView';
import { SettingsView } from './components/SettingsView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { JournalEntry, JournalBook, UserProfile } from './types';
import { INITIAL_ENTRIES, INITIAL_JOURNALS } from './data';

function MainApp() {
  const { themeConfig, theme, setTheme } = useTheme();

  const handleCycleTheme = () => {
    const list: ('parchment' | 'midnight' | 'rose')[] = ['parchment', 'midnight', 'rose'];
    const nextIndex = (list.indexOf(theme) + 1) % list.length;
    setTheme(list[nextIndex]);
  };

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('is-authenticated') === 'true';
  });

  // User Profile state
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('user-profile');
    if (saved) return JSON.parse(saved);
    return {
      name: 'Elena Moretti',
      email: 'elena.m@gmail.com',
      bio: 'Scribbling down dreams & quiet morning thoughts.',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150',
      reminderEnabled: true,
      reminderTime: '08:00 AM',
    };
  });

  // Journals list state
  const [journals, setJournals] = useState<JournalBook[]>(() => {
    const saved = localStorage.getItem('journals');
    if (saved) return JSON.parse(saved);
    return INITIAL_JOURNALS;
  });

  // Active journal selection state
  const [activeJournalId, setActiveJournalId] = useState<string>(() => {
    return localStorage.getItem('active-journal-id') || 'journal-gratitude';
  });

  // Entries list state
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('journal-entries');
    if (saved) return JSON.parse(saved);
    return INITIAL_ENTRIES;
  });

  // Selected entry for editing focus (pass to editor)
  const [entryToEdit, setEntryToEdit] = useState<JournalEntry | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'write' | 'trail' | 'journals' | 'settings'>('write');

  // Sticky top navigation bar state for Home vs hypothetical sections (About, Contact)
  const [headerLink, setHeaderLink] = useState<'home' | 'about' | 'contact'>('home');

  // Persistence triggers
  useEffect(() => {
    localStorage.setItem('is-authenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('user-profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('journals', JSON.stringify(journals));
  }, [journals]);

  useEffect(() => {
    localStorage.setItem('journal-entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('active-journal-id', activeJournalId);
  }, [activeJournalId]);

  // Auth actions
  const handleLogin = (name: string, email: string) => {
    setProfile(prev => {
      const updated = { ...prev, name, email };
      localStorage.setItem('user-profile', JSON.stringify(updated));
      return updated;
    });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('is-authenticated');
  };

  // Get active journal
  const getActiveJournalObj = (): JournalBook => {
    const found = journals.find(j => j.id === activeJournalId);
    return found || journals[0];
  };

  // Entry Actions
  const handleSaveEntry = (updatedFields: Partial<JournalEntry>) => {
    if (updatedFields.id) {
      // Editing Mode
      setEntries(prev => prev.map(entry => {
        if (entry.id === updatedFields.id) {
          return {
            ...entry,
            ...updatedFields,
            timestamp: Date.now(),
          } as JournalEntry;
        }
        return entry;
      }));
    } else {
      // New Entry mode
      const newEntry: JournalEntry = {
        id: `entry-${Date.now()}`,
        journalId: activeJournalId,
        title: updatedFields.title || 'Untitled Thought',
        date: updatedFields.date || '',
        time: updatedFields.time || '',
        mood: updatedFields.mood || 'quiet',
        content: updatedFields.content || '',
        isFavorite: false,
        timestamp: Date.now(),
      };

      setEntries(prev => [newEntry, ...prev]);

      // Update journal counter statistics
      setJournals(prev => prev.map(book => {
        if (book.id === activeJournalId) {
          return {
            ...book,
            totalEntries: book.totalEntries + 1,
            lastEntryText: newEntry.content.substring(0, 40) + '...',
          };
        }
        return book;
      }));
    }
  };

  const handleDeleteEntry = (id: string) => {
    const entryToDelete = entries.find(e => e.id === id);
    if (!entryToDelete) return;

    setEntries(prev => prev.filter(e => e.id !== id));

    // Update journal counter statistics downwards
    setJournals(prev => prev.map(book => {
      if (book.id === entryToDelete.journalId) {
        return {
          ...book,
          totalEntries: Math.max(0, book.totalEntries - 1),
        };
      }
      return book;
    }));
  };

  const handleToggleFavorite = (id: string) => {
    setEntries(prev => prev.map(entry => {
      if (entry.id === id) {
        return {
          ...entry,
          isFavorite: !entry.isFavorite,
        };
      }
      return entry;
    }));
  };

  // Journal creation
  const handleCreateJournal = (newBookDetails: Partial<JournalBook>) => {
    const freshBook: JournalBook = {
      id: `journal-${Date.now()}`,
      title: newBookDetails.title || 'Untitled',
      volume: newBookDetails.volume || 'Volume I',
      coverColor: newBookDetails.coverColor || '#121212',
      spineColor: '#121212',
      iconName: newBookDetails.isLocked ? 'dark_mode' : 'spa',
      description: newBookDetails.description || 'A timeless modular repository.',
      isLocked: !!newBookDetails.isLocked,
      totalEntries: 0,
      createdAt: Date.now(),
    };

    setJournals(prev => [...prev, freshBook]);
  };

  const handleUpdateProfile = (updatedProfileFields: Partial<UserProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...updatedProfileFields,
    }));
  };

  const handleClearArchive = () => {
    setEntries([]);
    setJournals(INITIAL_JOURNALS.map(j => ({ ...j, totalEntries: 0, lastEntryText: undefined })));
  };

  const handleSelectEntryToEdit = (entry: JournalEntry) => {
    setEntryToEdit(entry);
    setActiveTab('write');
  };

  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'write':
        return (
          <TodayView 
            userName={profile.name} 
            activeJournal={getActiveJournalObj()} 
            onSaveEntry={handleSaveEntry}
            initialEditEntry={entryToEdit}
            onDoneEditing={() => {
              setEntryToEdit(null);
              setActiveTab('trail');
            }}
          />
        );
      case 'trail':
        return (
          <JournalView 
            entries={entries}
            onSelectEntryToEdit={handleSelectEntryToEdit}
            onDeleteEntry={handleDeleteEntry}
            onToggleFavorite={handleToggleFavorite}
            onStartNewEntry={() => {
              setEntryToEdit(null);
              setActiveTab('write');
            }}
          />
        );
      case 'journals':
        return (
          <JournalsView 
            journals={journals}
            activeJournalId={activeJournalId}
            onSelectJournal={(id) => {
              setActiveJournalId(id);
              setActiveTab('write');
            }}
            onCreateJournal={handleCreateJournal}
          />
        );
      case 'settings':
        return (
          <SettingsView 
            profile={profile}
            entries={entries}
            onUpdateProfile={handleUpdateProfile}
            onClearArchive={handleClearArchive}
          />
        );
    }
  };

  const navigationItems = [
    { id: 'write', label: '01 / Write', icon: Feather },
    { id: 'trail', label: '02 / Historical logs', icon: Scroll },
    { id: 'journals', label: '03 / Collection', icon: Library },
    { id: 'settings', label: '04 / System Config', icon: Settings },
  ] as const;

  return (
    <div 
      className="min-h-screen pb-24 md:pb-12 flex flex-col items-center select-none transition-colors duration-300"
      style={{ backgroundColor: themeConfig.bg, color: themeConfig.text }}
    >
      {/* Sticky Primary Header Navigation Bar */}
      <header 
        className="w-full sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300"
        style={{ 
          backgroundColor: theme === 'midnight' 
            ? 'rgba(10, 10, 10, 0.85)' 
            : theme === 'rose' 
              ? 'rgba(250, 250, 249, 0.85)' 
              : 'rgba(255, 255, 255, 0.85)',
          borderColor: themeConfig.border 
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-5 flex flex-wrap gap-4 justify-between items-center w-full">
          {/* Brand/Identity */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setHeaderLink('home'); setActiveTab('write'); }}>
            <div className="h-9 w-9 border flex items-center justify-center bg-white" style={{ borderColor: themeConfig.border }}>
              <Feather className="w-4 h-4 text-black animate-pulse" style={{ color: themeConfig.text }} />
            </div>
            <div>
              <h1 className="font-serif text-[22px] md:text-[24px] uppercase tracking-tight font-normal italic leading-none">Scribble & Soul</h1>
              <p className="text-[9px] uppercase tracking-widest text-neutral-400 mt-1 font-bold">SYSTEM METRIC TRANSCRIPT</p>
            </div>
          </div>

          {/* Simple, sticky top navigation links */}
          <nav className="flex items-center gap-4 md:gap-8 order-3 sm:order-none w-full sm:w-auto justify-center border-t sm:border-t-0 pt-2 sm:pt-0" style={{ borderColor: themeConfig.border }}>
            <button 
              onClick={() => setHeaderLink('home')}
              className={`text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-extrabold pb-1 border-b-2 hover:opacity-100 transition-all cursor-pointer ${
                headerLink === 'home' 
                  ? 'opacity-100 font-extrabold' 
                  : 'opacity-40'
              }`}
              style={{ borderColor: headerLink === 'home' ? themeConfig.text : 'transparent', color: themeConfig.text }}
            >
              Home
            </button>
            <button 
              onClick={() => setHeaderLink('about')}
              className={`text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-extrabold pb-1 border-b-2 hover:opacity-100 transition-all cursor-pointer ${
                headerLink === 'about' 
                  ? 'opacity-100 font-extrabold' 
                  : 'opacity-40'
              }`}
              style={{ borderColor: headerLink === 'about' ? themeConfig.text : 'transparent', color: themeConfig.text }}
            >
              About
            </button>
            <button 
              onClick={() => setHeaderLink('contact')}
              className={`text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-extrabold pb-1 border-b-2 hover:opacity-100 transition-all cursor-pointer ${
                headerLink === 'contact' 
                  ? 'opacity-100 font-extrabold' 
                  : 'opacity-40'
              }`}
              style={{ borderColor: headerLink === 'contact' ? themeConfig.text : 'transparent', color: themeConfig.text }}
            >
              Contact
            </button>
          </nav>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-3 md:gap-4 ml-auto sm:ml-0">
            <div 
              onClick={() => { setHeaderLink('home'); setActiveTab('settings'); }}
              className="flex items-center gap-2 md:gap-3 bg-transparent px-2.5 py-1.5 cursor-pointer border hover:border-black transition-all"
              style={{ borderColor: themeConfig.border }}
            >
              <img src={profile.avatarUrl} alt="avatar miniature" className="w-7 h-7 object-cover image-transition rounded-none" />
              <div className="hidden sm:block text-left">
                <p className="font-sans text-[11px] uppercase tracking-widest font-extrabold leading-tight">{profile.name}</p>
                <p className="text-[9px] uppercase opacity-55 mt-0.5 tracking-wider">{getActiveJournalObj().title}</p>
              </div>
            </div>

            <button 
              title="Cycle Theme Style"
              onClick={handleCycleTheme}
              className="p-3 border hover:bg-neutral-50 cursor-pointer flex items-center justify-center gap-1.5"
              style={{ borderColor: themeConfig.border, color: themeConfig.text }}
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[9px] uppercase tracking-wider font-extrabold">Skin</span>
            </button>

            <button 
              title="Seal Workspace (Logout)"
              onClick={handleLogout}
              className="p-3 border hover:bg-neutral-50 cursor-pointer"
              style={{ borderColor: themeConfig.border, color: themeConfig.text }}
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Workspace */}
      <main className="flex-1 w-full max-w-[1200px] px-6 lg:px-12 py-10 z-10 flex flex-col">
        {/* Desktop Header Segmented Navigation */}
        <nav 
          className="hidden md:flex self-center mb-12 border bg-white" 
          style={{ borderColor: themeConfig.border }}
        >
          {navigationItems.map((item) => {
            const active = activeTab === item.id && headerLink === 'home';
            return (
              <button
                key={item.id}
                onClick={() => {
                  setEntryToEdit(null);
                  setActiveTab(item.id);
                  setHeaderLink('home');
                }}
                className="flex items-center gap-2 px-6 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative border-r last:border-r-0 outline-none"
                style={{ 
                  borderColor: themeConfig.border,
                  backgroundColor: active ? themeConfig.text : 'transparent',
                  color: active ? themeConfig.bg : themeConfig.text,
                }}
              >
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Route Frame Animations */}
        <div className="flex-1 w-full flex flex-col justify-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={headerLink !== 'home' ? headerLink : activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full flex-1"
            >
              {headerLink === 'about' ? (
                <AboutView />
              ) : headerLink === 'contact' ? (
                <ContactView />
              ) : (
                renderActiveScreen()
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Navigation Bar */}
      <nav 
        className="md:hidden fixed bottom-6 left-[4%] w-[92%] bg-white border z-40 flex justify-around items-center p-2.5"
        style={{ borderColor: themeConfig.border }}
      >
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const active = activeTab === item.id && headerLink === 'home';
          return (
            <button
              key={item.id}
              onClick={() => {
                setEntryToEdit(null);
                setActiveTab(item.id);
                setHeaderLink('home');
              }}
              className="relative flex flex-col items-center justify-center p-2 transition-all outline-none"
              style={{ color: active ? themeConfig.text : '#a3a3a3' }}
            >
              {active && (
                <div 
                  className="absolute -top-2.5 w-6 h-[2px]"
                  style={{ backgroundColor: themeConfig.text }}
                />
              )}
              <IconComponent className="w-4.5 h-4.5" />
              <span className="text-[8px] uppercase tracking-wider mt-1.5 font-bold font-sans">
                {item.label.split('/ ')[1] ?? item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
