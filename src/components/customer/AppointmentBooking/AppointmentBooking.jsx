import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Professional from './Steps/Professional';
import TimeSelection from './Steps/TimeSelection';
import Confirmation from './Steps/Confirmation';

const AppointmentBooking = () => {
  const { serviceId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    professional: null,
    employee: null,
    date: '',
    timeSlot: null,
    totalAmount: 0,
  });
  const [serviceDetails, setServiceDetails] = useState(null);
  const [partnerDetails, setPartnerDetails] = useState(null);
  const navigate = useNavigate();

  const baseUrl = 'http://localhost:8000/api/v1';
  const S3_BASE_URL = 'https://hipsta-s3.s3.ap-south-1.amazonaws.com/';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const serviceResponse = await axios.get(`${baseUrl}/customer/service/${serviceId}`);
        setServiceDetails(serviceResponse.data);

        const partnerId = serviceResponse.data.partner;
        const partnerResponse = await axios.get(`${baseUrl}/customer/partner-detail/${partnerId}/`);
        setPartnerDetails(partnerResponse.data);

        setBookingData((prev) => ({
          ...prev,
          totalAmount: parseFloat(serviceResponse.data.price) || 0,
        }));
      } catch (error) {
        console.error('Failed to fetch details:', error);
      }
    };

    fetchDetails();
  }, [serviceId]);

  const steps = [
    { id: 1, label: 'Professional', component: <Professional setBookingData={setBookingData} bookingData={bookingData} partnerId={serviceDetails?.partner} /> },
    { id: 2, label: 'Time', component: <TimeSelection setBookingData={setBookingData} bookingData={bookingData} /> },
    { id: 3, label: 'Confirm', component: <Confirmation bookingData={bookingData} /> },
  ];

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate('/payment', { state: bookingData });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate('');
    }
  };

  const handleDiscard = () => {
    navigate('/');
  };

  return (
    <div>
      {/* Stepper Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-4 mb-6 flex justify-between items-center">
        <button onClick={handleBack} className="text-gray-700 font-extrabold">&larr;</button>
        <button onClick={handleDiscard} className="text-red-600 font-semibold">&times; Discard</button>
      </div>

      {/* Main Content */}
      <div className="flex justify-center">
        <div className="w-full max-w-7xl flex overflow-hidden">
          {/* Left Side */}
          <div className="w-8/12">
            <div className="text-gray-600 font-medium p-4">
              {steps.map((step, index) => (
                <span
                  key={step.id}
                  className={`${
                    currentStep === index ? 'text-gray-600 font-bold' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                  {index < steps.length - 1 && <span className="mx-2">&gt;</span>}
                </span>
              ))}
            </div>
            <div>{steps[currentStep]?.component}</div>
          </div>

          {/* Right Side: Booking Summary */}
            <div className="w-4/12">
              <div className="sticky top-4 mt-20 self-start bg-white border border-gray-300 rounded-xl p-4 space-y-4">
                {/* Partner Details */}
                {partnerDetails && (
                  <div>
                    <h4 className="text-lg font-semibold">Partner Details</h4>
                    <div className="flex items-center space-x-4">
                      <img
                        src={`${S3_BASE_URL}${partnerDetails.image_slides?.[0]?.image_url}`}
                        alt={partnerDetails.business_name || 'Partner Image'}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{partnerDetails.business_name}</p>
                        <p className="text-sm text-gray-500">{partnerDetails.address}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Details */}
                {serviceDetails && (
                  <div>
                    <h4 className="text-lg font-semibold">Service Details</h4>
                    <div className="text-sm text-gray-600 flex justify-between">
                      <p>{serviceDetails.name}</p>
                      <p>{serviceDetails.duration} mins</p>
                      <p>{serviceDetails.price}</p>
                    </div>
                  </div>
                )}

                {/* Booking Data */}
                <ul className="space-y-2">
                  {bookingData.employee?.name && <li>Profession: {bookingData.employee.name}</li>}
                  {bookingData.date && <li>Date: {bookingData.date}</li>}
                  {bookingData.timeSlot?.start_time && <li>Time: {bookingData.timeSlot.start_time}</li>}
                </ul>

                {/* Total Price */}
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-lg font-semibold">Total Price</h4>
                  <p className="text-xl font-bold text-gray-600">
                    {bookingData.totalAmount ? bookingData.totalAmount.toFixed(2) : '0.00'}
                  </p>
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleContinue}
                  className="mt-4 w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900"
                >
                  {currentStep < steps.length - 1 ? 'Continue' : 'Confirm Booking'}
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;