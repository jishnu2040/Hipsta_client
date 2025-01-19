import React, { useState } from 'react';
import QRScanner from 'react-qr-scanner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QRScannerComponent = () => {
  const [data, setData] = useState('No result'); // Scanned data state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const handleScan = async (scanData) => {
    if (scanData) {
      const bookingId = scanData.text; // Extract booking ID from QR code data
      setData(bookingId); // Update scanned data
      await verifyBooking(bookingId); // Verify booking
    }
  };

  const handleError = (err) => {
    console.error(err); // Log the error
    setError('Error scanning QR code. Please try again.'); // Update error state
  };

  const verifyBooking = async (bookingId) => {
    setIsLoading(true); // Show loading indicator
    setError(null); // Reset error state

    try {
      const response = await axios.post(`${API_BASE_URL}booking/verify-booking/`, {
        booking_id: bookingId, // Booking ID from the scan
      });

      if (response.status === 200) {
        alert('Booking successfully verified and status updated!');
        navigate('/partner');

      } else {
        setError('Failed to verify booking. Please check the booking ID.');
      }
    } catch (err) {
      console.error('Error verifying booking:', err);
      setError('Error verifying the booking. Please try again.');
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">QR Code Scanner</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Scan a QR code to verify the booking. The process is quick and secure.
        </p>
        <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
          <QRScanner
            delay={300} // Delay between scans
            style={{ width: '100%' }} // Video feed width
            onScan={handleScan} // Scan callback
            onError={handleError} // Error callback
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Scanned Data:</h3>
          <p className="text-gray-600 text-sm">{data}</p> {/* Display scanned data */}
        </div>
        {isLoading && (
          <div className="text-center mt-4">
            <p className="text-blue-500 text-sm">Verifying booking...</p>
          </div>
        )}
        {error && (
          <div className="text-center mt-4">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScannerComponent;
