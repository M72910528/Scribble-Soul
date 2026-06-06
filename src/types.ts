/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MoodType = 'radiant' | 'grounded' | 'drifting' | 'blooming' | 'quiet';

export interface MoodConfig {
  icon: string;
  label: string;
  color: string;
}

export interface JournalEntry {
  id: string;
  journalId: string; // which journal book this belongs to
  title: string;
  date: string; // ISO date string or formatted (e.g. "Oct 24, 2023")
  time: string; // e.g. "08:15 AM"
  mood: MoodType;
  content: string;
  isFavorite: boolean;
  timestamp: number; // for sorting
}

export interface JournalBook {
  id: string;
  title: string;
  volume: string;
  coverColor: string; // hex or tailwind class
  spineColor: string; // hex or tailwind class
  iconName: string; // lucide icon name
  description: string;
  isLocked: boolean;
  totalEntries: number;
  chapterProgress?: number; // e.g. 65 for self reflection
  lastEntryText?: string;
  createdAt: number;
}

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  reminderEnabled: boolean;
  reminderTime: string; // e.g. "08:00 AM"
}

export type ThemePreset = 'parchment' | 'midnight' | 'rose';

export interface ThemeConfig {
  id: ThemePreset;
  name: string;
  bgClass: string;
  cardClass: string;
  textClass: string;
  accentClass: string;
  description: string;
}
