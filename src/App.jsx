import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import LightingSimulator from './components/LightingSimulator';
import MaterialsBoard from './components/MaterialsBoard';
import Estimator from './components/Estimator';
import Philosophy from './components/Philosophy';
import Journal from './components/Journal';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import BookmarksDrawer from './components/BookmarksDrawer';
import ProjectSpecsModal from './components/ProjectSpecsModal';
import { ArrowUp } from 'lucide-react';
import { playClickSound } from './utils/audio';

export default function App() {
  // Theme state persisted in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  // Web Audio state
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('sound') !== 'false';
  });

  // Bookmarked projects persisted in localStorage
  const [savedProjects, setSavedProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('savedProjects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [prefillScope, setPrefillScope] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync dark class and localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Sync sound preference
  useEffect(() => {
    localStorage.setItem('sound', soundEnabled ? 'true' : 'false');
  }, [soundEnabled]);

  // Sync saved bookmarks
  useEffect(() => {
    localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
  }, [savedProjects]);

  // Scroll listener for back to top
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playClickSound(soundEnabled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (project) => {
    setSavedProjects((prev) => {
      const exists = prev.some((p) => p.id === project.id);
      if (exists) {
        return prev.filter((p) => p.id !== project.id);
      } else {
        return [...prev, project];
      }
    });
  };

  const handleRemoveBookmark = (projectId) => {
    playClickSound(soundEnabled);
    setSavedProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const handleTransferToInquiry = (scopeText) => {
    playClickSound(soundEnabled);
    setPrefillScope(scopeText);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const savedIds = savedProjects.map((p) => p.id);

  return (
    <div className="min-h-screen bg-atelier-50 text-stone-900 dark:bg-obsidian-950 dark:text-stone-100 transition-colors duration-300 relative selection:bg-gold-500/20 selection:text-gold-400">
      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        savedCount={savedProjects.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onOpenContact={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content */}
      <main>
        <Hero
          soundEnabled={soundEnabled}
          onExploreWorks={() => {
            const el = document.getElementById('works');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <Portfolio
          soundEnabled={soundEnabled}
          savedIds={savedIds}
          onToggleBookmark={handleToggleBookmark}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <LightingSimulator soundEnabled={soundEnabled} />

        <MaterialsBoard />

        <Estimator
          soundEnabled={soundEnabled}
          onTransferToInquiry={handleTransferToInquiry}
        />

        <Philosophy />

        <Journal />

        <ContactSection
          soundEnabled={soundEnabled}
          prefillScope={prefillScope}
          setPrefillScope={setPrefillScope}
        />
      </main>

      {/* Footer */}
      <Footer
        soundEnabled={soundEnabled}
        onOpenSpecs={() => setIsSpecsOpen(true)}
      />

      {/* Project Inspector Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          soundEnabled={soundEnabled}
          isSaved={savedIds.includes(selectedProject.id)}
          onToggleBookmark={handleToggleBookmark}
          onClose={() => setSelectedProject(null)}
          onSelectForInquiry={(projectTitle) => {
            handleTransferToInquiry(`Architecture commission inspired by ${projectTitle}`);
          }}
        />
      )}

      {/* Bookmarks Slide-over Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedProjects={savedProjects}
        onRemoveBookmark={handleRemoveBookmark}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* WebTech Project Specs Modal */}
      <ProjectSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
      />

      {/* Back to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 shadow-xl hover:bg-gold-500 dark:hover:bg-gold-400 dark:hover:text-stone-950 transition-all duration-300 animate-fade-in hover:scale-110"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
