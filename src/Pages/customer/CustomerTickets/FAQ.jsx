import React from 'react';

const FAQ = () => {
  const faqData = [
    {
      question: 'What services do salons offer?',
      answer: 'Salons typically provide haircuts, hair coloring, styling, manicures, pedicures, and skincare treatments like facials and waxing.',
    },
    {
      question: 'How can I book an appointment?',
      answer: 'You can book an appointment through our website or app. Choose your preferred service, select a provider, and pick a convenient time slot.',
    },
    {
      question: 'What are the benefits of spa treatments?',
      answer: 'Spa treatments help relieve stress, improve circulation, detoxify the body, and rejuvenate the skin. Popular options include massages, body scrubs, and aromatherapy.',
    },
    {
      question: 'What types of massages are available?',
      answer: 'Common types of massages include Swedish, deep tissue, hot stone, aromatherapy, and reflexology. Each offers unique benefits for relaxation and pain relief.',
    },
    {
      question: 'Can I cancel or reschedule my appointment?',
      answer: 'Yes, appointments can be canceled or rescheduled through your account dashboard. Please adhere to the cancellation policy for refunds or adjustments.',
    },
    {
      question: 'What should I know before visiting a salon or spa?',
      answer: 'Ensure you arrive on time, mention any allergies or preferences, and follow hygiene protocols. Some services may require prior preparation, like exfoliation.',
    },
    {
      question: 'Are the therapists and staff certified?',
      answer: 'Yes, all our therapists and staff are professionally trained and certified to ensure high-quality service.',
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700">{faq.question}</h2>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
