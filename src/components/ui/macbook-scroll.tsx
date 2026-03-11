'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/lib/types';

const AUTO_PARTS_IMAGE = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=800&fit=crop';

const FLOATING_PRODUCTS = products.slice(0, 6);

export function MacbookScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0.1, 0.35], [72, 0]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.8, 1]);

  const cardsOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center bg-[#0A1628] py-24 overflow-hidden"
    >
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center mb-8"
      >
        <h2
          className="text-3xl md:text-4xl font-display uppercase tracking-[0.2em]"
          style={{ color: '#D4A853', fontFamily: "'Bebas Neue', sans-serif" }}
        >
          EXPLORE OUR CATALOG
        </h2>
      </motion.div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center"
      >
        <p
          className="text-center text-xl md:text-2xl whitespace-pre-line uppercase mb-12"
          style={{
            color: '#D4A853',
            fontFamily: "'Bebas Neue', sans-serif",
            lineHeight: 1.2,
          }}
        >
          PREMIUM AUTO PARTS{'\n'}DELIVERED TO YOUR DOOR
        </p>

        <div className="relative w-full flex justify-center perspective-[2000px]">
          <motion.div
            style={{ rotateX, transformStyle: 'preserve-3d' }}
            className="relative origin-top"
          >
            {/* Lid back (visible when closed) — REINA'S in chrome/silver */}
            <div
              className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-[calc(100%+20px)] h-8 rounded-t-lg border border-[#0F1D32] flex items-center justify-center bg-[#0F1D32]"
              style={{
                backfaceVisibility: 'hidden',
                boxShadow: 'inset 0 0 20px rgba(192,200,212,0.1)',
              }}
            >
              <span
                className="text-sm font-display uppercase tracking-[0.3em]"
                style={{ color: '#C0C8D4', textShadow: '0 0 8px rgba(192,200,212,0.5)' }}
              >
                REINA&apos;S
              </span>
            </div>

            {/* Screen bezel + display */}
            <div className="relative rounded-t-xl overflow-hidden border-2 border-[#0F1D32] bg-[#0F1D32] shadow-2xl">
              <div className="bg-[#112240] p-2 rounded-t-lg">
                <div className="aspect-[16/10] w-full max-w-[900px] overflow-hidden rounded bg-[#0F1D32]">
                  <img
                    src={AUTO_PARTS_IMAGE}
                    alt="Premium auto parts"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Base: keyboard + trackpad */}
        <div className="relative -top-1 w-[calc(100%+40px)] max-w-[920px]">
          <div className="h-4 bg-gradient-to-b from-[#112240] to-[#0F1D32] rounded-b-lg border border-t-0 border-[#0F1D32]" />
          <div className="bg-[#0F1D32] rounded-b-2xl border-2 border-t-0 border-[#0F1D32] p-4 pt-2 shadow-2xl">
            <div className="bg-[#112240] rounded-lg p-2">
              <div className="flex gap-1 flex-wrap justify-center">
                {['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'].map((key) => (
                  <div
                    key={key}
                    className="w-8 h-6 rounded bg-[#112240] border border-[#0F1D32] flex items-center justify-center text-[10px] text-[#C0C8D4]"
                  >
                    {key}
                  </div>
                ))}
              </div>
              <div className="flex gap-0.5 justify-center mt-1 flex-wrap max-w-md mx-auto">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-4 rounded-sm bg-[#112240] border border-[#0F1D32]"
                  />
                ))}
              </div>
            </div>
            <div className="mt-2 w-32 h-8 rounded-full bg-[#112240] border border-[#0F1D32] mx-auto" />
          </div>
        </div>
      </motion.div>

      {/* Floating product cards — reveal on scroll with stagger */}
      <motion.div
        style={{ opacity: cardsOpacity }}
        className="relative z-10 w-full max-w-6xl mx-auto mt-20 px-4 grid grid-cols-2 md:grid-cols-3 gap-6"
      >
        {FLOATING_PRODUCTS.map((product, i) => (
          <FloatingProductCard key={product.id} product={product} index={i} scrollYProgress={scrollYProgress} />
        ))}
      </motion.div>
    </div>
  );
}

function FloatingProductCard({
  product,
  index,
  scrollYProgress,
}: {
  product: Product;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const y = useTransform(scrollYProgress, [0.35, 0.55], [20, 0]);
  const opacity = useTransform(scrollYProgress, [0.42 + index * 0.02, 0.62], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0.4, 0.65], [index % 2 === 0 ? -4 : 3, 0]);

  return (
    <motion.div
      style={{ y, opacity, rotate }}
      className="flex justify-center"
    >
      <Link
        href={`/autoparts/${product.category}/${product.slug}`}
        className="block w-full max-w-[260px] rounded-xl overflow-hidden border border-[#0F1D32] bg-[#112240] shadow-xl hover:shadow-2xl hover:border-[#D4A853]/40 transition-all duration-300 macbook-float"
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
      >
        <div className="aspect-square relative bg-[#0F1D32]">
          <img
            src={product.images[0] || ''}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3">
          <p className="text-[#C0C8D4] font-body text-sm line-clamp-2">{product.name}</p>
          <p className="mt-1 text-[#D4A853] font-semibold">{formatPrice(product.salePrice ?? product.price)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
