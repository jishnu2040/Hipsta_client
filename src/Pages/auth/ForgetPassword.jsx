import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/password-reset/', { email });
      setIsLoading(false);
      toast.success("a link to reset your password has be sent to your email");
    } catch (error) {
      setIsLoading(false);
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  };

  // const handleResetConfirm = async (uidb64, token) => {
  //   try {
  //     const response = await axios.get(`http://localhost:8000/api/v1/auth/password-reset-confirm/${uidb64}/${token}/`);
  //     if (response.data.success) {
  //       navigate(`/reset-password?uidb64=${uidb64}&token=${token}`);
  //     } else {
  //       toast.error('Invalid or expired link.');
  //     }
  //   } catch (error) {
  //     toast.error('An error occurred. Please try again.');
  //     console.error(error);
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Reset Password'}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;
 