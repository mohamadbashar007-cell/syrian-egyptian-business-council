import { Download, ExternalLink, FileText, Calendar, Building } from 'lucide-react';
import Reveal from './Reveal';

export default function DecreeSection() {
  const decreePdf = `${import.meta.env.BASE_URL}documents/ministerial-decree-83-2026.pdf`;
  const members = [
    { name: 'السيد غسان كريم', role: 'رئيساً للمجلس' },
    { name: 'السيد أحمد راغب آغا', role: 'نائباً للرئيس' },
    { name: 'السيد باسل رضوان سماقية', role: 'نائباً للرئيس' },
    { name: 'السيد وائل خير النن', role: 'مديراً تنفيذياً' },
  ];

  return (
    <Reveal>
    <div className="premium-card relative w-full overflow-hidden rounded-3xl border-r-[6px] border-r-green-primary bg-white p-6 md:p-10">
      <div className="absolute left-0 top-0 opacity-[0.03] pointer-events-none">
        <FileText size={300} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="mb-3 block w-fit rounded-full bg-green-light px-4 py-1.5 text-[11px] font-extrabold text-green-primary">
            وثيقة رسمية معتمدة من وزارة الاقتصاد
          </span>
          <h2 className="mb-2 text-[25px] font-black text-green-dark md:text-[31px]">قرار وزاري رقم 83 لعام 2026</h2>
          <div className="text-[14px] text-text-muted flex items-center gap-2">
            <Building size={16} />
            <span>وزارة الاقتصاد والصناعة - الجمهورية العربية السورية</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <a
            href={decreePdf}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-full bg-green-primary px-6 py-3.5 text-[13px] font-extrabold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-green-dark"
          >
            <span>عرض نص القرار الرسمي</span>
            <ExternalLink size={18} />
          </a>
          <a
            href={decreePdf}
            download="ministerial-decree-83-2026.pdf"
            className="flex items-center gap-3 rounded-full border border-green-primary bg-white px-6 py-3.5 text-[13px] font-extrabold text-green-primary transition-all hover:-translate-y-1 hover:bg-green-light"
          >
            <span>تنزيل نسخة PDF</span>
            <Download size={18} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="rounded-2xl border border-green-primary/10 bg-gray-bg/75 p-6">
          <h3 className="text-[16px] font-bold text-text-dark mb-4 border-r-4 border-gold-custom pr-3">المكتب التنفيذي (الجانب السوري):</h3>
          <table className="w-full text-[14px]">
            <tbody>
              {members.map((member, idx) => (
                <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-white transition-colors">
                  <td className="py-3 text-text-dark font-semibold">{member.name}</td>
                  <td className="py-3 text-left font-bold text-green-primary uppercase tracking-wide">{member.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border-r-4 border-gold-custom bg-green-primary/5 p-6">
            <p className="text-[15px] text-text-dark leading-relaxed italic">
              "يُشكَّل مجلس الأعمال السوري المصري بناءً على المقتضيات العامة لتنشيط الحركة الاقتصادية، ويعتبر المظلة الرسمية الوحيدة لتمثيل المصالح التجارية والاستثمارية المشتركة في الجمهورية العربية السورية."
            </p>
          </div>
          <div className="flex items-center gap-4 text-text-muted text-[13px]">
             <Calendar size={16} className="text-gold-custom" />
             <span>صدر في دمشق بتاريخ 2026/05/03 م</span>
          </div>
        </div>
      </div>
    </div>
    </Reveal>
  );
}
