import React from 'react';
import { FiX } from 'react-icons/fi';

const Drawer = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div
        className={`w-full md:w-[35%] bg-white h-full relative ml-auto transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <FiX size={24} />
        </button>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
