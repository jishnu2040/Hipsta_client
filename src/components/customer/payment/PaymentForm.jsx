import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axiosInstance from "../../../utlils/axiosinstance";

const stripePromise = loadStripe("pk_test_51QSaA8EXg9cYMRv8ygePwPSx2eSrJwaWwrQ2j64Vghjg3NMJ3OvfuudV4SQDgq21ABMb8Eo6qnbwKcq8HRylaiR100XDMaD7Z6");

const PaymentForm = ({ totalAmount, appointmentData }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // "loading", "error", or "success"
  const stripe = useStripe();
  const elements = useElements();

  // Fetch the client secret for the payment intent
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/v1/booking/create-payment-intent/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ total_amount: totalAmount }),
        });
        const data = await response.json();
        setClientSecret(data.clientSecret);
        setLoading(false);
      } catch (error) {
        setPaymentStatus("error");
        console.error("Error fetching payment intent", error);
        setLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [totalAmount]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) return;
  
    const cardElement = elements.getElement(CardElement);
  
    setLoading(true);
    setPaymentStatus("loading");
  
    try {
      // Confirm the card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
  
      if (error) {
        console.error("Payment failed", error);
        setPaymentStatus("error");
        setLoading(false);
        return; // Stop further execution
      }
  
      if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded", paymentIntent);
        setPaymentStatus("success");
  
        // Proceed with booking appointment
        try {
          // Send the booking request using axiosInstance (which includes token handling)
          const response = await axiosInstance.post("/booking/book-appointment/", {
            ...appointmentData, // This should include the service_id, employee_id, date, start_time, etc.
            total_amount: totalAmount,  // Include the total amount of the service
            payment_method: "card",    // Set the payment method as 'card'
          });
  
          console.log("Appointment booked successfully:", response.data);
        } catch (error) {
          console.error("Error booking appointment:", error.response || error.message);
          setPaymentStatus("error");
        }
      }
    } catch (error) {
      console.error("Unexpected error during payment", error);
      setPaymentStatus("error");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl mt-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Secure Payment</h2>
        <p className="text-lg text-gray-500">
          Complete your booking by securely processing your payment.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="card-element" className="block text-gray-700 text-sm font-medium">
            Credit or Debit Card
          </label>
          <div className="p-4 border border-gray-300 rounded-lg shadow-sm">
            <CardElement
              id="card-element"
              className="p-3 border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#333",
                    "::placeholder": {
                      color: "#999",
                    },
                  },
                  invalid: {
                    color: "#e74c3c",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={!stripe || loading}
          >
            {loading ? "Processing..." : `Pay ${totalAmount}`}
          </button>
        </div>

        {/* Conditional Status Messages */}
        {paymentStatus === "loading" && (
          <div className="text-gray-500 text-center">Processing payment...</div>
        )}
        {paymentStatus === "error" && (
          <div className="text-red-600 text-center">Payment failed. Please try again.</div>
        )}
        {paymentStatus === "success" && (
          <div className="text-green-600 text-center">
            Payment successful! Thank you for your booking.
          </div>
        )}
      </form>
    </div>
  );
};

const PaymentWrapper = ({ totalAmount, appointmentData }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm totalAmount={totalAmount} appointmentData={appointmentData} />
    </Elements>
  );
};

export default PaymentWrapper;
