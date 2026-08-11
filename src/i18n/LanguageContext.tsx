import { createContext, ReactNode, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { translateText, translations } from './translations';

export type Language = 'ar' | 'en';

interface LanguageContextValue {
  language: Language;
  isArabic: boolean;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (value: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const translatedAttributes = ['alt', 'aria-label', 'placeholder', 'title'] as const;

function preserveSpacing(value: string, translation: string) {
  const leading = value.match(/^\s*/)?.[0] ?? '';
  const trailing = value.match(/\s*$/)?.[0] ?? '';
  return `${leading}${translation}${trailing}`;
}

function translateDynamic(value: string) {
  const trimmed = value.trim();
  const direct = translations[trimmed];
  if (direct) return preserveSpacing(value, direct);

  const newsSlide = trimmed.match(/^الخبر (\d+)$/);
  if (newsSlide) return preserveSpacing(value, `News item ${newsSlide[1]}`);
  const newsDescription = trimmed.match(/^(\d{4}-\d{2}-\d{2}) — المركز الإعلامي لمجلس الأعمال السوري المصري$/);
  if (newsDescription) return preserveSpacing(value, `${newsDescription[1]} — Syrian Egyptian Business Council Media Center`);
  if (trimmed.startsWith('التواصل مع ')) return preserveSpacing(value, `Contact ${translateText(trimmed.slice(11), 'en')}`);
  return value;
}

function applyLanguage(language: Language) {
  const isAdmin = window.location.pathname.includes('/council-desk-83');
  const effectiveLanguage: Language = isAdmin ? 'ar' : language;
  document.documentElement.lang = effectiveLanguage;
  document.documentElement.dir = effectiveLanguage === 'ar' ? 'rtl' : 'ltr';
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (description) {
    description.content = effectiveLanguage === 'ar'
      ? 'الموقع الرسمي لمجلس الأعمال السوري المصري: أخبار المجلس، فرص الاستثمار، الفعاليات، وخدمات دعم رجال الأعمال.'
      : 'The official website of the Syrian Egyptian Business Council: council news, investment opportunities, events, and business support services.';
  }

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode() as Text | null;
  while (node) {
    const parent = node.parentElement;
    if (parent && !parent.closest('[data-no-translate]') && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
      if (effectiveLanguage === 'en') {
        const remembered = originalText.get(node);
        if (!remembered || (node.nodeValue && /[\u0600-\u06ff]/.test(node.nodeValue) && node.nodeValue !== translateDynamic(remembered))) {
          originalText.set(node, node.nodeValue ?? '');
        }
        const source = originalText.get(node) ?? node.nodeValue ?? '';
        const translated = translateDynamic(source);
        if (node.nodeValue !== translated) node.nodeValue = translated;
      } else {
        const source = originalText.get(node);
        if (source !== undefined && node.nodeValue !== source) node.nodeValue = source;
      }
    }
    node = walker.nextNode() as Text | null;
  }

  for (const element of document.body.querySelectorAll('*')) {
    if (element.closest('[data-no-translate]')) continue;
    let remembered = originalAttributes.get(element);
    if (!remembered) {
      remembered = new Map();
      originalAttributes.set(element, remembered);
    }
    for (const attribute of translatedAttributes) {
      const current = element.getAttribute(attribute);
      if (current === null) continue;
      if (effectiveLanguage === 'en') {
        if (!remembered.has(attribute) || /[\u0600-\u06ff]/.test(current)) remembered.set(attribute, current);
        const translated = translateDynamic(remembered.get(attribute) ?? current);
        if (current !== translated) element.setAttribute(attribute, translated);
      } else if (remembered.has(attribute)) {
        const source = remembered.get(attribute)!;
        if (current !== source) element.setAttribute(attribute, source);
      }
    }
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
      if (requestedLanguage === 'ar' || requestedLanguage === 'en') return requestedLanguage;
      return localStorage.getItem('segybc-language') === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  });

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    try {
      localStorage.setItem('segybc-language', nextLanguage);
    } catch {
      // The language still changes for this session when storage is unavailable.
    }
  };

  useLayoutEffect(() => {
    let scheduled = false;
    const update = () => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(() => {
        scheduled = false;
        applyLanguage(language);
      });
    };

    applyLanguage(language);
    const observer = new MutationObserver(update);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: [...translatedAttributes] });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    isArabic: language === 'ar',
    setLanguage,
    toggleLanguage: () => setLanguage(language === 'ar' ? 'en' : 'ar'),
    t: (text) => translateText(text, language),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider.');
  return context;
}
