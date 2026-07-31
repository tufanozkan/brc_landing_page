import Head from 'next/head';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Lightbulb, Cog, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/utils/LanguageContext';

export default function Home() {
  const { language, t } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);

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
      </Head>

      {/* Hero Section (Video Placeholder) */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-charcoal">
        {/* Placeholder gradient mimicking a video */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0 bg-gradient-to-br from-charcoal via-[#404c5a] to-[#20272d] opacity-80" 
        />
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1565439390118-9fc12c424b83?q=80&w=2669&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        {/*
          TODO: Add real video here when available:
          <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover opacity-60">
            <source src="/videos/brc_promo.mp4" type="video/mp4" />
          </video>
        */}
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight"
          >
            {t('home.heroTitle')} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-tealAccent via-[#97d2d4] to-orangeAccent">{t('home.heroTitleGradient')}</span>
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
            <Link href="#hakkimizda" className="inline-flex items-center gap-3 px-8 py-4 bg-orangeAccent hover:bg-orangeAccent/90 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
              {t('home.heroButton')}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator overlay */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-gray-400 text-xs tracking-widest uppercase mb-2">{t('home.scrollDown')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent"
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
                  <CheckCircle2 size={16} className="text-green-500" />
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
                <Target size={32} />
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
                <Lightbulb size={32} />
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
                <Cog size={32} />
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
                  src="/photos/2021-06-15.jpg" // Provided local photo
                  alt="BRC Kalıp Fabrika İçi"
                  fill
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

      {/* Blog/Articles Placeholder */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-tealAccent font-semibold tracking-wider uppercase text-sm mb-4 block">{t('home.blogCenter')}</span>
          <h2 className="text-4xl font-bold mb-12">{t('home.blogTitle')}</h2>
          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12">
            <Cog size={48} className="mx-auto text-orangeAccent mb-6 opacity-80" />
            <h3 className="text-2xl font-semibold mb-4">{t('home.blogStatus')}</h3>
            <p className="text-gray-400">
              {t('home.blogDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-charcoal">{t('home.refTitle')}</h2>
            <p className="text-gray-500 mt-4 text-lg">{t('home.refSubtitle')}</p>
          </div>

          {/* Simple CSS-based Marquee for References */}
          <div className="relative flex overflow-x-hidden group">
            <div className="py-8 animate-marquee whitespace-nowrap flex items-center gap-16">
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, idx) => (
                <div key={idx} className="inline-flex w-48 h-24 items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                  <div className="text-2xl font-bold text-gray-400">{t('home.refBrand')} {item}</div>
                </div>
              ))}
            </div>
            <div className="absolute top-0 py-8 animate-marquee2 whitespace-nowrap flex items-center gap-16">
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, idx) => (
                <div key={idx + 'b'} className="inline-flex w-48 h-24 items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                  <div className="text-2xl font-bold text-gray-400">{t('home.refBrand')} {item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
