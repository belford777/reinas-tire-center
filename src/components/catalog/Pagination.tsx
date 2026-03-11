'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | 'ellipsis')[] = [];
  const show = 5;
  let start = Math.max(1, currentPage - Math.floor(show / 2));
  let end = Math.min(totalPages, start + show - 1);
  if (end - start + 1 < show) start = Math.max(1, end - show + 1);

  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push('ellipsis');
  }
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push('ellipsis');
    pages.push(totalPages);
  }

  return (
    <nav aria-label="Pagination" className="flex justify-center gap-2 mt-12">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-[4px] border border-border text-accent-silver disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-light transition-colors duration-[400ms]"
        aria-label="Previous page"
      >
        Previous
      </button>
      <ul className="flex gap-1">
        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <li key={`e-${i}`} className="px-3 py-2 text-text-muted">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => onPageChange(p)}
                className={`min-w-[40px] py-2 rounded-[4px] font-heading font-semibold transition-colors duration-[400ms] ${
                  p === currentPage
                    ? 'bg-[#E63946] text-white'
                    : 'border border-border text-accent-silver hover:bg-primary-light'
                }`}
                aria-current={p === currentPage ? 'page' : undefined}
                aria-label={`Page ${p}`}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-[4px] border border-border text-accent-silver disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-light transition-colors duration-[400ms]"
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
