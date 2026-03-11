'use client';

import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/catalog/ProductCard';

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-border">
      <h2 className="font-display text-2xl md:text-3xl text-accent-chrome tracking-wider mb-8">
        You May Also Like
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}
