import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utlils/axiosinstance';

const Tickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axiosInstance.get('core/tickets/')
            .then(response => setTickets(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-700 mb-6">My Tickets</h1>
            {tickets.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Type</th>
                                <th className="px-4 py-2 text-left">Category</th>
                                <th className="px-4 py-2 text-left">Subject</th>
                                <th className="px-4 py-2 text-left">Description</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Created At</th>
                                <th className="px-4 py-2 text-left">Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map(ticket => (
                                <tr 
                                    key={ticket.id} 
                                    className="border-b hover:bg-gray-50 transition">
                                    <td className="px-4 py-2">{ticket.id}</td>
                                    <td className="px-4 py-2">{ticket.ticket_type}</td>
                                    <td className="px-4 py-2">{ticket.category}</td>
                                    <td className="px-4 py-2">{ticket.subject}</td>
                                    <td className="px-4 py-2">{ticket.description}</td>
                                    <td className="px-4 py-2">
                                        <span 
                                            className={`px-2 py-1 text-sm font-semibold rounded 
                                                ${ticket.status === 'Open' ? 'bg-blue-100 text-blue-600' : ''} 
                                                ${ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-600' : ''} 
                                                ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-600' : ''} 
                                                ${ticket.status === 'Closed' ? 'bg-gray-100 text-gray-600' : ''}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">{new Date(ticket.created_at).toLocaleString()}</td>
                                    <td className="px-4 py-2">{new Date(ticket.updated_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-600 text-center">No tickets found.</p>
            )}
        </div>
    );
};

export default Tickets;
