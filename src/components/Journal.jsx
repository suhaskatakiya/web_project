import React, { useState } from 'react';
import { journalEssays } from '../data/journal';
import { BookOpen, Sparkles, Clock, ArrowRight, X } from 'lucide-react';

export default function Journal() {
  const [activeEssay, setActiveEssay] = useState(null);

  return (
    <section id="journal" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200/60 dark:border-stone-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-gold-500 uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Atelier Monograph Journal</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 dark:text-stone-100 font-light">
            Reflections on space &amp; time.
          </h2>
        </div>
        <p className="max-w-md text-stone-600 dark:text-stone-400 text-sm leading-relaxed font-light">
          Quarterly essays penned by our partners exploring phenomenology, historical Japanese woodwork, and the restorative acoustics of natural materials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {journalEssays.map((essay) => (
          <article
            key={essay.id}
            onClick={() => setActiveEssay(essay)}
            className="group cursor-pointer flex flex-col justify-between rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-obsidian-900/40 hover:border-gold-500/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div>
              <div className="relative h-60 w-full overflow-hidden bg-stone-950">
                <img
                  src={essay.coverImage}
                  alt={essay.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="glass-panel px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-mono text-stone-900 dark:text-stone-100">
                    {essay.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-stone-400 dark:text-stone-500 font-mono mb-2">
                  <span>{essay.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gold-500" />
                    {essay.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 font-medium group-hover:text-gold-500 transition-colors line-clamp-2">
                  {essay.title}
                </h3>

                <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-3 font-light leading-relaxed line-clamp-3">
                  {essay.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 border-t border-stone-100 dark:border-stone-800/60">
              <span className="italic font-serif">{essay.author}</span>
              <span className="text-gold-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Essay <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Full Essay Modal */}
      {activeEssay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-atelier-50 dark:bg-obsidian-900 rounded-3xl p-6 sm:p-10 border border-stone-300 dark:border-stone-800 shadow-2xl my-8">
            <button
              onClick={() => setActiveEssay(null)}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-gold-500 hover:text-stone-950 transition-colors text-stone-700 dark:text-stone-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold-500 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{activeEssay.category} • {activeEssay.readTime}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-light mb-3">
              {activeEssay.title}
            </h2>

            <div className="flex items-center gap-2 text-xs text-stone-500 font-mono pb-6 mb-6 border-b border-stone-200 dark:border-stone-800">
              <span>By {activeEssay.author}</span>
              <span>•</span>
              <span>Published {activeEssay.date}</span>
            </div>

            <div className="space-y-4 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              {activeEssay.content?.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 flex justify-between items-center">
              <span className="text-xs text-stone-400 font-mono">
                From Monograph Vol. IX, Zürich
              </span>
              <button
                onClick={() => setActiveEssay(null)}
                className="px-5 py-2 rounded-full border border-stone-300 dark:border-stone-700 hover:border-gold-500 text-xs tracking-wider uppercase font-medium"
              >
                Close Essay
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
