import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../../utlils/axiosinstance';
import Professional from './Steps/Professional';
import TimeSelection from './Steps/TimeSelection';
import Confirmation from './Steps/Confirmation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import lottie from 'lottie-web/build/player/lottie_light';
import bookingSuccessAnimation from './animations/successAnimation.json';

const AppointmentBooking = () => {
  const { serviceId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    serviceId: serviceId || null,
    employee: null,
    date: '',
    timeSlot: null,
    lockedSlot: null,
    totalAmount: 0,
  });
  const [serviceDetails, setServiceDetails] = useState(null);
  const [partnerDetails, setPartnerDetails] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const navigate = useNavigate();
  const animationContainer = useRef(null); // Create a reference for the animation container

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
  const S3_BASE_URL = 'https://hipsta-s3.s3.ap-south-1.amazonaws.com/';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const serviceResponse = await axios.get(`${API_BASE_URL}customer/service/${serviceId}`);
        setServiceDetails(serviceResponse.data);

        const partnerId = serviceResponse.data.partner;
        setBookingData((prev) => ({ ...prev, partnerId: partnerId }));
        const partnerResponse = await axios.get(`${API_BASE_URL}customer/partner-detail/${partnerId}/`);
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

    return () => {
      if (bookingData.lockedSlot) {
        releaseSlot(bookingData.lockedSlot);
      }
    };
  }, [serviceId]);

  useEffect(() => {
    if (showSuccessAnimation && animationContainer.current) {
      lottie.loadAnimation({
        container: animationContainer.current,
        animationData: bookingSuccessAnimation,
        renderer: 'svg',
        loop: true,
        autoplay: true,
      });
    }

    return () => {
      lottie.destroy(); // Clean up animation on unmount
    };
  }, [showSuccessAnimation]);

  const lockSlot = async (slot_id) => {
    try {
      await axios.post(`${API_BASE_URL}customer/lock-slot/`, { slot_id });
      setBookingData((prev) => ({ ...prev, lockedSlot: slot_id }));
    } catch (error) {
      console.error('Failed to lock slot:', error);
      toast.error('Failed to lock the selected slot. Please try again.');
    }
  };

  const releaseSlot = async (slot_id) => {
    try {
      if (slot_id) {
        await axios.post(`${API_BASE_URL}customer/release-slot/`, { slot_id });
        setBookingData((prev) => ({ ...prev, lockedSlot: null }));
      }
    } catch (error) {
      console.error('Failed to release slot:', error);
      toast.error('Failed to release the slot.');
    }
  };

  const handleContinue = async () => {
    switch (currentStep) {
      case 0:
        if (!bookingData.employee) {
          toast.warning('Please select a professional.');
          return;
        }
        break;
      case 1:
        if (!bookingData.date || !bookingData.timeSlot) {
          toast.warning('Please select a date and time slot.');
          return;
        }

        if (bookingData.lockedSlot !== bookingData.timeSlot) {
          await releaseSlot(bookingData.lockedSlot);
          await lockSlot(bookingData.timeSlot.id);
        }
        break;
      case 2:
        try {
          const response = await axiosInstance.post('booking/book-appointment/', bookingData);
          toast.success('Appointment booked successfully!');

          // Show success animation
          setShowSuccessAnimation(true);
          setTimeout(() => {
            setShowSuccessAnimation(false);
            navigate('/');
          }, 3000);

          if (bookingData.lockedSlot) {
            await releaseSlot(bookingData.lockedSlot);
          }
        } catch (error) {
          console.error('Failed to book appointment!');
          toast.error('Failed to book appointment. Please try again.');
        }
        return;

      default:
        break;
    }

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

  const handleDiscard = async () => {
    if (bookingData.lockedSlot) {
      await releaseSlot(bookingData.lockedSlot);
    }
    navigate('/');
  };

  const steps = [
    { id: 1, label: 'Professional', component: <Professional setBookingData={setBookingData} bookingData={bookingData} partnerId={serviceDetails?.partner} serviceId={serviceDetails?.id}  /> },
    { id: 2, label: 'Time', component: <TimeSelection setBookingData={setBookingData} bookingData={bookingData} /> },
    { id: 3, label: 'Confirm', component: <Confirmation bookingData={bookingData} setBookingData={setBookingData} /> },
  ];

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      {showSuccessAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={animationContainer} style={{ height: 300, width: 300 }}></div> {/* Animation container */}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-4 mb-6 flex justify-between items-center">
        <button onClick={handleBack} className="text-gray-700 font-extrabold">&larr;</button>
        <button onClick={handleDiscard} className="text-red-600 font-semibold">&times; Discard</button>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row overflow-hidden">
          <div className="lg:w-8/12 w-full">
            <div className="text-gray-600 font-medium p-4">
              {steps.map((step, index) => (
                <span
                  key={step.id}
                  className={`${currentStep === index ? 'text-gray-600 font-bold' : 'text-gray-400'}`}
                >
                  {step.label}
                  {index < steps.length - 1 && <span className="mx-2">&gt;</span>}
                </span>
              ))}
            </div>
            <div>{steps[currentStep]?.component}</div>
          </div>

          <div className="lg:w-4/12 w-full mt-6 lg:mt-0 lg:ml-6 sticky top-4 self-start bg-white border border-gray-300 rounded-xl p-4 md:space-y-4">
            {partnerDetails && (
              <div className="md:block hidden">
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

            {serviceDetails && (
              <div>
                <h4 className="md:block hidden text-lg font-semibold">Service Details</h4>
                <div className="hidden md:flex text-sm text-gray-600 justify-between">
                  <p>{serviceDetails.name}</p>
                  <p>{serviceDetails.duration} mins</p>
                  <p>{serviceDetails.price}</p>
                </div>
              </div>
            )}

            <ul className="md:block hidden space-y-2">
              {bookingData.employee?.name && <li>Profession: {bookingData.employee.name}</li>}
              {bookingData.date && <li>Date: {bookingData.date}</li>}
              {bookingData.timeSlot?.start_time && <li>Time: {bookingData.timeSlot.start_time}</li>}
            </ul>

            <div className="md:block hidden mt-4 border-t pt-4">
              <h4 className="text-lg font-semibold">Total Price</h4>
              <p className="text-xl font-bold text-gray-600">
                {bookingData.totalAmount ? bookingData.totalAmount.toFixed(2) : '0.00'}
              </p>
            </div>

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
  );
};

export default AppointmentBooking;
