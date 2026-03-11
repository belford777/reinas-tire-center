import { PolicyLayout } from '@/components/ui/PolicyLayout';

export const metadata = {
  title: 'Terms of Use | Reina\'s Tire Center LLC',
  description: 'Website usage rules, intellectual property, and user conduct.',
};

export default function TermsOfUsePage() {
  return (
    <PolicyLayout title="Terms of Use">
      <p className="text-text-muted">
        Last updated: March 10, 2026. These Terms of Use govern your access to and use of the Reina&apos;s Tire Center LLC website.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">1. Acceptance of Terms</h2>
      <p>
        By accessing or using this website, you agree to be bound by these Terms of Use. If you do not agree, do not use the website.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">2. Use of the Website</h2>
      <p>
        You may use this website only for lawful purposes and in accordance with these terms. You agree not to use the site in any way that could damage, disable, or impair the site or interfere with any other party&apos;s use of the site.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">3. Account Creation</h2>
      <p>
        If we offer account registration, you are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate and complete information.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">4. Intellectual Property</h2>
      <p>
        All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Reina&apos;s Tire Center LLC or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">5. Prohibited Conduct</h2>
      <p>
        You may not: use the site for any illegal purpose; attempt to gain unauthorized access to any part of the site or systems; transmit viruses or malicious code; scrape or harvest data without permission; or use the site to send spam or unsolicited communications.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">6. User-Generated Content (Reviews)</h2>
      <p>
        If you submit reviews or other content, you grant us a non-exclusive, royalty-free license to use, display, and distribute that content. You represent that you have the right to submit such content and that it does not violate any third-party rights or applicable law. We may remove content at our discretion.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">7. Privacy</h2>
      <p>
        Your use of the website is also governed by our Privacy Policy. Please review it to understand our practices regarding your personal information.
      </p>

      <h2 className="font-heading font-semibold text-accent-chrome text-xl mt-8">8. Modifications</h2>
      <p>
        We may modify these Terms of Use at any time. Continued use of the website after changes constitutes acceptance of the revised terms. We encourage you to review this page periodically.
      </p>

      <p className="mt-8 text-text-muted text-sm">
        Questions: info@reinastirecenter.com | (407) 555-0199.
      </p>
    </PolicyLayout>
  );
}
