import Layout from '../components/Layout';
import { useState } from 'react';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';

const activities = [
  { id: 1, title: 'الاجتماع التأسيسي الأول للمجلس بالقاهرة', category: 'اجتماعات', date: '2026-05-03', image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1600&auto=format&fit=crop' },
  { id: 2, title: 'لقاء وفد المجلس مع وزير الاقتصاد المصري', category: 'لقاءات رسمية', date: '2026-04-20', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1600&auto=format&fit=crop' },
  { id: 3, title: 'توقيع اتفاقية تعاون مع الغرفة التجارية', category: 'مذكرات تفاهم', date: '2026-04-10', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop' },
  { id: 4, title: 'زيارة ميدانية لمصانع سورية في العاشر من رمضان', category: 'زيارات ميدانية', date: '2026-03-15', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop' },
  { id: 5, title: 'المشاركة في منتدى الأعمال المصري السوري بالقاهرة', category: 'مؤتمرات', date: '2026-02-28', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600&auto=format&fit=crop' },
  { id: 6, title: 'ورشة عمل حول قوانين الاستثمار الجديدة في مصر', category: 'لقاءات', date: '2026-01-20', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop' },
];

export default function Activities() {
  const [filter, setFilter] = useState('all');
  const categories = ['all', 'مؤتمرات', 'لقاءات', 'مذكرات تفاهم', 'اجتماعات'];

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-green-primary islamic-pattern py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-[36px] font-extrabold mb-4">الأنشطة والفعاليات</h1>
          <div className="flex items-center justify-center gap-2 text-[14px] opacity-70">
            <span>الرئيسية</span>
            <span>/</span>
            <span className="text-gold-custom">أعمال المجلس</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2.5 rounded-full text-[14px] font-bold transition-all border ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.filter(a => filter === 'all' || a.category === filter).map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden group shadow-sm hover:shadow-xl transition-all">
               <div className="relative h-[240px] overflow-hidden">
                 <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
                 <button className="text-green-primary font-bold text-[14px] flex items-center gap-2 group/btn">
                    <span>تفاصيل الفعالية</span>
                    <ArrowLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
                 </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
