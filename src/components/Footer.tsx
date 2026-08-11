import { ArrowUpLeft, Facebook, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';

const quickLinks = [
  ['عن المجلس', '/about'],
  ['القيادة', '/leadership'],
  ['فرص الاستثمار', '/investment'],
  ['المركز الإعلامي', '/news'],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-green-dark text-white islamic-pattern">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold-custom/80 to-transparent" />
      <div className="container relative mx-auto px-4 pb-7 pt-16 md:px-10">
        <div className="mb-12 grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_1fr]">
          <div>
            <Link to="/" className="mb-6 flex items-center gap-4">
              <BrandMark className="ring-4 ring-white/5" />
              <div>
                <div className="text-[18px] font-black">مجلس الأعمال السوري المصري</div>
                <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">Syrian Egyptian Business Council</div>
              </div>
            </Link>
            <p className="max-w-md text-[14px] leading-7 text-white/60">
              منصة مؤسسية لتعزيز الشراكات الاقتصادية، وتمكين المستثمرين، وبناء جسور تجارة مستدامة بين سوريا ومصر.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { label: 'فيسبوك', href: 'https://www.facebook.com/profile.php?id=61589328063895', icon: Facebook },
                { label: 'إنستغرام', href: 'https://www.instagram.com/segybc/', icon: Instagram },
                { label: 'لينكدإن', href: 'https://www.linkedin.com/company/segybc', icon: Linkedin },
              ].map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/65 transition-all hover:-translate-y-1 hover:border-gold-custom/50 hover:bg-gold-custom hover:text-green-dark">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[14px] font-black text-gold-custom">روابط أساسية</h4>
            <ul className="space-y-3">
              {quickLinks.map(([name, path]) => (
                <li key={path}>
                  <Link to={path} className="group inline-flex items-center gap-2 text-[13px] font-semibold text-white/65 transition-colors hover:text-white">
                    <ArrowUpLeft size={14} className="text-gold-custom transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-[14px] font-black text-gold-custom">بيانات التواصل</h4>
            <ul className="space-y-4 text-[13px] text-white/65">
              <li className="flex items-start gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-gold-custom" /> القاهرة، جمهورية مصر العربية</li>
              <li><a href="mailto:info@segybc.com" className="flex items-center gap-3 transition-colors hover:text-white" dir="ltr"><Mail size={17} className="text-gold-custom" /> info@segybc.com</a></li>
            </ul>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[12px] font-extrabold transition-all hover:border-gold-custom hover:bg-gold-custom hover:text-green-dark">
              تواصل مع المجلس <ArrowUpLeft size={15} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 text-center text-[11px] text-white/40 md:flex-row md:text-right">
          <p>© 2026 مجلس الأعمال السوري المصري — جميع الحقوق محفوظة</p>
          <p>كيان رسمي معتمد بموجب القرار الوزاري رقم 83</p>
        </div>
      </div>
    </footer>
  );
}
