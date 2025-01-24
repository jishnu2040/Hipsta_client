import React, { useState } from 'react';
import { lazy, Suspense } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QRScanner = lazy(() => import('react-qr-scanner')); // Dynamically import QRScanner

const QRScannerComponent = () => {
  const [data, setData] = useState('No result'); // Scanned data state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isScanning, setIsScanning] = useState(false); // Debounce state

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
  const navigate = useNavigate();

  if (!API_BASE_URL) {
    console.error('API_BASE_URL is not defined in the environment variables.');
  }

  const handleScan = async (scanData) => {
    if (scanData && scanData.text && !isScanning) {
      setIsScanning(true); // Prevent multiple scans in quick succession
      setTimeout(() => setIsScanning(false), 1000); // Debounce for 1 second
      const bookingId = scanData.text.trim(); // Extract booking ID
      setData(bookingId); // Update scanned data
      await verifyBooking(bookingId); // Verify booking
    } else if (!scanData) {
      setError('No QR code detected. Please try again.');
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
        navigate('/partner'); // Navigate to the partner page
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

        <Suspense fallback={<p>Loading scanner...</p>}>
          <div className="rounded-lg overflow-hidden border border-gray-200 mb-4">
            <QRScanner
              delay={300} // Delay between scans
              style={{ width: '100%' }} // Video feed width
              onScan={handleScan} // Scan callback
              onError={handleError} // Error callback
            />
          </div>
        </Suspense>

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
