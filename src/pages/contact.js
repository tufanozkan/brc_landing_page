import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/utils/LanguageContext';

// ─── Cloudflare Turnstile Widget ───────────────────────────────────────────
// Renders only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is defined.
function TurnstileWidget({ onVerify }) {
  const ref = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !ref.current) return;

    // Load Turnstile script once
    if (!document.getElementById('cf-turnstile-script')) {
      const script = document.createElement('script');
      script.id = 'cf-turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const render = () => {
      if (window.turnstile && ref.current && !ref.current.dataset.rendered) {
        ref.current.dataset.rendered = 'true';
        window.turnstile.render(ref.current, {
          sitekey: siteKey,
          callback: (token) => onVerify(token),
        });
      }
    };

    if (window.turnstile) {
      render();
    } else {
      const script = document.getElementById('cf-turnstile-script');
      script.addEventListener('load', render);
      return () => script.removeEventListener('load', render);
    }
  }, [siteKey, onVerify]);

  if (!siteKey) return null;
  return <div ref={ref} className="mt-4" />;
}

// ─── Form initial state ────────────────────────────────────────────────────
const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [mapConsent, setMapConsent] = useState(false);

  // ── Controlled input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Client-side pre-validation (fast feedback before network round-trip)
  const clientValidate = () => {
    if (!formData.name.trim() || formData.name.trim().length < 2)
      return 'Ad Soyad en az 2 karakter olmalıdır.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return 'Geçerli bir e-posta adresi giriniz.';
    if (!formData.subject.trim() || formData.subject.trim().length < 2)
      return 'Konu en az 2 karakter olmalıdır.';
    if (!formData.message.trim() || formData.message.trim().length < 10)
      return 'Mesaj en az 10 karakter olmalıdır.';
    if (!kvkkConsent)
      return t('contact.kvkkError');
    return null;
  };

  // ── Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Double-submit guard
    if (status === 'loading' || status === 'success') return;

    // Client validation
    const clientError = clientValidate();
    if (clientError) {
      setErrorMsg(clientError);
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          website: '',           // honeypot — always empty for real users
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setFormData(EMPTY_FORM);
      } else {
        setStatus('error');
        setErrorMsg(data.message || t('contact.errorGeneral'));
      }
    } catch {
      setStatus('error');
      setErrorMsg(t('contact.errorGeneral'));
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMsg('');
    setFormData(EMPTY_FORM);
    setKvkkConsent(false);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-tealAccent focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed';

  const isDisabled = status === 'loading' || status === 'success';

  return (
    <>
      <Head>
        <title>{t('contact.metaTitle')}</title>
        <meta name="description" content={t('contact.metaDesc')} />
      </Head>

      {/* Header Banner */}
      <section className="bg-charcoal py-20 border-b border-charcoal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4"
          >
            {t('contact.headerTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            {t('contact.headerSubtitle')}
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">

            {/* Left: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-white border border-gray-100 shadow-xl rounded-2xl p-8 md:p-10"
            >
              <h2 className="text-3xl font-bold text-charcoal mb-2">{t('contact.formTitle')}</h2>
              <p className="text-gray-500 mb-8">{t('contact.formSubtitle')}</p>

              <AnimatePresence mode="wait">
                {/* ── Success State ── */}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-charcoal mb-2">
                        {t('contact.successTitle')}
                      </h3>
                      <p className="text-gray-500 max-w-sm">{t('contact.successDesc')}</p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="px-8 py-3 border-2 border-tealAccent text-tealAccent font-semibold rounded-lg hover:bg-tealAccent hover:text-white transition-all duration-300"
                    >
                      {t('contact.successButton')}
                    </button>
                  </motion.div>
                )}

                {/* ── Form State ── */}
                {status !== 'success' && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* ── Honeypot (hidden from real users, visible to bots) ── */}
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                      <label htmlFor="website">Website</label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        defaultValue=""
                      />
                    </div>

                    {/* ── Name & Email row ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">
                          {t('contact.fieldName')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          autoComplete="name"
                          placeholder={t('contact.placeholderName')}
                          value={formData.name}
                          onChange={handleChange}
                          disabled={isDisabled}
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                          {t('contact.fieldEmail')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          autoComplete="email"
                          placeholder={t('contact.placeholderEmail')}
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isDisabled}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* ── Subject ── */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        {t('contact.fieldSubject')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        autoComplete="off"
                        placeholder={t('contact.placeholderSubject')}
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={isDisabled}
                        className={inputClass}
                      />
                    </div>

                    {/* ── Message ── */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">
                        {t('contact.fieldMessage')} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        autoComplete="off"
                        placeholder={t('contact.placeholderMessage')}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isDisabled}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    {/* ── Turnstile CAPTCHA (optional) ── */}
                    <TurnstileWidget onVerify={setTurnstileToken} />

                    {/* ── KVKK Consent Checkbox ── */}
                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="kvkkConsent"
                        name="kvkkConsent"
                        checked={kvkkConsent}
                        onChange={(e) => setKvkkConsent(e.target.checked)}
                        disabled={isDisabled}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-tealAccent focus:ring-tealAccent cursor-pointer disabled:cursor-not-allowed shrink-0"
                      />
                      <label htmlFor="kvkkConsent" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                        {t('contact.kvkkConsent')}{' '}
                        <Link
                          href="/kvkk"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-tealAccent hover:underline font-medium"
                        >
                          {t('contact.kvkkConsentLink')}
                        </Link>
                        {' '}{t('contact.kvkkConsentSuffix')}
                        {' '}<span className="text-red-500">*</span>
                      </label>
                    </div>

                    {/* ── Error message ── */}
                    <AnimatePresence>
                      {status === 'error' && errorMsg && (
                        <motion.div
                          key="error"
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                          role="alert"
                        >
                          <AlertCircle size={18} className="shrink-0 mt-0.5" />
                          <span>{errorMsg}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ── Submit button ── */}
                    <button
                      type="submit"
                      disabled={isDisabled}
                      className="w-full sm:w-auto px-8 py-4 bg-orangeAccent hover:bg-orangeAccent/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          {t('contact.formSending')}
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          {t('contact.formButton')}
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right: Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="bg-lightGray rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-tealAccent/15 rounded-bl-full z-0"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-charcoal mb-6">{t('contact.sidebarTitle')}</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                        <MapPin size={20} className="text-tealAccent" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal mb-1">{t('contact.sidebarAddress')}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Evrenos, KÜME EVLERİ NO 78,<br />45140 Yunusemre/Manisa
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                        <Phone size={20} className="text-tealAccent" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal mb-1">{t('contact.sidebarPhone')}</p>
                        <p className="text-gray-600 text-sm">
                          <a href="tel:+905072840798" className="hover:text-tealAccent transition-colors">
                            0507 284 07 98
                          </a>
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                        <Mail size={20} className="text-tealAccent" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal mb-1">{t('contact.sidebarEmail')}</p>
                        <p className="text-gray-600 text-sm">
                          <a href="mailto:bilgi@brckalip.com.tr" className="hover:text-tealAccent transition-colors">
                            bilgi@brckalip.com.tr
                          </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Work Hours Card */}
              <div className="bg-charcoal rounded-2xl p-8 shadow-sm text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#404c5a]/40 rounded-br-full z-0"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Clock size={24} className="text-tealAccent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t('contact.hoursTitle')}</h3>
                  <p className="text-gray-300 text-sm">{t('contact.hoursSubtitle')}</p>
                  <p className="text-white font-medium mt-2">
                    {t('contact.hoursVal')} <span className="text-orangeAccent">08:00 - 19:00</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Embed Section — privacy-first, loads only on user consent */}
      <section className="h-[500px] w-full relative bg-gray-100 overflow-hidden">
        {!mapConsent ? (
          /* ── Pre-consent notice ── */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center bg-lightGray">
            {/* Decorative map pin */}
            <div className="w-16 h-16 rounded-full bg-charcoal/10 flex items-center justify-center">
              <MapPin size={32} className="text-tealAccent" />
            </div>

            <div className="max-w-md space-y-2">
              <h3 className="text-lg font-bold text-charcoal">
                {t('contact.mapConsentTitle')}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('contact.mapConsentDesc')}
              </p>
            </div>

            <button
              onClick={() => setMapConsent(true)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-tealAccent hover:bg-tealAccent/90 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
            >
              <MapPin size={18} />
              {t('contact.mapConsentButton')}
            </button>

            <p className="text-xs text-gray-400 max-w-sm">
              {t('contact.mapConsentNote')}
            </p>
          </div>
        ) : (
          /* ── Loaded iframe (only after consent) ── */
          <iframe
            src="https://maps.google.com/maps?q=Evrenos%2C%20K%C3%9CME%20EVLER%C4%B0%20NO%2078%2C%2045140%20Yunusemre%2FManisa&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="BRC KALIP & 4 EL PLASTİK — Fabrika Konumu (Google Maps)"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="BRC KALIP fabrika konumunu gösteren Google Haritası — Evrenos, Küme Evleri No:78, 45140 Yunusemre/Manisa"
            className="grayscale hover:grayscale-0 transition-all duration-700"
          />
        )}
      </section>
    </>
  );
}

