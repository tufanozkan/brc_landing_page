import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/utils/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();
  return (
    <footer className="bg-charcoal text-white border-t border-charcoal/20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
           {/* Column 1: Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-white mb-6">
              {language === 'tr' ? (
                <>BRC KALIP<br/><span className="text-orangeAccent text-lg">4 EL PLASTİK</span></>
              ) : (
                <>BRC MOLD<br/><span className="text-orangeAccent text-lg">4 EL PLASTIC</span></>
              )}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Column 2: İletişim Merkez */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-8 h-[2px] bg-tealAccent"></div>
              {t('footer.contactHeader')}
            </h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-tealAccent shrink-0 mt-0.5" size={18} />
                <span className="whitespace-pre-line">{t('footer.address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-tealAccent shrink-0" size={18} />
                <span>0507 284 07 98</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-tealAccent shrink-0" size={18} />
                <span>info@brckalip.com.tr</span>
              </li>
               <li className="flex items-start gap-3">
                <Clock className="text-tealAccent shrink-0 mt-0.5" size={18} />
                <span>{t('footer.workDays')}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Hızlı Bağlantılar */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-8 h-[2px] bg-tealAccent"></div>
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-orangeAccent transition-colors flex items-center gap-2">
                  <ArrowRight size={14} className="text-tealAccent" /> {t('footer.linkHome')}
                </Link>
              </li>
              <li>
                <Link href="/plastic" className="hover:text-orangeAccent transition-colors flex items-center gap-2">
                  <ArrowRight size={14} className="text-tealAccent" /> {t('footer.linkPlastic')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orangeAccent transition-colors flex items-center gap-2">
                  <ArrowRight size={14} className="text-tealAccent" /> {t('footer.linkContact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: CTA */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-8 h-[2px] bg-tealAccent"></div>
              {t('footer.directionsHeader')}
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              {t('footer.directionsDesc')}
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-orangeAccent hover:bg-orangeAccent/90 text-white font-medium rounded-lg shadow-lg hover:shadow-orange-500/10 transition-all duration-300 gap-2"
            >
              <MapPin size={18} />
              {t('footer.directionsButton')}
            </a>
          </div>

        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-charcoal py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            {t('footer.copyright').replace('{year}', new Date().getFullYear())}
          </p>
        </div>
      </div>
    </footer>
  );
}
