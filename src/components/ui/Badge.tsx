type BadgeVariant = 'success' | 'danger' | 'gold' | 'muted';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-success/20 text-success border-success/40',
  danger: 'bg-[#E63946]/20 text-[#E63946] border-[#E63946]/40',
  gold: 'bg-accent-gold/20 text-accent-gold border-accent-gold/40',
  muted: 'bg-white/10 text-text-muted border-border',
};

export function Badge({ children, variant = 'muted', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-button text-xs font-heading font-semibold uppercase tracking-wider border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
