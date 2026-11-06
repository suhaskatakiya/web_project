import React, { useState } from 'react';
import { Sun, Moon, Sunrise, Sunset, Lightbulb, Compass, Sliders } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function LightingSimulator({ soundEnabled }) {
  const [activePreset, setActivePreset] = useState('golden');
  const [interiorLights, setInteriorLights] = useState(true);
  const [softShadows, setSoftShadows] = useState(true);
  const [luxValue, setLuxValue] = useState(420);

  const presets = [
    {
      id: 'dawn',
      label: 'Morning Light',
      time: '06:30',
      kelvin: '3200K',
      lux: 180,
      icon: Sunrise,
      description: 'Soft horizontal morning daylight filtering through east-facing glazing with subtle mist diffusion.',
      overlayClass: 'bg-gradient-to-tr from-amber-900/40 via-rose-900/20 to-indigo-950/40 mix-blend-color-burn',
      lightTone: 'text-rose-400',
      sunPosition: '14° East'
    },
    {
      id: 'noon',
      label: 'Midday Sun',
      time: '12:00',
      kelvin: '5600K',
      lux: 850,
      icon: Sun,
      description: 'High solar angle with deep overhang shading. Planar shadows along stone walls keep interiors cool.',
      overlayClass: 'bg-gradient-to-b from-sky-400/10 via-transparent to-amber-100/10 mix-blend-screen',
      lightTone: 'text-amber-300',
      sunPosition: '68° South'
    },
    {
      id: 'golden',
      label: 'Golden Hour',
      time: '18:15',
      kelvin: '2400K',
      lux: 420,
      icon: Sunset,
      description: 'Warm amber tones reflecting across oiled timber floors and textured quarzite stonework.',
      overlayClass: 'bg-gradient-to-r from-amber-600/40 via-yellow-600/25 to-stone-950/50 mix-blend-hard-light',
      lightTone: 'text-amber-500',
      sunPosition: '18° West'
    },
    {
      id: 'midnight',
      label: 'Night Ambient',
      time: '23:00',
      kelvin: '1800K',
      lux: 45,
      icon: Moon,
      description: 'Quiet evening atmosphere illuminated by low-glare warm 2700K recessed cove architectural lighting.',
      overlayClass: 'bg-gradient-to-t from-stone-950/80 via-indigo-950/60 to-stone-950/70 mix-blend-multiply',
      lightTone: 'text-blue-300',
      sunPosition: 'Sub-Horizon'
    }
  ];

  const currentPreset = presets.find((p) => p.id === activePreset) || presets[2];

  return (
    <section id="lighting" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200/60 dark:border-stone-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-gold-500 block mb-2">
              Interactive Solar &amp; Daylight Lab
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 dark:text-stone-100 font-light leading-tight">
              Daylight simulation &amp; solar studies.
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-4 leading-relaxed font-light">
              We design window openings and eaves to work in harmony with the sun trajectory. Experience how a single living room adapts across the daylight cycle.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {presets.map((preset) => {
              const Icon = preset.icon;
              const isSelected = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setActivePreset(preset.id);
                    setLuxValue(preset.lux);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'border-gold-500 bg-gold-500/10 dark:bg-gold-400/10 shadow-sm'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-700 bg-white/40 dark:bg-stone-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-gold-500' : 'text-stone-500'}`} />
                    <span className="font-mono text-xs text-stone-500 dark:text-stone-400">{preset.time}</span>
                  </div>
                  <div className="font-serif text-lg text-stone-900 dark:text-stone-100 font-medium">
                    {preset.label}
                  </div>
                  <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 mt-0.5">
                    {preset.kelvin} • {preset.lux} Lux
                  </div>
                </button>
              );
            })}
          </div>

          {/* Toggles */}
          <div className="p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-gold-500" />
                Warm Cove Sconces (2700K)
              </span>
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setInteriorLights(!interiorLights);
                }}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  interiorLights ? 'bg-gold-500' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    interiorLights ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-stone-800">
              <span className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-gold-500" />
                Atmospheric Soft Diffusion
              </span>
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  setSoftShadows(!softShadows);
                }}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  softShadows ? 'bg-gold-500' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    softShadows ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <p className="text-xs text-stone-500 dark:text-stone-400 italic font-serif leading-relaxed">
            "{currentPreset.description}"
          </p>
        </div>

        {/* Right Column: Visualizer */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-xl bg-stone-950">
            <div className="relative h-[420px] sm:h-[500px] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
                alt="Living Sanctuary Chamber"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  softShadows ? 'filter blur-[0.2px]' : 'filter contrast-110'
                }`}
              />

              <div className={`absolute inset-0 transition-all duration-700 pointer-events-none ${currentPreset.overlayClass}`} />

              {interiorLights && (
                <div className="absolute inset-0 bg-radial-gradient pointer-events-none transition-opacity duration-500 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-400/25 via-transparent to-transparent mix-blend-screen" />
              )}

              {/* HUD Chips */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                <span className="glass-panel px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-gold-500" />
                  Sun Angle: {currentPreset.sunPosition}
                </span>
                <span className="glass-panel px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider text-stone-800 dark:text-stone-200">
                  Color Temp: {currentPreset.kelvin}
                </span>
              </div>

              {/* Active Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between glass-panel px-5 py-3 rounded-xl text-stone-900 dark:text-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gold-400 animate-pulse"></div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 block font-mono">
                      Current Light Phase
                    </span>
                    <span className="font-serif text-base font-medium">
                      {currentPreset.label} — {currentPreset.time}
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className="text-gold-500 font-semibold">{luxValue}</span> Lux Ambient
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
