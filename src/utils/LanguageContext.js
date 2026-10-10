import React, { createContext, useEffect, useCallback, useMemo, useSyncExternalStore, useContext } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

const STORAGE_KEY = 'language';
const DEFAULT_LANGUAGE = 'tr';
const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  window.addEventListener('storage', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

// Client snapshot: saved preference (localStorage) or default.
function getSnapshot() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'tr' || saved === 'en' ? saved : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

// Server snapshot: always default so SSR / hydration markup matches.
function getServerSnapshot() {
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep <html lang> in sync with the selected language (a11y + SEO)
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang) => {
    if (lang !== 'tr' && lang !== 'en') return;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // storage unavailable (private mode etc.) — preference just won't persist
    }
    listeners.forEach((listener) => listener());
  }, []);

  // Helper function to resolve nested keys like "home.heroSubtitle"
  const t = useCallback(
    (path) => {
      const keys = path.split('.');
      let result = translations[language];

      for (const key of keys) {
        if (result && result[key] !== undefined) {
          result = result[key];
        } else {
          return path; // Fallback to path itself if not found
        }
      }
      return result;
    },
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
