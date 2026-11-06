import React, { useState, useMemo } from 'react';
import { projects } from '../data/projects';
import { ArrowUpRight, MapPin, Maximize2, Search, Bookmark, ArrowUpDown } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function Portfolio({ onSelectProject, savedIds, onToggleBookmark, soundEnabled }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residences' },
    { id: 'cultural', label: 'Cultural & Pavilions' },
    { id: 'hospitality', label: 'Spas & Hospitality' },
    { id: 'interiors', label: 'Interiors & Studios' }
  ];

  // Dynamic search and filter logic
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          project.title.toLowerCase().includes(query) ||
          project.location.toLowerCase().includes(query) ||
          project.materials?.some((m) => m.toLowerCase().includes(query));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'area-desc') {
          return parseInt(b.area) - parseInt(a.area);
        }
        if (sortBy === 'area-asc') {
          return parseInt(a.area) - parseInt(b.area);
        }
        if (sortBy === 'year-desc') {
          return parseInt(b.year) - parseInt(a.year);
        }
        return 0;
      });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section id="works" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-gold-500 block mb-2">
            Selected Portfolio Case Studies
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 dark:text-stone-100 font-light">
            Crafted for longevity.
          </h2>
        </div>
        <p className="max-w-md text-stone-600 dark:text-stone-400 text-sm leading-relaxed font-light">
          Each commission represents a tailored response to site geography, solar orientation, and the everyday rituals of the inhabitants.
        </p>
      </div>

      {/* Filter Tabs, Search Bar, and Sort Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200 dark:border-stone-800">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playClickSound(soundEnabled);
                setActiveCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs tracking-wider font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-sm'
                  : 'border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-gold-500 bg-white/40 dark:bg-stone-900/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Live Search */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search stone, city, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:border-gold-500"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select
              value={sortBy}
              onChange={(e) => {
                playClickSound(soundEnabled);
                setSortBy(e.target.value);
              }}
              className="w-full sm:w-auto px-4 py-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs text-stone-700 dark:text-stone-300 focus:outline-none focus:border-gold-500 cursor-pointer"
            >
              <option value="default">Sort: Featured</option>
              <option value="area-desc">Area: Largest First</option>
              <option value="area-asc">Area: Smallest First</option>
              <option value="year-desc">Year: Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* No results placeholder */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 space-y-3">
          <p className="font-serif text-2xl text-stone-700 dark:text-stone-300">
            No architectural projects match "{searchQuery}"
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="text-xs text-gold-500 underline font-mono"
          >
            Clear active filters &amp; search
          </button>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => {
          const isSaved = savedIds.includes(project.id);
          return (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-2xl overflow-hidden border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-obsidian-900/40 hover:border-gold-500/60 dark:hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-72 w-full overflow-hidden bg-stone-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      onSelectProject(project);
                    }}
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="glass-panel px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-mono text-stone-900 dark:text-stone-100">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Bookmark Toggle Icon */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound(soundEnabled);
                        onToggleBookmark(project);
                      }}
                      className="w-8 h-8 rounded-full bg-stone-900/70 backdrop-blur-sm text-stone-200 flex items-center justify-center hover:bg-gold-500 hover:text-stone-950 transition-colors shadow-sm"
                      title={isSaved ? "Remove from bookmarks" : "Save project"}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'text-gold-400 fill-gold-400' : ''}`} />
                    </button>

                    {/* Expand inspector */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playClickSound(soundEnabled);
                        onSelectProject(project);
                      }}
                      className="w-8 h-8 rounded-full bg-stone-900/70 backdrop-blur-sm text-stone-200 flex items-center justify-center hover:bg-gold-500 hover:text-stone-950 transition-colors shadow-sm"
                      title="Inspect blueprint details"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs pointer-events-none">
                    <span className="flex items-center gap-1 text-stone-300">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      {project.location}
                    </span>
                    <span className="font-mono text-stone-400">{project.year}</span>
                  </div>
                </div>

                {/* Text Meta Content */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => {
                    playClickSound(soundEnabled);
                    onSelectProject(project);
                  }}
                >
                  <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 font-normal group-hover:text-gold-500 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-gold-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-2 font-light leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Materials preview */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-stone-100 dark:border-stone-800/80">
                    {project.materials?.slice(0, 3).map((mat) => (
                      <span
                        key={mat}
                        className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                      >
                        {mat}
                      </span>
                    ))}
                    {project.materials?.length > 3 && (
                      <span className="text-[10px] font-mono px-1 py-0.5 text-stone-400">
                        +{project.materials.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400">
                <span>{project.area}</span>
                <button
                  onClick={() => {
                    playClickSound(soundEnabled);
                    onSelectProject(project);
                  }}
                  className="text-gold-500 hover:underline"
                >
                  View Details &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
