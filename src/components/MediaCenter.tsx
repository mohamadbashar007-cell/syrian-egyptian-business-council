import { ArrowLeft, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fallbackNews, loadNews, NewsItem } from '../data/news';
import Reveal from './Reveal';

export default function MediaCenter() {
  const [news, setNews] = useState<NewsItem[]>(fallbackNews);

  useEffect(() => {
    loadNews().then(setNews);
  }, []);

  return (
    <section className="bg-gray-bg py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-10">
        <Reveal className="mb-10 flex flex-col justify-between gap-5 border-b border-border-subtle pb-7 md:flex-row md:items-end">
          <div>
            <span className="section-kicker">المركز الإعلامي</span>
            <h2 className="mt-3 text-[30px] font-black tracking-tight text-text-dark md:text-[40px]">آخر أخبار المجلس</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-text-muted">
              تغطية مستمرة للاجتماعات والفعاليات والبيانات الرسمية وفرص التعاون الاقتصادي بين رجال الأعمال في البلدين.
            </p>
          </div>
          <Link
            to="/news"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-green-primary px-5 py-3 text-[13px] font-extrabold text-green-primary transition-all hover:-translate-y-0.5 hover:bg-green-primary hover:text-white"
          >
            جميع الأخبار
            <ArrowLeft size={18} />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08} className="h-full">
            <article className="premium-card group h-full overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <Link to={`/news/${item.id}`} aria-label={item.title}>
                  <img loading="lazy" src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
                <span className="absolute right-4 top-4 rounded-md bg-white/95 px-3 py-1 text-[12px] font-extrabold text-green-primary shadow-sm">
                  {item.category}
                </span>
              </div>
              <div className="flex min-h-[250px] flex-col p-6 md:p-7">
                <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-text-muted">
                  <Calendar size={15} className="text-gold-custom" />
                  <span>{item.date}</span>
                </div>
                <Link to={`/news/${item.id}`} className="mb-3 block"><h3 className="line-clamp-2 text-[19px] font-extrabold leading-snug text-text-dark transition-colors group-hover:text-green-primary">{item.title}</h3></Link>
                <p className="line-clamp-3 text-[14px] leading-7 text-text-muted">{item.summary}</p>
                <Link to={`/news/${item.id}`} className="mt-auto inline-flex items-center gap-2 pt-5 text-[14px] font-extrabold text-green-primary">
                  اقرأ التفاصيل
                  <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                </Link>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
