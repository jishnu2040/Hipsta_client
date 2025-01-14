import React, { useState } from 'react';
import axios from 'axios';

const UploadShopImage = ({ partnerId }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImageToS3 = async () => {
    if (!imageFile) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      // Step 1: Get the pre-signed URL from the backend
      const response = await axios.post('http://localhost:8000/api/v1/partner/get-presigned-url/', {
        file_name: `shop-images/${partnerId}/${imageFile.name}`,
        file_type: imageFile.type,
      });

      const { url, file_key } = response.data;

      // Step 2: Upload the file to S3 using the pre-signed URL
      await axios.put(url, imageFile, {
        headers: {
          'Content-Type': imageFile.type,
        },
      });

      // Step 3: The image is successfully uploaded, now store the image URL in the backend
      await axios.post('http://localhost:8000/api/v1/partner/partner-image-save', {
        image_url: file_key,  // This is the image URL from S3 without query parameters
        partner_id: partnerId,
      });

      setImageUrl(url.split('?')[0]);  // Extract the image URL without query params
      setLoading(false);
      alert('Image uploaded successfully!');
    } catch (error) {
      setLoading(false);
      setErrorMessage('Error uploading image. Please try again.');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h3>Upload Shop Image</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadImageToS3} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {imageUrl && (
        <div>
          <h4>Uploaded Image:</h4>
          <img src={imageUrl} alt="Uploaded Shop" className="w-32 h-32 object-cover" />
        </div>
      )}
    </div>
  );
};

export default UploadShopImage;
