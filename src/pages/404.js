import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, ArrowRight, Phone, Mail } from 'lucide-react';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 — Sayfa Bulunamadı | BRC KALIP & 4 EL PLASTİK</title>
        <meta
          name="description"
          content="Aradığınız sayfa bulunamadı. BRC KALIP & 4 EL PLASTİK ana sayfasına dönebilirsiniz."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Full-page wrapper — uses the same bg-charcoal as _app */}
      <section className="min-h-[80vh] flex items-center justify-center py-20 px-4 relative overflow-hidden">

        {/* Subtle decorative circles */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-tealAccent/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orangeAccent/5 blur-3xl" />

        <div className="relative z-10 max-w-2xl w-full text-center">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-10"
          >
            <Image
              src="/logos/logo.png"
              alt="BRC KALIP Logosu"
              width={80}
              height={80}
              className="rounded-xl"
            />
          </motion.div>

          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-[9rem] md:text-[12rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-tealAccent via-[#97d2d4] to-orangeAccent select-none">
              404
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-white mb-4"
          >
            Sayfa Bulunamadı
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto"
          >
            Aradığınız sayfa kaldırılmış, taşınmış ya da hiç var olmamış olabilir.
            Aşağıdaki bağlantılardan devam edebilirsiniz.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-orangeAccent hover:bg-orangeAccent/90 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Home size={18} />
              Ana Sayfaya Dön
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Bize Ulaşın
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-white/10 pt-10"
          >
            <p className="text-gray-500 text-sm mb-6">Doğrudan iletişim</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
              <a
                href="tel:+905072840798"
                className="flex items-center gap-2 text-gray-400 hover:text-tealAccent transition-colors"
              >
                <Phone size={16} className="text-tealAccent" />
                0507 284 07 98
              </a>
              <a
                href="mailto:bilgi@brckalip.com.tr"
                className="flex items-center gap-2 text-gray-400 hover:text-tealAccent transition-colors"
              >
                <Mail size={16} className="text-tealAccent" />
                bilgi@brckalip.com.tr
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
