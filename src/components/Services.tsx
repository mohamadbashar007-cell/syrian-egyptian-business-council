import { Briefcase, Building2, CalendarRange, FileCheck } from 'lucide-react';
import Reveal from './Reveal';

const services = [
  { icon: Briefcase, number: '01', title: 'تسهيل التبادل التجاري', desc: 'فتح قنوات مباشرة بين المصدرين والمستوردين وتذليل العقبات الإدارية واللوجستية.' },
  { icon: Building2, number: '02', title: 'دعم الاستثمار المشترك', desc: 'توفير فرص موثوقة ومعلومات دقيقة لتأسيس مشاريع رائدة في السوقين.' },
  { icon: CalendarRange, number: '03', title: 'الفعاليات الاقتصادية', desc: 'ملتقيات وندوات تجمع أصحاب المصلحة وصنّاع القرار لبناء شراكات مستدامة.' },
  { icon: FileCheck, number: '04', title: 'الدعم والاستشارات', desc: 'دعم قانوني وفني يضمن سلاسة الإجراءات وتوافقها مع التشريعات المعمول بها.' },
];

export default function Services() {
  return (
    <section className="bg-gray-bg py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-10">
        <Reveal className="mb-11 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="section-kicker">دور المجلس</span>
            <h2 className="mt-3 text-[30px] font-black tracking-tight text-text-dark md:text-[40px]">منظومة أعمال متكاملة</h2>
          </div>
          <p className="max-w-xl text-[14px] leading-7 text-text-muted md:text-[15px]">نرافق مجتمع الأعمال من اكتشاف الفرصة وحتى تأسيس الشراكة، عبر خدمات عملية ضمن إطار مؤسسي موثوق.</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={idx * 0.08} className="h-full">
                <article className="premium-card group relative h-full overflow-hidden rounded-2xl p-7">
                  <span className="absolute left-5 top-4 font-serif text-[38px] font-bold text-green-primary/[0.06]">{service.number}</span>
                  <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-green-light text-green-primary transition-all duration-500 group-hover:-rotate-3 group-hover:bg-green-primary group-hover:text-white">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                  <h3 className="mb-3 text-[17px] font-black text-text-dark">{service.title}</h3>
                  <p className="text-[13px] leading-7 text-text-muted">{service.desc}</p>
                  <div className="absolute inset-x-7 bottom-0 h-[3px] origin-right scale-x-0 rounded-full bg-gold-custom transition-transform duration-500 group-hover:scale-x-100" />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
