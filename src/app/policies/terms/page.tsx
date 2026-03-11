import { PolicyLayout } from '@/components/ui/PolicyLayout';

export const metadata = {
  title: 'Terms & Conditions | Reina\'s Tire Center LLC',
  description: 'Terms of sale, product descriptions, pricing, and liability.',
};

export default function TermsPolicyPage() {
  return (
    <PolicyLayout title="Terms & Conditions">
      <p className="text-text-muted">
        Last updated: March 10, 2026. By placing an order or using our website, you agree to these Terms &amp; Conditions.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">1. Agreement to Terms</h2>
      <p>
        By accessing our website or placing an order, you agree to be bound by these Terms &amp; Conditions and our other policies, including our Refund Policy and Delivery Policy.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">2. Product Descriptions and Accuracy</h2>
      <p>
        We strive to ensure that product descriptions, images, and specifications are accurate. However, we do not warrant that descriptions or other content are error-free. We reserve the right to correct errors and to change or update information at any time. If a product is materially different from its description, your remedy is to return it under our Refund Policy.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">3. Pricing and Payment</h2>
      <p>
        All prices are in U.S. dollars and are subject to change without notice. We reserve the right to correct pricing errors. Payment is due at the time of order unless otherwise agreed in writing for approved business accounts. We accept major credit cards and other methods as displayed at checkout.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">4. Order Acceptance and Cancellation</h2>
      <p>
        We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspected fraud. If your order is cancelled after payment, we will issue a full refund. You may cancel an order before it ships by contacting us promptly.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">5. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Reina&apos;s Tire Center LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products. Our total liability for any claim shall not exceed the amount you paid for the product(s) in question.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">6. Governing Law</h2>
      <p>
        These Terms &amp; Conditions are governed by the laws of the State of Florida, without regard to its conflict of law provisions. Any disputes shall be resolved in the state or federal courts located in Florida.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">7. Dispute Resolution</h2>
      <p>
        We encourage you to contact us first to resolve any dispute. If we cannot resolve the matter, you may pursue legal remedies in accordance with the governing law above.
      </p>

      <p className="mt-8 text-text-muted text-sm">
        Contact: info@reinastirecenter.com | (407) 555-0199 | 9800 S Orange Ave, Orlando, FL 32824.
      </p>
    </PolicyLayout>
  );
}
