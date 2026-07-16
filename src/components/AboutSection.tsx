import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-bg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Main Text */}
          <div className="w-full lg:w-3/5">
            <h2 className="text-[30px] font-extrabold text-text-dark mb-6 relative inline-block">
              من نحن
              <div className="absolute -bottom-2 right-0 h-[4px] w-12 bg-gold-custom"></div>
            </h2>
            <p className="text-[18px] text-text-dark leading-relaxed font-medium mb-6">
              يمثّل مجلس الأعمال السوري المصري الجسر الرسمي للتعاون الاقتصادي بين المجتمع التجاري السوري ونظيره المصري.
            </p>
            <p className="text-[16px] text-text-muted leading-relaxed mb-8">
              يعمل المجلس تحت إشراف وزارة الاقتصاد والصناعة في الجمهورية العربية السورية، ويسعى إلى تعزيز العلاقات التجارية والاستثمارية بين البلدين الشقيقين وفق أُطر قانونية وتنظيمية محكمة، وتوفير الدعم اللازم لرجال الأعمال والمستثمرين لتوسيع آفاق التعاون الصناعي والتجاري المشترك.
            </p>
            <Link to="/about" className="bg-white border-2 border-green-primary text-green-primary px-8 py-3 rounded text-[15px] font-bold hover:bg-green-primary hover:text-white transition-all inline-flex items-center gap-2 group">
              <span>اعرف أكثر عن المجلس</span>
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats Card */}
          <div className="w-full lg:w-2/5">
            <div className="bg-green-primary islamic-pattern rounded-2xl p-8 text-white relative shadow-2xl overflow-hidden group">
               <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700"></div>
               
               <h3 className="text-[20px] font-bold mb-8 flex items-center justify-between border-b border-white/20 pb-4">
                 حقائق وإحصاءات
                 <img src="/logo.png" alt="Logo" className="w-[40px] h-[40px] brightness-0 invert opacity-40" />
               </h3>
               
               <div className="flex flex-col gap-6">
                  {[
                    { value: '6', label: 'أعضاء في مجلس الإدارة' },
                    { value: '2026', label: 'معتمد رسمياً منذ عام' },
                    { value: '83', label: 'بموجب قرار وزاري رقم' },
                  ].map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-6 group/item">
                       <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center font-extrabold text-[24px] text-gold-custom group-hover/item:bg-white/20 transition-all">
                         {stat.value}
                       </div>
                       <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 size={16} className="text-gold-custom" />
                            <span className="text-[14px] opacity-70">إحصائية رسمية</span>
                          </div>
                          <span className="text-[18px] font-bold">{stat.label}</span>
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="mt-10 p-4 border border-white/10 rounded-lg bg-green-dark/40 text-[13px] leading-relaxed opacity-80">
                 * جميع البيانات المذكورة أعلاه موثقة لدى وزارة الاقتصاد والصناعة ووزارة الخارجية والمغتربين.
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
