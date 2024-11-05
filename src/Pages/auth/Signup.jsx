import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignupForm from './Signup/SignupForm';
import { toast } from 'react-toastify';
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
    console.log(response);
    const payload = response.credential;
  
    try {
      const server_res = await axios.post('http://localhost:8000/api/v1/auth/google/', { access_token: payload });
      console.log(server_res);
  

      if (server_res.status === 200) {
    
        const { email, full_name, access_token, refresh_token } = server_res.data;
  
        localStorage.setItem("user", JSON.stringify({ email, full_name }));
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);


        navigate('/');
  
        // Dispatch user ID or any other required user state
        dispatch(setUserId(server_res.data.userId)); // Assuming userId comes from the server response
  
        navigate('/');
  
        // Display success message
        toast.success("Login successful");
        setErrors({});
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setErrors({ google: 'Failed to sign in with Google.' });
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
    setErrors({}); // Clear previous errors
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/register/', formData);
      if (response.status === 200 || response.status === 201) {
        navigate('/verify');
      }
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data); // Set errors from the server response
      } else {
        console.error('Error occurred:', error.message);
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
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
