import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utlils/axiosinstance';
import Chat from './Chat';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/ticket/ticket/${ticketId}/`)
      .then((response) => setTicket(response.data))
      .catch((error) => console.error('Error fetching ticket:', error));
  }, [ticketId]);

  if (!ticket) return <div className="text-center text-gray-500">Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col lg:flex-row space-y-6 lg:space-y-0">
      {/* Ticket Details */}
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Ticket Details</h2>
        <div className="space-y-4">
          <p><b>Raised by:</b> {ticket.raised_by}</p>
          <p><b>Subject:</b> {ticket.subject}</p>
          <p><b>Category:</b> {ticket.category}</p>
          <p><b>Status:</b> <span className={`font-semibold ${ticket.status === 'Closed' ? 'text-gray-500' : 'text-green-600'}`}>{ticket.status}</span></p>
          <p><b>Priority:</b> {ticket.priority}</p>
          <p><b>Description:</b> {ticket.description}</p>
          {ticket.assigned_to && <p><b>Assigned To:</b> {ticket.assigned_to}</p>}
        </div>
      </div>

      {/* Chat Section */}
      <div className="lg:w-1/2">
        <Chat ticketId={ticketId} />
      </div>
    </div>
  );
};

export default TicketDetails;
