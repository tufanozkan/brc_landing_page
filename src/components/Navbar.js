import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/utils/LanguageContext';

export default function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const isPlasticPage = router.pathname === '/plastic';
  const logoSrc = isPlasticPage ? '/logos/4ellogo.png' : '/logos/logo.png';
  const logoAlt = isPlasticPage ? t('navbar.plastic') + ' Logo' : t('navbar.home') + ' Logo';

  const links = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.plastic'), path: '/plastic' },
    { name: t('navbar.contact'), path: '/contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src={logoSrc} 
                alt={logoAlt} 
                width={160} 
                height={70} 
                priority
                className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-1">
              {links.map((link) => {
                const isActive = router.pathname === link.path;
                return (
                  <Link key={link.path} href={link.path} className="relative px-3 py-2 text-sm font-semibold transition-colors text-charcoal hover:text-tealAccent">
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orangeAccent"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Icons */}
            <div className="flex items-center border-l border-gray-300 pl-6">
              <div 
                onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                className="flex items-center gap-1 text-charcoal/60 hover:text-charcoal cursor-pointer transition-colors select-none"
              >
                <Globe size={20} />
                <span className="text-sm font-bold uppercase">{language}</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-charcoal/80 hover:text-charcoal"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {links.map((link) => (
              <Link 
                key={link.path} 
                href={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-4 text-base font-medium border-b border-lightGray ${router.pathname === link.path ? 'text-orangeAccent' : 'text-charcoal/85'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
