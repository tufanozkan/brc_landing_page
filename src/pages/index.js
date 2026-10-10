import { useState, useEffect, useSyncExternalStore } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Lightbulb, Cog, ArrowRight, CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/utils/LanguageContext';
import ExampleWorksGallery from '@/components/ExampleWorksGallery';

// Images located in /public/photos/kalip_ornek
const sampleWorks = [
  'Screenshot 2026-10-10 at 20.00.28.png',
  'Screenshot 2026-10-10 at 20.01.00.png',
  'Screenshot 2026-10-10 at 20.01.30.png',
  'Screenshot 2026-10-10 at 20.01.58.png',
  'Screenshot 2026-10-10 at 20.02.23.png',
  'Screenshot 2026-10-10 at 20.03.00.png',
].map((file) => ({ src: `/photos/kalip_ornek/${file}` }));

const noopSubscribe = () => () => {};
const getHasSeenIntro = () => {
  try {
    return sessionStorage.getItem('hasSeenIntro') === 'true';
  } catch {
    return false;
  }
};
// On the server we assume "seen" so the overlay is never part of the SSR markup.
const getServerHasSeenIntro = () => true;

export default function Home() {
  const { language, t } = useLanguage();
  const [introDismissed, setIntroDismissed] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const hasSeenIntro = useSyncExternalStore(noopSubscribe, getHasSeenIntro, getServerHasSeenIntro);
  const showIntro = !hasSeenIntro && !introDismissed;

  const handleCloseIntro = () => {
    try {
      sessionStorage.setItem('hasSeenIntro', 'true');
    } catch {
      // storage unavailable — intro just may show again next visit
    }
    setIntroDismissed(true);
  };

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showIntro]);

  const partnerLogos = [
    { id: 1, src: '/partners/images.png', alt: 'Partner 1' },
    { id: 2, src: '/partners/images2.png', alt: 'Partner 2' },
    { id: 3, src: '/partners/images3.jpeg', alt: 'Partner 3' },
    { id: 4, src: '/partners/images4.jpeg', alt: 'Partner 4' },
    { id: 5, src: '/partners/images4_2.jpeg', alt: 'Partner 5' },
    { id: 6, src: '/partners/images5.png', alt: 'Partner 6' },
  ];

  const stats = [
    { title: t('home.stat1'), value: t('home.stat1Val'), subtitle: t('home.stat1Sub') },
    { title: t('home.stat2'), value: t('home.stat2Val'), subtitle: t('home.stat2Sub') },
    { title: t('home.stat3'), value: t('home.stat3Val'), subtitle: t('home.stat3Sub') },
    { title: t('home.stat4'), value: t('home.stat4Val'), subtitle: t('home.stat4Sub') },
  ];

  return (
    <>
      <Head>
        <title>{t('home.metaTitle')}</title>
        <meta name="description" content={t('home.metaDesc')} />
        <link rel="canonical" href="https://www.brckalip.com.tr/" />
        <link rel="preload" as="image" href="https://images.unsplash.com/photo-1565439390118-9fc12c424b83?q=80&w=2669&auto=format&fit=crop" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.brckalip.com.tr/" />
        <meta property="og:title" content={t('home.metaTitle')} />
        <meta property="og:description" content={t('home.metaDesc')} />
        <meta property="og:image" content="https://www.brckalip.com.tr/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="BRC KALIP & 4 EL PLASTİK — Manisa Kalıp ve Plastik Enjeksiyon" />
        <meta property="og:locale" content="tr_TR" />
        <meta property="og:site_name" content="BRC KALIP & 4 EL PLASTİK" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('home.metaTitle')} />
        <meta name="twitter:description" content={t('home.metaDesc')} />
        <meta name="twitter:image" content="https://www.brckalip.com.tr/og-image.jpg" />
        <meta name="twitter:image:alt" content="BRC KALIP & 4 EL PLASTİK — Manisa Kalıp ve Plastik Enjeksiyon" />

        {/* LocalBusiness / Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BRC KALIP & 4 EL PLASTİK",
              "alternateName": ["BRC Kalıp", "4 El Plastik"],
              "url": "https://www.brckalip.com.tr",
              "logo": "https://www.brckalip.com.tr/logos/logo.png",
              "image": "https://www.brckalip.com.tr/og-image.jpg",
              "description": "Manisa Yunusemre'de faaliyet gösteren BRC KALIP & 4 EL PLASTİK, beyaz eşya sektörü için yüksek hassasiyetli kalıp imalatı ve plastik enjeksiyon hizmetleri sunmaktadır.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Evrenos, KÜME EVLERİ NO 78",
                "addressLocality": "Yunusemre",
                "addressRegion": "Manisa",
                "postalCode": "45140",
                "addressCountry": "TR"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+90-507-284-07-98",
                  "contactType": "customer service",
                  "availableLanguage": ["Turkish"]
                }
              ],
              "email": "bilgi@brckalip.com.tr",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                  "opens": "08:00",
                  "closes": "19:00"
                }
              ]
            })
          }}
        />
      </Head>

      {/* Fullscreen Intro Video Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          >
            {/* Video Background */}
            <video
              src="/videos/BRC_KALIP_4_EL_TANITIM.mp4"
              autoPlay
              muted={isMuted}
              playsInline
              onEnded={handleCloseIntro}
              onError={handleCloseIntro}
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Subtle Gradient at Bottom for Contrast */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

            {/* Mute / Unmute Button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute top-6 right-6 z-20 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 backdrop-blur-md transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              title={isMuted ? (language === 'tr' ? 'Sesi Aç' : 'Unmute') : (language === 'tr' ? 'Sesi Kapat' : 'Mute')}
            >
              {isMuted ? <VolumeX size={20} aria-hidden="true" /> : <Volume2 size={20} aria-hidden="true" />}
              <span className="hidden sm:inline font-medium">{isMuted ? (language === 'tr' ? 'Sesi Aç' : 'Unmute') : (language === 'tr' ? 'Ses Açık' : 'Muted')}</span>
            </button>

            {/* Glassmorphic "Tanıtımı Geç" Button (Bottom Center) */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              onClick={handleCloseIntro}
              className="absolute bottom-8 sm:bottom-14 left-1/2 transform -translate-x-1/2 z-20 px-8 py-3.5 sm:px-10 sm:py-4 bg-black/60 hover:bg-black/80 text-white font-semibold rounded-full border border-white/30 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 hover:border-white/50 active:scale-95 flex items-center gap-3 cursor-pointer text-sm sm:text-base tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{language === 'tr' ? 'Tanıtımı Geç' : 'Skip Intro'}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col overflow-hidden bg-transparent">
        {/* Background overlay */}
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1565439390118-9fc12c424b83?q=80&w=2669&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20 pointer-events-none" />
        {/*
          TODO: Add real video here when available:
          <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover opacity-60">
            <source src="/videos/brc_promo.mp4" type="video/mp4" />
          </video>
        */}

        {/* ── Main content — fills all available space, keeps hero text centred ── */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-4 pt-28 pb-28">
          <div className="text-center max-w-5xl mx-auto w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight"
            >
              {t('home.heroTitle')}{' '}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tealAccent via-[#97d2d4] to-orangeAccent">
                {t('home.heroTitleGradient')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto font-medium"
            >
              {t('home.heroSubtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                href="#hakkimizda"
                className="inline-flex items-center gap-3 px-8 py-4 bg-orangeAccent hover:bg-orangeAccent/90 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangeAccent"
              >
                {t('home.heroButton')}
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Scroll indicator — pinned to bottom, always above stats section ── */}
        <div className="relative z-10 flex flex-col items-center pb-8 pointer-events-none select-none">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-gray-400 text-xs tracking-widest uppercase mb-2"
          >
            {t('home.scrollDown')}
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-10 bg-gradient-to-b from-gray-400 to-transparent"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative z-20 -mt-8 rounded-t-3xl shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-4">
              {language === 'tr' ? (
                <>Global Devlerin Tercihi: <span className="text-tealAccent">BRC KALIP</span></>
              ) : (
                <>The Choice of Global Giants: <span className="text-tealAccent">BRC MOLD</span></>
              )}
            </h2>
            <p className="text-gray-600 font-medium text-lg">{t('home.statsSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-lightGray rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <h3 className="text-gray-500 font-medium mb-2 uppercase tracking-wide text-xs">{stat.title}</h3>
                <p className="text-3xl font-extrabold text-charcoal mb-3 group-hover:text-orangeAccent transition-colors">{stat.value}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <CheckCircle2 size={16} className="text-green-500" aria-hidden="true" />
                  {stat.subtitle}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 bg-lightGray border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-tealAccent/10 flex items-center justify-center text-tealAccent mb-6">
                <Target size={32} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">{t('home.mission')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.missionText')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-orangeAccent/10 flex items-center justify-center text-orangeAccent mb-6">
                <Lightbulb size={32} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">{t('home.vision')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.visionText')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-tealAccent/10 flex items-center justify-center text-tealAccent mb-6">
                <Cog size={32} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">{t('home.expertise')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home.expertiseText')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="hakkimizda" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-charcoal/10 z-10 mix-blend-overlay rounded-3xl"></div>
                <Image 
                  src="/photos/a.png"
                  alt="BRC Kalıp Fabrika İçi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-tealAccent/10 rounded-full blur-3xl z-0"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <span className="text-tealAccent font-semibold tracking-wider uppercase text-sm mb-2 block">{t('home.aboutProfile')}</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-charcoal mb-8">{t('home.aboutTitle')}</h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  {t('home.aboutP1')}
                </p>
                <p>
                  {t('home.aboutP2')}
                </p>
                <div className="p-6 bg-lightGray rounded-xl border border-gray-200 mt-8">
                  <p className="italic text-gray-700 font-medium">
                    {t('home.aboutQuote')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sample Works Section */}
      <section id="ornek-calismalar" className="py-24 bg-lightGray overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <span className="text-tealAccent font-semibold tracking-wider uppercase text-sm mb-2 block">{t('home.examplesProfile')}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-charcoal">{t('home.examplesTitle')}</h2>
            <p className="text-gray-600 mt-4 text-lg">{t('home.examplesSubtitle')}</p>
          </motion.div>
        </div>

        <ExampleWorksGallery images={sampleWorks} i18nPrefix="home" />
      </section>

      {/* References Section */}
      <section className="relative py-24 bg-charcoal text-white overflow-hidden">
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-tealAccent/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: heading */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 text-center lg:text-left"
            >
              <div className="w-16 h-1 bg-tealAccent rounded-full mb-6 mx-auto lg:mx-0" />
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">{t('home.refTitle')}</h2>
              <p className="text-gray-400 mt-4 text-lg">{t('home.refSubtitle')}</p>
            </motion.div>

            {/* Right: static logo wall (uniform cards, 3 cols x 2 rows) */}
            <div className="lg:col-span-7 w-full max-w-xl mx-auto lg:mr-0 grid grid-cols-2 sm:grid-cols-3 auto-rows-fr gap-4">
              {partnerLogos.map((logo, idx) => (
                <motion.div
                  key={logo.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group min-w-0 h-24 sm:h-28 p-5 bg-white rounded-xl ring-2 ring-transparent hover:ring-tealAccent shadow-lg shadow-black/20 transition-all duration-300"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      sizes="(max-width: 640px) 45vw, 180px"
                      className="object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog/Articles Placeholder */}
      <section className="py-20 bg-white text-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-tealAccent font-semibold tracking-wider uppercase text-sm mb-4 block">{t('home.blogCenter')}</span>
          <h2 className="text-4xl font-bold mb-12 text-charcoal">{t('home.blogTitle')}</h2>
          <div className="max-w-2xl mx-auto bg-lightGray border border-gray-200 rounded-2xl p-12 shadow-sm">
            <Cog size={48} className="mx-auto text-orangeAccent mb-6 opacity-80" aria-hidden="true" />
            <h3 className="text-2xl font-semibold mb-4 text-charcoal">{t('home.blogStatus')}</h3>
            <p className="text-gray-600">
              {t('home.blogDesc')}
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
