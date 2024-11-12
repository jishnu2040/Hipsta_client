import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ nextStep, previousStep }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/partner/get-presigned-url/', {
        file_name: file.name,
        file_type: file.type,
      });
  
      const { url, file_key } = response.data;
  
      if (!url || !file_key) {
        throw new Error('No URL or file key received from the backend');
      }
  
      console.log("File upload URL:", url);
      console.log("File key:", file_key);
  
      const uploadResponse = await axios.put(url, file, {
        headers: {
          'Content-Type': file.type, // Ensure the Content-Type is the file's MIME type
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });
  
      if (uploadResponse.status === 200) {
        localStorage.setItem('uploadedFileKey', file_key);
        setUploadStatus("File uploaded successfully!");
        setProgress(100);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to upload file.");
      setProgress(0);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Upload License Certificate</h2>

        <div className="mb-6">
          <label htmlFor="fileInput" className="block text-lg text-gray-600 mb-2">Choose a file to upload</label>
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-50">
            <input
              type="file"
              onChange={handleFileChange}
              id="fileInput"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex items-center justify-center h-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903 5 5 0 111.602 6.997L15.07 25.931A9 9 0 1012.928 16z" />
              </svg>
              <span className="ml-2 text-gray-600">Drag & Drop or Click</span>
            </div>
          </div>

          {file && (
            <p className="mt-2 text-sm text-gray-500">{file.name}</p>
          )}
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          Upload File
        </button>

        {progress > 0 && progress < 100 && (
          <div className="mt-4">
            <progress className="w-full h-2 bg-gray-200 appearance-none progress-bar" max="100" value={progress}></progress>
            <span className="sr-only">{progress}% complete</span>
          </div>
        )}

        {uploadStatus && (
          <p className="mt-4 text-center text-green-600">{uploadStatus}</p>
        )}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={previousStep}
            className="text-gray-800 px-6 py-2 rounded-lg font-semibold hover:text-blue-600 transition duration-200"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
