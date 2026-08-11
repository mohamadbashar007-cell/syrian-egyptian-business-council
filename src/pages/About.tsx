import Layout from '../components/Layout';
import { Target, Eye, Award } from 'lucide-react';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';

export default function About() {
  return (
    <Layout>
      <PageHero eyebrow="عن المجلس" title="مؤسسة تبني جسور الاقتصاد" description="مظلة رسمية تجمع مجتمع الأعمال السوري والمصري ضمن رؤية واحدة وشراكات قابلة للنمو." />

      <div className="container mx-auto px-4 py-20 md:px-10 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Official text */}
          <Reveal className="mb-20">
            <span className="section-kicker">الإطار المؤسسي</span>
            <h2 className="mb-6 mt-3 text-[28px] font-black text-green-dark">الشرعية القانونية</h2>
            <p className="text-[17px] leading-relaxed text-text-dark mb-6">
              تأسس مجلس الأعمال السوري المصري ليكون المظلة الرسمية لرجال الأعمال من الجانبين، وذلك بموجب القرار الوزاري رقم 83 الصادر عن وزارة الاقتصاد والصناعة في الجمهورية العربية السورية لعام 2026.
            </p>
            <p className="text-[17px] leading-relaxed text-text-dark mb-6">
              يستمد المجلس شرعيته من الرغبة المشتركة لدى القيادتين في سوريا ومصر لتعزيز أواصر التعاون الاقتصادي التاريخي، ويهدف إلى توحيد الجهود الاستثمارية وتذليل كافة الصعاب أمام التبادل السلعي والخدمي.
            </p>
          </Reveal>

          {/* Grid: Vision & Mission */}
          <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2">
             <Reveal direction="right" className="premium-card rounded-2xl bg-white p-8 border-t-4 border-t-green-primary">
                <div className="w-12 h-12 bg-green-primary text-white rounded-lg flex items-center justify-center mb-6">
                  <Eye size={24} />
                </div>
                <h3 className="text-[20px] font-bold text-text-dark mb-4">الرؤية</h3>
                <p className="text-[15px] text-text-muted leading-relaxed">
                  أن نكون المنظمة الرائدة والأكثر تأثيراً في صياغة مستقبل التعاون الاقتصادي السوري المصري، وتحقيق التكامل التجاري المنشود بين البلدين الشقيقين.
                </p>
             </Reveal>
             <Reveal direction="left" delay={0.08} className="premium-card rounded-2xl bg-white p-8 border-t-4 border-t-gold-custom">
                <div className="w-12 h-12 bg-gold-custom text-white rounded-lg flex items-center justify-center mb-6">
                  <Target size={24} />
                </div>
                <h3 className="text-[20px] font-bold text-text-dark mb-4">رسالتنا</h3>
                <p className="text-[15px] text-text-muted leading-relaxed">
                  خلق بيئة استثمارية تنافسية ومستدامة من خلال تمثيل مصالح رجال الأعمال، وتوفير كافة أوجه الدعم الفني والقانوني واللوجستي اللازم لنجاح المشاريع المشتركة.
                </p>
             </Reveal>
          </div>

          {/* Goals */}
          <Reveal className="mb-20">
            <span className="section-kicker mb-3 flex justify-center">اتجاهنا</span>
            <h2 className="mb-10 text-center text-[28px] font-black text-text-dark">أهدافنا الاستراتيجية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 'تعزيز التبادل التجاري وتسهيل انسياب السلع بين البلدين.',
                 'تشجيع الاستثمارات المتبادلة في القطاعات الحيوية.',
                 'توفير قاعدة بيانات شاملة للفرص الاستثمارية والقوانين الناظمة.',
                 'تنظيم ملتقيات دورية ومعارض تجارية مشتركة.',
                 'تمثيل رجال الأعمال السوريين أمام الجهات الرسمية في مصر.',
                 'بناء شراكات صناعية استراتيجية تخدم القيمة المضافة للاقتصادين.'
               ].map((goal, idx) => (
                 <div key={idx} className="group flex items-center gap-4 rounded-xl border border-green-primary/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-gold-custom/50 hover:shadow-lg">
                    <Award size={20} className="text-gold-custom shrink-0" />
                    <span className="text-[15px] font-medium text-text-dark">{goal}</span>
                 </div>
               ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Layout>
  );
}
