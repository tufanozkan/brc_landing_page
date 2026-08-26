import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TASLAK UYARISI: Bu metin düzenlenebilir bir hukuki taslaktır.
// Yayına almadan önce bir avukat ya da KVKK uzmanına danışınız.
// Firma bilgilerini ve iletişim adreslerini güncel tutunuz.
// ─────────────────────────────────────────────────────────────────────────────

export default function GizlilikPage() {
  const sections = [
    {
      id: 'giris',
      title: '1. Giriş ve Amaç',
      content: (
        <p className="text-gray-600 leading-relaxed">
          Bu Gizlilik Politikası, <strong>BRC KALIP &amp; 4 EL PLASTİK</strong> olarak yönettiğimiz web
          sitesini ziyaret eden kullanıcıların gizliliğini nasıl koruduğumuzu açıklamaktadır. Web
          sitemizi kullanmakla bu politikada yer alan koşulları kabul etmiş sayılırsınız.
        </p>
      ),
    },
    {
      id: 'toplanan-bilgiler',
      title: '2. Toplanan Bilgiler',
      content: (
        <div className="text-gray-600 leading-relaxed space-y-3">
          <p>
            <strong>Doğrudan sağladığınız bilgiler:</strong> İletişim formu aracılığıyla ad-soyad,
            e-posta adresi ve mesaj içeriğinizi topluyoruz.
          </p>
          <p>
            <strong>Otomatik olarak toplanan bilgiler:</strong> Web sitemize eriştiğinizde; IP adresi,
            tarayıcı türü ve versiyonu, işletim sistemi, ziyaret edilen sayfalar ve ziyaret tarihi/saati
            gibi teknik veriler sunucu kayıtlarına yansıyabilir.
          </p>
          <p>
            <strong>Çerezler (Cookies):</strong> Web sitemiz, teknik işlevsellik için zorunlu çerezler
            kullanabilir. Pazarlama veya izleme amaçlı üçüncü taraf çerezler{' '}
            <strong>KULLANILMIYOR</strong>.
          </p>
        </div>
      ),
    },
    {
      id: 'kullanim-amaci',
      title: '3. Bilgilerin Kullanım Amacı',
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>Toplanan bilgiler yalnızca aşağıdaki amaçlarla kullanılmaktadır:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>İletişim taleplerinizi yanıtlamak</li>
            <li>Web sitesinin teknik işleyişini sağlamak ve iyileştirmek</li>
            <li>Güvenlik ihlallerini tespit etmek ve önlemek</li>
            <li>Yasal yükümlülükleri yerine getirmek</li>
          </ul>
          <p className="text-sm text-gray-500 italic pt-1">
            Bilgileriniz; reklam, pazarlama veya profil oluşturma amacıyla kullanılmamakta ve üçüncü
            taraflara satılmamaktadır.
          </p>
        </div>
      ),
    },
    {
      id: 'paylasim',
      title: '4. Bilgilerin Paylaşımı',
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>Kişisel bilgileriniz aşağıdaki durumlar dışında üçüncü taraflarla paylaşılmamaktadır:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              Hizmet sağlayıcılar: E-posta iletimi ve hosting hizmetleri için teknik altyapı
              sağlayıcılarıyla yalnızca gerekli ölçüde paylaşılabilir.
            </li>
            <li>
              Yasal zorunluluk: Yetkili kamu kurum ve kuruluşlarının yasal talebi halinde.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'guvenligi',
      title: '5. Veri Güvenliği',
      content: (
        <p className="text-gray-600 leading-relaxed">
          Web sitemiz SSL/TLS şifrelemesi ile korunmaktadır. Kişisel verilerinizin yetkisiz erişime,
          değiştirilmeye veya ifşa edilmeye karşı korunması için uygun teknik ve idari tedbirler
          alınmaktadır. Bununla birlikte, internet üzerinden hiçbir veri iletiminin yüzde yüz güvenli
          olduğu garanti edilemez.
        </p>
      ),
    },
    {
      id: 'uc-taraf-baglantilar',
      title: '6. Üçüncü Taraf Bağlantılar',
      content: (
        <p className="text-gray-600 leading-relaxed">
          Web sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir (örneğin Google Haritalar).
          Bu sitelerin gizlilik uygulamalarından sorumluluğumuz bulunmamaktadır. İlgili sitelerin
          gizlilik politikalarını incelemenizi öneririz.
        </p>
      ),
    },
    {
      id: 'haklariniz',
      title: '7. Kullanıcı Hakları',
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>
            KVKK kapsamındaki haklarınız için lütfen{' '}
            <Link href="/kvkk" className="text-tealAccent hover:underline font-medium">
              KVKK Aydınlatma Metni
            </Link>{' '}
            sayfamızı inceleyiniz.
          </p>
          <p>Taleplerinizi aşağıdaki kanallardan iletebilirsiniz:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              <strong>E-posta:</strong>{' '}
              <a href="mailto:bilgi@brckalip.com.tr" className="text-tealAccent hover:underline">
                bilgi@brckalip.com.tr
              </a>
            </li>
            <li>
              <strong>Adres:</strong> Evrenos, Küme Evleri No:78, 45140 Yunusemre/Manisa
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'degisiklikler',
      title: '8. Politika Değişiklikleri',
      content: (
        <p className="text-gray-600 leading-relaxed">
          Bu Gizlilik Politikası, gerekli görüldüğünde güncellenerek bu sayfada yayımlanacaktır.
          Önemli değişiklikler için kullanıcıları ayrıca bilgilendirme yoluna gidilebilir.{' '}
          <strong>Son güncelleme tarihi: Ağustos 2026</strong>
        </p>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Gizlilik Politikası | BRC KALIP &amp; 4 EL PLASTİK</title>
        <meta
          name="description"
          content="BRC KALIP & 4 EL PLASTİK Gizlilik Politikası — Kişisel verilerinizin gizliliğini nasıl koruduğumuza ilişkin bilgilendirme."
        />
        <meta name="robots" content="noindex, follow" />
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
              Gizlilik Politikası
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Web sitemizi ziyaret ettiğinizde gizliliğinizi nasıl koruduğumuzu bu sayfada
              açıklıyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1 text-sm text-gray-500">
            <Link href="/" className="hover:text-tealAccent transition-colors">
              Ana Sayfa
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-charcoal font-medium">Gizlilik Politikası</span>
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
                <strong>BRC KALIP &amp; 4 EL PLASTİK</strong> olarak kişisel verilerinizin gizliliğini
                önemsiyoruz. Bu politika, web sitemizi ziyaretiniz sırasında hangi bilgilerin
                toplandığını ve bu bilgilerin nasıl korunduğunu anlatmaktadır.
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
                KVKK Aydınlatma Metni
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-orangeAccent text-orangeAccent font-semibold rounded-lg hover:bg-orangeAccent hover:text-white transition-all duration-300 gap-2"
              >
                İletişim Formuna Git
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
