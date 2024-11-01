import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Your Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">User Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <p className="text-lg">{user.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <p className="text-lg">{user.name}</p>
          </div>
          {/* Add more user information as needed */}
        </div>
       
        <div className="flex justify-center">
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="bg-blue-500 text-white px-6 py-3 rounded-md mr-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Toggle Paragraph
          </button>
          <Link
            to="/"
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Go to Dashboard
          </Link>
        </div>
        {isVisible && (
          <p className="mt-8 text-lg text-center">
            This paragraph is visible.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
