/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Heart, Feather } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const AboutView: React.FC = () => {
  const { themeConfig } = useTheme();

  const principles = [
    {
      icon: Shield,
      title: 'Durable Privacy',
      desc: 'All collections are locked inside your client browser storage environment. Your identity remains absolute, self-contained, and offline-first.'
    },
    {
      icon: Feather,
      title: 'Form Follows Reflection',
      desc: 'No clutter, counts, or digital noise. The canvas uses pristine layouts, high-contrast grid structures, and ample margins to focus your raw awareness.'
    },
    {
      icon: Heart,
      title: 'Aesthetic Variations',
      desc: 'Switch between curated architectural skins like starch White, raw travertine Linen, and deep absolute Obsidian to match your writing environment.'
    }
  ];

  return (
    <div className="w-full max-w-[800px] mx-auto py-4">
      {/* Dynamic Header Section */}
      <header className="mb-12 border-b border-neutral-100 pb-8 text-left">
        <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-2">METRIC REFLECTION 01</div>
        <h2 className="font-serif text-[40px] leading-tight text-[#121212] tracking-tighter" style={{ color: themeConfig.text }}>
          Silence & Substance
        </h2>
        <p className="font-sans text-[13px] text-neutral-500 mt-1 uppercase tracking-wider">
          The structural theory behind Scribble & Soul.
        </p>
      </header>

      {/* Narrative block */}
      <div className="space-y-8">
        <section className="p-8 border relative overflow-hidden" style={{ backgroundColor: themeConfig.card, borderColor: themeConfig.border }}>
          {/* Subtle design corners */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-neutral-300"></div>
          <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-neutral-300"></div>
          
          <h3 className="font-serif text-[22px] font-normal italic mb-4" style={{ color: themeConfig.text }}>
            A sanctuary for the written word
          </h3>
          <p className="font-sans text-[14px] leading-[1.85] opacity-80" style={{ color: themeConfig.text }}>
            Scribble & Soul was built under the premise that digital diaries should not resemble social media platforms or generic office productivity suites. It is an digital stationery engine for quiet transcription. No notification loops, gamified streak limits, or complex clutter. This is designed for the architectural precision of thoughts.
          </p>
        </section>

        {/* Principles Bento elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx} 
                className="p-6 border flex flex-col justify-between hover:border-black transition-colors"
                style={{ borderColor: themeConfig.border, backgroundColor: themeConfig.card }}
              >
                <div>
                  <div className="w-9 h-9 border flex items-center justify-center mb-4 bg-neutral-50" style={{ borderColor: themeConfig.border }}>
                    <Icon className="w-4 h-4" style={{ color: themeConfig.text }} />
                  </div>
                  <h4 className="font-serif text-[16px] font-normal mb-2" style={{ color: themeConfig.text }}>
                    {p.title}
                  </h4>
                  <p className="font-sans text-[12px] opacity-70 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="text-[10px] font-mono opacity-30 mt-6">// P.0{idx + 1}</div>
              </div>
            );
          })}
        </div>

        {/* Technical Specification details */}
        <section className="p-8 border border-dashed text-left" style={{ borderColor: themeConfig.border, backgroundColor: `${themeConfig.border}08` }}>
          <h4 className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold mb-3">System Specifications</h4>
          <ul className="space-y-2 text-[12px] font-mono opacity-80" style={{ color: themeConfig.text }}>
            <li>[Storage] Client-side secure database registers (localStorage cache)</li>
            <li>[Latency] &lt;0.01ms localized compilation pipeline</li>
            <li>[Skins] Slate-lined grids, parchment filters, marble dividers</li>
            <li>[Compiler] React 19 architecture + Vite module assembly</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
export default AboutView;
