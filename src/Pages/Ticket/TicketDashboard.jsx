import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utlils/axiosinstance';

const TicketDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'processing', 'closed'
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch tickets using axiosInstance
        axiosInstance
            .get('/ticket/tickets/')
            .then((response) => {
                setTickets(response.data);
                setFilteredTickets(response.data); // Set initial data to show all tickets
            })
            .catch((error) => console.error('Error fetching tickets:', error));
    }, []);

    useEffect(() => {
        // Filter tickets based on selected filter
        if (filter === 'processing') {
            setFilteredTickets(tickets.filter((ticket) => ticket.status === 'In Progress')); // Status 'In Progress' mapped to 'Processing'
        } else if (filter === 'closed') {
            setFilteredTickets(tickets.filter((ticket) => ticket.status === 'Closed'));
        } else {
            setFilteredTickets(tickets); // Show all tickets
        }
    }, [filter, tickets]);

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">Your Tickets</h2>
            
            <div className="flex justify-end space-x-4 mb-4">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-md text-sm font-semibold ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-500 hover:text-white'}`}
                >
                    All Tickets
                </button>
                <button
                    onClick={() => setFilter('processing')}
                    className={`px-4 py-2 rounded-md text-sm font-semibold ${filter === 'processing' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-500 hover:text-white'}`}
                >
                    Processing
                </button>
                <button
                    onClick={() => setFilter('closed')}
                    className={`px-4 py-2 rounded-md text-sm font-semibold ${filter === 'closed' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-500 hover:text-white'}`}
                >
                    Closed
                </button>
            </div>

            <div className="overflow-x-auto shadow rounded-lg bg-white">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Subject</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Priority</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500 py-4">No tickets found</td>
                            </tr>
                        ) : (
                            filteredTickets.map((ticket) => (
                                <tr key={ticket.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-800">{ticket.subject}</td>
                                    <td className={`px-6 py-4 text-sm ${ticket.status === 'Closed' ? 'text-gray-500' : 'text-green-600'}`}>
                                        {ticket.status === 'In Progress' ? 'Processing' : ticket.status}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{ticket.priority}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <button
                                            onClick={() => navigate(`/helpdesk/tickets/${ticket.id}`)}
                                            className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TicketDashboard;
