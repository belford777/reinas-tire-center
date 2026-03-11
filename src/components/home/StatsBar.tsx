'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 6, suffix: '+', label: 'Years in Business' },
  { value: 5000, suffix: '+', label: 'Happy Customers' },
  { value: 10000, suffix: '+', label: 'Parts Delivered' },
  { value: 50, suffix: '+', label: 'Auto Shop Partners' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const duration = 1.5;
  const steps = 40;
  const stepValue = value / steps;
  const stepTime = (duration * 1000) / steps;

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, value, stepValue, stepTime]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="py-16 md:py-20 bg-[#0B0B0F] section-divider">
      <div className="max-w-container mx-auto px-4 md:px-6">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl lg:text-6xl text-[#E63946] tracking-wider">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 font-heading font-medium text-white uppercase tracking-wider text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
