import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const NewService = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    image: null,
    business_type: '',
  });

  const [serviceTypes, setServiceTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serviceTypeLoading, setServiceTypeLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/core/service_type/');
        setServiceTypes(response.data);
        setServiceTypeLoading(false);
      } catch (error) {
        setError('Failed to load service types.');
        setServiceTypeLoading(false);
      }
    };

    fetchServiceTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const partnerId = localStorage.getItem('partnerId');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('duration', formData.duration);
    data.append('image', formData.image);
    data.append('business_type', formData.business_type);
    data.append('partnerId', partnerId);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/partner/services/create/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Service created successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        duration: '',
        image: null,
        business_type: '',
      });
    } catch (error) {
      toast.error('Error creating service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-3xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New Service</h2>

      {serviceTypeLoading && (
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!serviceTypeLoading && !error && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md ring focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter service name"
              required
            />
          </div>

          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md ring focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="3"
              placeholder="Enter a short description"
            ></textarea>
          </div>

          <div>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md ring focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Amount"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md ring focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 01:30:00 for 1 hour 30 minutes"
              required
            />
          </div>

          <div>
            <select
              name="business_type"
              value={formData.business_type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md ring focus:outline-none focus:ring-2 focus:ring-blue-400"
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

          <div>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full  px-4 py-2 border rounded-md ring-gray-900 first-line:focus:outline-none focus:ring-2 focus:ring-blue-400"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default NewService;
