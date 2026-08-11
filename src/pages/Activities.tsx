import Layout from '../components/Layout';
import { useState } from 'react';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import PageHero from '../components/PageHero';
import { councilActivities } from '../data/activities';
import { Link } from 'react-router-dom';

export default function Activities() {
  const [filter, setFilter] = useState('all');
  const categories = ['all', 'معارض', 'زيارات رسمية', 'اجتماعات'];

  return (
    <Layout>
      <PageHero eyebrow="أعمال المجلس" title="أنشطة تحوّل الحوار إلى شراكات" description="تابع اجتماعات المجلس وملتقياته وزياراته الميدانية التي تجمع مجتمع الأعمال وصنّاع القرار." image="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1800&auto=format&fit=crop" />

      <div className="container mx-auto px-4 py-20 md:px-10 md:py-24">
        {/* Filters */}
        <div className="mb-14 flex flex-wrap justify-center gap-3 rounded-2xl border border-border-subtle bg-white p-3 shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-7 py-2.5 text-[13px] font-extrabold transition-all ${
                filter === cat 
                ? 'bg-green-primary text-white border-green-primary' 
                : 'bg-white text-text-muted border-gray-200 hover:border-green-primary hover:text-green-primary'
              }`}
            >
              {cat === 'all' ? 'الكل' : cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
          {councilActivities.filter(a => filter === 'all' || a.category === filter).map((item) => (
            <motion.article layout initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .3 }} key={item.id} className="premium-card group overflow-hidden rounded-2xl bg-white">
               <div className="relative h-[240px] overflow-hidden">
                 <img loading="lazy" src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute top-4 right-4 bg-white/90 text-text-dark text-[11px] px-3 py-1 rounded font-bold backdrop-blur-sm shadow-sm flex items-center gap-2">
                   <Tag size={12} className="text-gold-custom" />
                   {item.category}
                 </div>
               </div>
               <div className="p-6">
                 <div className="flex items-center gap-2 text-text-muted text-[13px] mb-3">
                   <Calendar size={14} />
                   <span>{item.date}</span>
                 </div>
                 <h3 className="text-[18px] font-bold text-text-dark mb-6 leading-snug group-hover:text-green-primary transition-colors">
                   {item.title}
                 </h3>
                 <p className="mb-6 line-clamp-3 text-[13px] leading-7 text-text-muted">{item.summary}</p>
                 <Link to={`/news/${item.id}`} className="group/btn flex items-center gap-2 text-[14px] font-bold text-green-primary">
                    <span>تفاصيل الفعالية</span>
                    <ArrowLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
                 </Link>
               </div>
            </motion.article>
          ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </Layout>
  );
}
