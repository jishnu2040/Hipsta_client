import React, { useState } from 'react';
import { FiFileText } from 'react-icons/fi'; // Ticket icon from react-icons
import axiosInstance from '../../utlils/axiosinstance';

const RaiseTicket = () => {
    const [formData, setFormData] = useState({
        category: '',
        subject: '',
        description: '',
        priority: 'medium',
        image: null,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successData, setSuccessData] = useState(null); // State to store success data

    const role = localStorage.getItem('role');
    const ticketType = role === 'customer' ? 'User' : role === 'partner' ? 'Partner' : '';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User not logged in. Please log in again.');
            setLoading(false);
            return;
        }

        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) formDataObj.append(key, value);
        });

        formDataObj.append('ticket_type', ticketType);
        formDataObj.append('raised_by', userId);

        try {
            const response = await axiosInstance.post('/ticket/tickets/', formDataObj, {
                headers: {
                    Accept: 'application/json',
                },
            });
            // Store success response for modal
            setSuccessData(response.data);
            setFormData({
                category: '',
                subject: '',
                description: '',
                priority: 'medium',
                image: null,
            });
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                console.error('Error raising ticket:', error);
                alert('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setSuccessData(null); // Close the modal by resetting successData
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-xl mt-2">
            <div className="flex items-center space-x-3 mb-6">
                <FiFileText className="text-blue-600 text-3xl" />
                <h1 className="text-3xl font-bold text-gray-800">Raise a Ticket</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="block">
                        <span className="text-gray-700 font-medium">Category</span>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="block w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Select Category</option>
                            <option value="Payment">Payment Issue</option>
                            <option value="Technical">Technical Issue</option>
                            <option value="Policy">Policy Question</option>
                            <option value="Complaint">Complaint</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-medium">Priority</span>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="block w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </label>
                </div>
                {errors.category && <p className="text-red-500 text-sm">{errors.category[0]}</p>}

                <label className="block">
                    <span className="text-gray-700 font-medium">Subject</span>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="block w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter a short subject"
                    />
                </label>
                {errors.subject && <p className="text-red-500 text-sm">{errors.subject[0]}</p>}

                <label className="block">
                    <span className="text-gray-700 font-medium">Description</span>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="block w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                        placeholder="Describe the issue in detail"
                    />
                </label>
                {errors.description && <p className="text-red-500 text-sm">{errors.description[0]}</p>}

                <label className="block">
                    <span className="text-gray-700 font-medium">Upload an Image (optional)</span>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                    />
                </label>
                {errors.image && <p className="text-red-500 text-sm">{errors.image[0]}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-offset-2 ${
                        loading
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-900'
                    }`}
                >
                    {loading ? 'Submitting...' : 'Submit Ticket'}
                </button>
            </form>

            {/* Success Modal */}
            {successData && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <div className="flex items-center space-x-3 mb-4">
                <FiFileText className="text-orange-600 text-3xl" />
                <h2 className="text-2xl font-semibold text-green-600">Ticket Raised Successfully!</h2>
            </div>
            <div className="space-y-2 mb-4">
                <p>
                    <strong>Ticket ID:</strong> {successData.ticket_id}
                </p>
                <p>
                    <strong>Subject:</strong> {successData.subject}
                </p>
                <p>
                    <strong>Category:</strong> {successData.category}
                </p>
            </div>
            <button
                onClick={closeModal}
                className="w-full px-6 py-3 bg-blgray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-all duration-200"
            >
                Close
            </button>
        </div>
    </div>
)}
        </div>
    );
};

export default RaiseTicket;
