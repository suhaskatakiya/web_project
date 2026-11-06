import React, { useState } from 'react';
import { materials } from '../data/materials';
import { Layers, Sparkles, MapPin, Volume2, Leaf, Shield } from 'lucide-react';

export default function MaterialsBoard() {
  const [selectedId, setSelectedId] = useState(materials[0].id);

  const activeMaterial = materials.find((m) => m.id === selectedId) || materials[0];

  return (
    <section id="materials" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200/60 dark:border-stone-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-gold-500 uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tactile Materiality &amp; Provenance</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 dark:text-stone-100 font-light">
            Materials that age with grace.
          </h2>
        </div>
        <p className="max-w-md text-stone-600 dark:text-stone-400 text-sm leading-relaxed font-light">
          We reject ephemeral composites and synthetic veneers. Our palette is drawn exclusively from living quarries, carbon-negative forestry, and centuries-old metallurgical ateliers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Materials selector tabs (Left Column) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {materials.map((mat) => {
            const isSelected = mat.id === selectedId;
            return (
              <div
                key={mat.id}
                onClick={() => setSelectedId(mat.id)}
                className={`p-4 sm:p-5 rounded-2xl cursor-pointer border transition-all ${
                  isSelected
                    ? 'border-gold-500 bg-white dark:bg-obsidian-900 shadow-md translate-x-1'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 bg-white/40 dark:bg-stone-900/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg sm:text-xl text-stone-900 dark:text-stone-100 font-medium">
                    {mat.name}
                  </span>
                  <span className="text-[11px] font-mono text-gold-500 uppercase tracking-wider">
                    {mat.origin.split(',')[0]}
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">
                  {mat.texture}
                </p>
              </div>
            );
          })}
        </div>

        {/* Material Detail Spotlight (Right Column) */}
        <div className="lg:col-span-7 bg-white dark:bg-obsidian-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Image Preview */}
            <div className="sm:col-span-5 h-64 sm:h-80 rounded-2xl overflow-hidden bg-stone-950">
              <img
                src={activeMaterial.image}
                alt={activeMaterial.name}
                className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
              />
            </div>

            {/* Information Details */}
            <div className="sm:col-span-7 space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold-500 flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Provenance: {activeMaterial.origin}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 font-light">
                  {activeMaterial.name}
                </h3>
              </div>

              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                {activeMaterial.description}
              </p>

              {/* Technical Specifications */}
              <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-stone-400" />
                    Acoustic Profile:
                  </span>
                  <span className="font-medium text-stone-800 dark:text-stone-200 font-mono">
                    {activeMaterial.acousticScore}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-stone-400" />
                    Ecology &amp; Lifecycle:
                  </span>
                  <span className="font-medium text-stone-800 dark:text-stone-200 font-mono">
                    {activeMaterial.sustainability}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-stone-400" />
                    Tactile Finish:
                  </span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">
                    {activeMaterial.texture}
                  </span>
                </div>
              </div>

              {/* Ideal Architectural Application */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 dark:text-stone-400 block mb-1">
                  Optimal Architectural Application:
                </span>
                <p className="text-xs italic text-stone-700 dark:text-stone-300 font-serif">
                  {activeMaterial.idealFor}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
