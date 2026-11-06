import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, MapPin, Mail, Phone, Calendar, ShieldCheck, Clock } from 'lucide-react';
import { playClickSound } from '../utils/audio';

export default function ContactSection({ prefillScope, setPrefillScope, soundEnabled }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    serviceType: 'full-architecture',
    budgetRange: '300k-600k',
    scope: prefillScope || '',
    aesthetics: ['Alpine Stone & Timber'],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (prefillScope) {
      setFormData((prev) => ({
        ...prev,
        scope: prefillScope,
        message: prev.message || `We would like to discuss feasibility for: ${prefillScope}.`,
      }));
    }
  }, [prefillScope]);

  const aestheticOptions = [
    'Alpine Stone & Timber',
    'Japanese Joinery & Cedar',
    'Cast Concrete & Steel',
    'Honed Travertine & Glass',
    'Clay Plaster & Earth Tones',
  ];

  const handleAestheticToggle = (option) => {
    playClickSound(soundEnabled);
    setFormData((prev) => {
      const exists = prev.aesthetics.includes(option);
      return {
        ...prev,
        aesthetics: exists
          ? prev.aesthetics.filter((item) => item !== option)
          : [...prev.aesthetics, option],
      };
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.location.trim()) errs.location = 'Please state your project city or location.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClickSound(soundEnabled);
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const randomCode = `AET-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceCode(randomCode);
    setSubmitted(true);
  };

  const resetForm = () => {
    playClickSound(soundEnabled);
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      serviceType: 'full-architecture',
      budgetRange: '300k-600k',
      scope: '',
      aesthetics: ['Alpine Stone & Timber'],
      message: '',
    });
    if (setPrefillScope) setPrefillScope('');
  };

  return (
    <section id="contact" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-stone-200/60 dark:border-stone-800/80">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Context & Studio Details */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-gold-500 block mb-2">
              Project Inquiries &amp; Consultations
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-stone-900 dark:text-stone-100 font-light">
              Start your project consultation.
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-4 leading-relaxed font-light">
              Whether you are planning a new private residence, a renovation, or an interior sanctuary, we would be pleased to review your site parameters.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 dark:text-stone-200 block font-serif text-base">Zürich Studio</strong>
                <span>Rennweg 38, 8001 Zürich, Switzerland</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 dark:text-stone-200 block font-serif text-base">Kyoto Workshop</strong>
                <span>Higashiyama-ku, Kyoto 605-0074, Japan</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 dark:text-stone-200 block font-serif text-base">Direct Studio Email</strong>
                <span className="font-mono text-xs">projects@aethel-atelier.ch</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-500 space-y-1.5">
            <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-gold-500" />
              <span>Response Timeline</span>
            </div>
            <p>Our project director reviews all inquiries within 1 to 2 business days. Initial feasibility assessments include terrain orientation and zoning checks.</p>
          </div>
        </div>

        {/* Right Column: Realistic Consultation Form */}
        <div className="lg:col-span-7 bg-white dark:bg-obsidian-900 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. David Miller"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm bg-stone-50/50 dark:bg-stone-950/50 text-stone-900 dark:text-stone-100 focus:outline-none transition-colors ${
                    errors.fullName ? 'border-rose-500' : 'border-stone-200 dark:border-stone-800 focus:border-gold-500'
                  }`}
                />
                {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm bg-stone-50/50 dark:bg-stone-950/50 text-stone-900 dark:text-stone-100 focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-500' : 'border-stone-200 dark:border-stone-800 focus:border-gold-500'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Phone & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+41 44 211 00 00"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 focus:border-gold-500 text-sm bg-stone-50/50 dark:bg-stone-950/50 text-stone-900 dark:text-stone-100 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                  Project Location (City &amp; Country) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zurich, Switzerland"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm bg-stone-50/50 dark:bg-stone-950/50 text-stone-900 dark:text-stone-100 focus:outline-none transition-colors ${
                    errors.location ? 'border-rose-500' : 'border-stone-200 dark:border-stone-800 focus:border-gold-500'
                  }`}
                />
                {errors.location && <p className="text-xs text-rose-500 mt-1">{errors.location}</p>}
              </div>
            </div>

            {/* Service & Budget Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                  Required Service
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 focus:border-gold-500 text-sm bg-stone-50/50 dark:bg-stone-950/50 text-stone-900 dark:text-stone-100 focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="full-architecture">New Build Architecture &amp; Construction</option>
                  <option value="interior-renovation">Interior Architecture &amp; Joinery</option>
                  <option value="spatial-consultation">Site Feasibility &amp; Solar Study</option>
                  <option value="commercial-hospitality">Commercial / Hospitality Space</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                  Estimated Target Budget
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 focus:border-gold-500 text-sm bg-stone-50/50 dark:bg-stone-950/50 text-stone-900 dark:text-stone-100 focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="150k-300k">$150,000 – $300,000</option>
                  <option value="300k-600k">$300,000 – $600,000</option>
                  <option value="600k-1.5m">$600,000 – $1,500,000</option>
                  <option value="above-1.5m">$1,500,000+</option>
                </select>
              </div>
            </div>

            {/* Scope / Typology Reference */}
            <div>
              <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                Estimated Scope / Benchmark
              </label>
              <input
                type="text"
                placeholder="e.g. Private Villa (~650 m²)"
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 focus:border-gold-500 text-sm bg-stone-50/50 dark:bg-stone-950/50 text-stone-900 dark:text-stone-100 focus:outline-none transition-colors"
              />
            </div>

            {/* Aesthetic Affinities */}
            <div>
              <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                Material &amp; Style Preferences
              </label>
              <div className="flex flex-wrap gap-2">
                {aestheticOptions.map((opt) => {
                  const active = formData.aesthetics.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleAestheticToggle(opt)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all border ${
                        active
                          ? 'border-gold-500 bg-gold-500/10 text-stone-900 dark:text-stone-100 font-medium'
                          : 'border-stone-200 dark:border-stone-800 text-stone-500 hover:border-stone-400'
                      }`}
                    >
                      {active ? '✓ ' : '+ '} {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-xs uppercase font-mono tracking-wider text-stone-500 dark:text-stone-400 block mb-2">
                Project Notes &amp; Site Details
              </label>
              <textarea
                rows="4"
                placeholder="Briefly describe your site, timeline expectations, or special requirements..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 focus:border-gold-500 text-sm bg-stone-50/50 dark:bg-stone-950/50 text-stone-900 dark:text-stone-100 focus:outline-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs tracking-wider uppercase font-semibold hover:bg-gold-500 dark:hover:bg-gold-400 dark:hover:text-stone-950 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Submit Project Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-atelier-50 dark:bg-obsidian-900 rounded-3xl p-6 sm:p-8 border border-stone-300 dark:border-stone-800 shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-gold-500">
                Inquiry Received
              </span>
              <h3 className="font-serif text-3xl text-stone-900 dark:text-stone-100 mt-1">
                Thank You, {formData.fullName}
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 font-mono text-xs text-left space-y-2">
              <div className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-1.5">
                <span className="text-stone-400">Reference ID:</span>
                <span className="text-gold-500 font-semibold">{referenceCode}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-1.5">
                <span className="text-stone-400">Contact Email:</span>
                <span className="text-stone-800 dark:text-stone-200">{formData.email}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-1.5">
                <span className="text-stone-400">Project Location:</span>
                <span className="text-stone-800 dark:text-stone-200">{formData.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Status:</span>
                <span className="text-emerald-500 font-medium">Pending Architect Review</span>
              </div>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-light">
              We have received your site parameters. One of our lead architects will review your details and send a preliminary assessment within 48 hours.
            </p>

            <button
              onClick={resetForm}
              className="w-full py-3.5 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs tracking-wider uppercase font-semibold hover:bg-gold-500 dark:hover:bg-gold-400 dark:hover:text-stone-950 transition-all"
            >
              Close &amp; Return to Website
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
