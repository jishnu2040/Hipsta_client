import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Customer = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all'); // Add a state for filter

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('access_token');
        console.log('Access Token:', token); // Check if token is being retrieved

        const response = await axios.get('http://localhost:8000/api/v1/admin/allUsers/', {
          // Uncomment this when authorization is required
          // headers: {
          //   Authorization: `Bearer ${token}`
          // }
        });
        
        const customers = response.data.filter(user => user.user_type === 'customer');
        setUsers(customers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle Block User
  const handleBlockUser = async (userId) => {
    try {
      const token = localStorage.getItem('access_token');
      console.log('Blocking User, Access Token:', token);
      await axios.patch(`http://localhost:8000/api/v1/admin/${userId}/block/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.map(user => user.id === userId ? { ...user, is_active: false } : user));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  // Handle Unblock User
  const handleUnblockUser = async (userId) => {
    try {
      const token = localStorage.getItem('access_token');
      console.log('Unblocking User, Access Token:', token);
      await axios.patch(`http://localhost:8000/api/v1/admin/${userId}/unblock/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(users.map(user => user.id === userId ? { ...user, is_active: true } : user));
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  // Filter users based on the selected filter
  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(user => (filter === 'blocked' ? !user.is_active : user.is_active));

  return (
    <div className="p-2 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Customer Management</h2>

      {/* Filter Buttons */}
      <div className="mb-2 ">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md  ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white'}`}
        >
          All Users
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-md ${filter === 'active' ? 'bg-green-500 text-white' : 'bg-white'}`}
        >
          Active Users
        </button>
        <button
          onClick={() => setFilter('blocked')}
          className={`px-4 py-2 rounded-md  ${filter === 'blocked' ? 'bg-red-500 text-white' : 'bg-white'}`}
        >
          Blocked Users
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">First Name</th>
              <th className="py-3 px-4 border-b">Last Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Is Verified</th>
              <th className="py-3 px-4 border-b">Is Active</th>
              <th className="py-3 px-4 border-b">Date Joined</th>
              <th className="py-3 px-4 border-b">Last Login</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="bg-white hover:bg-gray-50 transition duration-300">
                <td className="py-3 px-4 border-b">{user.first_name}</td>
                <td className="py-3 px-4 border-b">{user.last_name}</td>
                <td className="py-3 px-4 border-b">{user.email}</td>
                <td className="py-3 px-4 border-b">{user.is_verified ? 'Yes' : 'No'}</td>
                <td className="py-3 px-4 border-b">{user.is_active ? 'Yes' : 'No'}</td>
                <td className="py-3 px-4 border-b">{new Date(user.date_joined).toLocaleDateString()}</td>
                <td className="py-3 px-4 border-b">{new Date(user.last_login).toLocaleDateString()}</td>
                <td className="py-3 px-4 border-b">
                  {user.is_active ? (
                    <button
                      onClick={() => handleBlockUser(user.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnblockUser(user.id)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Unblock
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

export default Customer;
