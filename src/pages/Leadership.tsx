import Layout from '../components/Layout';
import { User, Mail } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';

const leaders = [
  { name: 'السيد غسان كريم', role: 'رئيساً للمجلس', bio: 'رجل أعمال بارز بخبرة تزيد عن 30 عاماً في قطاع الاستثمار والتطوير العقاري.' },
  { name: 'السيد أحمد راغب آغا', role: 'نائباً للرئيس', bio: 'خبير في الشؤون اللوجستية والتبادل التجاري الدولي، عضو مجلس إدارة في عدة شركات صناعية.' },
  { name: 'السيد محمد باسل رضوان سماقية', role: 'نائباً للرئيس', bio: 'رائد أعمال متخصص في قطاع النسيج والملابس الجاهزة، له بصمة واضحة في السوق المصري.' },
  { name: 'السيد وائل خير النن', role: 'مديراً تنفيذياً', bio: 'متخصص في إدارة المشروعات والتنظيم الإداري، يشرف على العمليات اليومية للمجلس.' },
  { name: 'السيد عمار أبو اللبن', role: 'أميناً للسر', bio: 'متخصص في العلاقات الدولية والتنظيم القانوني للهيئات والمنظمات التجارية.' },
  { name: 'السيد أيمن الحفيري', role: 'مسؤولاً عن العلاقات العامة', bio: 'خبير في التواصل المؤسسي وبناء الشراكات الاستراتيجية مع الجهات الرسمية والخاصة.' },
];

export default function Leadership() {
  return (
    <Layout>
      <PageHero eyebrow="مجلس الإدارة" title="قيادة بخبرة ورؤية مشتركة" description="نخبة من رجال الأعمال والخبرات المؤسسية تقود أعمال المجلس نحو أثر اقتصادي مستدام." />

      <div className="container mx-auto px-4 py-20 md:px-10 md:py-24">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <span className="section-kicker mb-3 justify-center">الهيكل القيادي</span>
          <h2 className="mb-6 text-[30px] font-black text-text-dark">مجلس الإدارة والجانب السوري</h2>
          <p className="text-[16px] text-text-muted leading-relaxed">
            وفقاً للقرار الوزاري رقم 83، يتولى إدارة المجلس نخبة من رجال الأعمال السوريين المشهود لهم بالكفاءة والخبرة الطويلة في الأسواق العربية والمحلية.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {leaders.map((leader, idx) => (
             <Reveal key={idx} delay={(idx % 3) * 0.07} className="h-full">
             <div className="premium-card group relative flex h-full flex-col items-center overflow-hidden rounded-2xl bg-white p-8 text-center">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-light rounded-bl-full -z-0 opacity-50 transition-all group-hover:scale-150"></div>
                
                <div className="w-24 h-24 bg-green-primary rounded-full flex items-center justify-center text-white mb-6 z-10 border-4 border-white shadow-lg">
                  <User size={48} />
                </div>
                
                <h3 className="text-[20px] font-bold text-text-dark mb-2 z-10">{leader.name}</h3>
                <span className="text-green-primary font-bold text-[14px] mb-4 z-10 border-b border-green-primary/20 pb-1">{leader.role}</span>
                <p className="text-[14px] text-text-muted leading-relaxed mb-6 z-10">
                  {leader.bio}
                </p>
                
                <div className="z-10 mt-auto flex gap-4">
                  <a href="mailto:info@segybc.com" aria-label={`التواصل مع ${leader.name}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-text-muted transition-all hover:-translate-y-1 hover:bg-green-primary hover:text-white">
                    <Mail size={14} />
                  </a>
                </div>
             </div>
             </Reveal>
           ))}
        </div>
      </div>
    </Layout>
  );
}
