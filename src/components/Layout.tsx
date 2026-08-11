import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 32, restDelta: 0.001 });
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const pageTitles: Record<string, [string, string]> = {
      '/': ['الرئيسية', 'Home'],
      '/about': ['عن المجلس', 'About'],
      '/leadership': ['القيادة', 'Leadership'],
      '/activities': ['الأنشطة والفعاليات', 'Activities & Events'],
      '/investment': ['فرص الاستثمار', 'Investment Opportunities'],
      '/news': ['المركز الإعلامي', 'Media Center'],
      '/contact': ['تواصل معنا', 'Contact Us'],
    };
    const currentTitle = location.pathname.startsWith('/news/')
      ? (language === 'ar' ? 'تفاصيل الخبر' : 'News Details')
      : (pageTitles[location.pathname]?.[language === 'ar' ? 0 : 1] ?? (language === 'ar' ? 'الرئيسية' : 'Home'));
    document.title = `${currentTitle} | ${language === 'ar' ? 'مجلس الأعمال السوري المصري' : 'Syrian Egyptian Business Council'}`;
  }, [language, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-clip">
      <motion.div className={`fixed inset-x-0 top-0 z-[70] h-[3px] bg-gold-custom ${language === 'ar' ? 'origin-right' : 'origin-left'}`} style={{ scaleX }} />
      <Header />
      <motion.main 
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        className="flex-grow"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
