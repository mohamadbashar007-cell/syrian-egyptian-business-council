import Layout from '../components/Layout';
import { Target, Eye, Award, FileCheck } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-green-primary islamic-pattern py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-[36px] font-extrabold mb-4">عن المجلس</h1>
          <div className="flex items-center justify-center gap-2 text-[14px] opacity-70">
            <span>الرئيسية</span>
            <span>/</span>
            <span className="text-gold-custom">عن المجلس</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Official text */}
          <div className="mb-20">
            <h2 className="text-[24px] font-bold text-green-primary mb-6 border-r-4 border-gold-custom pr-4">الشرعية القانونية</h2>
            <p className="text-[17px] leading-relaxed text-text-dark mb-6">
              تأسس مجلس الأعمال السوري المصري ليكون المظلة الرسمية لرجال الأعمال من الجانبين، وذلك بموجب القرار الوزاري رقم 83 الصادر عن وزارة الاقتصاد والصناعة في الجمهورية العربية السورية لعام 2026.
            </p>
            <p className="text-[17px] leading-relaxed text-text-dark mb-6">
              يستمد المجلس شرعيته من الرغبة المشتركة لدى القيادتين في سوريا ومصر لتعزيز أواصر التعاون الاقتصادي التاريخي، ويهدف إلى توحيد الجهود الاستثمارية وتذليل كافة الصعاب أمام التبادل السلعي والخدمي.
            </p>
          </div>

          {/* Grid: Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
             <div className="bg-gray-bg p-8 rounded-xl border-t-4 border-green-primary">
                <div className="w-12 h-12 bg-green-primary text-white rounded-lg flex items-center justify-center mb-6">
                  <Eye size={24} />
                </div>
                <h3 className="text-[20px] font-bold text-text-dark mb-4">الرؤية</h3>
                <p className="text-[15px] text-text-muted leading-relaxed">
                  أن نكون المنظمة الرائدة والأكثر تأثيراً في صياغة مستقبل التعاون الاقتصادي السوري المصري، وتحقيق التكامل التجاري المنشود بين البلدين الشقيقين.
                </p>
             </div>
             <div className="bg-gray-bg p-8 rounded-xl border-t-4 border-gold-custom">
                <div className="w-12 h-12 bg-gold-custom text-white rounded-lg flex items-center justify-center mb-6">
                  <Target size={24} />
                </div>
                <h3 className="text-[20px] font-bold text-text-dark mb-4">الرسالة</h3>
                <p className="text-[15px] text-text-muted leading-relaxed">
                  خلق بيئة استثمارية تنافسية ومستدامة من خلال تمثيل مصالح رجال الأعمال، وتوفير كافة أوجه الدعم الفني والقانوني واللوجستي اللازم لنجاح المشاريع المشتركة.
                </p>
             </div>
          </div>

          {/* Goals */}
          <div className="mb-20">
            <h2 className="text-[24px] font-bold text-green-primary mb-10 text-center">أهدافنا الاستراتيجية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 'تعزيز التبادل التجاري وتسهيل انسياب السلع بين البلدين.',
                 'تشجيع الاستثمارات المتبادلة في القطاعات الحيوية.',
                 'توفير قاعدة بيانات شاملة للفرص الاستثمارية والقوانين الناظمة.',
                 'تنظيم ملتقيات دورية ومعارض تجارية مشتركة.',
                 'تمثيل رجال الأعمال السوريين أمام الجهات الرسمية في مصر.',
                 'بناء شراكات صناعية استراتيجية تخدم القيمة المضافة للاقتصادين.'
               ].map((goal, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg group hover:border-green-primary hover:bg-green-light/30 transition-all">
                    <Award size={20} className="text-gold-custom shrink-0" />
                    <span className="text-[15px] font-medium text-text-dark">{goal}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
