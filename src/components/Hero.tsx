import { ArrowLeft, BriefcaseBusiness, Calendar, ChevronLeft, ChevronRight, Landmark, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fallbackNews, loadNews, NewsItem } from '../data/news';
import { useLanguage } from '../i18n/LanguageContext';

export default function Hero() {
  const [slides, setSlides] = useState<NewsItem[]>(fallbackNews.slice(0, 3));
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();
  const { isArabic } = useLanguage();

  useEffect(() => {
    loadNews().then((items) => {
      const featured = [...items.filter((item) => item.featured), ...items.filter((item) => !item.featured)];
      setSlides(featured.slice(0, 3));
    });
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 7000);
    return () => window.clearInterval(timer);
  }, [reduceMotion, slides.length]);

  const slide = slides[current] ?? fallbackNews[0];
  const next = () => setCurrent((current + 1) % slides.length);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-green-dark text-white lg:min-h-[720px]">
      <AnimatePresence mode="sync">
        <motion.div key={slide.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }} className="absolute inset-0 -z-20">
          <motion.img
            initial={reduceMotion ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7.5, ease: 'linear' }}
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className={`absolute inset-0 -z-10 ${isArabic ? 'bg-[linear-gradient(90deg,rgba(7,60,43,.28)_0%,rgba(7,60,43,.82)_58%,rgba(4,32,23,.97)_100%)]' : 'bg-[linear-gradient(270deg,rgba(7,60,43,.28)_0%,rgba(7,60,43,.82)_58%,rgba(4,32,23,.97)_100%)]'}`} />
      <div className="absolute inset-0 -z-10 islamic-pattern opacity-35" />
      <div className="absolute -right-28 top-20 -z-10 h-[420px] w-[420px] rounded-full border border-white/10" />
      <div className="hero-orbit absolute -right-12 top-36 -z-10 h-[280px] w-[280px] rounded-full border border-dashed border-gold-custom/25" />

      <div className="container mx-auto flex min-h-[680px] items-center px-4 pb-32 pt-20 md:px-10 lg:min-h-[720px]">
        <div className="max-w-4xl">
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-custom/35 bg-green-dark/35 px-4 py-2 text-[12px] font-extrabold text-white/85 backdrop-blur-md">
            <ShieldCheck size={16} className="text-gold-custom" />
            مؤسسة اقتصادية معتمدة بقرار وزاري
          </motion.div>

          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.08 }} className="text-balance text-[39px] font-black leading-[1.22] tracking-[-.02em] md:text-[61px] lg:text-[68px]">
            شراكة اقتصادية<br />
            <span className="text-gold-custom">تصنع فرص المستقبل</span>
          </motion.h1>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }} className="mt-6 max-w-2xl text-[16px] font-medium leading-8 text-white/75 md:text-[19px] md:leading-9">
            نربط مجتمع الأعمال في سوريا ومصر بمنظومة مؤسسية موثوقة تدعم التجارة والاستثمار وتحوّل العلاقات إلى شراكات مستدامة.
          </motion.p>

          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24 }} className="mt-8 flex flex-wrap gap-3">
            <Link to="/investment" className="group inline-flex items-center gap-2 rounded-full bg-gold-custom px-7 py-3.5 text-[14px] font-black text-green-dark shadow-[0_15px_35px_-16px_rgba(197,162,83,.8)] transition-all hover:-translate-y-1 hover:bg-white">
              استكشف فرص الاستثمار <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link to="/about" className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-[14px] font-black text-white backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-white/60 hover:bg-white hover:text-green-dark">
              تعرّف على المجلس
            </Link>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div key={slide.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: 0.45 }} className={`mt-9 max-w-2xl border-gold-custom ${isArabic ? 'border-r-2 pr-4' : 'border-l-2 pl-4'}`}>
              <div className="mb-1.5 flex items-center gap-2 text-[11px] font-bold text-white/55">
                <Calendar size={13} className="text-gold-custom" /> {slide.date} <span>•</span> {slide.category}
              </div>
              <Link to={`/news/${slide.id}`} className="line-clamp-2 text-[14px] font-bold leading-7 text-white/85 transition-colors hover:text-gold-custom md:text-[15px]">{slide.title}</Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-green-dark/70 backdrop-blur-xl">
        <div className="container mx-auto flex min-h-[92px] items-center justify-between gap-5 px-4 md:px-10">
          <div className={`hidden items-center divide-x divide-white/10 md:flex ${isArabic ? 'divide-x-reverse' : ''}`}>
            <div className={`flex items-center gap-3 px-5 ${isArabic ? 'first:pr-0' : 'first:pl-0'}`}><Landmark size={22} className="text-gold-custom" /><div><b className="block text-[18px]">83</b><span className="text-[10px] text-white/50">رقم القرار الوزاري</span></div></div>
            <div className="flex items-center gap-3 px-5"><BriefcaseBusiness size={22} className="text-gold-custom" /><div><b className="block text-[18px]">6+</b><span className="text-[10px] text-white/50">قطاعات استثمارية</span></div></div>
          </div>
          <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-end">
            <div className="flex gap-2" aria-label="شرائح الأخبار">
              {slides.map((item, idx) => (
                <button key={item.id} onClick={() => setCurrent(idx)} className={`h-1.5 rounded-full transition-all duration-500 ${current === idx ? 'w-9 bg-gold-custom' : 'w-2.5 bg-white/30 hover:bg-white/60'}`} aria-label={`الخبر ${idx + 1}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-gold-custom hover:bg-gold-custom hover:text-green-dark" aria-label="السابق"><ChevronRight size={19} /></button>
              <button onClick={next} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-gold-custom hover:bg-gold-custom hover:text-green-dark" aria-label="التالي"><ChevronLeft size={19} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
