import React, { useState, useEffect } from 'react';
import { Compass, Moon, Sun, Menu, X, ArrowUpRight, Clock, Bookmark, Volume2, VolumeX, Code2 } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function Navbar({
  darkMode,
  setDarkMode,
  soundEnabled,
  setSoundEnabled,
  savedCount,
  onOpenBookmarks,
  onOpenSpecs,
  onOpenContact,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studioTimes, setStudioTimes] = useState({ zurich: '', tokyo: '', ny: '' });

  // Handle scroll blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live Studio Times
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const zurichTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Zurich',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);

      const tokyoTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);

      const nyTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);

      setStudioTimes({ zurich: zurichTime, tokyo: tokyoTime, ny: nyTime });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = () => {
    playClickSound(soundEnabled);
  };

  const navLinks = [
    { name: 'Works', href: '#works' },
    { name: 'Lighting Lab', href: '#lighting' },
    { name: 'Materials', href: '#materials' },
    { name: 'Estimator', href: '#estimator' },
    { name: 'Journal', href: '#journal' },
    { name: 'Philosophy', href: '#philosophy' },
  ];

  return (
    <>
      {/* Studio Ticker Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-[11px] tracking-wider uppercase border-b border-stone-200/60 dark:border-stone-800/80 bg-atelier-100/70 dark:bg-obsidian-950/80 text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 font-medium text-stone-700 dark:text-stone-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Studios In Session
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-gold-500" />
            Zürich <span className="text-stone-700 dark:text-stone-200 font-mono ml-1">{studioTimes.zurich || '10:00:00'}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Tokyo <span className="text-stone-700 dark:text-stone-200 font-mono ml-1">{studioTimes.tokyo || '18:00:00'}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            New York <span className="text-stone-700 dark:text-stone-200 font-mono ml-1">{studioTimes.ny || '04:00:00'}</span>
          </span>
        </div>

        {/* Academic & Tech Badge */}
        <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400">
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onOpenSpecs();
            }}
            className="flex items-center gap-1.5 text-gold-500 dark:text-gold-400 hover:underline font-mono text-[10px]"
          >
            <Code2 className="w-3 h-3" />
            <span>WebTech Project Specs</span>
          </button>
          <span>•</span>
          <span className="normal-case text-xs text-stone-600 dark:text-stone-300">
            React + Vite + Tailwind Architecture
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-sm py-3 px-6 lg:px-12 border-b border-stone-200/40 dark:border-stone-800/60'
            : 'bg-transparent py-5 px-6 lg:px-12'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={handleLinkClick}
            className="flex items-center gap-3.5 group"
          >
            <div className="w-9 h-9 rounded-full border border-stone-800/30 dark:border-gold-400/40 flex items-center justify-center transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-500">
              <Compass className="w-4 h-4 text-stone-800 dark:text-gold-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl tracking-[0.2em] uppercase font-medium text-stone-900 dark:text-stone-100">
                AETHEL &amp; CO.
              </span>
              <span className="text-[9px] tracking-[0.28em] uppercase text-stone-500 dark:text-stone-400 font-sans">
                Spatial Architecture Lab
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-7 text-[12px] tracking-widest uppercase font-medium text-stone-700 dark:text-stone-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="relative py-1 transition-colors hover:text-gold-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action Icons & Commission CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                playClickSound(next);
              }}
              className="p-2 rounded-full border border-stone-300/80 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-gold-500 transition-colors"
              title={soundEnabled ? "Mute interactive click audio" : "Enable Web Audio feedback"}
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-gold-500" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              )}
            </button>

            {/* Saved Bookmarks Button */}
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                onOpenBookmarks();
              }}
              className="relative p-2 rounded-full border border-stone-300/80 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-gold-500 transition-colors"
              title="View Bookmarked Projects"
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedCount > 0 ? 'text-gold-500 fill-gold-500' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold-500 text-stone-950 font-mono text-[9px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setDarkMode(!darkMode);
              }}
              className="p-2 rounded-full border border-stone-300/80 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-gold-500 transition-colors"
              aria-label="Toggle Theme"
              title={darkMode ? "Switch to Day Mode" : "Switch to Night Mode"}
            >
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 text-gold-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-stone-700" />
              )}
            </button>

            {/* Project Specs Button */}
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                onOpenSpecs();
              }}
              className="px-3 py-1.5 rounded-full border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-[11px] font-mono hover:border-gold-500 transition-colors"
              title="Inspect WebTech code documentation"
            >
              &lt;Specs /&gt;
            </button>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={() => {
                playClickSound(soundEnabled);
                if (onOpenContact) onOpenContact();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs tracking-wider uppercase font-medium hover:bg-gold-500 dark:hover:bg-gold-400 dark:hover:text-stone-950 transition-colors shadow-sm ml-1"
            >
              <span>Consultation</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                onOpenBookmarks();
              }}
              className="relative p-2 text-stone-700 dark:text-stone-300"
            >
              <Bookmark className={`w-4 h-4 ${savedCount > 0 ? 'text-gold-500 fill-gold-500' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-gold-500 text-stone-950 font-mono text-[8px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setDarkMode(!darkMode);
              }}
              className="p-2 text-stone-700 dark:text-stone-300"
            >
              {darkMode ? <Sun className="w-4 h-4 text-gold-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-stone-800 dark:text-stone-200"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md sm:hidden flex flex-col justify-between p-8 text-stone-100 animate-fade-in">
          <div className="flex justify-between items-center pb-6 border-b border-stone-800">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.2em] uppercase font-medium">AETHEL &amp; CO.</span>
              <span className="text-[10px] tracking-widest text-gold-400 uppercase">Spatial Architecture</span>
            </div>
            <button
              onClick={() => {
                playClickSound(soundEnabled);
                setMobileMenuOpen(false);
              }}
              className="p-2 text-stone-300 hover:text-white"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="flex flex-col gap-6 text-xl font-serif tracking-wider my-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  playClickSound(soundEnabled);
                  setMobileMenuOpen(false);
                }}
                className="py-1 hover:text-gold-400 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-stone-500" />
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSpecs();
              }}
              className="py-1 text-left text-gold-400 font-mono text-sm uppercase flex items-center justify-between"
            >
              <span>&lt;WebTech Project Specs /&gt;</span>
              <ArrowUpRight className="w-4 h-4 text-gold-400" />
            </button>
          </div>

          <div className="pt-6 border-t border-stone-800 flex flex-col gap-4">
            <a
              href="#contact"
              onClick={() => {
                playClickSound(soundEnabled);
                setMobileMenuOpen(false);
                if (onOpenContact) onOpenContact();
              }}
              className="w-full text-center py-3.5 rounded-full bg-gold-400 text-stone-950 text-xs tracking-widest uppercase font-semibold"
            >
              Request Project Consultation
            </a>
          </div>
        </div>
      )}
    </>
  );
}
