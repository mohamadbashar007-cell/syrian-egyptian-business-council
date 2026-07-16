import { Briefcase, Building2, CalendarRange, FileCheck } from 'lucide-react';

const services = [
  {
    icon: <Briefcase size={28} />,
    title: 'تسهيل التبادل التجاري',
    desc: 'فتح آفاق التعاون المباشر بين المصدرين والمستوردين وتذليل كافة العقبات الإدارية واللوجستية لرفع حجم الشراكة.'
  },
  {
    icon: <Building2 size={28} />,
    title: 'دعم الاستثمار المشترك',
    desc: 'توفير بوابات استثمارية آمنة ومعلومات دقيقة لرجال الأعمال لتأسيس مشاريع صناعية وتجارية رائدة في السوقين.'
  },
  {
    icon: <CalendarRange size={28} />,
    title: 'تنظيم الفعاليات الاقتصادية',
    desc: 'إقامة ملتقيات أعمال وندوات تخصصية دورية تجمع أصحاب المصلحة والقرار لبناء شراكات اقتصادية مستدامة.'
  },
  {
    icon: <FileCheck size={28} />,
    title: 'الدعم القانوني والاستشاري',
    desc: 'تأمين التغطية القانونية والاستشارية اللازمة لضمان سلاسة الإجراءات الرسمية وتوافقها مع التشريعات المعمول بها.'
  }
];

export default function Services() {
  return (
    <section className="bg-white/50 p-0 mb-8 w-full">
        {/* Grid - Updated to 4 columns for full width display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-border-subtle border-t-[3px] border-t-green-primary p-5 rounded shadow-theme-sm group hover:border-t-gold-custom transition-all"
            >
              <div className="text-green-primary mb-2 group-hover:scale-105 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-[14px] font-bold text-text-dark mb-1">{service.title}</h3>
              <p className="text-[12px] text-text-muted leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
    </section>
  );
}
