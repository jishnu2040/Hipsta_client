import React, { useState } from 'react';
import axiosInstance from '../../../utlils/axiosinstance';

const CreateTicket = () => {
    const [ticketType, setTicketType] = useState('');
    const [category, setCategory] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Fetch user ID from local storage
        const raisedBy = localStorage.getItem('userId');

        if (!raisedBy) {
            alert('User not logged in!');
            return;
        }

        const ticketData = {
            ticket_type: ticketType,
            category,
            raised_by: raisedBy,
            subject,
            description,
        };

        axiosInstance.post('core/tickets/', ticketData)
            .then(() => alert('Ticket created!'))
            .catch(error => {
                console.error(error);
                alert('Failed to create ticket. Please check the input fields.');
            });
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Create Ticket</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Ticket Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Type of Ticket
                    </label>
                    <select
                        value={ticketType}
                        onChange={(e) => setTicketType(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                    >
                        <option value="">Select Type</option>
                        <option value="User">User Issue</option>
                        <option value="Partner">Partner Issue</option>
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                    >
                        <option value="">Select Category</option>
                        <option value="Payment">Payment Issue</option>
                        <option value="Technical">Technical Issue</option>
                        <option value="Policy">Policy Question</option>
                        <option value="Complaint">Complaint</option>
                    </select>
                </div>

                {/* Subject */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Subject
                    </label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter a brief subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the issue in detail"
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTicket;
