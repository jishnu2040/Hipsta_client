import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({nextStep, previousStep}) => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }
    
        try {
            // Step 1: Get pre-signed URL and file key from the backend
            const response = await axios.post('http://127.0.0.1:8000/api/v1/partner/get-presigned-url/', {
                file_name: file.name,
                file_type: file.type,
            });
    
            const { url, file_key } = response.data;  // file_key is now included
    
            if (!url || !file_key) {
                throw new Error('No URL or file key received from the backend');
            }
    
            console.log("File upload URL:", url);
            console.log("File key:", file_key);
    
            // Step 2: Upload the file to S3 using the pre-signed URL
            const uploadResponse = await axios.put(url, file, {
                headers: {
                    'Content-Type': file.type,
                },
            });
    
            if (uploadResponse.status === 200) {
                // Store the S3 file key in local storage for future reference
                localStorage.setItem('uploadedFileKey', file_key);
                setUploadStatus("File uploaded successfully!");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("Failed to upload file.");
        }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-50">
            <div className="bg-white p-12 rounded-xl shadow-2xl max-w-3xl w-full">
                <h2 className="text-3xl font-semibold text-gray-600 mb-8 text-center">Choose your license certificate image</h2>

                <div className="mb-6">
                <label className="block text-lg text-gray-600 mb-2">Choose a file to upload</label>
                <div className="flex justify-center">
                    <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileInput"
                    />
                    <label
                    htmlFor="fileInput"
                    className="cursor-pointer w-32 h-32 text-gray-500 text-2xl flex justify-center items-center rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    >
                    <span className="material-icons">upload</span>
                    </label>
                </div>
                </div>

                {file && (
                <div className="text-center mb-6">
                    <p className="text-lg text-gray-700">Selected file: {file.name}</p>
                </div>
                )}

                <div className="flex justify-center mb-6">
                <button
                    onClick={handleUpload}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                    Upload File
                </button>
                </div>

                {uploadStatus && (
                <div className="mb-6 text-center">
                    <p className="text-lg text-green-600">{uploadStatus}</p>
                </div>
                )}

                <div className="flex justify-between mt-8">
                <button
                    type="button"
                    onClick={previousStep}
                    className="text-gray-800 px-6 py-2 rounded-lg font-semibold hover:text-blue-600 focus:outline-none transition duration-200"
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={nextStep}
                    className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 focus:outline-none transition duration-200"
                >
                    Next
                </button>
                </div>
            </div>
        </div>

      
    );
};

export default FileUpload;
