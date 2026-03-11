'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop';
  const list = images.length ? images : [FALLBACK_IMAGE];

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-card overflow-hidden bg-bg-card border border-[rgba(255,255,255,0.05)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={list[index]}
              alt={`${name} — view ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-2 flex-wrap">
        {list.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`relative w-16 h-16 rounded-button overflow-hidden flex-shrink-0 border-2 transition-colors duration-[400ms] ${
              i === index ? 'border-[#E63946] shadow-red-glow' : 'border-border hover:border-accent-silver'
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
