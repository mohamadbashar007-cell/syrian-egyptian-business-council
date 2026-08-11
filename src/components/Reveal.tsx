import { motion, useReducedMotion } from 'motion/react';
import { Key, ReactNode } from 'react';

interface RevealProps {
  key?: Key;
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'right' | 'left';
}

export default function Reveal({ children, className = '', delay = 0, direction = 'up' }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = direction === 'up' ? { y: 28 } : direction === 'right' ? { x: 28 } : { x: -28 };

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
