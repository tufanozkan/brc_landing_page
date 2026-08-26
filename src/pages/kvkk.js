import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/utils/LanguageContext';

// ─────────────────────────────────────────────────────────────────────────────
// TASLAK UYARISI: Bu metin düzenlenebilir bir hukuki taslaktır.
// Yayına almadan önce bir avukat ya da KVKK uzmanına danışınız.
// Firma bilgilerini ve iletişim adreslerini güncel tutunuz.
// ─────────────────────────────────────────────────────────────────────────────

export default function KvkkPage() {
  const { t } = useLanguage();

  const sections = [
    {
      id: 'veri-sorumlusu',
      title: t('kvkk.s1Title'),
      content: (
        <p className="text-gray-600 leading-relaxed">{t('kvkk.s1Text')}</p>
      ),
    },
    {
      id: 'toplanan-veriler',
      title: t('kvkk.s2Title'),
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>{t('kvkk.s2Intro')}</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>{t('kvkk.s2Li1')}</li>
            <li>{t('kvkk.s2Li2')}</li>
            <li>{t('kvkk.s2Li3')}</li>
          </ul>
          <p className="text-sm text-gray-500 italic pt-1">{t('kvkk.s2Note')}</p>
        </div>
      ),
    },
    {
      id: 'isleme-amaclari',
      title: t('kvkk.s3Title'),
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>{t('kvkk.s3Intro')}</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>{t('kvkk.s3Li1')}</li>
            <li>{t('kvkk.s3Li2')}</li>
            <li>{t('kvkk.s3Li3')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'hukuki-dayanak',
      title: t('kvkk.s4Title'),
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>{t('kvkk.s4Intro')}</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>{t('kvkk.s4Li1')}</li>
            <li>{t('kvkk.s4Li2')}</li>
            <li>{t('kvkk.s4Li3')}</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'aktarim',
      title: t('kvkk.s5Title'),
      content: (
        <p className="text-gray-600 leading-relaxed">{t('kvkk.s5Text')}</p>
      ),
    },
    {
      id: 'saklama-suresi',
      title: t('kvkk.s6Title'),
      content: (
        <p className="text-gray-600 leading-relaxed">
          {t('kvkk.s6Text').split(t('kvkk.s6Duration')).map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}<strong>{t('kvkk.s6Duration')}</strong>
              </span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </p>
      ),
    },
    {
      id: 'haklariniz',
      title: t('kvkk.s7Title'),
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>{t('kvkk.s7Intro')}</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>{t('kvkk.s7Li1')}</li>
            <li>{t('kvkk.s7Li2')}</li>
            <li>{t('kvkk.s7Li3')}</li>
            <li>{t('kvkk.s7Li4')}</li>
            <li>{t('kvkk.s7Li5')}</li>
            <li>{t('kvkk.s7Li6')}</li>
            <li>{t('kvkk.s7Li7')}</li>
            <li>{t('kvkk.s7Li8')}</li>
            <li>{t('kvkk.s7Li9')}</li>
          </ul>
          <p className="pt-2">{t('kvkk.s7ContactIntro')}</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              <strong>{t('kvkk.s7ContactEmail')}</strong>{' '}
              <a href="mailto:bilgi@brckalip.com.tr" className="text-tealAccent hover:underline">
                bilgi@brckalip.com.tr
              </a>
            </li>
            <li>
              <strong>{t('kvkk.s7ContactAddress')}</strong>{' '}
              <a href="https://maps.google.com/?q=Evrenos,+K%C3%9CME+EVLER%C4%B0+NO+78,+45140+Yunusemre%2FManisa" target="_blank" rel="noopener noreferrer" className="text-tealAccent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tealAccent rounded-sm">
                {t('kvkk.s7ContactAddressVal')}
              </a>
            </li>
          </ul>
          <p className="text-sm text-gray-500 italic pt-1">{t('kvkk.s7Note')}</p>
        </div>
      ),
    },
    {
      id: 'guncelleme',
      title: t('kvkk.s8Title'),
      content: (
        <p className="text-gray-600 leading-relaxed">
          {t('kvkk.s8Text')}{' '}
          <strong>{t('kvkk.s8Date')}</strong>
        </p>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>{t('kvkk.pageTitle')}</title>
        <meta name="description" content={t('kvkk.metaDesc')} />
        <link rel="canonical" href="https://www.brckalip.com.tr/kvkk" />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content={t('kvkk.pageTitle')} />
        <meta property="og:description" content={t('kvkk.metaDesc')} />
        <meta property="og:url" content="https://www.brckalip.com.tr/kvkk" />
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
            <div className="w-16 h-16 rounded-full bg-tealAccent/20 flex items-center justify-center">
              <ShieldCheck size={32} className="text-tealAccent" aria-hidden="true" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              {t('kvkk.headerTitle')}
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('kvkk.headerSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500">
            <Link href="/" className="hover:text-tealAccent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tealAccent rounded-sm">
              {t('kvkk.breadcrumbHome')}
            </Link>
            <ChevronRight size={14} className="text-gray-400" aria-hidden="true" />
            <span className="text-charcoal font-medium">{t('kvkk.breadcrumbCurrent')}</span>
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
                {t('kvkk.introText')}
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
                  <span className="w-8 h-[3px] bg-tealAccent rounded-full shrink-0" />
                  {section.title}
                </h2>
                {section.content}
              </motion.div>
            ))}

            {/* Footer CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-orangeAccent hover:bg-orangeAccent/90 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orangeAccent"
              >
                {t('kvkk.ctaContact')}
              </Link>
              <Link
                href="/gizlilik"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-tealAccent text-tealAccent font-semibold rounded-lg hover:bg-tealAccent hover:text-white transition-all duration-300 gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tealAccent"
              >
                {t('kvkk.ctaPrivacy')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
