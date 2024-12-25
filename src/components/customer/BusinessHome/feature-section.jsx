import { FiCalendar, FiUsers, FiClock, FiBarChart2 } from 'react-icons/fi';

const features = [
  {
    name: 'Effortless Scheduling',
    description:
      'Manage your appointments with ease. Allow customers to book services in just a few clicks, reducing no-shows and optimizing your time.',
    icon: FiCalendar,
  },
  {
    name: 'Customer Management',
    description:
      'Build strong relationships with customers. Keep track of preferences, history, and provide personalized experiences.',
    icon: FiUsers,
  },
  {
    name: 'Real-Time Availability',
    description:
      'Update and display your service availability instantly. Ensure seamless booking experiences for customers.',
    icon: FiClock,
  },
  {
    name: 'Insights and Analytics',
    description:
      'Gain actionable insights into your business performance. Track bookings, revenue, and trends to make data-driven decisions.',
    icon: FiBarChart2,
  },
];

export default function Feature() {
  return (
    <div className="bg-white py-12 sm:py-2">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
