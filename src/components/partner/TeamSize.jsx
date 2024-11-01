import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTeamSize } from '../../Redux/slices/partnerSlice';
import { useNavigate } from 'react-router-dom';

const teamSizes = [
  { id: '0-2', label: '0-2' },
  { id: '3-5', label: '3-5' },
  { id: '6-9', label: '6-9' },
  { id: '10+', label: '10+' },
];

const TeamSize = () => {
  const dispatch = useDispatch();
  const selectedTeamSize = useSelector(state => state.partner.selectedTeamSize);

  const navigate = useNavigate();

  const handleTeamSizeSelect = (teamSizeId) => {
    dispatch(setSelectedTeamSize(teamSizeId));

    setTimeout(() => {
        navigate('/location')
    },2000)
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Team Size</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamSizes.map(teamSize => (
            <div key={teamSize.id} className="border p-4 rounded-lg cursor-pointer hover:bg-gray-200">
              <label className="flex items-center">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-indigo-600"
                  checked={selectedTeamSize === teamSize.id}
                  onChange={() => handleTeamSizeSelect(teamSize.id)}
                />
                <span className="ml-2">{teamSize.label}</span>
              </label>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => console.log('Selected Team Size:', selectedTeamSize)}
          className="w-full mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit Team Size
        </button>
      </div>
    </div>
  );
};

export default TeamSize;
