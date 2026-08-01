import Head from 'next/head';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Truck, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/utils/LanguageContext';

export default function Plastic() {
  const { language, t } = useLanguage();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);


  const stats = [
    { title: t('plastic.stat1'), value: t('plastic.stat1Val'), subtitle: t('plastic.stat1Sub') },
    { title: t('plastic.stat2'), value: t('plastic.stat2Val'), subtitle: t('plastic.stat2Sub') },
    { title: t('plastic.stat3'), value: t('plastic.stat3Val'), subtitle: t('plastic.stat3Sub') },
    { title: t('plastic.stat4'), value: t('plastic.stat4Val'), subtitle: t('plastic.stat4Sub') },
  ];

  return (
    <>
      <Head>
        <title>{t('plastic.metaTitle')}</title>
        <meta name="description" content={t('plastic.metaDesc')} />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-charcoal">
        <motion.div 
          style={{ y: y1 }}
          className="absolute inset-0 z-0 bg-gradient-to-tr from-[#20272d] via-charcoal to-[#404c5a] opacity-90" 
        />
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1621503792019-33519c2fb418?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        {/*
          TODO: Add real video here when available:
          <video autoPlay loop muted playsInline className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover opacity-60">
            <source src="/videos/plastic_promo.mp4" type="video/mp4" />
          </video>
        */}
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight"
          >
            {t('plastic.heroTitle')} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tealAccent via-[#97d2d4] to-orangeAccent">
              {t('plastic.heroTitleGradient')} {t('plastic.heroTitleEnd')}
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto font-medium"
          >
            {t('plastic.heroSubtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="#hakkimizda" className="inline-flex items-center gap-3 px-8 py-4 bg-orangeAccent hover:bg-orangeAccent/90 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
              {t('plastic.heroButton')}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-gray-400 text-xs tracking-widest uppercase mb-2">Aşağı Kaydır</span>
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
                <>Plastik Enjeksiyonda <span className="text-tealAccent">4 EL Güvencesi</span></>
              ) : (
                <>4 EL Assurance in <span className="text-tealAccent">Plastic Injection</span></>
              )}
            </h2>
            <p className="text-gray-600 font-medium text-lg">{t('plastic.statsSubtitle')}</p>
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
                <p className="text-3xl font-extrabold text-charcoal mb-3 group-hover:text-tealAccent transition-colors">{stat.value}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <CheckCircle2 size={16} className="text-tealAccent" />
                  {stat.subtitle}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision Cards */}
      <section className="py-20 bg-lightGray border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-teal-100 transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-tealAccent/10 flex items-center justify-center text-tealAccent mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">{t('plastic.quality')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('plastic.qualityText')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-teal-100 transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-orangeAccent/10 flex items-center justify-center text-orangeAccent mb-6">
                <BarChart3 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">{t('plastic.vision')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('plastic.visionText')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-teal-100 transition-shadow"
            >
              <div className="w-16 h-16 rounded-2xl bg-tealAccent/10 flex items-center justify-center text-tealAccent mb-6">
                <Truck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">{t('plastic.logistics')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('plastic.logisticsText')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="hakkimizda" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-tealAccent/10 z-10 mix-blend-overlay rounded-3xl"></div>
                <Image 
                  src="/photos/b.png" 
                  alt="4 El Plastik Fabrika"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-tealAccent/20 rounded-full blur-3xl z-0"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <span className="text-tealAccent font-semibold tracking-wider uppercase text-sm mb-2 block">{t('plastic.aboutProfile')}</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-charcoal mb-8">{t('plastic.aboutTitle')}</h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  {t('plastic.aboutP1')}
                </p>
                <p>
                  {t('plastic.aboutP2')}
                </p>
                <div className="p-6 bg-lightGray rounded-xl border border-gray-200 mt-8">
                  <ul className="space-y-3 font-medium text-gray-700">
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-orangeAccent" size={20} /> {t('plastic.aboutList1')}</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-orangeAccent" size={20} /> {t('plastic.aboutList2')}</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="text-orangeAccent" size={20} /> {t('plastic.aboutList3')}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



    </>
  );
}
