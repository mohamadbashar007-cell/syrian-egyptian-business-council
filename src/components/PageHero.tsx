import { ChevronLeft, Home } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
}

export default function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="page-hero islamic-pattern">
      {image && (
        <motion.img
          initial={reduceMotion ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          src={image}
          alt=""
          className="page-hero__image"
        />
      )}
      <div className="page-hero__glow" />
      <div className="container relative z-10 mx-auto px-4 md:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-2 text-[13px] font-bold text-white/65">
            <Link to="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
              <Home size={14} />
              الرئيسية
            </Link>
            <ChevronLeft size={14} className="text-gold-custom" />
            <span className="text-gold-custom">{eyebrow}</span>
          </div>
          <h1 className="text-balance text-[36px] font-black leading-tight tracking-tight text-white md:text-[52px]">{title}</h1>
          {description && <p className="mx-auto mt-5 max-w-3xl text-[16px] leading-8 text-white/75 md:text-[18px]">{description}</p>}
        </motion.div>
      </div>
    </section>
  );
}
