import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms of Service</h1>
      <p className="text-gray-700 mb-4"><strong>Effective Date:</strong> May 26, 2025</p>
      <p className="mb-6">
        Welcome to <strong>GTech</strong>! These Terms of Service (“Terms”) govern your access to and use of our
        website, products, and services. By using our services, you agree to be bound by these Terms.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Use of Services</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>You must be at least 18 years old to use our Services.</li>
          <li>You agree to use our Services lawfully and responsibly.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. User Content</h2>
        <p className="text-gray-700">
          You may upload or share content. You retain ownership but grant us a license to use it in connection with our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
        <p className="text-gray-700">
          All content on our site belongs to GTech or its licensors. You may not reproduce or distribute without permission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Prohibited Activities</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>No fraudulent or unlawful use.</li>
          <li>No interference with our systems or security measures.</li>
          <li>No uploading of harmful or malicious software.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
        <p className="text-gray-700">
          We may suspend or terminate your access if you violate our Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Disclaimers</h2>
        <p className="text-gray-700">
          Services are provided "as is" without warranties. We do not guarantee error-free operation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
        <p className="text-gray-700">
          GTech is not liable for indirect or consequential damages related to your use of our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
        <p className="text-gray-700">
          We may update these Terms. Continued use after changes means you accept them.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">9. Governing Law</h2>
        <p className="text-gray-700">
          These Terms are governed by the laws of Kenya (or your relevant country/state).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
        <p className="text-gray-700">
          <strong>GTech Company</strong><br />
          Email: gtechcompany01@gmail.com<br />
          Phone: +254 797 655 727<br />
          Website: <a href="https://blogapp-iota-wheat.vercel.app/" className="text-blue-600 underline">www.gtech.co.ke</a>
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
