import Layout from '../components/Layout';
import { User, Linkedin, Mail } from 'lucide-react';

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
      {/* Hero */}
      <div className="bg-green-primary islamic-pattern py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-[36px] font-extrabold mb-4">القيادة</h1>
          <div className="flex items-center justify-center gap-2 text-[14px] opacity-70">
            <span>الرئيسية</span>
            <span>/</span>
            <span className="text-gold-custom">مجلس الإدارة</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[28px] font-bold text-text-dark mb-6">مجلس الإدارة والجانب السوري</h2>
          <p className="text-[16px] text-text-muted leading-relaxed">
            وفقاً للقرار الوزاري رقم 83، يتولى إدارة المجلس نخبة من رجال الأعمال السوريين المشهود لهم بالكفاءة والخبرة الطويلة في الأسواق العربية والمحلية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {leaders.map((leader, idx) => (
             <div key={idx} className="bg-white border border-gray-100 rounded-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-light rounded-bl-full -z-0 opacity-50 transition-all group-hover:scale-150"></div>
                
                <div className="w-24 h-24 bg-green-primary rounded-full flex items-center justify-center text-white mb-6 z-10 border-4 border-white shadow-lg">
                  <User size={48} />
                </div>
                
                <h3 className="text-[20px] font-bold text-text-dark mb-2 z-10">{leader.name}</h3>
                <span className="text-green-primary font-bold text-[14px] mb-4 z-10 border-b border-green-primary/20 pb-1">{leader.role}</span>
                <p className="text-[14px] text-text-muted leading-relaxed mb-6 z-10">
                  {leader.bio}
                </p>
                
                <div className="flex gap-4 mt-auto z-10">
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text-muted hover:bg-green-primary hover:text-white transition-all">
                    <Linkedin size={14} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text-muted hover:bg-green-primary hover:text-white transition-all">
                    <Mail size={14} />
                  </a>
                </div>
             </div>
           ))}
        </div>
      </div>
    </Layout>
  );
}
