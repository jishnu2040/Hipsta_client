import React from "react";
import axios from "axios";

const PaymentPage = () => {
  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/payment/create-payment-order/", {
        amount: 1000,
        partner_id: "partner_123",
        subscription_month: 12,
      });

      const { payment_url, payment_data } = response.data;

      // Redirect to PayU Payment Page
      const form = document.createElement("form");
      form.action = payment_url;
      form.method = "POST";

      for (const [key, value] of Object.entries(payment_data)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
  };

  return (
    <div>
      <h1>Subscribe to Partner</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
