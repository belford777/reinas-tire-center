'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { StarRating } from '@/components/ui/StarRating';
import { SpecsTable } from './SpecsTable';

interface ReviewSectionProps {
  product: Product;
}

export function ReviewSection({ product }: ReviewSectionProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'compatibility' | 'reviews'>('description');
  const reviews = product.reviews?.length ? product.reviews : [
    { id: '1', author: 'Mike S.', rating: 5, title: 'Great fit', comment: 'Perfect fit, fast shipping.', date: '03/01/2026', verified: true },
    { id: '2', author: 'Tech Auto', rating: 4, title: 'Good quality', comment: 'Works as expected.', date: '02/15/2026', verified: true },
  ];

  const ratingCounts = [5, 4, 3, 2, 1].map((r) => ({
    stars: r,
    count: reviews.filter((rev) => Math.round(rev.rating) === r).length,
  }));

  return (
    <div className="mt-16 border-t border-border pt-8">
      <div className="flex flex-wrap gap-2 border-b border-border mb-6">
        {(['description', 'specs', 'compatibility', 'reviews'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-heading font-medium text-sm uppercase tracking-wider transition-colors ${
              activeTab === tab
                ? 'text-[#E63946] border-b-2 border-[#E63946] -mb-px'
                : 'text-accent-silver hover:text-accent-chrome'
            }`}
          >
            {tab === 'specs' ? 'Specifications' : tab === 'compatibility' ? 'Compatibility' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'description' && (
        <div className="prose prose-invert max-w-none">
          <p className="text-text-muted font-body leading-relaxed whitespace-pre-line">
            {product.fullDescription}
          </p>
        </div>
      )}

      {activeTab === 'specs' && (
        <SpecsTable product={product} />
      )}

      {activeTab === 'compatibility' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-heading text-accent-silver text-sm">Year</th>
                <th className="py-2 pr-4 font-heading text-accent-silver text-sm">Make</th>
                <th className="py-2 pr-4 font-heading text-accent-silver text-sm">Model</th>
                <th className="py-2 font-heading text-accent-silver text-sm">Submodel / Engine</th>
              </tr>
            </thead>
            <tbody>
              {product.compatibleVehicles.map((v, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="py-2 pr-4 font-body text-accent-chrome">{v.year}</td>
                  <td className="py-2 pr-4 font-body text-accent-chrome">{v.make}</td>
                  <td className="py-2 pr-4 font-body text-accent-chrome">{v.model}</td>
                  <td className="py-2 font-body text-accent-chrome">{v.submodel ?? v.engine ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div>
          <div className="flex flex-wrap items-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <span className="font-display text-4xl text-accent-chrome">{product.rating.toFixed(1)}</span>
              <StarRating rating={product.rating} size="md" />
            </div>
            <span className="text-text-muted font-body">{product.reviewCount} reviews</span>
          </div>
          <div className="space-y-2 mb-4">
            {ratingCounts.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-accent-silver text-sm w-12">{stars} ★</span>
                <div className="flex-1 h-2 bg-bg-card rounded overflow-hidden">
                  <div
                    className="h-full bg-[#D4A853] rounded"
                    style={{ width: `${(count / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="text-text-muted text-sm w-8">{count}</span>
              </div>
            ))}
          </div>
          <ul className="space-y-6">
            {reviews.map((rev) => (
              <li key={rev.id} className="pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <StarRating rating={rev.rating} size="sm" />
                  {rev.verified && (
                    <span className="text-success text-xs font-body">Verified Purchase</span>
                  )}
                </div>
                <h4 className="font-heading font-semibold text-accent-chrome mt-1">{rev.title}</h4>
                <p className="text-text-muted font-body mt-1">{rev.comment}</p>
                <p className="text-text-muted text-sm mt-2">
                  {rev.author} · {rev.date}
                </p>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-6 px-6 py-2 border-2 border-[#E63946] text-[#E63946] font-heading font-semibold rounded-[4px] uppercase tracking-wider hover:bg-[#E63946]/10 transition-colors duration-200"
          >
            Write a Review
          </button>
        </div>
      )}
    </div>
  );
}
