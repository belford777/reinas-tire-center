interface StarRatingProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
  reviewCount?: number;
}

export function StarRating({ rating, max = 5, size = 'md', showValue, reviewCount }: StarRatingProps) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = max - full - half;
  const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1">
      <div className="flex" aria-label={`Rating: ${rating} out of ${max}`}>
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f-${i}`} className={`${sizeClass} text-[#D4A853]`} aria-hidden>
            ★
          </span>
        ))}
        {half ? (
          <span className={`${sizeClass} text-[#D4A853]`} aria-hidden>★</span>
        ) : null}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e-${i}`} className={`${sizeClass} text-white/30`} aria-hidden>
            ★
          </span>
        ))}
      </div>
      {showValue && (
        <span className="text-text-muted text-sm ml-1">
          {rating.toFixed(1)}
          {reviewCount != null && <span className="text-text-muted/80"> ({reviewCount} reviews)</span>}
        </span>
      )}
    </div>
  );
}
