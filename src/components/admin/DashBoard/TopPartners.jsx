import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopPartners = () => {
  const [topPartners, setTopPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the top 5 partners
    axios
      .get('http://localhost:8000/api/v1/admin/top-partners/')
      .then((response) => {
        setTopPartners(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching top partners:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Top 5 Partners 🏆 (Last Month)</h2>
      <ul className="space-y-3">
        {topPartners.map((partner, index) => (
          <li key={partner.partner_id} className="flex justify-between items-center p-3 border rounded-md">
            <div className="text-gray-700 font-medium">
              {index + 1}. {partner.partner_name}
            </div>
            <div className="text-green-600 font-semibold">
              {partner.total_bookings} Bookings
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPartners;
