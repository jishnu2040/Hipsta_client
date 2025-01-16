import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Modal component (with added functionality to close when clicking outside)
const Modal = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleClickOutside} // Close modal when clicking outside
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2"
        >
          X
        </button>
        <img
          src={imageUrl}
          alt="License Certificate"
          className="max-w-full max-h-96 object-contain"
        />
      </div>
    </div>
  );
};

const PartnerManagement = () => {
  const [partners, setPartners] = useState([]);
  const [filter, setFilter] = useState('all'); // Filter: 'all', 'approved', 'pending'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch partners from the backend
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/admin/partners/');
        setPartners(response.data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };

    fetchPartners();
  }, []);

  // Filter partners based on the selected filter
  const filteredPartners = partners.filter(partner => {
    if (filter === 'approved') return partner.is_approved;
    if (filter === 'pending') return !partner.is_approved;
    return true; // 'all'
  });

  // Handle opening the modal
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Partner Management</h2>

      {/* Filter Buttons */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'approved' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Pending
        </button>
      </div>

      {/* Partners Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Business Name</th>
              <th className="py-3 px-4 text-left">Website</th>
              <th className="py-3 px-4 text-left">Team Size</th>
              <th className="py-3 px-4 text-left">License Certificate</th>
              <th className="py-3 px-4 text-left">Is Approved</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPartners.map(partner => (
              <tr key={partner.id} className="hover:bg-gray-100 transition">
                <td className="py-3 px-4">{partner.id}</td>
                <td className="py-3 px-4">{partner.business_name}</td>
                <td className="py-3 px-4">
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {partner.website}
                  </a>
                </td>
                <td className="py-3 px-4">{partner.team_size}</td>
                <td className="py-3 px-4">
                  {partner.license_certificate_image ? (
                    <div className="flex items-center space-x-4">
                    
                      <button
                        onClick={() => openModal(`https://hipsta-s3.s3.ap-south-1.amazonaws.com/${partner.license_certificate_image}`)}
                        className="text-blue-500 underline"
                      >
                        View 
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">No Image</span>
                  )}
                </td>
                <td className="py-3 px-4">{partner.is_approved ? 'Yes' : 'No'}</td>
                <td className="py-3 px-4">
                  {partner.is_approved ? (
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPartners.length === 0 && (
          <div className="text-center text-gray-500 mt-4">No partners found for this filter.</div>
        )}
      </div>

      {/* Modal for viewing the image */}
      <Modal
        isOpen={isModalOpen}
        imageUrl={selectedImage}
        onClose={closeModal}
      />
    </div>
  );
};

export default PartnerManagement;
