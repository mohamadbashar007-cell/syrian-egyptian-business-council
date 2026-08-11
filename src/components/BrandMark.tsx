interface BrandMarkProps {
  className?: string;
  compact?: boolean;
}

export default function BrandMark({ className = '', compact = false }: BrandMarkProps) {
  return (
    <div className={`official-logo ${compact ? 'official-logo--compact' : ''} ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}council-logo-2026.png`}
        alt="شعار مجلس الأعمال السوري المصري"
      />
    </div>
  );
}
