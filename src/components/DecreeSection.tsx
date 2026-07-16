import { Download, FileText, Calendar, Building } from 'lucide-react';

export default function DecreeSection() {
  const members = [
    { name: 'السيد غسان كريم', role: 'رئيساً للمجلس' },
    { name: 'السيد أحمد راغب آغا', role: 'نائباً للرئيس' },
    { name: 'السيد باسل رضوان سماقية', role: 'نائباً للرئيس' },
    { name: 'السيد وائل خير النن', role: 'مديراً تنفيذياً' },
  ];

  return (
    <div className="bg-white border border-border-subtle border-r-[8px] border-r-green-primary p-10 rounded shadow-theme-md w-full relative overflow-hidden">
      <div className="absolute left-0 top-0 opacity-[0.03] pointer-events-none">
        <FileText size={300} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="bg-green-light text-green-primary px-3 py-1 rounded text-[11px] font-bold w-fit mb-3 block">
            وثيقة رسمية معتمدة من وزارة الاقتصاد
          </span>
          <h2 className="text-[24px] font-black text-green-primary mb-1">قرار وزاري رقم 83 لعام 2026</h2>
          <div className="text-[14px] text-text-muted flex items-center gap-2">
            <Building size={16} />
            <span>وزارة الاقتصاد والصناعة - الجمهورية العربية السورية</span>
          </div>
        </div>
        
        <button className="bg-green-primary text-white px-8 py-3 rounded text-[14px] font-bold hover:bg-green-dark transition-all flex items-center gap-3 shadow-lg">
          <span>تحميل نص القرار كاملاً (PDF)</span>
          <Download size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="bg-gray-50/50 p-6 rounded-lg border border-dashed border-gray-200">
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
          <div className="p-6 bg-green-primary/5 rounded-lg border-r-4 border-gold-custom">
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
  );
}
