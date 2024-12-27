import { useState, useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';
import axiosInstance from '../../../utlils/axiosinstance';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PricingModal() {
  const [plans, setPlans] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState('1 Month');
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const durationOptions = {
    '1 Month': 30,
    '6 Months': 180,
    '1 Year': 365,
  };

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get('/admin/subscriptionPlans/');
        setPlans(response.data);
      } catch (error) {
        console.error('Failed to fetch plans:', error);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    const durationDays = durationOptions[selectedDuration];
    const filtered = plans.filter((plan) => plan.duration_days === durationDays);
    setFilteredPlans(filtered);
    if (filtered.length > 0) {
      setSelectedPlan(filtered[0]);
    }
  }, [plans, selectedDuration]);

  const handlePayment = async () => {
    try {
      if (!selectedPlan) {
        alert('Please select a plan first.');
        return;
      }

      const response = await axiosInstance.post('/payment/create-razorpay-order/', {
        plan_id: selectedPlan.id,
      });

      const { order_id, amount, currency } = response.data;

      const razorpayOptions = {
        key: "rzp_test_c3ulzNcBkio9UQ", // Replace with Razorpay Key ID
        amount: amount,
        currency: currency,
        name: "Your Company Name",
        description: "Subscription Payment",
        order_id: order_id,
        handler: async function (response) {
          try {
            const verifyResponse = await axiosInstance.post('/payment/verify-payment/', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
              }
            );
            alert(verifyResponse.data.message);
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Payment verification failed.');
          }
        },
        theme: {
          color: "#6366F1",
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();

      razorpay.on('payment.failed', function (response) {
        alert('Payment failed: ' + response.error.description);
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert('Failed to initiate payment.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg--900 bg-opacity-50">
      <div className="relative w-full max-w-lg p-8">
        <div className="bg-gray-900 shadow-2xl text-white rounded-3xl p-8 ring-1 ring-gray-200">
          <h3 className="text-orange-300 text-2xl font-semibold">Subscription Plans 🎁</h3>
          <p className="mt-4 text-gray-400">Choose a plan that suits your needs.</p>

          <div className="flex justify-center mt-6 space-x-4">
            {Object.keys(durationOptions).map((duration) => (
              <button
                key={duration}
                onClick={() => setSelectedDuration(duration)}
                className={classNames(
                  selectedDuration === duration
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-600',
                  'px-4 py-2 rounded-2xl font-medium'
                )}
              >
                {duration}
              </button>
            ))}
          </div>

          {selectedPlan && (
            <div className="mt-12 text-gray-300 text-sm">
              <h5 className="text-lg font-bold">{selectedPlan.name}</h5>
              <p className="text-4xl font-bold">
                ₹{selectedPlan.price}
                <span className="text-base font-medium text-gray-400"> / {selectedDuration}</span>
                <p className="text-sm text-red-500">🎉Save <strong className='text-xl'>{selectedPlan.discount}%</strong></p>
              </p>
            </div>
          )}

          <ul className="mt-6 space-y-4">
            <li className="flex items-center">
              <FiCheck className="text-indigo-400" />
              <span className="ml-3">Unlimited subscribers</span>
            </li>
            <li className="flex items-center">
              <FiCheck className="text-indigo-400" />
              <span className="ml-3">Advanced analytics</span>
            </li>
            <li className="flex items-center">
              <FiCheck className="text-indigo-400" />
              <span className="ml-3">Priority support</span>
            </li>
          </ul>

          {selectedPlan && (
            <button
              onClick={handlePayment}
              className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-2xl font-medium hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
