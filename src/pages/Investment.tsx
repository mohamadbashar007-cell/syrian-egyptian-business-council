import Layout from '../components/Layout';
import { Building, Factory, Truck, Globe, Zap, HeartPulse } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';

const sectors = [
  { icon: <Factory size={32} />, title: 'الصناعات النسيجية', desc: 'فرص كبرى في مدينة العاشر من رمضان والعبور لتبادل الخبرات والتصنيع المشترك.' },
  { icon: <Building size={32} />, title: 'الاستثمار العقاري', desc: 'مشاريع تطوير عمراني وإسكان متميز في كلا البلدين بامتيازات خاصة.' },
  { icon: <Truck size={32} />, title: 'الخدمات اللوجستية', desc: 'تطوير سلاسل الإمداد ومراكز التخزين لتسهيل التصدير والاستيراد.' },
  { icon: <Zap size={32} />, title: 'الطاقة المتجددة', desc: 'مشاريع طاقة شمسية ورياح بالاستفادة من التسهيلات الحكومية الجديدة.' },
  { icon: <HeartPulse size={32} />, title: 'الصناعات الغذائية', desc: 'تكامل بين المواد الخام السورية وقدرات التصنيع والتوزيع المصرية.' },
  { icon: <Globe size={32} />, title: 'تكنولوجيا المعلومات', desc: 'شراكات تقنية وبرمجية لخدمة التحول الرقمي في المؤسسات الاقتصادية.' },
];

export default function Investment() {
  return (
    <Layout>
      <PageHero eyebrow="فرص الاستثمار" title="استثمارات عابرة للحدود، مدعومة بالخبرة" description="بيئة متكاملة ترفع فرص نجاح المشروعات السورية المصرية المشتركة وتمنحها غطاءً مؤسسيًا موثوقًا." image="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1800&auto=format&fit=crop" />

      <div className="container mx-auto px-4 py-20 md:px-10 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 items-center">
           <Reveal direction="right" className="lg:col-span-2">
             <span className="section-kicker">ميزة مؤسسية</span>
             <h2 className="mb-7 mt-3 text-[31px] font-black text-text-dark">لماذا الاستثمار عبر المجلس؟</h2>
             <div className="space-y-6">
                {[
                  { title: 'الغطاء الرسمي', text: 'مجلس معتمد من وزارات الاقتصاد في كلا البلدين يضمن سلامة الإجراءات.' },
                  { title: 'نفاذ السوق', text: 'تسهيلات خاصة في الدخول للأسواق الجمركية واتفاقيات التجارة الحرة.' },
                  { title: 'الاستشارات الفنية', text: 'فريق متخصص يقدم دراسات جدوى ومعلومات دقيقة عن القوانين المحلية.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 rounded-2xl border border-green-primary/10 border-r-4 border-r-green-primary bg-gray-bg p-6 transition-all hover:-translate-x-1 hover:bg-white hover:shadow-lg">
                    <div className="w-10 h-10 bg-white rounded flex items-center justify-center shrink-0 shadow-sm text-green-primary font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-[17px] text-text-dark mb-1">{item.title}</h4>
                      <p className="text-[14px] text-text-muted">{item.text}</p>
                    </div>
                  </div>
                ))}
             </div>
           </Reveal>
           <Reveal direction="left" delay={0.1} className="grid grid-cols-2 gap-4 lg:col-span-2">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg transform translate-y-8">
                <img loading="lazy" src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop" alt="مشروع تطوير واستثمار عمراني" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                <img loading="lazy" src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1400&auto=format&fit=crop" alt="منشأة صناعية حديثة" className="w-full h-full object-cover" />
              </div>
           </Reveal>
        </div>

        {/* Sectors Grid */}
        <div className="mb-20">
           <span className="section-kicker mb-3 flex justify-center">فرص واعدة</span>
           <h3 className="mb-12 text-center text-[30px] font-black text-text-dark">قطاعات الاستثمار المستهدفة</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectors.map((sector, idx) => (
                <Reveal key={idx} delay={(idx % 3) * .07} className="premium-card group rounded-2xl border-b-4 border-b-transparent bg-white p-8 hover:border-b-gold-custom">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-light text-green-primary transition-all duration-500 group-hover:-rotate-3 group-hover:bg-green-primary group-hover:text-white">
                    {sector.icon}
                  </div>
                  <h4 className="font-bold text-[19px] text-text-dark mb-4">{sector.title}</h4>
                  <p className="text-[15px] text-text-muted leading-relaxed">
                    {sector.desc}
                  </p>
                </Reveal>
              ))}
           </div>
        </div>
      </div>
    </Layout>
  );
}
