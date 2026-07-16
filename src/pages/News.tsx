import { Calendar, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import { fallbackNews, loadNews, NewsCategory, NewsItem } from '../data/news';

const categories: Array<'الكل' | NewsCategory> = ['الكل', 'أخبار المجلس', 'فعاليات', 'بيانات صحفية', 'استثمار'];

export default function News() {
  const [activeCategory, setActiveCategory] = useState<'الكل' | NewsCategory>('الكل');
  const [query, setQuery] = useState('');
  const [news, setNews] = useState<NewsItem[]>(fallbackNews);

  useEffect(() => {
    loadNews().then(setNews);
  }, []);

  const filteredNews = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return news.filter((item) => {
      const matchesCategory = activeCategory === 'الكل' || item.category === activeCategory;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        `${item.title} ${item.summary} ${item.category}`.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, news, query]);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-green-dark py-20 text-white">
        <img
          src="https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1800&auto=format&fit=crop"
          alt="غرفة أخبار ومواد إعلامية"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-green-dark/70" />
        <div className="container relative z-10 mx-auto px-4 text-center md:px-10">
          <span className="mb-3 block text-[13px] font-extrabold text-gold-custom">الأخبار والبيانات</span>
          <h1 className="text-[36px] font-black md:text-[50px]">المركز الإعلامي</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-8 text-white/80">
            مصدر موحد لمتابعة أخبار المجلس وفعالياته وبياناته الصحفية أولاً بأول.
          </p>
        </div>
      </section>

      <section className="bg-gray-bg py-14">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mb-8 grid gap-4 rounded-lg border border-border-subtle bg-white p-4 shadow-sm lg:grid-cols-[1fr_320px]">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-md px-4 py-2 text-[14px] font-extrabold transition-colors ${
                    activeCategory === category
                      ? 'bg-green-primary text-white'
                      : 'bg-gray-bg text-text-muted hover:bg-green-light hover:text-green-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ابحث في الأخبار"
                className="w-full rounded-md border border-border-subtle bg-white py-3 pr-4 pl-10 text-[14px] outline-none focus:border-green-primary"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredNews.map((item) => (
              <article key={item.id} className="group grid overflow-hidden rounded-lg border border-border-subtle bg-white shadow-sm transition-all hover:shadow-xl md:grid-cols-[230px_1fr]">
                <div className="relative min-h-[230px] overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-md bg-green-light px-3 py-1 text-[12px] font-extrabold text-green-primary">
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1 text-[13px] font-semibold text-text-muted">
                      <Calendar size={14} className="text-gold-custom" />
                      {item.date}
                    </span>
                  </div>
                  <h2 className="mb-3 text-[20px] font-extrabold leading-snug text-text-dark transition-colors group-hover:text-green-primary">
                    {item.title}
                  </h2>
                  <p className="line-clamp-3 text-[14px] leading-7 text-text-muted">{item.summary}</p>
                </div>
              </article>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="rounded-lg border border-border-subtle bg-white p-10 text-center text-[15px] font-bold text-text-muted">
              لا توجد أخبار مطابقة لخيارات البحث الحالية.
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
