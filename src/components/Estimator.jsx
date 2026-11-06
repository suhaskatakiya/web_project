import React, { useState } from 'react';
import { Calculator, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function Estimator({ onTransferToInquiry, soundEnabled }) {
  const [typology, setTypology] = useState('villa');
  const [area, setArea] = useState(650);
  const [tier, setTier] = useState('bespoke');
  const [features, setFeatures] = useState({
    geothermal: true,
    vault: false,
    pool: true,
    courtyard: true,
  });

  const typologies = [
    { id: 'villa', label: 'Private Villa / Estate', baseMonths: 16, baseCostPerSqm: 3800 },
    { id: 'penthouse', label: 'Urban Penthouse & Loft', baseMonths: 12, baseCostPerSqm: 4200 },
    { id: 'cultural', label: 'Cultural Pavilion & Gallery', baseMonths: 20, baseCostPerSqm: 4600 },
    { id: 'spa', label: 'Hospitality & Wellness Bath', baseMonths: 22, baseCostPerSqm: 5100 },
  ];

  const tiers = [
    {
      id: 'standard',
      name: 'Contemporary Studio Standard',
      multiplier: 1.0,
      desc: 'Clean minimal detailing, Valser quarzite accents, double acoustic glazing, engineered oak.',
    },
    {
      id: 'bespoke',
      name: 'Bespoke Architectural Detailing',
      multiplier: 1.25,
      desc: 'Solid hardwood Japanese joinery, hand-carved stone hearths, custom unlacquered brass hardware.',
    },
    {
      id: 'generational',
      name: 'Generational Masterwork (100-Year)',
      multiplier: 1.5,
      desc: 'Full subterranean stone excavation, museum-grade humidity vaults, NC-18 acoustic isolation.',
    },
  ];

  const toggleFeature = (key) => {
    playClickSound(soundEnabled);
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedTypology = typologies.find((t) => t.id === typology) || typologies[0];
  const selectedTier = tiers.find((t) => t.id === tier) || tiers[1];

  // Mathematical formula
  const calculatedMonths = Math.round(
    (selectedTypology.baseMonths * selectedTier.multiplier) +
    (features.geothermal ? 2 : 0) +
    (features.pool ? 2 : 0)
  );

  const baseInvestment = area * selectedTypology.baseCostPerSqm * selectedTier.multiplier;
  const addonsTotal = (features.geothermal ? 120000 : 0) +
                      (features.vault ? 160000 : 0) +
                      (features.pool ? 220000 : 0) +
                      (features.courtyard ? 80000 : 0);
  const totalEstimatedLow = Math.round((baseInvestment + addonsTotal) * 0.95);
  const totalEstimatedHigh = Math.round((baseInvestment + addonsTotal) * 1.15);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleApplyToConsultation = () => {
    playClickSound(soundEnabled);
    const summary = `${selectedTypology.label} (~${area} m² / ${selectedTier.name})`;
    if (onTransferToInquiry) {
      onTransferToInquiry(summary);
    }
  };

  return (
    <section id="estimator" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200/60 dark:border-stone-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-gold-500 block mb-2">
            Interactive Scope &amp; Budget Feasibility Tool
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-900 dark:text-stone-100 font-light">
            Plan your project parameters.
          </h2>
        </div>
        <p className="max-w-md text-stone-600 dark:text-stone-400 text-sm leading-relaxed font-light">
          Calibrate spatial area, craftsmanship tiers, and sustainability systems to preview estimated construction timelines and investment benchmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Configuration (7 cols) */}
        <div className="lg:col-span-7 space-y-8 bg-white dark:bg-obsidian-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xl">
          {/* Step 1: Typology */}
          <div>
            <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block mb-3">
              1. Project Typology
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {typologies.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setTypology(t.id);
                  }}
                  className={`p-3.5 rounded-xl text-left border text-sm transition-all ${
                    typology === t.id
                      ? 'border-gold-500 bg-gold-500/10 dark:bg-gold-400/10 font-medium'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 bg-stone-50/50 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <div className="font-serif text-base text-stone-900 dark:text-stone-100">{t.label}</div>
                  <div className="text-[11px] font-mono text-stone-500 mt-0.5">Est. {t.baseMonths} mo design &amp; build</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Scale Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400">
                2. Spatial Scale
              </label>
              <span className="font-serif text-2xl text-stone-900 dark:text-stone-100 font-medium">
                {area} m² <span className="text-xs text-stone-500 font-mono">({Math.round(area * 10.764)} sq ft)</span>
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="2000"
              step="50"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
            <div className="flex justify-between text-[11px] font-mono text-stone-400 mt-1">
              <span>200 m² (Pied-à-terre)</span>
              <span>1,000 m² (Country Home)</span>
              <span>2,000 m² (Full Estate)</span>
            </div>
          </div>

          {/* Step 3: Craftsmanship Tier */}
          <div>
            <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block mb-3">
              3. Specification &amp; Detailing Level
            </label>
            <div className="space-y-3">
              {tiers.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setTier(t.id);
                  }}
                  className={`p-4 rounded-xl cursor-pointer border transition-all ${
                    tier === t.id
                      ? 'border-gold-500 bg-gold-500/10 dark:bg-gold-400/10'
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 bg-stone-50/50 dark:bg-stone-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg font-medium text-stone-900 dark:text-stone-100">
                      {t.name}
                    </span>
                    <span className="text-xs font-mono text-gold-500 font-semibold">
                      {t.multiplier}x Density
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 4: Special Integrations */}
          <div>
            <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block mb-3">
              4. Sustainable Engineering &amp; Specialty Systems
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { key: 'geothermal', label: 'Geothermal Ground-Source Heat Pump' },
                { key: 'vault', label: 'Subterranean Climate Wine/Art Vault' },
                { key: 'pool', label: 'Natural Stone Reflection / Swimming Bath' },
                { key: 'courtyard', label: 'Inner Japanese Courtyard Garden' },
              ].map((feat) => (
                <button
                  key={feat.key}
                  type="button"
                  onClick={() => toggleFeature(feat.key)}
                  className={`p-3 rounded-lg border text-left text-xs flex items-center justify-between transition-all ${
                    features[feat.key]
                      ? 'border-gold-500 bg-gold-500/5 text-stone-900 dark:text-stone-100 font-medium'
                      : 'border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400'
                  }`}
                >
                  <span>{feat.label}</span>
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      features[feat.key] ? 'text-gold-500' : 'text-stone-300 dark:text-stone-700'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Preview Output Card (5 cols) */}
        <div className="lg:col-span-5 bg-atelier-100/80 dark:bg-obsidian-950 rounded-3xl p-6 sm:p-8 border border-stone-300/80 dark:border-stone-800 space-y-6 lg:sticky lg:top-28">
          <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
            <span className="text-[11px] font-mono uppercase tracking-wider text-gold-500 flex items-center gap-1.5 mb-1">
              <Calculator className="w-3.5 h-3.5" />
              Calculated Projection
            </span>
            <h3 className="font-serif text-2xl text-stone-900 dark:text-stone-100">
              Project Feasibility Synthesis
            </h3>
          </div>

          {/* Time & Carbon stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-500 block">
                Estimated Timeline
              </span>
              <div className="font-serif text-2xl text-stone-900 dark:text-stone-100 font-medium mt-1">
                {calculatedMonths} - {calculatedMonths + 3} Mo.
              </div>
              <span className="text-[10px] text-stone-500 block mt-0.5">Permits to keys handover</span>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-500 block">
                Energy Standard
              </span>
              <div className="font-serif text-2xl text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                Passive A+
              </div>
              <span className="text-[10px] text-stone-500 block mt-0.5">Low-energy certified</span>
            </div>
          </div>

          {/* Financial Guidance Range */}
          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
              Estimated Construction &amp; Joinery Budget
            </span>
            <div className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-light">
              {formatCurrency(totalEstimatedLow)} – {formatCurrency(totalEstimatedHigh)}
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              *Preliminary estimate based on regional European construction indices and material procurement.
            </p>
          </div>

          {/* Transfer Button */}
          <a
            href="#contact"
            onClick={handleApplyToConsultation}
            className="w-full py-4 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs tracking-wider uppercase font-semibold hover:bg-gold-500 dark:hover:bg-gold-400 dark:hover:text-stone-950 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span>Transfer Scope To Inquiry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
