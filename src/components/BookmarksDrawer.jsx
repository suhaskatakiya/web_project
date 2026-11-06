import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';

export default function BookmarksDrawer({
  isOpen,
  onClose,
  savedProjects,
  onRemoveBookmark,
  onSelectProject,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-atelier-50 dark:bg-obsidian-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-gold-500 fill-gold-500" />
                <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100 font-medium">
                  Saved Projects ({savedProjects.length})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="mt-6 space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              {savedProjects.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <Bookmark className="w-8 h-8 text-stone-300 dark:text-stone-700 mx-auto" />
                  <p className="text-sm text-stone-500">
                    No projects bookmarked yet.
                  </p>
                  <p className="text-xs text-stone-400">
                    Click the bookmark icon on any project card in the portfolio to save it for inspiration.
                  </p>
                </div>
              ) : (
                savedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3 group"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 cursor-pointer"
                      onClick={() => {
                        onClose();
                        onSelectProject(project);
                      }}
                    />
                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => {
                        onClose();
                        onSelectProject(project);
                      }}
                    >
                      <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 font-medium truncate group-hover:text-gold-500 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 font-mono truncate">
                        {project.location} • {project.area}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveBookmark(project.id)}
                      className="p-2 text-stone-400 hover:text-rose-500 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-stone-200 dark:border-stone-800">
            <p className="text-[11px] text-stone-400 text-center font-mono">
              Persisted in client browser localStorage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
