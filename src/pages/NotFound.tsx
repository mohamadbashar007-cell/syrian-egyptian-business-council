import { ArrowLeft, Home, Newspaper, SearchX } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useLanguage } from '../i18n/LanguageContext';

export default function NotFound() {
  const { language } = useLanguage();
  useEffect(() => {
    const previousTitle = document.title;
    document.title = language === 'ar' ? 'الصفحة غير موجودة | مجلس الأعمال السوري المصري' : 'Page Not Found | Syrian Egyptian Business Council';
    return () => { document.title = previousTitle; };
  }, [language]);

  return (
    <Layout>
      <main className="relative isolate grid min-h-[68vh] place-items-center overflow-hidden bg-green-dark px-4 py-20 text-center text-white islamic-pattern">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(197,162,83,.2),transparent_28rem),linear-gradient(135deg,rgba(7,60,43,.72),rgba(3,27,19,.96))]" />
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-gold-custom/35 bg-white/10 shadow-2xl backdrop-blur-sm">
            <SearchX size={36} className="text-gold-custom" />
          </div>
          <span className="mt-7 block text-[72px] font-black leading-none tracking-tight text-gold-custom md:text-[96px]">404</span>
          <h1 className="mt-4 text-[28px] font-black md:text-[38px]">الصفحة غير موجودة</h1>
          <p className="mx-auto mt-4 max-w-xl text-[14px] font-medium leading-8 text-white/65 md:text-[16px]">
            قد يكون الرابط غير صحيح، أو تم نقل الصفحة أو حذفها. يمكنك العودة إلى الموقع ومتابعة آخر أخبار المجلس.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-gold-custom px-7 py-3.5 text-[13px] font-black text-green-dark transition hover:-translate-y-1 hover:bg-white">
              <Home size={17} /> العودة إلى الرئيسية
            </Link>
            <Link to="/news" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-[13px] font-black text-white transition hover:-translate-y-1 hover:border-white hover:bg-white hover:text-green-dark">
              <Newspaper size={17} /> تصفح الأخبار <ArrowLeft size={16} />
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
