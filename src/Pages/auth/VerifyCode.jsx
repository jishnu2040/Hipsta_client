import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUserId } from '../../Redux/slices/partnerSlice';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/verify-email/', { otp: code });
      const { message, user_type, user_id } = response.data; // Assuming your API returns 'user_type' and 'user_id' in the response

      if (response.status === 200) {
        toast.success(message);
        setErrors({});
        
        // Dispatch the user ID to Redux store
        dispatch(setUserId(user_id));

        setTimeout(() => {
          if (user_type === 'partner') {
            navigate('/partner-details'); // Navigate to partner details page
          } else {
            navigate('/login'); // Navigate to login page for customers
          }
        }, 3000);
      } else if (response.status === 204) {
        toast.info(message);
        setErrors({});
        navigate('/login');
      }
    } catch (error) {
      console.error('Verification error:', error);

      if (error.response) {
        const { data, status } = error.response;

        if (status === 400) {
          toast.error(data.error || 'OTP has expired');
        } else if (status === 404) {
          toast.error(data.message || 'Passcode is invalid or not provided');
        } else {
          toast.error('An error occurred. Please try again.');
        }

        setErrors(data);
      } else if (error.request) {
        toast.error('No response from the server. Please try again.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="code" className="block text-gray-700 font-medium mb-2">Verification Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
