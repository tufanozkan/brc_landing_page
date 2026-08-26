import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/utils/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
// TASLAK UYARISI: Bu metin düzenlenebilir bir hukuki taslaktır.
// Yayına almadan önce bir avukat ya da KVKK uzmanına danışınız.
// Firma bilgilerini ve iletişim adreslerini güncel tutunuz.
// ─────────────────────────────────────────────────────────────────────────────

export default function GizlilikPage() {
  const { t } = useLanguage();

  const sections = [
    {
      id: 'giris',
      title: t('gizlilik.s1Title'),
      content: (
        <p className="text-gray-600 leading-relaxed">{t('gizlilik.s1Text')}</p>
      ),
    },
    {
      id: 'toplanan-bilgiler',
      title: t('gizlilik.s2Title'),
      content: (
        <div className="text-gray-600 leading-relaxed space-y-3">
          <p>
            <strong>{t('gizlilik.s2Direct')}</strong> {t('gizlilik.s2DirectText')}
          </p>
          <p>
            <strong>{t('gizlilik.s2Auto')}</strong> {t('gizlilik.s2AutoText')}
          </p>
          <p>
            <strong>{t('gizlilik.s2Cookie')}</strong> {t('gizlilik.s2CookieText')}
          </p>
        </div>
      ),
    },
    {
      id: 'kullanim-amaci',
      title: t('gizlilik.s3Title'),
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>{t('gizlilik.s3Intro')}</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>{t('gizlilik.s3Li1')}</li>
            <li>{t('gizlilik.s3Li2')}</li>
            <li>{t('gizlilik.s3Li3')}</li>
            <li>{t('gizlilik.s3Li4')}</li>
          </ul>
          <p className="text-sm text-gray-500 italic pt-1">{t('gizlilik.s3Note')}</p>
        </div>
      ),
    },
    {
      id: 'paylasim',
      title: t('gizlilik.s4Title'),
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>{t('gizlilik.s4Intro')}</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>{t('gizlilik.s4Li1')}</li>
            <li>{t('gizlilik.s4Li2')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'guvenligi',
      title: t('gizlilik.s5Title'),
      content: (
        <p className="text-gray-600 leading-relaxed">{t('gizlilik.s5Text')}</p>
      ),
    },
    {
      id: 'uc-taraf-baglantilar',
      title: t('gizlilik.s6Title'),
      content: (
        <p className="text-gray-600 leading-relaxed">{t('gizlilik.s6Text')}</p>
      ),
    },
    {
      id: 'haklariniz',
      title: t('gizlilik.s7Title'),
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>
            {t('gizlilik.s7Intro')}{' '}
            <Link href="/kvkk" className="text-tealAccent hover:underline font-medium">
              {t('gizlilik.s7KvkkLink')}
            </Link>{' '}
            {t('gizlilik.s7IntroSuffix')}
          </p>
          <p>{t('gizlilik.s7ContactIntro')}</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              <strong>{t('gizlilik.s7ContactEmail')}</strong>{' '}
              <a href="mailto:bilgi@brckalip.com.tr" className="text-tealAccent hover:underline">
                bilgi@brckalip.com.tr
              </a>
            </li>
            <li>
              <strong>{t('gizlilik.s7ContactAddress')}</strong> {t('gizlilik.s7ContactAddressVal')}
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'degisiklikler',
      title: t('gizlilik.s8Title'),
      content: (
        <p className="text-gray-600 leading-relaxed">
          {t('gizlilik.s8Text')}{' '}
          <strong>{t('gizlilik.s8Date')}</strong>
        </p>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>{t('gizlilik.pageTitle')}</title>
        <meta name="description" content={t('gizlilik.metaDesc')} />
        <link rel="canonical" href="https://www.brckalip.com.tr/gizlilik" />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content={t('gizlilik.pageTitle')} />
        <meta property="og:description" content={t('gizlilik.metaDesc')} />
        <meta property="og:url" content="https://www.brckalip.com.tr/gizlilik" />
        <meta property="og:site_name" content="BRC KALIP & 4 EL PLASTİK" />
        <meta property="og:locale" content="tr_TR" />
      </Head>

      {/* Page Header */}
      <section className="bg-charcoal py-20 border-b border-charcoal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-orangeAccent/20 flex items-center justify-center">
              <Lock size={32} className="text-orangeAccent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t('gizlilik.headerTitle')}
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('gizlilik.headerSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500">
            <Link href="/" className="hover:text-tealAccent transition-colors">
              {t('gizlilik.breadcrumbHome')}
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-charcoal font-medium">{t('gizlilik.breadcrumbCurrent')}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            {/* Intro */}
            <div className="bg-lightGray rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-600 leading-relaxed text-sm">
                {t('gizlilik.introText')}
              </p>
            </div>

            {/* Sections */}
            {sections.map((section, i) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="border-b border-gray-100 pb-8 last:border-b-0"
              >
                <h2 className="text-xl font-bold text-charcoal mb-4 flex items-center gap-3">
                  <span className="w-8 h-[3px] bg-orangeAccent rounded-full shrink-0" />
                  {section.title}
                </h2>
                {section.content}
              </motion.div>
            ))}

            {/* Footer CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href="/kvkk"
                className="inline-flex items-center justify-center px-8 py-3 bg-tealAccent hover:bg-tealAccent/90 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 gap-2"
              >
                {t('gizlilik.ctaKvkk')}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-orangeAccent text-orangeAccent font-semibold rounded-lg hover:bg-orangeAccent hover:text-white transition-all duration-300 gap-2"
              >
                {t('gizlilik.ctaContact')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
