import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Subscription() {
  const [plans, setPlans] = useState([]);
  const partnerId = localStorage.getItem("partner_Id"); 

  useEffect(() => {
    axios.get("/api/subscription/plans").then((response) => setPlans(response.data));
  }, []);

  const handleSubscription = (planId, planPrice) => {
    axios.post("/api/v1/payment/create-payment", { plan_id: planId, partner_id: partnerId })
      .then((response) => {
        const { order_id, amount, currency } = response.data;

        // Razorpay Payment Gateway
        const options = {
          key: "rzp_test_5LF6O76IIKTLZE",
          amount: amount * 100,
          currency: currency,
          name: "Hipsta",
          description: `Subscription for ${planId}`,
          order_id: order_id,
          handler: (response) => {
            axios.post("/api/subscription/verify-payment", {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              plan_id: planId,
              partner_id: partnerId
            })
            .then(() => alert("Subscription activated successfully!"))
            .catch(() => alert("Payment verification failed."));
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      });
  };

  return (
    <div className="subscription-container">
      <h1>Select a Plan</h1>
      {plans.map((plan) => (
        <div key={plan.id} className="plan-card">
          <h3>{plan.name}</h3>
          <p>Price: ₹{plan.price}</p>
          <p>Duration: {plan.duration_days} days</p>
          <button onClick={() => handleSubscription(plan.id, plan.price)}>Subscribe</button>
        </div>
      ))}
    </div>
  );
}
