import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartnerManagement = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const token = localStorage.getItem('access_token'); 
        console.log('Access Token:', token); // Check if token is being retrieved
        const response = await axios.get('http://localhost:8000/api/v1/partner/partners/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPartners(response.data); // Remove the filter
      } catch (error) {
        console.error('Error fetching partners:', error);
      }
    };
  
    fetchPartners();
  }, []);
  

  const handleApprovePartner = async (partnerId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.patch(`http://localhost:8000/api/v1/partner/partners/${partnerId}/approve/?action=approve`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPartners(partners.map(partner => partner.id === partnerId ? { ...partner, is_approved: true } : partner));
    } catch (error) {
      console.error('Error approving partner:', error);
    }
  };
  
  const handleRejectPartner = async (partnerId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.patch(`http://localhost:8000/api/v1/partner/partners/${partnerId}/reject/?action=reject`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPartners(partners.map(partner => partner.id === partnerId ? { ...partner, is_approved: false } : partner));
    } catch (error) {
      console.error('Error rejecting partner:', error);
    }
  };
  



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Partner Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">ID</th>
              <th className="py-3 px-4 border-b">Business Name</th>
              <th className="py-3 px-4 border-b">Website</th>
              <th className="py-3 px-4 border-b">Team Size</th>
              <th className="py-3 px-4 border-b">Is Approved</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners.map(partner => (
              <tr key={partner.id} className="bg-white hover:bg-gray-50 transition duration-300">
                <td className="py-3 px-4 border-b">{partner.id}</td>
                <td className="py-3 px-4 border-b">{partner.business_name}</td>
                <td className="py-3 px-4 border-b">{partner.website}</td>
                <td className="py-3 px-4 border-b">{partner.team_size}</td>
                <td className="py-3 px-4 border-b">{partner.is_approved ? 'Yes' : 'No'}</td>
                <td className="py-3 px-4 border-b">
                  {partner.is_approved ? (
                    <button
                      onClick={() => handleRejectPartner(partner.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Reject
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApprovePartner(partner.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartnerManagement;
