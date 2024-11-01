import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignupForm from './Signup/SignupForm';
import Card from './Signup/Card';
import signup_img from '../../assets/close.jpg';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
    user_type: 'customer',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignInWithGoogle = async (response) => {
    const payload = response.credential;
    try {
      const server_res = await axios.post('http://localhost:8000/api/v1/Oauth/google/', { access_token: payload });
      console.log(server_res);
      // Handle the server response appropriately
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_CLIENT_ID,
          callback: handleSignInWithGoogle,
        });
        google.accounts.id.renderButton(
          document.getElementById('signInDiv'),
          { theme: 'outline', size: 'large', text: 'continue_with', shape: 'circle', width: '300' }
        );
      };
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleScript();
    } else {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_CLIENT_ID,
        callback: handleSignInWithGoogle,
      });
      google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        { theme: 'outline', size: 'large', text: 'continue_with', shape: 'circle', width: '300' }
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/register/', formData);
      if (response.status === 200 || response.status === 201) {
        navigate('/verify');
      } else {
        setErrors(response.data);
      }
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data);
      } else {
        console.error('Error occurred:', error.message);
      }
    }
  };

  return (
    <div className="bg-customBg flex items-center justify-center min-h-screen">
      <Card>
        <div className="w-full h-full p-8 sm:p-6 flex flex-col justify-center">
          <h2 className="text-center text-2xl font-semibold mb-6 text-lime-900">Sign Up</h2>
          <SignupForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            errors={errors}
          />
        </div>
      </Card>
    </div>
  );
};

export default Signup;
