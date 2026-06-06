/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JournalEntry, JournalBook, MoodType, MoodConfig } from './types';

export const MOODS: Record<MoodType, MoodConfig> = {
  radiant: { icon: '✨', label: 'Radiant', color: '#ffeb3b' },
  grounded: { icon: '🌿', label: 'Grounded', color: '#4caf50' },
  drifting: { icon: '☁️', label: 'Drifting', color: '#2196f3' },
  blooming: { icon: '🌸', label: 'Blooming', color: '#e91e63' },
  quiet: { icon: '🌙', label: 'Quiet', color: '#9c27b0' },
};

export const INITIAL_JOURNALS: JournalBook[] = [
  {
    id: 'journal-gratitude',
    title: 'Daily Gratitude',
    volume: 'Volume II',
    coverColor: '#4a654e', // Sage green
    spineColor: '#3d523f',
    iconName: 'spa',
    description: 'Focusing on the light, beauty, and grace in everyday moments.',
    isLocked: false,
    totalEntries: 148,
    lastEntryText: 'Quiet Sunday after rain...',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30, // 30 days ago
  },
  {
    id: 'journal-midnight',
    title: 'Midnight Thoughts',
    volume: 'Private thoughts',
    coverColor: '#232b38', // Dark Navy
    spineColor: '#1a222e',
    iconName: 'dark_mode',
    description: 'Unfiltered twilight reflections and midnight dreams.',
    isLocked: true,
    totalEntries: 24,
    lastEntryText: 'The moon is a sliver tonight...',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60, // 60 days ago
  },
  {
    id: 'journal-travel',
    title: 'Travel Dreams',
    volume: 'Adventure log',
    coverColor: '#7b5455', // Dusty Rose
    spineColor: '#634243',
    iconName: 'explore',
    description: 'Adventures across lakes, mountains, and new horizons.',
    isLocked: false,
    totalEntries: 42,
    lastEntryText: 'Morning mist in the hidden garden...',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 100, // 100 days ago
  },
  {
    id: 'journal-creative',
    title: 'Creative Sparks',
    volume: 'Drafts & Ideas',
    coverColor: '#ac9f88', // Warm brass/tan
    spineColor: '#8a7d6d',
    iconName: 'brush',
    description: 'Sketches, poems, outline hooks, and creative thoughts.',
    isLocked: false,
    totalEntries: 18,
    lastEntryText: 'The morning light hitting the oak desk...',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10, // 10 days ago
  },
  {
    id: 'journal-reflection',
    title: 'Self Reflection',
    volume: 'Therapeutic journey',
    coverColor: '#675d49', // Slate brown
    spineColor: '#524a3a',
    iconName: 'psychology',
    description: 'Deep dives, trigger trackers, and intentional growth logs.',
    isLocked: false,
    totalEntries: 75,
    chapterProgress: 65,
    lastEntryText: 'Unexpected kindness at the bookstore...',
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 150, // 150 days ago
  },
];

export const INITIAL_ENTRIES: JournalEntry[] = [
  {
    id: 'entry-1',
    journalId: 'journal-gratitude',
    title: 'Morning Mist in the Garden',
    date: 'Oct 24, 2023',
    time: '08:15 AM',
    mood: 'blooming',
    content: 'The air felt heavy with the scent of damp earth today. I spent twenty minutes just watching the dew evaporate from the roses. It feels like autumn is slowly whispering its way through the leaves. I made an intention to observe rather than evaluate today.',
    isFavorite: false,
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: 'entry-2',
    journalId: 'journal-reflection',
    title: 'Unexpected Kindness',
    date: 'Oct 22, 2023',
    time: '05:40 PM',
    mood: 'radiant',
    content: 'A stranger at the bookstore recommended a collection of poetry today. We talked for nearly an hour about Mary Oliver and how her writing anchors us. My heart feels so full. It is beautiful how simple, uncoordinated interactions can totally shift the course of an entire week. Safe and seen.',
    isFavorite: true,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
  },
  {
    id: 'entry-3',
    journalId: 'journal-gratitude',
    title: 'Quiet Sunday',
    date: 'Oct 20, 2023',
    time: '10:30 AM',
    mood: 'quiet',
    content: 'Rain against the windowpane. The perfect excuse to stay in bed with a hot cup of Earl Grey and finish my sketches. I feel productive yet completely at peace. Sometimes doing nothing but observing the raindrops is the highest form of living.',
    isFavorite: false,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 4, // 4 days ago
  },
  {
    id: 'entry-4',
    journalId: 'journal-travel',
    title: 'The Big Move?',
    date: 'Oct 18, 2023',
    time: '11:12 PM',
    mood: 'drifting',
    content: "Woke up thinking about the coast again. Is it time for a changes? I'm afraid of leaving behind everything that feels familiar, but I think I am even more afraid of staying exactly the same. Let the tides guide me, I suppose. I will search for answers in the waves.",
    isFavorite: true,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 6, // 6 days ago
  },
  {
    id: 'entry-5',
    journalId: 'journal-midnight',
    title: 'Midnight Musings',
    date: 'Oct 15, 2023',
    time: '01:45 AM',
    mood: 'quiet',
    content: 'The moon is a sliver tonight. Everything feels silent and potential-filled. I wrote three poems about the shadows on the wall before I could even think about sleeping. The night always holds a unique type of honesty.',
    isFavorite: false,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 9, // 9 days ago
  },
];

export const INSPIRATIONS = [
  {
    quote: '"There is no greater agony than bearing an untold story inside you."',
    author: 'Maya Angelou',
  },
  {
    quote: '"Quiet the mind, and the soul will speak."',
    author: 'Buddha',
  },
  {
    quote: '"To write is to discover what you represent to your own heart."',
    author: 'E.M. Forster',
  },
  {
    quote: '"We write to taste life twice, in the moment and in retrospect."',
    author: 'Anaïs Nin',
  },
  {
    quote: '"You must write for yourself, and if others happen to like it, that is a bonus."',
    author: 'Virginia Woolf',
  },
];

export const DAILY_PROMPTS = [
  'If your current emotion was a season, which one would it be and why?',
  'What is a quiet spot you visited recently that felt like it belonged only to you?',
  'List three simple things that brought a smile to your face today.',
  'If you could send a letter to yourself ten years ago, what is the single most important wisdom you would share?',
  'Describe a smell or a sound from your childhood that makes you instantly nostalgic.',
  'Is there a question you are currently avoiding asking yourself? Explore why.',
  'Write about a memory from the past month that feels completely coated in warm light.',
];
