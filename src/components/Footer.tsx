import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-green-primary text-white pt-10 pb-5 islamic-pattern">
      <div className="container mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-8 pb-8 border-b border-white/10">
          {/* Column 1: Info */}
          <div>
            <div className="flex items-center gap-3 mb-4 brightness-0 invert">
              <div className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center text-green-primary font-extrabold border-2 border-green-primary text-[10px]">
                SY-EG
              </div>
              <span className="text-[14px] font-bold">مجلس الأعمال السوري المصري</span>
            </div>
            <p className="text-[10px] leading-relaxed opacity-70 mb-4 max-w-[250px]">
              الجسر الرسمي للتعاون الاقتصادي بين المجتمع التجاري السوري ونظيره المصري تحت إشراف وزارة الاقتصاد.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-[13px] font-bold mb-4 text-gold-custom">روابط سريعة</h4>
            <ul className="flex flex-col gap-2 text-[11px] opacity-80">
              <li>عن المجلس</li>
              <li>القيادة</li>
              <li>فرص الاستثمار</li>
              <li>المركز الإعلامي</li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-[13px] font-bold mb-4 text-gold-custom">اتصل بنا</h4>
            <ul className="flex flex-col gap-2 text-[11px] opacity-80">
              <li>القاهرة، جمهورية مصر العربية</li>
              <li dir="ltr">+20 123 456 789</li>
              <li>info@sebc-eg.com</li>
            </ul>
          </div>

          {/* Column 4: Platform */}
          <div>
            <h4 className="text-[13px] font-bold mb-4 text-gold-custom">منصاتنا</h4>
            <ul className="flex flex-col gap-2 text-[11px] opacity-80">
              <li>فيسبوك</li>
              <li>لينكد إن</li>
              <li>تويتر (X)</li>
              <li>إنستغرام</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center">
          <p className="text-[10px] opacity-60">
            © 2026 مجلس الأعمال السوري المصري — جميع الحقوق محفوظة | كيان رسمي معتمد — قرار وزاري رقم 83
          </p>
        </div>
      </div>
    </footer>
  );
}
