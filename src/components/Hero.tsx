import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fallbackNews, loadNews, NewsItem } from '../data/news';

export default function Hero() {
  const [slides, setSlides] = useState<NewsItem[]>(fallbackNews.slice(0, 3));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    loadNews().then((items) => setSlides(items.filter((item) => item.featured).concat(items).slice(0, 3)));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current] ?? fallbackNews[0];
  const next = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prev = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <section className="relative min-h-[560px] overflow-hidden bg-green-dark text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-l from-green-dark/95 via-green-dark/70 to-black/25" />
        </motion.div>
      </AnimatePresence>

      <div className="container relative z-10 mx-auto flex min-h-[560px] items-center px-4 py-16 md:px-10">
        <div className="max-w-3xl">
          <div className="mb-5 flex w-fit items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-[13px] font-bold backdrop-blur">
            <Calendar size={16} className="text-gold-custom" />
            <span>{slide.date}</span>
            <span className="text-gold-custom">•</span>
            <span>{slide.category}</span>
          </div>
          <h1 className="mb-6 text-[34px] font-black leading-tight md:text-[54px]">
            مجلس الأعمال السوري المصري
          </h1>
          <p className="mb-7 max-w-2xl text-[18px] font-medium leading-8 text-white/88 md:text-[21px]">
            منصة مؤسسية تربط رجال الأعمال والجهات الاقتصادية في سوريا ومصر لتطوير التجارة والاستثمار والشراكات الصناعية.
          </p>
          <div className="mb-9 border-r-4 border-gold-custom pr-4">
            <h2 className="mb-2 text-[21px] font-extrabold leading-snug md:text-[26px]">{slide.title}</h2>
            <p className="line-clamp-2 max-w-2xl text-[15px] leading-7 text-white/75">{slide.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 rounded-md bg-gold-custom px-6 py-3 text-[15px] font-extrabold text-green-dark transition-colors hover:bg-white"
            >
              آخر الأخبار
              <ArrowLeft size={18} />
            </Link>
            <Link
              to="/investment"
              className="inline-flex items-center rounded-md border border-white/30 px-6 py-3 text-[15px] font-extrabold text-white transition-colors hover:bg-white hover:text-green-primary"
            >
              فرص الاستثمار
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        <button onClick={prev} className="grid h-10 w-10 place-items-center rounded-md bg-white/12 text-white backdrop-blur hover:bg-white/25" aria-label="السابق">
          <ChevronRight size={22} />
        </button>
        <div className="flex gap-2">
          {slides.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all ${current === idx ? 'w-8 bg-gold-custom' : 'w-2 bg-white/50'}`}
              aria-label={`الشريحة ${idx + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className="grid h-10 w-10 place-items-center rounded-md bg-white/12 text-white backdrop-blur hover:bg-white/25" aria-label="التالي">
          <ChevronLeft size={22} />
        </button>
      </div>
    </section>
  );
}
