const features = [
  { name: 'Ticket Support', description: 'Easily raise support tickets for your issues. Track and manage all queries in one place with timely updates.' },
  { name: 'Live Chat', description: 'Get real-time assistance through our live chat feature, available on both web and mobile platforms.' },
  { name: '24/7 Availability', description: 'Our support team is here for you around the clock, ensuring no downtime or delays in service.' },
  { name: 'Knowledge Base', description: 'Access a comprehensive library of articles and FAQs to troubleshoot and resolve common issues on your own.' },
  { name: 'Priority Support', description: 'Premium customers enjoy faster response times and direct access to our expert support team.' },
];

export default function TechnicalSupport() {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-12 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Technical Support</h2>
          <p className="mt-4 text-gray-500">
            We are committed to providing top-notch technical support to ensure your experience is seamless. Whether you
            need real-time assistance, have queries to address, or want access to helpful resources, our support team is
            here to help.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="Customer service team available for chat support."
            src="https://thumbs.dreamstime.com/b/color-support-ticket-concept-vector-icon-isolated-two-sign-symbol-designed-blue-orange-colors-can-be-use-web-mobile-165478165.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Ticketing system interface for tracking issues."
            src="https://media.istockphoto.com/id/852240644/vector/neon-signboard-24-7-open-time.jpg?s=612x612&w=0&k=20&c=ofmdpEX3TdaS52VIPjO6B7bH1hAehDHPu3DKepztPIk="
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Support team working around the clock."
            src="https://www.virtualpbx.com/wp-content/uploads/2019/05/PremierSupport-891x1024.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Knowledge base articles on a user interface."
            src="https://www.tidio.com/wp-content/uploads/12-tactics-to-increase-sales.png"
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
