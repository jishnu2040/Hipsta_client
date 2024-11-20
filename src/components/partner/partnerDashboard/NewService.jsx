import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';  // Import the toast function
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for toast notifications
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation

const NewService = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    image: null,
    business_type: '',
  });

  // State to hold service type options fetched from the backend
  const [serviceTypes, setServiceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use navigate to go back to previous page
  const navigate = useNavigate();

  // Fetch service types from the backend on component mount
  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/core/service_type/');
        setServiceTypes(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load service types.');
        setLoading(false);
      }
    };

    fetchServiceTypes();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change (for image upload)
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the partner_id from localStorage
    const partnerId = localStorage.getItem('partnerId');

    // Prepare form data for sending to the backend
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('duration', formData.duration);
    data.append('image', formData.image);
    data.append('business_type', formData.business_type);
    data.append('partnerId', partnerId); // Pass partner_id from localStorage

    try {
      // Send the form data to the backend API
      const response = await axios.post('http://localhost:8000/api/v1/core/services/create/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Service created successfully:', response.data);

      // Display success toast message
      toast.success('Service created successfully!');

      // Reset the form or navigate to another page after successful creation
      setFormData({
        name: '',
        description: '',
        price: '',
        duration: '',
        image: null,
        business_type: '',
      });
    } catch (error) {
      console.error('Error creating service:', error);

      // Display error toast message
      toast.error('Error creating service. Please try again.');
    }
  };

  // JSX for the form
  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-3xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Service</h2>

      {/* Loading or Error State */}
      {loading && <p>Loading service types...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}  // Go back to the previous page
        className="mb-4 px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
      >
        Back
      </button>

      {/* Form */}
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Service Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              rows="3"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Duration (HH:MM:SS)</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="e.g., 01:30:00 for 1 hour 30 minutes"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Service Type</label>
            <select
              name="business_type"
              value={formData.business_type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="">Select a Service Type</option>
              {serviceTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Service Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-md"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default NewService;
