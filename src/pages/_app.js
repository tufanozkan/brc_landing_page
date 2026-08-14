import '@/styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/utils/LanguageContext';

export default function App({ Component, pageProps, router }) {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen relative bg-charcoal">
        {/* Continuous Background Video across pages */}
        <div className="fixed top-0 left-0 right-0 h-[85vh] z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/videos/BRC_KALIP_4_EL_TANITIM.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal/80 via-[#404c5a]/50 to-[#20272d]/80 opacity-60" />
        </div>

        <Navbar />
        <main className="flex-grow pt-20 relative z-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
