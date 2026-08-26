import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TASLAK UYARISI: Bu metin düzenlenebilir bir hukuki taslaktır.
// Yayına almadan önce bir avukat ya da KVKK uzmanına danışınız.
// Firma bilgilerini ve iletişim adreslerini güncel tutunuz.
// ─────────────────────────────────────────────────────────────────────────────

export default function KvkkPage() {
  const sections = [
    {
      id: 'veri-sorumlusu',
      title: '1. Veri Sorumlusunun Kimliği',
      content: (
        <p className="text-gray-600 leading-relaxed">
          6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca kişisel verileriniz; veri
          sorumlusu sıfatıyla <strong>BRC KALIP &amp; 4 EL PLASTİK</strong> tarafından aşağıda açıklanan
          amaçlar ve hukuki sebepler çerçevesinde işlenecektir.
        </p>
      ),
    },
    {
      id: 'toplanan-veriler',
      title: '2. İşlenen Kişisel Veriler',
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>
            Web sitemizde yer alan iletişim formu aracılığıyla aşağıdaki kişisel verileriniz
            toplanmaktadır:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Ad ve soyad</li>
            <li>E-posta adresi</li>
            <li>İletişim konusu ve mesaj içeriği</li>
          </ul>
          <p className="text-sm text-gray-500 italic pt-1">
            Not: Form doldurulması sırasında yukarıda sayılanlar dışında herhangi bir kişisel veri
            talep edilmemektedir.
          </p>
        </div>
      ),
    },
    {
      id: 'isleme-amaclari',
      title: '3. Kişisel Verilerin İşlenme Amaçları',
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>Toplanan kişisel verileriniz yalnızca aşağıdaki amaçlarla işlenmektedir:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>İletişim talebinizin değerlendirilmesi ve yanıtlanması</li>
            <li>Talep ettiğiniz ürün veya hizmetle ilgili bilgi verilmesi</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'hukuki-dayanak',
      title: '4. Hukuki Dayanak',
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>Kişisel verileriniz KVKK&apos;nın 5. maddesi kapsamında aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Açık rızanızın bulunması (iletişim formu onayı)</li>
            <li>Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması</li>
            <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'aktarim',
      title: '5. Kişisel Verilerin Aktarılması',
      content: (
        <p className="text-gray-600 leading-relaxed">
          Kişisel verileriniz; iletişim talebinizin karşılanması amacıyla teknik altyapı hizmet
          sağlayıcıları (e-posta sunucusu, hosting hizmeti) ile KVKK&apos;nın 8. ve 9. maddeleri
          kapsamında ve gerekli güvenlik önlemleri alınarak paylaşılabilir. Verileriniz ticari
          amaçla üçüncü şahıslara satılmamakta; yasal zorunluluk halinde yetkili kamu kurum ve
          kuruluşlarıyla paylaşılabilir.
        </p>
      ),
    },
    {
      id: 'saklama-suresi',
      title: '6. Kişisel Verilerin Saklanma Süresi',
      content: (
        <p className="text-gray-600 leading-relaxed">
          İletişim formu aracılığıyla iletilen veriler, talebinize ilişkin işlemin tamamlanmasından
          itibaren en fazla <strong>2 yıl</strong> süreyle saklanmakta; bu sürenin
          sonunda geri dönüşümsüz olarak imha edilmektedir. Yasal zorunluluk gerektiren hallerde
          ilgili mevzuatta öngörülen saklama süresi esas alınır.
        </p>
      ),
    },
    {
      id: 'haklariniz',
      title: '7. İlgili Kişinin Hakları',
      content: (
        <div className="text-gray-600 leading-relaxed space-y-2">
          <p>KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
            <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri öğrenme</li>
            <li>Eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
            <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme</li>
            <li>Düzeltme, silme veya yok etme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme</li>
            <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
            <li>Kanuna aykırı işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
          </ul>
          <p className="pt-2">
            Haklarınızı kullanmak için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz:
          </p>
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
          <p className="text-sm text-gray-500 italic pt-1">
            Başvurularınız, talebinizin niteliğine göre en geç otuz gün içinde sonuçlandırılacaktır.
            Başvurunuzun reddedilmesi, verilen cevabın yetersiz bulunması veya süresinde cevap
            verilmemesi hâllerinde; cevabı öğrendiğiniz tarihten itibaren otuz ve her hâlde başvuru
            tarihinden itibaren altmış gün içinde Kişisel Verileri Koruma Kurulu&apos;na şikâyette
            bulunma hakkınız mevcuttur.
          </p>
        </div>
      ),
    },
    {
      id: 'guncelleme',
      title: '8. Aydınlatma Metninin Güncellenmesi',
      content: (
        <p className="text-gray-600 leading-relaxed">
          Bu aydınlatma metni, mevzuat değişiklikleri veya veri işleme faaliyetlerindeki
          güncellemeler doğrultusunda revize edilebilir. Güncel metin her zaman bu sayfada
          yayımlanacaktır.{' '}
          <strong>Son güncelleme tarihi: Ağustos 2026</strong>
        </p>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>KVKK Aydınlatma Metni | BRC KALIP &amp; 4 EL PLASTİK</title>
        <meta
          name="description"
          content="BRC KALIP & 4 EL PLASTİK KVKK Aydınlatma Metni — Kişisel verilerinizin işlenmesine ilişkin bilgilendirme."
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
            <div className="w-16 h-16 rounded-full bg-tealAccent/20 flex items-center justify-center">
              <ShieldCheck size={32} className="text-tealAccent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              KVKK Aydınlatma Metni
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Kişisel verilerinizin nasıl toplandığını, işlendiğini ve korunduğunu bu metinde
              açıklamaktayız.
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
            <span className="text-charcoal font-medium">KVKK Aydınlatma Metni</span>
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
                Bu aydınlatma metni, 6698 sayılı{' '}
                <strong>Kişisel Verilerin Korunması Kanunu (KVKK)</strong> ve ilgili ikincil
                mevzuat kapsamında <strong>BRC KALIP &amp; 4 EL PLASTİK</strong> tarafından hazırlanmış
                olup; web sitemiz üzerinden iletişim formu dolduran ziyaretçilerin kişisel
                verilerine ilişkin bilgilendirme amacı taşımaktadır.
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
                className="inline-flex items-center justify-center px-8 py-3 bg-orangeAccent hover:bg-orangeAccent/90 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 gap-2"
              >
                İletişim Formuna Git
              </Link>
              <Link
                href="/gizlilik"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-tealAccent text-tealAccent font-semibold rounded-lg hover:bg-tealAccent hover:text-white transition-all duration-300 gap-2"
              >
                Gizlilik Politikası
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
