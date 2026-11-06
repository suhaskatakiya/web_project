import React, { useState } from 'react';
import { X, MapPin, Calendar, Layers, ShieldCheck, ChevronRight, ChevronLeft, ArrowRight, Bookmark, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function ProjectModal({ project, onClose, onSelectForInquiry, isSaved, onToggleBookmark, soundEnabled }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  const images = project.gallery || [project.image];

  const handleNext = () => {
    playClickSound(soundEnabled);
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    playClickSound(soundEnabled);
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto bg-stone-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-atelier-50 dark:bg-obsidian-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-300/60 dark:border-stone-800 my-8">
        {/* Top Action Buttons */}
        <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
          {onToggleBookmark && (
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                onToggleBookmark(project);
              }}
              className="p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900 text-stone-200 transition-colors"
              title={isSaved ? "Remove from bookmarks" : "Save project"}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'text-gold-400 fill-gold-400' : ''}`} />
            </button>
          )}

          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onClose();
            }}
            className="p-2.5 rounded-full bg-stone-900/60 hover:bg-stone-900 text-stone-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Gallery */}
        <div className="relative h-[320px] sm:h-[400px] w-full bg-stone-950 overflow-hidden">
          <img
            src={images[activeImageIndex]}
            alt={project.title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <button
                onClick={handlePrev}
                className="pointer-events-auto p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition-all backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="pointer-events-auto p-2 rounded-full bg-stone-900/60 hover:bg-stone-900 text-white transition-all backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Image index counter */}
          <div className="absolute bottom-4 right-4 glass-panel px-3 py-1 rounded-full text-xs font-mono text-stone-900 dark:text-stone-200">
            {activeImageIndex + 1} / {images.length}
          </div>

          <div className="absolute bottom-4 left-4 glass-panel px-3.5 py-1.5 rounded-full text-xs font-medium text-stone-900 dark:text-stone-200">
            {project.categoryLabel}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto">
          {/* Title & Metadata */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
            <div>
              <div className="flex items-center gap-2 text-gold-500 text-xs uppercase tracking-wider mb-1.5 font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>{project.location}</span>
                <span>•</span>
                <Calendar className="w-3.5 h-3.5" />
                <span>Completed {project.year}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-light">
                {project.title}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 block font-mono">
                Total Spatial Area
              </span>
              <span className="font-serif text-2xl text-stone-900 dark:text-stone-100 font-medium">
                {project.area}
              </span>
            </div>
          </div>

          {/* Concept */}
          <div className="space-y-2">
            <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 font-medium">
              Architectural Concept &amp; Planning
            </h3>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-light text-sm">
              {project.concept}
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block">
                Construction Timeline
              </span>
              <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 mt-1 block">
                {project.stats?.completionTime}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block">
                Environmental Standard
              </span>
              <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 mt-1 block">
                {project.stats?.certifications}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block">
                Acoustic Rating
              </span>
              <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 mt-1 block">
                {project.stats?.acoustics}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block">
                Solar Orientation
              </span>
              <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 mt-1 block">
                {project.stats?.orientation}
              </span>
            </div>
          </div>

          {/* Materials */}
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-gold-500" />
              Primary Material Palette
            </span>
            <div className="flex flex-wrap gap-2">
              {project.materials?.map((mat) => (
                <span
                  key={mat}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-stone-200/70 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-500" />
                Technical &amp; Engineering Highlights
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 dark:text-stone-300">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/60 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800/60">
                    <span className="text-gold-500">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer Action */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
              Case Study #{project.id.toUpperCase()}-2024
            </span>

            <button
              onClick={() => {
                playClickSound(soundEnabled);
                onClose();
                if (onSelectForInquiry) onSelectForInquiry(project.title);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs tracking-wider uppercase font-semibold hover:bg-gold-500 dark:hover:bg-gold-400 dark:hover:text-stone-950 transition-all flex items-center justify-center gap-2"
            >
              <span>Inquire About Similar Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
