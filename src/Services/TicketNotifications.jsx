import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for React Toastify

const TicketNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/tickets/');

        socket.onmessage = function (event) {
            const data = JSON.parse(event.data);
            
            // Show toast notification
            toast.info(`New Ticket: ${data.message}`, {
                position: "top-right",  // Adjust position as needed
                autoClose: 5000,         // Close after 5 seconds
                hideProgressBar: false,  // Show progress bar
                closeOnClick: true,      // Close on click
                pauseOnHover: true,      // Pause on hover
                draggable: true,         // Make draggable
            });

            // Optionally, add the notification to a state (if you want to show the list as well)
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                data.message,
            ]);
        };

        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
            <h3>New Ticket Notifications</h3>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification}</li>
                ))}
            </ul>
        </div>
    );
};

export default TicketNotifications;
