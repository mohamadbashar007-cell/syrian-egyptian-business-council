import { ArrowLeft, Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import { fallbackNews, loadNews, NewsCategory, NewsItem } from '../data/news';
import PageHero from '../components/PageHero';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

const categories: Array<'الكل' | NewsCategory> = ['الكل', 'أخبار المجلس', 'فعاليات', 'بيانات صحفية', 'استثمار'];

export default function News() {
  const [activeCategory, setActiveCategory] = useState<'الكل' | NewsCategory>('الكل');
  const [query, setQuery] = useState('');
  const [news, setNews] = useState<NewsItem[]>(fallbackNews);
  const { t } = useLanguage();

  useEffect(() => {
    loadNews().then(setNews);
  }, []);

  const filteredNews = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return news.filter((item) => {
      const matchesCategory = activeCategory === 'الكل' || item.category === activeCategory;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        `${item.title} ${item.summary} ${item.category} ${t(item.title)} ${t(item.summary)} ${t(item.category)}`.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, news, query, t]);

  return (
    <Layout>
      <PageHero eyebrow="الأخبار والبيانات" title="المركز الإعلامي" description="مصدر موحد لمتابعة أخبار المجلس وفعالياته وبياناته الرسمية أولًا بأول." image="https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1800&auto=format&fit=crop" />

      <section className="bg-gray-bg py-14">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mb-10 grid gap-4 rounded-2xl border border-border-subtle bg-white p-4 shadow-[0_16px_45px_-35px_rgba(7,60,43,.5)] lg:grid-cols-[1fr_320px]">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-md px-4 py-2 text-[14px] font-extrabold transition-colors ${
                    activeCategory === category
                      ? 'bg-green-primary text-white shadow-md'
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

          <motion.div layout className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => (
              <motion.article layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }} key={item.id} className="premium-card group grid overflow-hidden rounded-2xl bg-white md:grid-cols-[230px_1fr]">
                <div className="relative min-h-[230px] overflow-hidden bg-gray-100">
                  <Link to={`/news/${item.id}`} aria-label={item.title}>
                    <img loading="lazy" src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </Link>
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
                  <Link to={`/news/${item.id}`}><h2 className="mb-3 text-[20px] font-extrabold leading-snug text-text-dark transition-colors group-hover:text-green-primary">{item.title}</h2></Link>
                  <p className="line-clamp-3 text-[14px] leading-7 text-text-muted">{item.summary}</p>
                  <Link to={`/news/${item.id}`} className="mt-auto inline-flex items-center gap-2 pt-5 text-[13px] font-extrabold text-green-primary transition-colors hover:text-green-dark">
                    اقرأ التفاصيل <ArrowLeft size={15} />
                  </Link>
                </div>
              </motion.article>
            ))}
            </AnimatePresence>
          </motion.div>

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
