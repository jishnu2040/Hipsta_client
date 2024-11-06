import React, { useState } from 'react';
import { FaMotorcycle, FaCar, FaBus, FaTruckPickup } from 'react-icons/fa';

const vehicleTypes = [
  { id: '2', label: '0-2', icon: <FaMotorcycle className="text-blue-600 text-4xl" /> },
  { id: '4', label: '2-4', icon: <FaCar className="text-green-600 text-4xl" /> },
  { id: '6', label: '4-6', icon: <FaTruckPickup className="text-yellow-600 text-4xl" /> },
  { id: '10', label: '10+', icon: <FaBus className="text-red-600 text-4xl" /> },
];

const TeamSize = ({ nextStep, previousStep }) => {
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicle(vehicleId);
  };

  return (
    <div className=" flex items-center justify-center min-h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Tell Us About Your Vehicle</h2>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Please select the type of vehicle you have for tailored services.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicleTypes.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => handleVehicleSelect(vehicle.id)}
              className={`flex items-center justify-center border p-6 rounded-lg cursor-pointer text-lg font-medium hover:bg-indigo-100 transition duration-200 ${
                selectedVehicle === vehicle.id ? 'bg-indigo-200 border-indigo-500' : 'bg-white'
              }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={selectedVehicle === vehicle.id}
                onChange={() => handleVehicleSelect(vehicle.id)}
                aria-labelledby={`vehicle-type-${vehicle.id}`}
              />
              <div className="flex flex-col items-center">
                {vehicle.icon}
                <span id={`vehicle-type-${vehicle.id}`} className="mt-2">{vehicle.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-8">
        <button
            type="button"
            onClick={previousStep}
            className=" text-gray-800 px-6 py-2 rounded-lg font-semibold hover:text-blue-600 transition duration-200"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={nextStep}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamSize;
