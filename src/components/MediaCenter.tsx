import { ArrowLeft, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fallbackNews, loadNews, NewsItem } from '../data/news';

export default function MediaCenter() {
  const [news, setNews] = useState<NewsItem[]>(fallbackNews);

  useEffect(() => {
    loadNews().then(setNews);
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-border-subtle pb-6 md:flex-row md:items-end">
          <div>
            <span className="mb-3 block text-[13px] font-extrabold text-gold-custom">المركز الإعلامي</span>
            <h2 className="text-[30px] font-black text-text-dark md:text-[36px]">آخر أخبار المجلس</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-text-muted">
              تغطية مستمرة للاجتماعات والفعاليات والبيانات الرسمية وفرص التعاون الاقتصادي بين رجال الأعمال في البلدين.
            </p>
          </div>
          <Link
            to="/news"
            className="inline-flex w-fit items-center gap-2 rounded-md border border-green-primary px-5 py-3 text-[14px] font-extrabold text-green-primary transition-colors hover:bg-green-primary hover:text-white"
          >
            جميع الأخبار
            <ArrowLeft size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, 3).map((item) => (
            <article key={item.id} className="group overflow-hidden rounded-lg border border-border-subtle bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute right-4 top-4 rounded-md bg-white/95 px-3 py-1 text-[12px] font-extrabold text-green-primary shadow-sm">
                  {item.category}
                </span>
              </div>
              <div className="flex min-h-[250px] flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-text-muted">
                  <Calendar size={15} className="text-gold-custom" />
                  <span>{item.date}</span>
                </div>
                <h3 className="mb-3 line-clamp-2 text-[19px] font-extrabold leading-snug text-text-dark transition-colors group-hover:text-green-primary">
                  {item.title}
                </h3>
                <p className="line-clamp-3 text-[14px] leading-7 text-text-muted">{item.summary}</p>
                <Link to="/news" className="mt-auto inline-flex items-center gap-2 pt-5 text-[14px] font-extrabold text-green-primary">
                  اقرأ المزيد
                  <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
