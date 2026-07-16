import { Facebook, Globe2, Linkedin, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'الرئيسية', path: '/' },
  { name: 'عن المجلس', path: '/about' },
  { name: 'القيادة', path: '/leadership' },
  { name: 'الأنشطة والفعاليات', path: '/activities' },
  { name: 'فرص الاستثمار', path: '/investment' },
  { name: 'المركز الإعلامي', path: '/news' },
  { name: 'تواصل معنا', path: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-white/95 shadow-theme-sm backdrop-blur">
      <div className="border-b border-border-subtle bg-gray-bg">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-[12px] text-text-muted md:px-10">
          <span>منصة رسمية لتعزيز التعاون الاقتصادي السوري المصري</span>
          <div className="hidden items-center gap-4 lg:flex">
            <span dir="ltr">info@sebc-eg.com</span>
            <div className="flex items-center gap-2">
              <Linkedin size={14} />
              <Facebook size={14} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex min-h-[72px] items-center justify-between px-4 md:px-10">
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-lg border border-green-primary/20 bg-white shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-primary text-[11px] font-black leading-none text-white">
              SY<br />EG
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-extrabold leading-tight text-green-primary md:text-[18px]">
              مجلس الأعمال السوري المصري
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              Syrian Egyptian Business Council
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-md px-3 py-2 text-[14px] font-bold transition-colors ${
                location.pathname === link.path
                  ? 'bg-green-light text-green-primary'
                  : 'text-text-dark hover:bg-gray-bg hover:text-green-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative">
            <input
              type="search"
              placeholder="بحث"
              className="w-36 rounded-md border border-border-subtle bg-white py-2 pr-3 pl-9 text-[13px] outline-none transition-all focus:w-44 focus:border-green-primary"
            />
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          </div>
          <button className="flex items-center gap-1 rounded-md border border-border-subtle px-3 py-2 text-[13px] font-bold text-text-dark hover:border-green-primary hover:text-green-primary">
            <Globe2 size={15} />
            English
          </button>
        </div>

        <button
          className="rounded-md border border-border-subtle p-2 text-green-primary lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="فتح القائمة"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border-subtle bg-white lg:hidden">
          <nav className="container mx-auto flex flex-col px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-md px-3 py-3 text-[15px] font-bold ${
                  location.pathname === link.path ? 'bg-green-light text-green-primary' : 'text-text-dark'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
