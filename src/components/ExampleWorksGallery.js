import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useLanguage } from '@/utils/LanguageContext';

/**
 * Infinite marquee of image cards. The marquee pauses while hovered and every
 * card opens a full-size lightbox (Esc / backdrop click to close, arrow keys to navigate).
 *
 * @param {{ images: { src: string, alt?: string }[], i18nPrefix?: string }} props
 *   `i18nPrefix` is the translations namespace holding the `examples*` keys (e.g. 'plastic', 'home').
 */
export default function ExampleWorksGallery({ images, i18nPrefix = 'plastic' }) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  // Keyboard controls + body scroll lock while the lightbox is open
  useEffect(() => {
    if (activeIndex === null) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, close, showPrev, showNext]);

  const renderTrack = (trackId, isClone) => (
    <div
      aria-hidden={isClone ? 'true' : undefined}
      className="flex shrink-0 items-center gap-6 animate-marquee group-hover:[animation-play-state:paused]"
    >
      {images.map((img, idx) => (
        <button
          key={`${trackId}-${idx}`}
          type="button"
          tabIndex={isClone ? -1 : 0}
          onClick={() => setActiveIndex(idx)}
          aria-label={`${t(`${i18nPrefix}.examplesOpen`)} ${idx + 1}`}
          className="group/card relative w-72 h-56 sm:w-80 sm:h-64 shrink-0 overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-tealAccent/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <Image
            src={img.src}
            alt={img.alt || `${t(`${i18nPrefix}.examplesImageAlt`)} ${idx + 1}`}
            fill
            sizes="(max-width: 640px) 288px, 320px"
            className="object-cover transition-transform duration-500 group-hover/card:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 group-hover/card:bg-charcoal/40 transition-colors duration-300">
            <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <div className="relative w-full overflow-hidden group">
        {/* Soft edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-lightGray to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-lightGray to-transparent z-10" />

        <div className="flex w-max gap-6 py-8" style={{ '--marquee-gap': '1.5rem' }}>
          {renderTrack('track1', false)}
          {renderTrack('track2', true)}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={t(`${i18nPrefix}.examplesTitle`)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label={t(`${i18nPrefix}.examplesClose`)}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              aria-label={t(`${i18nPrefix}.examplesPrev`)}
              className="absolute left-2 sm:left-6 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              aria-label={t(`${i18nPrefix}.examplesNext`)}
              className="absolute right-2 sm:right-6 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt || `${t(`${i18nPrefix}.examplesImageAlt`)} ${activeIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </motion.div>

            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70 tabular-nums">
              {activeIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
