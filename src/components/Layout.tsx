import { ReactNode, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 32, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const pageTitles: Record<string, string> = {
      '/': 'الرئيسية',
      '/about': 'عن المجلس',
      '/leadership': 'القيادة',
      '/activities': 'الأنشطة والفعاليات',
      '/investment': 'فرص الاستثمار',
      '/news': 'المركز الإعلامي',
      '/contact': 'تواصل معنا',
    };
    const currentTitle = location.pathname.startsWith('/news/') ? 'تفاصيل الخبر' : (pageTitles[location.pathname] ?? 'الرئيسية');
    document.title = `${currentTitle} | مجلس الأعمال السوري المصري`;
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-clip">
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-right bg-gold-custom" style={{ scaleX }} />
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
