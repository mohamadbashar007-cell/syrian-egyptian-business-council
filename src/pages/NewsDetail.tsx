import { ArrowRight, ArrowUpLeft, Calendar, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { fallbackNews, loadNews, NewsItem } from '../data/news';
import { useLanguage } from '../i18n/LanguageContext';

export default function NewsDetail() {
  const { id } = useParams();
  const numericId = Number(id);
  const [news, setNews] = useState<NewsItem[]>(fallbackNews);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    loadNews().then((items) => {
      setNews(items);
      setLoading(false);
    });
  }, []);

  const item = news.find((entry) => entry.id === numericId);
  const related = news.filter((entry) => entry.id !== numericId).slice(0, 3);

  useEffect(() => {
    if (item) document.title = `${t(item.title)} | ${language === 'ar' ? 'مجلس الأعمال السوري المصري' : 'Syrian Egyptian Business Council'}`;
  }, [item, language, t]);

  if (loading) {
    return (
      <Layout>
        <div className="grid min-h-[55vh] place-items-center bg-gray-bg">
          <div className="flex items-center gap-3 text-[14px] font-bold text-text-muted">
            <LoaderCircle className="animate-spin text-green-primary" size={23} /> جاري تحميل الخبر
          </div>
        </div>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout>
        <PageHero eyebrow="المركز الإعلامي" title="الخبر غير موجود" description="قد يكون رابط الخبر قديمًا أو تم تحديث المحتوى." />
        <div className="container mx-auto px-4 py-16 text-center md:px-10">
          <Link to="/news" className="inline-flex items-center gap-2 rounded-full bg-green-primary px-6 py-3 text-[14px] font-extrabold text-white">
            <ArrowRight size={17} /> العودة إلى الأخبار
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero eyebrow={item.category} title={item.title} description={`${item.date} — المركز الإعلامي لمجلس الأعمال السوري المصري`} image={item.image} />

      <article className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-10">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-border-subtle bg-white shadow-[0_28px_70px_-38px_rgba(7,60,43,.45)]">
                <div className="aspect-[16/9] overflow-hidden bg-gray-bg">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6 md:p-10">
                  <div className="mb-7 flex flex-wrap items-center gap-3 border-b border-border-subtle pb-6">
                    <span className="rounded-full bg-green-light px-4 py-1.5 text-[12px] font-extrabold text-green-primary">{item.category}</span>
                    <span className="flex items-center gap-2 text-[13px] font-bold text-text-muted"><Calendar size={15} className="text-gold-custom" />{item.date}</span>
                  </div>
                  <p className="mb-7 text-[18px] font-bold leading-9 text-text-dark">{item.summary}</p>
                  <div className="space-y-5 text-[16px] leading-9 text-text-muted">
                    {(item.content?.length ? item.content : [item.summary]).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <aside className="space-y-5">
              <Reveal delay={0.08}>
                <div className="rounded-2xl bg-green-dark p-6 text-white islamic-pattern">
                  <span className="text-[11px] font-bold text-gold-custom">المصدر الرسمي</span>
                  <h2 className="mt-2 text-[17px] font-black">مجلس الأعمال السوري المصري</h2>
                  <p className="mt-3 text-[12px] leading-6 text-white/60">تم إعداد تفاصيل الخبر بالاستناد إلى المنشور الرسمي الصادر عن المجلس.</p>
                  {item.sourceUrl && (
                    <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-[12px] font-extrabold text-gold-custom transition-colors hover:text-white">
                      مراجعة المصدر <ArrowUpLeft size={15} />
                    </a>
                  )}
                </div>
              </Reveal>
              <Link to="/news" className="flex items-center justify-center gap-2 rounded-full border border-green-primary px-5 py-3 text-[13px] font-extrabold text-green-primary transition-all hover:bg-green-primary hover:text-white">
                <ArrowRight size={16} /> جميع الأخبار
              </Link>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-gray-bg py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-10">
            <div className="mb-8">
              <span className="section-kicker">تابع المستجدات</span>
              <h2 className="mt-3 text-[27px] font-black text-text-dark">أخبار ذات صلة</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((entry, index) => (
                <Reveal key={entry.id} delay={index * 0.06}>
                  <Link to={`/news/${entry.id}`} className="premium-card group block overflow-hidden rounded-2xl bg-white">
                    <div className="aspect-[16/10] overflow-hidden"><img loading="lazy" src={entry.image} alt={entry.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                    <div className="p-5"><span className="text-[11px] font-bold text-gold-custom">{entry.date}</span><h3 className="mt-2 line-clamp-2 text-[15px] font-black leading-7 text-text-dark group-hover:text-green-primary">{entry.title}</h3></div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
