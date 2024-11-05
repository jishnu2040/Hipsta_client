import React from 'react';
import { Link } from 'react-router-dom';

const SignupForm = ({ formData, handleChange, handleSubmit, errors }) => {
  return (
    <>
      <div className='flex mb-4 text-gray-700 font-medium'>
        <h1>Create Account</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex mb-4 space-x-4">
          <div className="w-1/2">
            <div className="relative">
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <label
                htmlFor="first_name"
                className="absolute -top-2 left-3 bg-white px-1 text-gray-500 font-small"
              >
                First Name
              </label>
            </div>
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
          </div>
          <div className="w-1/2">
            <div className="relative">
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <label
                htmlFor="last_name"
                className="absolute -top-2 left-3 bg-white px-1 text-gray-500 font-small"
              >
                Last Name
              </label>
            </div>
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label
              htmlFor="email"
              className="absolute -top-2 left-3 bg-white px-1 text-gray-500 font-small"
            >
              Email
            </label>
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
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
              className="absolute -top-2 left-3 bg-white px-1 text-gray-500 font-small"
            >
              Password
            </label>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <div className="relative">
            <input
              type="password"
              id="password2"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <label
              htmlFor="password2"
              className="absolute -top-2 left-3 bg-white px-1 text-gray-500 font-small"
            >
              Confirm Password
            </label>
          </div>
          {errors.password2 && <p className="text-red-500 text-sm">{errors.password2}</p>}
        </div>
        
        <div className="mb-4">
          <select
            id="user_type"
            name="user_type"
            value={formData.user_type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="customer">Customer</option>
            <option value="partner">Partner</option>
          </select>
          {errors.user_type && <p className="text-red-500 text-sm">{errors.user_type}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium focus:ring-2 focus:ring-indigo-500"
        >
          Create Account
        </button>

        {errors.general && <p className="text-red-500 text-sm mt-2">{errors.general}</p>}

        <div className="mt-4 flex items-center justify-between">
          <span>Already have an account?</span>
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Login</Link>
        </div>

        <div className="mt-4 text-center">
          <span>Or</span>
        </div>

        <div id="signInDiv" className="flex justify-center my-4"></div>
      </form>
    </>
  );
};

export default SignupForm;
