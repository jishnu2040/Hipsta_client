import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import MainHeader from '../Header/MainHeader';

const Appointment = () => {
  const { serviceId } = useParams(); // Get the serviceId from the URL parameters
  const [service, setService] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null); // State for selected time slot
  const [selectedDate, setSelectedDate] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const baseUrl = 'http://localhost:8000/api/v1';

  // Fetch service and employees
  useEffect(() => {
    const fetchServiceAndEmployees = async () => {
      try {
        const serviceResponse = await axios.get(`${baseUrl}/customer/service/${serviceId}`);
        setService(serviceResponse.data);
  
        // Set total amount from service price
        setTotalAmount(parseFloat(serviceResponse.data.price)); // Ensure price is converted to a number
  
        const employeesResponse = await axios.get(`${baseUrl}/customer/${serviceResponse.data.partner}/employees/`);
        setEmployees(employeesResponse.data);
      } catch (error) {
        setError('Failed to fetch service or employees');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (serviceId) {
      fetchServiceAndEmployees();
    }
  }, [serviceId]);
  

  const handleEmployeeChange = (employeeId) => {
    setSelectedEmployee(employeeId);
    setAvailableTimes([]); // Clear available times
    setSelectedTime(null); // Reset selected time
  };

  const handleDateChange = async (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when the date changes

    if (selectedEmployee) {
      try {
        const response = await axios.get(`${baseUrl}/customer/employee/${selectedEmployee}/available-times/`, {
          params: { date },
        });
        setAvailableTimes(response.data);
      } catch (error) {
        console.error('Error fetching available times:', error);
      }
    }
  };

  const handleTimeSelection = (timeSlot) => {
    setSelectedTime(timeSlot); // Update selected time slot
  };

  const handleBookAppointment = () => {
    if (!selectedTime) {
      alert('Please select a time slot before booking.');
      return;
    }
  
    const userLoggedIn = localStorage.getItem('access_token');
    if (!userLoggedIn) {
      navigate('/login');
      return;
    }
  
    // Get partnerId from the service object
    const partnerId = service?.partner; // This is retrieved from the service data
  
    // Proceed to the payment page with the appointment data
    navigate('/payment', {
      state: {
        appointmentData: {
          service_id: serviceId,
          employee_id: selectedEmployee,
          date: selectedDate,
          start_time: selectedTime.start_time,
          total_amount: totalAmount,
          payment_method: paymentMethod,
          partner_id: partnerId, // Add partnerId to the appointment data
        },
      },
    });
  };
  
  

  if (loading) {
    return <div className="text-center text-gray-600">Loading appointment details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!service) {
    return <div className="text-center text-gray-500">No service found with the given ID.</div>;
  }

  return (
    <div>
      <MainHeader />
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left side: Employee and Date Picker */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-gray-800">Book an Appointment for {service.name}</h2>

          {/* Employee List */}
          <div>
            <p className="text-lg font-medium text-gray-700 mb-2">Choose an Employee</p>
            <div className="space-y-4">
              {employees.map((employee) => (
                <button
                  key={employee.id}
                  onClick={() => handleEmployeeChange(employee.id)}
                  className={`w-full text-left p-3 border rounded-lg transition ${
                    selectedEmployee === employee.id ? 'bg-gray-700 text-white' : 'bg-gray-100'
                  } hover:bg-gray-200`}
                >
                  {employee.name}
                </button>
              ))}
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label htmlFor="date" className="block text-lg font-medium text-gray-700 mb-2">Pick a Date</label>
            <input
              type="date"
              id="date"
              onChange={handleDateChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Right side: Available Times */}
        <div>
          {selectedEmployee && selectedDate && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Available Times for {employees.find((e) => e.id === selectedEmployee)?.name} on {selectedDate}
              </h3>
              <ul className="space-y-4">
                {availableTimes.length > 0 ? (
                  availableTimes.map((timeSlot) => (
                    <li
                      key={timeSlot.id}
                      onClick={() => handleTimeSelection(timeSlot)} // Handle selection
                      className={`p-4 border rounded-lg shadow hover:shadow-xl transition-shadow cursor-pointer ${
                        selectedTime?.id === timeSlot.id ? 'bg-green-400 text-white' : ''
                      }`}
                    >
                      <p className="text-gray-700">{timeSlot.start_time} - {timeSlot.end_time}</p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No available times for the selected date.</p>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Book Appointment Button */}
        <div className="mt-6 col-span-2">
          <button
            className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition"
            onClick={handleBookAppointment}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
