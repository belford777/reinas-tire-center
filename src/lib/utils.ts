// Утилиты для форматирования и хелперы

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + '...';
}

export function getCategoryDisplayName(slug: string): string {
  const names: Record<string, string> = {
    'engine-drivetrain': 'Engine & Drivetrain',
    'brakes-suspension': 'Brakes & Suspension',
    'electrical-lighting': 'Electrical & Lighting',
    'body-exterior': 'Body & Exterior',
    'interior-comfort': 'Interior & Comfort',
    'wheels-tires': 'Wheels & Tires',
  };
  return names[slug] || slug;
}
