import Layout from '../components/Layout';
import { Building, Factory, Truck, Globe, Zap, HeartPulse } from 'lucide-react';

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
      {/* Hero */}
      <div className="bg-green-primary islamic-pattern py-24 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-green-dark/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-[36px] md:text-[48px] font-extrabold mb-6">فرص الاستثمار السوري المصري</h1>
          <p className="max-w-3xl mx-auto text-[18px] opacity-80 leading-relaxed font-medium">
            نعمل على بناء بيئة استثمارية متكاملة تضمن النجاح والملاءة المالية للمشروعات السورية المصرية المشتركة تحت إشراف رسمي.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 items-center">
           <div className="lg:col-span-2">
             <h2 className="text-[28px] font-bold text-text-dark mb-6">لماذا الاستثمار عبر المجلس؟</h2>
             <div className="space-y-6">
                {[
                  { title: 'الغطاء الرسمي', text: 'مجلس معتمد من وزارات الاقتصاد في كلا البلدين يضمن سلامة الإجراءات.' },
                  { title: 'نفاذ السوق', text: 'تسهيلات خاصة في الدخول للأسواق الجمركية واتفاقيات التجارة الحرة.' },
                  { title: 'الاستشارات الفنية', text: 'فريق متخصص يقدم دراسات جدوى ومعلومات دقيقة عن القوانين المحلية.' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-6 bg-gray-bg rounded-xl border-r-4 border-green-primary">
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
           </div>
           <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg transform translate-y-8">
                <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1400&auto=format&fit=crop" className="w-full h-full object-cover" />
              </div>
           </div>
        </div>

        {/* Sectors Grid */}
        <div className="mb-20">
           <h3 className="text-[24px] font-bold text-center text-text-dark mb-12">قطاعات الاستثمار المستهدفة</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectors.map((sector, idx) => (
                <div key={idx} className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-xl transition-all border-b-4 hover:border-b-gold-custom">
                  <div className="text-green-primary mb-6 bg-green-light w-16 h-16 rounded-2xl flex items-center justify-center">
                    {sector.icon}
                  </div>
                  <h4 className="font-bold text-[19px] text-text-dark mb-4">{sector.title}</h4>
                  <p className="text-[15px] text-text-muted leading-relaxed">
                    {sector.desc}
                  </p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </Layout>
  );
}
