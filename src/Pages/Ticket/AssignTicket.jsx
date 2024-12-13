import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utlils/axiosinstance';

const AssignTicket = (  ) => {
    const [staffList, setStaffList] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState('');

    const ticketId = 4;

    useEffect(() => {
        axiosInstance
            .get('/ticket/staff')
            .then((response) => {
                setStaffList(response.data);
            })
            .catch((error) => console.error('Error fetching staff list:', error));
    }, []);

    const handleAssign = () => {
        axiosInstance
            .post(`/ticket/tickets/${ticketId}/assign/`, { assigned_to: selectedStaff })
            .then(() => alert('Ticket assigned successfully!'))
            .catch((error) => console.error('Error assigning ticket:', error));
    };

    return (
        <div className="assign-ticket">
            <h3>Assign Ticket</h3>
            <select value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)}>
                <option value="">Select Staff</option>
                {staffList.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                        {staff.first_name} {staff.last_name} {/* Use first_name and last_name */}
                    </option>
                ))}
            </select>
            <button onClick={handleAssign} disabled={!selectedStaff}>
                Assign
            </button>
        </div>
    );
};

export default AssignTicket;
