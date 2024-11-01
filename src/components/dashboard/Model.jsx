import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, onSave }) => {
  const [newServiceName, setNewServiceName] = useState('');

  const handleSave = () => {
    if (newServiceName) {
      onSave(newServiceName);
      setNewServiceName('');
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Service</h2>
        <input
          type="text"
          value={newServiceName}
          onChange={(e) => setNewServiceName(e.target.value)}
          placeholder="Service Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg mr-2"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
