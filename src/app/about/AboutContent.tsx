'use client';

import { motion } from 'framer-motion';

const chapters = [
  { id: '1', title: 'The Roots', text: "Growing up, Reina Pena watched her father build businesses with the same precision he admired in a finely tuned engine. A lifelong entrepreneur and car enthusiast, he taught Reina that quality and dedication are the only engines that never stall." },
  { id: '2', title: 'The Vision', text: "Inspired by her father's legacy, Reina saw an opportunity: American auto shops needed a reliable, direct source for high-quality imported parts. In 2019, she founded Reina's Tire Center LLC in Orlando, Florida — with a simple mission: bring the world's best auto parts to America's roads." },
  { id: '3', title: 'Building the Network', text: "Reina personally traveled to Japan, South Korea, Germany, and beyond to find manufacturers who shared her commitment to quality. She vetted every supplier, inspected every facility, and built relationships that go far beyond transactions." },
  { id: '4', title: 'The Team', text: "With trusted suppliers in place, Reina assembled a team of automotive experts — mechanics, logistics specialists, and customer service professionals who speak the language of cars and care about every order." },
  { id: '5', title: 'First Wins', text: "The first clients were local auto shops in Orlando. Word spread fast: Reina's parts were better, prices were fair, and the service was unmatched. Those first satisfied customers became the foundation of everything that followed." },
  { id: '6', title: 'Where We Are Today', text: "Today, Reina's Tire Center serves auto shops and individual customers across the entire United States. With over 6 years of experience, thousands of happy customers, and a growing catalog of 10,000+ parts, we're just getting started." },
];

export function AboutContent() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-20">
      {chapters.map((ch) => (
        <motion.section
          key={ch.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="scroll-mt-24"
        >
          <h2 className="font-heading font-bold text-accent-gold text-lg uppercase tracking-wider mb-4">
            Chapter {ch.id} — {ch.title}
          </h2>
          <p className="text-accent-silver font-body text-lg leading-relaxed">
            {ch.text}
          </p>
        </motion.section>
      ))}
    </div>
  );
}
