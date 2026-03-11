import type { Product } from '@/lib/types';

interface SpecsTableProps {
  product: Product;
}

export function SpecsTable({ product }: SpecsTableProps) {
  const rows = [
    { label: 'Part Number / SKU', value: product.sku },
    { label: 'OEM Number', value: product.oemNumber },
    { label: 'Brand / Manufacturer', value: `${product.brand} / ${product.manufacturer}` },
    { label: 'Origin Country', value: product.originCountry },
    { label: 'Material', value: product.material ?? '—' },
    { label: 'Weight', value: product.weight },
    { label: 'Warranty', value: product.warranty },
    { label: 'Condition', value: product.condition },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border">
              <th className="py-3 pr-4 font-heading font-medium text-accent-silver text-sm">
                {row.label}
              </th>
              <td className="py-3 font-body text-accent-chrome">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
