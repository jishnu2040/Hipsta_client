import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utlils/axiosinstance'

const Support = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axiosInstance.get('core/tickets/')
            .then((response) => setTickets(response.data))
            .catch((error) => console.error(error));
    }, []);

    const handleResolveTicket = (ticketId) => {
      console.log(ticketId);
      
      axiosInstance.patch(`core/tickets/${ticketId}/`, { status: 'Resolved' })

            .then(() => {
                alert('Ticket resolved!');
                setTickets(tickets.map(ticket =>
                    ticket.id === ticketId ? { ...ticket, status: 'Resolved' } : ticket
                ));
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Manage Tickets</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Type</th>
                        <th className="border border-gray-300 px-4 py-2">Category</th>
                        <th className="border border-gray-300 px-4 py-2">Subject</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td className="border border-gray-300 px-4 py-2">{ticket.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{ticket.ticket_type}</td>
                            <td className="border border-gray-300 px-4 py-2">{ticket.category}</td>
                            <td className="border border-gray-300 px-4 py-2">{ticket.subject}</td>
                            <td className="border border-gray-300 px-4 py-2">{ticket.status}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {ticket.status !== 'Resolved' && (
                                    <button
                                        onClick={() => handleResolveTicket(ticket.id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Resolve
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Support;
