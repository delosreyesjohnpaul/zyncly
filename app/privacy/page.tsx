import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto text-gray-700">
      <h1 className="text-3xl font-bold mb-6">Zyncly Privacy Policy</h1>

      <p className="mb-6">
        Thank you for choosing Zyncly as your scheduling solution. We value your privacy and are committed to protecting your data. This Privacy Policy outlines how Zyncly collects, uses, and secures information to ensure a seamless experience for our users.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Data Collection</h2>
      <p className="mb-4">
        Zyncly collects specific data to enhance your scheduling experience and streamline meeting logistics:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li><strong>User Information:</strong> Personal information such as your name, email address, and contact details that you provide when creating an account.</li>
        <li><strong>Meeting Data:</strong> Information related to scheduled meetings, including dates, times, and participants.</li>
        <li><strong>Usage Analytics:</strong> We collect usage data to understand platform performance and improve user experience.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use of Collected Data</h2>
      <p className="mb-4">
        Zyncly uses collected data to enhance scheduling functionalities and user experience. This data is never shared or sold to third parties. We use it to:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>Facilitate efficient scheduling and communication between users.</li>
        <li>Improve platform performance and security.</li>
        <li>Analyze usage trends to tailor features to user needs.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
      <p className="mb-6">
        Protecting your data is our priority. Zyncly employs advanced encryption, secure data storage, and access controls to prevent unauthorized access and ensure data integrity.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Retention</h2>
      <p className="mb-6">
        Data related to your scheduling activities is retained only for as long as necessary to fulfill the purposes outlined in this policy. Users may request data deletion at any time through their account settings or by contacting our support team.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. User Rights</h2>
      <p className="mb-6">
        You have full control over your data. You may update or delete your information as needed and have the right to request details on how your data is used. Contact our support team for any inquiries related to your data rights.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to the Privacy Policy</h2>
      <p className="mb-6">
        We may occasionally update this Privacy Policy to reflect changes in our practices. We will notify users of significant updates. Continued use of Zyncly after any changes indicates acceptance of the revised terms.
      </p>

      <p className="mt-8">
        For questions about this Privacy Policy, contact us at <a href="mailto:war.xynapse30@gmail.com" className="text-blue-600 hover:underline">support@zyncly.com</a>.
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Last updated: October 2024
      </p>

      <footer className="mt-12 border-t pt-4 text-center text-sm text-gray-500">
        © 2024 Zyncly. Built by PaulDR, Programmer and Data Analyst.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
