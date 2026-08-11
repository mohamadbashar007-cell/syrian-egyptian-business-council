import { Languages, Mail, Menu, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandMark from './BrandMark';
import { useLanguage } from '../i18n/LanguageContext';

const navLinks = [
  { name: 'الرئيسية', path: '/' },
  { name: 'عن المجلس', path: '/about' },
  { name: 'القيادة', path: '/leadership' },
  { name: 'الأنشطة والفعاليات', path: '/activities' },
  { name: 'فرص الاستثمار', path: '/investment' },
  { name: 'المركز الإعلامي', path: '/news' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isArabic, toggleLanguage } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'shadow-[0_12px_35px_-22px_rgba(7,60,43,.55)]' : ''}`}>
      <div className="border-b border-white/10 bg-green-dark text-white">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-[11px] md:px-10 md:text-[12px]">
          <span className="flex items-center gap-2 text-white/75">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-custom shadow-[0_0_0_4px_rgba(197,162,83,.13)]" />
            منصة رسمية لتعزيز التعاون الاقتصادي السوري المصري
          </span>
          <div className="hidden items-center gap-5 text-white/70 md:flex">
            <a href="mailto:info@segybc.com" dir="ltr" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Mail size={13} /> info@segybc.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-green-primary/10 bg-white/95 backdrop-blur-xl">
        <div className={`container mx-auto flex items-center justify-between px-4 transition-[min-height] duration-300 md:px-10 ${scrolled ? 'min-h-[68px]' : 'min-h-[82px]'}`}>
          <Link to="/" className="group flex items-center gap-3" aria-label="الصفحة الرئيسية">
            <BrandMark className="transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-[15px] font-black leading-tight text-green-dark md:text-[17px]">
                مجلس الأعمال السوري المصري
              </span>
              <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.16em] text-text-muted md:text-[9px]">
                Syrian Egyptian Business Council
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="التنقل الرئيسي">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative rounded-lg px-2.5 py-2.5 text-[13px] font-extrabold transition-colors xl:px-3 ${
                    active ? 'text-green-primary' : 'text-text-dark hover:text-green-primary'
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full bg-gold-custom"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button data-no-translate type="button" onClick={toggleLanguage} aria-label={isArabic ? 'Switch to English' : 'Switch to Arabic'} className="inline-flex h-10 items-center gap-2 rounded-full border border-green-primary/20 px-3.5 text-[12px] font-extrabold text-green-primary transition-all hover:border-green-primary hover:bg-green-light">
              <Languages size={16} /> {isArabic ? 'English' : 'العربية'}
            </button>
            <Link to="/news" aria-label="البحث في الأخبار" className="grid h-10 w-10 place-items-center rounded-full border border-border-subtle text-text-muted transition-all hover:border-green-primary hover:bg-green-light hover:text-green-primary">
              <Search size={17} />
            </Link>
            <Link to="/contact" className="rounded-full bg-green-primary px-5 py-2.5 text-[13px] font-extrabold text-white shadow-[0_10px_22px_-12px_rgba(15,91,61,.9)] transition-all hover:-translate-y-0.5 hover:bg-green-dark">
              تواصل معنا
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button data-no-translate type="button" onClick={toggleLanguage} aria-label={isArabic ? 'Switch to English' : 'Switch to Arabic'} className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-green-primary/15 bg-white px-3 text-[11px] font-extrabold text-green-primary">
              <Languages size={16} /> {isArabic ? 'EN' : 'عربي'}
            </button>
            <button
              className="grid h-11 w-11 place-items-center rounded-xl border border-green-primary/15 bg-green-light/60 text-green-primary"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border-subtle bg-white shadow-xl lg:hidden"
          >
            <nav className="container mx-auto grid grid-cols-1 gap-1 px-4 py-4 sm:grid-cols-2">
              {[...navLinks, { name: 'تواصل معنا', path: '/contact' }].map((link, index) => (
                <motion.div key={link.path} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.035 }}>
                  <Link
                    to={link.path}
                    className={`block rounded-xl px-4 py-3.5 text-[14px] font-extrabold ${
                      location.pathname === link.path ? 'bg-green-primary text-white' : 'text-text-dark hover:bg-green-light hover:text-green-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
