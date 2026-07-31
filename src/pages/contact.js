import Head from 'next/head';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useLanguage } from '@/utils/LanguageContext';

export default function Contact() {
  const { language, t } = useLanguage();
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
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('contact.fieldName')}</label>
                    <input 
                      type="text" 
                      placeholder={t('contact.placeholderName')} 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-tealAccent focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('contact.fieldEmail')}</label>
                    <input 
                      type="email" 
                      placeholder={t('contact.placeholderEmail')} 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-tealAccent focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('contact.fieldSubject')}</label>
                  <input 
                    type="text" 
                    placeholder={t('contact.placeholderSubject')} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-tealAccent focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('contact.fieldMessage')}</label>
                  <textarea 
                    rows="5" 
                    placeholder={t('contact.placeholderMessage')} 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-tealAccent focus:border-transparent transition-all resize-none"
                  ></textarea>
                </div>
                
                <button className="w-full sm:w-auto px-8 py-4 bg-orangeAccent hover:bg-orangeAccent/90 text-white font-bold rounded-lg shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center justify-center gap-2">
                  <Send size={18} />
                  {t('contact.formButton')}
                </button>
              </form>
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
                        <p className="text-gray-600 text-sm leading-relaxed">Evrenos, KÜME EVLERİ NO 78,<br />45140 Yunusemre/Manisa</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                        <Phone size={20} className="text-tealAccent" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal mb-1">{t('contact.sidebarPhone')}</p>
                        <p className="text-gray-600 text-sm">0507 284 07 98</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                        <Mail size={20} className="text-tealAccent" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal mb-1">{t('contact.sidebarEmail')}</p>
                        <p className="text-gray-600 text-sm">info@brckalip.com.tr</p>
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
                    <p className="text-white font-medium mt-2">{t('contact.hoursVal')} <span className="text-orangeAccent">08:00 - 19:00</span></p>
                 </div>
              </div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* Map Embed Section */}
      <section className="h-[500px] w-full bg-gray-200 grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          src="https://maps.google.com/maps?q=Evrenos%2C%20K%C3%9CME%20EVLER%C4%B0%20NO%2078%2C%2045140%20Yunusemre%2FManisa&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          aria-hidden="false" 
          tabIndex="0"
        ></iframe>
      </section>
    </>
  );
}
