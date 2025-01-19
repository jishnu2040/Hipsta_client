import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false); // To track token validity
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const handleResetConfirm = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}auth/password-reset-confirm/${uid}/${token}/`);
        console.log(response.data); // Debugging purpose
        if (!response.data.success) {
          setTokenValid(false);
          toast.error('Invalid or expired link.');
          navigate('/forgotpassword'); // Redirect if invalid
        } else {
          setTokenValid(true);
        }
      } catch (error) {
        setTokenValid(false);
        toast.error('An error occurred. Please try again.');
        navigate('/forgotpassword'); // Redirect if error
      }
    };

    handleResetConfirm();
  }, [uid, token, navigate]);

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.patch(`${API_BASE_URL}auth/set-new-password/`, {
        password,
        confirm_password: confirmPassword,
        uidb64: uid,
        token
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true
      });

      console.log('Success:', response.data);
      toast.success('Password reset successful');
      navigate('/auth/login'); // Redirect after successful password reset
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
              placeholder="New Password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              placeholder="Confirm Password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {/* Display error message immediately if passwords do not match */}
            {password !== confirmPassword && confirmPassword && (
              <p className="text-red-500 text-sm mt-2">Passwords do not match.</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading || password !== confirmPassword || !tokenValid}
          >
            {isLoading ? 'Loading...' : 'Reset Password'}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ResetPassword;
