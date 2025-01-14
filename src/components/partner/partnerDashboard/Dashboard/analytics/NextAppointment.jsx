// src/components/PartnerDashboard/NextAppointment.js

import React from 'react';

const NextAppointment = () => {
  const dummyAppointments = [
    {
      id: 1,
      customerName: 'priyanka',
      serviceType: 'Haircut',
      serviceCategory: 'Salon',
      date: '2024-12-29',
      time: '10:30 AM',
      specialist: 'reshmi',
    },
    {
      id: 2,
      customerName: 'ravishankar',
      serviceType: 'Massage',
      serviceCategory: 'Spa',
      date: '2024-12-29',
      time: '12:00 PM',
      specialist: 'robin',
    },
    {
      id: 3,
      customerName: 'adarsh',
      serviceType: 'Facial',
      serviceCategory: 'Salon',
      date: '2024-12-29',
      time: '02:00 PM',
      specialist: 'Reshmi',
    },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Next Appointments</h3>
      <ul className="space-y-4">
        {dummyAppointments.map((appointment) => (
          <li
            key={appointment.id}
            className="border-b last:border-0 pb-4 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-800 font-medium">
                {appointment.customerName}
              </p>
              <p className="text-sm text-gray-600">
                {appointment.serviceType} ({appointment.serviceCategory})
              </p>
              <p className="text-sm text-gray-500">
                Specialist: {appointment.specialist}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{appointment.date}</p>
              <p className="text-sm text-gray-600">{appointment.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NextAppointment;
