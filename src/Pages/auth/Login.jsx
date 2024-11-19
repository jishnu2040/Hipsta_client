import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setUserId } from "../../Redux/slices/partnerSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/login/', formData);
      const user = {
        email: response.data.email,
        name: response.data.full_name,
        userId: response.data.user_id
      };
      const user_type = response.data.user_type;

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("userId", response.data.user_id)

        dispatch(setUserId(user.userId));
        toast.success("Login successful");
        setErrors({});

        setTimeout(() => {
          navigate(user_type === 'partner' ? '/partner' : '/');
        }, 1000);
      } else {
        toast.error("Login failed. Please check your credentials.");
        setErrors({});
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        toast.error(error.response.data.message || 'An error occurred. Please try again.');
      } else if (error.request) {
        toast.error('No response from the server. Please try again.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-3xl font-semibold text-gray-700 text-center">Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <label
            htmlFor="email"
            className={`absolute transition-all duration-200 transform ${
              formData.email ? '-top-5 text-gray-700 text-sm' : 'top-2 text-gray-500'
            } left-3 bg-white px-1 font-medium`}
          >
            Email
          </label>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>


          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label
              htmlFor="password"
              className="absolute -top-2 left-3 bg-white px-1 text-gray-500 font-medium text-sm"
            >
              Password
            </label>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="flex justify-end">
            <Link to="/forgotpassword" className="text-sm text-gray-400 hover:text-gray-800">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          >
            Login
          </button>

          <div className="text-center">
            <p className="text-gray-600">Don't have an account? <Link to="/signup" className="text-gray-900 font-medium hover:text-black">Register</Link></p>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;