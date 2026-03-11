import { PolicyLayout } from '@/components/ui/PolicyLayout';

export const metadata = {
  title: 'Delivery Policy | Reina\'s Tire Center LLC',
  description: 'Shipping methods, processing time, costs, and tracking for Reina\'s Tire Center.',
};

export default function DeliveryPolicyPage() {
  return (
    <PolicyLayout title="Delivery Policy">
      <p className="text-text-muted">
        Last updated: March 10, 2026. This policy describes how we ship and deliver orders.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">1. Shipping Methods</h2>
      <p>
        We offer <strong>Standard Shipping</strong> (3–7 business days) and <strong>Express Shipping</strong> (1–3 business days) to addresses within the continental United States. Delivery times are estimates and may vary based on carrier and destination.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">2. Processing Time</h2>
      <p>
        Most orders are processed and shipped within <strong>24–48 hours</strong> of payment confirmation (excluding weekends and holidays). Orders placed after cutoff times or during peak periods may take longer. You will receive an email when your order ships.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">3. Shipping Costs and Free Shipping</h2>
      <p>
        Shipping costs are calculated at checkout based on weight, dimensions, and destination. <strong>Orders over $150</strong> qualify for free standard shipping within the contiguous U.S. (excluding oversize or special-handling items). Express shipping may incur additional charges.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">4. Tracking</h2>
      <p>
        Once your order ships, you will receive an email with a tracking number and link. You can use this to monitor your shipment until delivery.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">5. Delivery Confirmation</h2>
      <p>
        Delivery is complete when the carrier marks the package as delivered. We are not responsible for packages left at the address after delivery. Ensure someone is available to receive the shipment or provide safe delivery instructions.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">6. Damaged in Transit</h2>
      <p>
        If your order arrives damaged, please contact us within 48 hours with photos and a description. We will work with the carrier and arrange a replacement or refund as appropriate. Keep all packaging for inspection if requested.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">7. International Shipping</h2>
      <p>
        We currently ship only within the United States. We do not offer international shipping at this time.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">8. Special or Oversized Items</h2>
      <p>
        Large or heavy items (e.g., certain wheels, tires, or bulk orders) may require special handling and additional shipping time or cost. We will contact you if this applies to your order.
      </p>

      <p className="mt-8 text-text-muted text-sm">
        Questions: info@reinastirecenter.com | (407) 555-0199.
      </p>
    </PolicyLayout>
  );
}
