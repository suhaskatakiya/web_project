import React from 'react';
import { Quote, Sparkles, CheckCircle2, Star, Users } from 'lucide-react';

export default function Philosophy() {
  const testimonials = [
    {
      client: 'Sarah & Michael Chen',
      project: 'Lake Lugano Residence',
      review: 'They took the time to understand how our family actually moves through a home. The morning sun in the kitchen and the sound insulation in our study make everyday living exceptionally peaceful.',
      rating: 5,
    },
    {
      client: 'Dr. Julian Keller',
      project: 'Engadin Alpine Retreat',
      review: 'The technical planning for geothermal heating and heavy winter snow loads was flawless. The house stays warm and quiet during mountain blizzards using half the energy of our prior property.',
      rating: 5,
    },
    {
      client: 'Marcus Weber & Partners',
      project: 'Brera Atelier & Gallery',
      review: 'Their joinery team delivered custom fluted walnut cabinetry with millimeter precision. They respect construction deadlines without sacrificing tactile craftsmanship.',
      rating: 5,
    },
  ];

  const values = [
    {
      title: 'Material Honesty',
      desc: 'If an element looks like timber or stone, it is solid timber or stone. We deliberately reject printed plastic composites and synthetic laminates.',
    },
    {
      title: 'Passive Climate Planning',
      desc: 'Orienting window openings and eaves to catch low winter sun while shading high summer heat drastically cuts mechanical energy demands.',
    },
    {
      title: 'Acoustic Comfort',
      desc: 'Modern open-plan homes often suffer from harsh audio reverberations. We engineer ceiling angles and clay plasters to ensure a calm, rested nervous system.',
    },
  ];

  return (
    <section id="philosophy" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200/60 dark:border-stone-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Studio Values */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-gold-500 block mb-2">
              Studio Methodology &amp; Principles
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 dark:text-stone-100 font-light leading-tight">
              Good architecture is quiet, purposeful, and honest to its materials.
            </h2>
          </div>

          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed font-light">
            We believe a home should never feel like a fragile museum you are nervous to live in. It should happily welcome dinner parties with friends, children playing, and forty years of shifting seasons without showing premature wear.
          </p>

          {/* 3 Core Principles */}
          <div className="space-y-4 pt-2">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 flex items-start gap-3.5"
              >
                <div className="w-5 h-5 rounded-full bg-gold-500/10 text-gold-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-stone-900 dark:text-stone-100 font-medium">
                    {v.title}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Studio Leadership */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-8 text-xs text-stone-500">
            <div>
              <span className="font-serif text-lg text-stone-900 dark:text-stone-200 block font-medium">
                Éléonore Vance
              </span>
              <span>Lead Architect &amp; Partner, Zürich</span>
            </div>
            <div className="sm:border-l sm:border-stone-200 dark:sm:border-stone-800 sm:pl-8">
              <span className="font-serif text-lg text-stone-900 dark:text-stone-200 block font-medium">
                Kenjiro Takahashi
              </span>
              <span>Spatial Design &amp; Joinery Director, Kyoto</span>
            </div>
          </div>
        </div>

        {/* Right: Realistic Client Testimonials */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-gold-500" />
            <span>Client Experiences &amp; Feedback</span>
          </div>

          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-obsidian-900/60 space-y-3 shadow-sm hover:border-gold-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-sm text-stone-900 dark:text-stone-100 block">
                    {item.client}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {item.project}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-gold-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-500" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                "{item.review}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
