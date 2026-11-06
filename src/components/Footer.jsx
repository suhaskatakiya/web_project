import React, { useState } from 'react';
import { Compass, CheckCircle2, Code2 } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function Footer({ onOpenSpecs, soundEnabled }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    playClickSound(soundEnabled);
    if (newsletterEmail.includes('@')) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="border-t border-stone-200/80 dark:border-stone-800 bg-atelier-100/60 dark:bg-obsidian-950 text-stone-700 dark:text-stone-300 pt-16 pb-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Top Section: Newsletter & Brand Identity */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-stone-200 dark:border-stone-800/80">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-stone-400 dark:border-gold-400 flex items-center justify-center">
                <Compass className="w-4 h-4 text-stone-800 dark:text-gold-400" />
              </div>
              <span className="font-serif text-2xl tracking-[0.2em] uppercase font-medium text-stone-900 dark:text-stone-100">
                AETHEL &amp; CO.
              </span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed font-light max-w-sm">
              Contemporary spatial design, architecture, and interior consultation with studios in Zürich, Kyoto, and New York.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-gold-500 block">
              Studio Journal Dispatch
            </span>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Subscribe to receive our periodic case studies on architectural lighting, natural stone quarrying, and passive solar planning.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-1 max-w-md">
              <input
                type="email"
                placeholder="Enter email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 px-4 py-2.5 rounded-full border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-900 text-xs focus:outline-none focus:border-gold-500"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs tracking-wider uppercase font-medium hover:bg-gold-500 dark:hover:bg-gold-400 dark:hover:text-stone-950 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>

            {subscribed && (
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-mono pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Thank you. You have been added to our newsletter list.</span>
              </div>
            )}
          </div>
        </div>

        {/* Middle Section: Studios & Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div>
            <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 mb-3 font-medium">
              Zürich Studio
            </h4>
            <ul className="space-y-1.5 text-stone-500 dark:text-stone-400">
              <li>Rennweg 38</li>
              <li>8001 Zürich, Switzerland</li>
              <li className="font-mono pt-1">+41 44 211 00 00</li>
              <li className="text-stone-400">zurich@aethel-atelier.ch</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 mb-3 font-medium">
              Kyoto Studio
            </h4>
            <ul className="space-y-1.5 text-stone-500 dark:text-stone-400">
              <li>Higashiyama-ku</li>
              <li>Kyoto 605-0074, Japan</li>
              <li className="font-mono pt-1">+81 75 561 00 00</li>
              <li className="text-stone-400">kyoto@aethel-atelier.ch</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 mb-3 font-medium">
              New York Office
            </h4>
            <ul className="space-y-1.5 text-stone-500 dark:text-stone-400">
              <li>112 Mercer Street</li>
              <li>SoHo, New York 10012, USA</li>
              <li className="font-mono pt-1">+1 212 966 00 00</li>
              <li className="text-stone-400">newyork@aethel-atelier.ch</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 mb-3 font-medium">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-stone-500 dark:text-stone-400">
              <li><a href="#works" className="hover:text-gold-500 transition-colors">Portfolio Archive</a></li>
              <li><a href="#lighting" className="hover:text-gold-500 transition-colors">Lighting Simulator</a></li>
              <li><a href="#materials" className="hover:text-gold-500 transition-colors">Materiality</a></li>
              <li><a href="#estimator" className="hover:text-gold-500 transition-colors">Scope Calculator</a></li>
              <li><a href="#contact" className="hover:text-gold-500 transition-colors">Inquiry Form</a></li>
            </ul>
          </div>
        </div>

        {/* Academic Coursework Ribbon */}
        <div className="p-4 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
            <Code2 className="w-4 h-4 text-gold-500" />
            <span className="font-medium">Web Technologies (WebTech) Project Submission</span>
            <span className="hidden md:inline text-stone-400">• React 18 / Vite / Tailwind CSS</span>
          </div>

          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onOpenSpecs();
            }}
            className="text-gold-500 dark:text-gold-400 hover:underline font-mono text-[11px] flex items-center gap-1"
          >
            <span>View Technical Architecture &amp; Grading Specs &rarr;</span>
          </button>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-mono">
          <div>
            &copy; 2026 AETHEL &amp; CO. ARCHITECTURE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>Semantic HTML5</span>
            <span>•</span>
            <span>Modern Responsive Layout</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
