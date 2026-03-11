import { PolicyLayout } from '@/components/ui/PolicyLayout';

export const metadata = {
  title: 'Refund Policy | Reina\'s Tire Center LLC',
  description: 'Our 30-day return policy for unused auto parts. Conditions and process for refunds.',
};

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund Policy">
      <p className="text-text-muted">
        Last updated: March 10, 2026. Reina&apos;s Tire Center LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to your satisfaction.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">1. Return Window</h2>
      <p>
        We accept returns within <strong>30 days of delivery</strong>. The item must be unused, in original packaging, and in resalable condition. Proof of purchase may be required.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">2. Condition Requirements</h2>
      <p>
        Parts must be unused and in their original packaging. Items that have been installed, modified, or damaged by the customer are not eligible for return. Electrical components that have been installed cannot be returned for safety and liability reasons.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">3. How to Initiate a Return</h2>
      <p>
        Contact us via email or phone to request a Return Authorization (RA) number. Include your order number and reason for return. Once approved, you will receive instructions for shipping the item back. Returns shipped without an RA number may be refused.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">4. Refund Timeline</h2>
      <p>
        Refunds are processed within <strong>5–10 business days</strong> after we receive the returned item and verify its condition. Refunds will be issued to the original payment method. Shipping costs are non-refundable unless the return is due to our error or a defective part.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">5. Exceptions</h2>
      <p>
        Custom orders, special-order parts, and items marked as non-returnable at the time of purchase are not eligible for return. Electrical parts that have been installed are not returnable.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">6. Defective Parts</h2>
      <p>
        If you receive a defective part, contact us immediately. We will arrange a free return and send a replacement or issue a full refund at no additional cost to you.
      </p>

      <p className="mt-8 text-text-muted text-sm">
        For questions about this policy, contact us at info@reinastirecenter.com or (407) 555-0199.
      </p>
    </PolicyLayout>
  );
}
