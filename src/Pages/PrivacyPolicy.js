import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-gray-700 mb-4"><strong>Effective Date:</strong> May 26, 2025</p>

      <p className="mb-6">
        At <strong>GTech Company</strong>, your privacy is important to us. This Privacy Policy explains how we
        collect, use, disclose, and safeguard your information when you use our website, products, and services.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>Personal Information:</strong> Name, email, phone number, etc.</li>
          <li><strong>Usage Data:</strong> Information on how you use our site or services.</li>
          <li><strong>Device Information:</strong> IP address, browser type, operating system, etc.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>To provide and manage our services</li>
          <li>To communicate with you (e.g., updates, promotions)</li>
          <li>To improve our website and user experience</li>
          <li>To ensure security and prevent fraud</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Sharing Your Information</h2>
        <p className="text-gray-700">
          We do not sell your personal information. We may share data with service providers or if required by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Cookies and Tracking</h2>
        <p className="text-gray-700">
          We use cookies and similar technologies to enhance your experience. You can manage cookie preferences in your browser.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
        <p className="text-gray-700">
          We implement appropriate security measures to protect your information. However, no system is 100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Withdraw consent to data processing</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Third-Party Links</h2>
        <p className="text-gray-700">
          Our services may link to external sites. We are not responsible for their privacy practices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Changes to This Policy</h2>
        <p className="text-gray-700">
          We may update this Privacy Policy periodically. Changes take effect when posted on this page.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions or concerns about this Privacy Policy, contact us at:
          <br /><br />
          <strong>GTech Company</strong><br />
          Email: gtechcompany01@gmail.com<br />
          Phone: +254 797 655 727<br />
          Website: <a href="https://blogapp-iota-wheat.vercel.app/" className="text-blue-600 underline">www.gtech.co.ke</a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
