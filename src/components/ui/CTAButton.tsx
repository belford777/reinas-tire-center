'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type Variant = 'gold' | 'outline' | 'ghost';

interface CTAButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  external?: boolean;
}

const variants = {
  gold:
    'bg-[#E63946] text-white font-heading font-semibold hover:bg-[#C1121F] rounded-[4px] transition-colors duration-200',
  outline:
    'border-2 border-white text-white bg-transparent hover:border-[#E63946] hover:text-[#E63946] rounded-[4px] transition-colors duration-200',
  ghost: 'text-white hover:bg-white/10 rounded-[4px]',
};

export function CTAButton({
  href,
  children,
  variant = 'gold',
  className = '',
  onClick,
  type = 'button',
  external,
}: CTAButtonProps) {
  const base =
    'inline-flex items-center justify-center px-6 py-3 rounded-[4px] transition-all duration-200 uppercase tracking-[0.12em] text-sm';
  const combined = `${base} ${variants[variant]} ${className}`;

  if (href && !onClick) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combined}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <Link href={href}>
        <motion.span
          className={combined}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      className={combined}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.button>
  );
}
