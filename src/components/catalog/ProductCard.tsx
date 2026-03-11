'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { StarRating } from '@/components/ui/StarRating';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const price = product.salePrice ?? product.price;
  const onSale = product.salePrice != null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-[#141417] border border-[#2A2A2F] rounded-card overflow-hidden hover:border-[#E63946] transition-all duration-200 flex flex-col"
    >
      <Link href={`/autoparts/${product.category}/${product.slug}`} className="block flex-1">
        <div className="relative aspect-square bg-primary-light">
          <Image
            src={product.images[0] || 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {onSale && (
            <div className="absolute top-2 left-2">
              <Badge variant="danger">Sale</Badge>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute top-2 right-2">
              <Badge variant="muted">Out of Stock</Badge>
            </div>
          )}
          {product.inStock && !onSale && (
            <div className="absolute top-2 right-2">
              <Badge variant="success">In Stock</Badge>
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-heading font-bold text-white line-clamp-2 uppercase tracking-wide text-sm">
            {product.name}
          </h3>
          <p className="mt-1 text-[#6B6B6B] text-sm font-body line-clamp-1">{product.brand}</p>
          <div className="mt-3 flex items-center gap-2">
            {onSale && (
              <span className="text-[#6B6B6B] text-sm line-through font-body">
                {formatPrice(product.price)}
              </span>
            )}
            <span className={`font-heading font-semibold ${onSale ? 'text-[#E63946]' : 'text-white'}`}>
              {formatPrice(price)}
            </span>
          </div>
          <div className="mt-2">
            <StarRating rating={product.rating} size="sm" reviewCount={product.reviewCount} />
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          disabled={!product.inStock}
          className="w-full py-2.5 bg-[#E63946] text-white font-heading font-semibold rounded-[4px] uppercase tracking-[0.1em] text-sm hover:bg-[#C1121F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}
