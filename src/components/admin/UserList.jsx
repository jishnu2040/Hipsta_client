// UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/allUsers/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                setError('Failed to fetch users. Please try again.');
            }
        };

        fetchUsers();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.email} - {user.full_name} {/* Adjust based on your User model fields */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
