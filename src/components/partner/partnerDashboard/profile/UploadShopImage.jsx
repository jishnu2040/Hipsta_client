import React, { useState } from 'react';
import axios from 'axios';

const UploadShopImage = ({ partnerId }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));  // Show preview of selected image
    }
  };

  // Upload the image to S3
  const uploadImageToS3 = async () => {
    if (!imageFile) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      // Step 1: Get pre-signed URL from backend
      const response = await axios.post(`${API_BASE_URL}partner/get-presigned-url/`, {
        file_name: `shop-images/${partnerId}/${imageFile.name}`,
        file_type: imageFile.type,
      });

      const { url, file_key } = response.data;

      // Step 2: Upload file to S3 using pre-signed URL
      const uploadResponse = await axios.put(url, imageFile, {
        headers: {
          'Content-Type': imageFile.type,
        },
      });

      if (uploadResponse.status === 200) {
        // Step 3: Save the image URL in the backend
        await axios.post(`${API_BASE_URL}partner/partner-image-save`, {
          image_url: file_key, // This is the image URL from S3 without query parameters
          partner_id: partnerId,
        });

        setImageUrl(url.split('?')[0]);  // Remove query params from the image URL
        setLoading(false);
        alert('Image uploaded successfully!');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage('Error uploading image. Please try again.');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 ">
      <h3 className="text-xl font-semibold mb-4 text-center">Upload Shop Image</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 mb-4"
      />
      <div className="flex justify-center mb-4">
        {imageFile && (
          <img
            src={imageUrl}
            alt="Shop Preview"
            className="w-32 h-32 object-cover rounded-md"
          />
        )}
      </div>
      <button
        onClick={uploadImageToS3}
        disabled={loading}
        className={`w-full py-2 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-500'} transition`}
      >
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>
      {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}
    </div>
  );
};

export default UploadShopImage;
