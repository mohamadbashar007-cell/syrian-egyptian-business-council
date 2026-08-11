import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
import Reveal from './Reveal';

const stats = [
  { value: '6', label: 'أعضاء مجلس الإدارة' },
  { value: '2026', label: 'عام الاعتماد الرسمي' },
  { value: '83', label: 'رقم القرار الوزاري' },
];

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="absolute -right-36 bottom-0 h-96 w-96 rounded-full bg-gold-custom/[0.07] blur-3xl" />
      <div className="container relative mx-auto px-4 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <Reveal direction="right">
            <span className="section-kicker">من نحن</span>
            <h2 className="mt-4 text-balance text-[31px] font-black leading-tight tracking-tight text-text-dark md:text-[43px]">مظلة رسمية لمجتمع أعمال أكثر ترابطًا</h2>
            <p className="mt-6 text-[17px] font-semibold leading-8 text-text-dark">يمثّل المجلس الجسر المؤسسي للتعاون الاقتصادي بين المجتمع التجاري السوري ونظيره المصري.</p>
            <p className="mt-4 text-[15px] leading-8 text-text-muted">نعمل تحت إشراف وزارة الاقتصاد والصناعة لتعزيز العلاقات التجارية والاستثمارية وفق أطر قانونية محكمة، وتوفير الدعم اللازم لتوسيع آفاق التعاون الصناعي والتجاري المشترك.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="group inline-flex items-center gap-2 rounded-full bg-green-primary px-6 py-3.5 text-[13px] font-extrabold text-white transition-all hover:-translate-y-1 hover:bg-green-dark">
                اكتشف هوية المجلس <ArrowLeft size={17} className="transition-transform group-hover:-translate-x-1" />
              </Link>
              <div className="inline-flex items-center gap-2 px-3 text-[12px] font-bold text-text-muted"><CheckCircle2 size={17} className="text-gold-custom" /> بيانات موثقة رسميًا</div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] bg-green-dark p-7 text-white shadow-[0_28px_75px_-30px_rgba(7,60,43,.65)] islamic-pattern md:p-9">
              <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-gold-custom/15 blur-3xl" />
              <div className="relative mb-8 flex items-center justify-between border-b border-white/10 pb-6">
                <div><span className="text-[11px] font-bold text-gold-custom">بالأرقام</span><h3 className="mt-1 text-[21px] font-black">حقائق عن المجلس</h3></div>
                <BrandMark compact className="ring-4 ring-white/5" />
              </div>
              <div className="relative grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="group rounded-2xl border border-white/10 bg-white/[0.06] p-5 transition-colors hover:bg-white/[0.11]">
                    <div className="mb-3 font-serif text-[30px] font-bold text-gold-custom">{stat.value}</div>
                    <div className="text-[11px] font-semibold leading-5 text-white/65">{stat.label}</div>
                    <div className="mt-4 h-0.5 w-6 bg-gold-custom/60 transition-all duration-500 group-hover:w-12" />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
