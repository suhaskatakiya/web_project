import React from 'react';
import { X, Code2, CheckCircle2, Layers, Cpu, Database, Sparkles, Terminal } from 'lucide-react';

export default function ProjectSpecsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-atelier-50 dark:bg-obsidian-900 rounded-3xl p-6 sm:p-10 border border-stone-300 dark:border-stone-800 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-gold-500 hover:text-stone-950 transition-colors text-stone-700 dark:text-stone-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold-500 mb-2">
          <Terminal className="w-4 h-4" />
          <span>Academic Submission • Web Technologies Lab</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-light mb-2">
          Technical Specifications &amp; Architecture
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-light mb-6">
          Overview of frontend engineering standards, React hooks, state management, and HTML5 APIs implemented in this project.
        </p>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-3.5 rounded-xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-center">
            <span className="text-[10px] font-mono uppercase text-stone-400 block">Core Library</span>
            <span className="font-medium text-sm text-stone-900 dark:text-stone-100 mt-1 block">React 18.3</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-center">
            <span className="text-[10px] font-mono uppercase text-stone-400 block">Build Tool</span>
            <span className="font-medium text-sm text-stone-900 dark:text-stone-100 mt-1 block">Vite 5.4</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-center">
            <span className="text-[10px] font-mono uppercase text-stone-400 block">Styling Engine</span>
            <span className="font-medium text-sm text-stone-900 dark:text-stone-100 mt-1 block">Tailwind CSS</span>
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 text-center">
            <span className="text-[10px] font-mono uppercase text-stone-400 block">Web APIs</span>
            <span className="font-medium text-sm text-stone-900 dark:text-stone-100 mt-1 block">Web Audio + Storage</span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 font-medium flex items-center gap-2">
            <Code2 className="w-4 h-4 text-gold-500" />
            Key Evaluated WebTech Requirements
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 space-y-1.5">
              <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                State Persistence (localStorage)
              </span>
              <p className="text-stone-500 leading-relaxed font-light">
                Stores dark/light mode preference and user-bookmarked portfolio projects in client browser storage.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 space-y-1.5">
              <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                HTML5 Web Audio API
              </span>
              <p className="text-stone-500 leading-relaxed font-light">
                Synthesizes interactive mechanical click feedback using native <code>AudioContext</code> oscillators without heavy MP3 dependencies.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 space-y-1.5">
              <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Dynamic Filtering &amp; Search
              </span>
              <p className="text-stone-500 leading-relaxed font-light">
                Multi-category tabs with live text search across titles, locations, and architectural materials.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 space-y-1.5">
              <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Client-Side Form Validation
              </span>
              <p className="text-stone-500 leading-relaxed font-light">
                Regex email verification, required field detection, and stateful success dossier generation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 space-y-1.5">
              <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Mathematical Scope Calculator
              </span>
              <p className="text-stone-500 leading-relaxed font-light">
                Real-time formula computing timeline months and investment ranges based on square meter sliders and detailing multipliers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-100/70 dark:bg-stone-950/40 border border-stone-200 dark:border-stone-800 space-y-1.5">
              <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Responsive CSS Grid &amp; Flexbox
              </span>
              <p className="text-stone-500 leading-relaxed font-light">
                Mobile-first breakpoints with backdrop filters, CSS transitions, and keyboard-accessible modal overlays.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-stone-500 font-mono">
            Designed &amp; Developed for WebTech Coursework • Semester Project
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs uppercase font-medium hover:bg-gold-500 dark:hover:bg-gold-400 dark:hover:text-stone-950 transition-colors"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
