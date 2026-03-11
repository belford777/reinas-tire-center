import Link from 'next/link';

interface PolicyLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function PolicyLayout({ title, children }: PolicyLayoutProps) {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <Link
          href="/"
          className="inline-block text-accent-silver hover:text-[#E63946] font-body text-sm mb-8 transition-colors"
        >
          ← Back to Home
        </Link>
        <h1 className="font-display text-4xl md:text-5xl text-accent-chrome tracking-wider mb-8">
          {title}
        </h1>
        <div className="prose prose-invert prose-headings:font-heading prose-headings:text-accent-chrome prose-p:text-accent-silver prose-li:text-accent-silver font-body leading-relaxed space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
