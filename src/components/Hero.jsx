import React, { useState } from 'react';
import { ArrowDown, SlidersHorizontal, MapPin, Eye, Building2 } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function Hero({ onExploreWorks, soundEnabled }) {
  const [imageHovered, setImageHovered] = useState(false);

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-gold-400/5 dark:bg-gold-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Editorial Pill */}
      <div className="flex items-center gap-3 mb-6 animate-fade-in">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-stone-300 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/60 text-[11px] tracking-wider uppercase font-medium text-stone-600 dark:text-gold-400">
          <Building2 className="w-3.5 h-3.5 text-gold-500" />
          Independent Architecture &amp; Spatial Studio • Founded 2021
        </span>
      </div>

      {/* Main Grid: Headline & Studio Purpose */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end mb-14">
        <div className="lg:col-span-8">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-stone-900 dark:text-stone-50 leading-[1.05]">
            Architecture shaped by daylight, stone &amp; <span className="italic font-normal text-gold-500 dark:text-gold-400">proportion</span>.
          </h1>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-end space-y-6 pb-2">
          <p className="text-stone-600 dark:text-stone-400 text-base md:text-lg leading-relaxed font-light">
            We design contemporary residences and tactile spaces built to endure. By pairing local Alpine quarzite and Japanese joinery with clean passive solar planning, we create homes that feel peaceful and rooted.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href="#works"
              onClick={() => playClickSound(soundEnabled)}
              className="px-6 py-3 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs tracking-wider uppercase font-medium hover:bg-gold-500 dark:hover:bg-gold-400 dark:hover:text-stone-950 transition-all flex items-center gap-2 group shadow-sm"
            >
              <span>Explore Portfolio</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            </a>

            <a
              href="#lighting"
              onClick={() => playClickSound(soundEnabled)}
              className="px-6 py-3 rounded-full border border-stone-300 dark:border-stone-700 hover:border-gold-500 text-stone-800 dark:text-stone-200 text-xs tracking-wider uppercase font-medium transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-500" />
              <span>Lighting Simulator</span>
            </a>
          </div>
        </div>
      </div>

      {/* Showcase Feature Frame */}
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-stone-200/60 dark:border-stone-800/80 group">
        <div 
          className="relative h-[420px] sm:h-[500px] md:h-[600px] w-full overflow-hidden bg-stone-950"
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90"
            alt="Villa Solaria — Lake Lugano Cantilever Architecture"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none" />

          {/* Architectural Overlay Information */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3">
            <span className="glass-panel px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-stone-900 dark:text-stone-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              LATEST CASE STUDY
            </span>
            <span className="hidden sm:inline-flex glass-panel px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-stone-700 dark:text-stone-300">
              Lugano, Switzerland • 740 m²
            </span>
          </div>

          {/* Bottom Card / Project Title */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-gold-400 text-xs tracking-wider uppercase mb-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Lake Lugano, Switzerland • Completed 2024</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-wide font-light">
                Villa Solaria: Monolithic Glass &amp; Alpine Stone
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm mt-2 line-clamp-2 sm:line-clamp-none font-light">
                A cantilevered family home constructed using Valser quarzite from a local quarry, designed with triple-insulated thermal acoustic glazing.
              </p>
            </div>

            <a
              href="#works"
              onClick={() => playClickSound(soundEnabled)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs tracking-wider uppercase text-white transition-all self-start md:self-end"
            >
              <Eye className="w-3.5 h-3.5 text-gold-300" />
              <span>Inspect Project</span>
            </a>
          </div>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 pt-8 border-t border-stone-200/60 dark:border-stone-800/80">
        <div>
          <div className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 font-light">
            32+
          </div>
          <p className="text-[11px] tracking-wider uppercase text-stone-500 dark:text-stone-400 mt-1">
            Completed Projects
          </p>
        </div>
        <div>
          <div className="font-serif text-3xl md:text-4xl text-gold-500 dark:text-gold-400 font-light">
            100%
          </div>
          <p className="text-[11px] tracking-wider uppercase text-stone-500 dark:text-stone-400 mt-1">
            Local Natural Materials
          </p>
        </div>
        <div>
          <div className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 font-light">
            4.9 / 5
          </div>
          <p className="text-[11px] tracking-wider uppercase text-stone-500 dark:text-stone-400 mt-1">
            Client Review Index
          </p>
        </div>
        <div>
          <div className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 font-light">
            3 Studios
          </div>
          <p className="text-[11px] tracking-wider uppercase text-stone-500 dark:text-stone-400 mt-1">
            Zürich • Kyoto • New York
          </p>
        </div>
      </div>
    </section>
  );
}
