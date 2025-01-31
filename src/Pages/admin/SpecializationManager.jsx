import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SpecializationManager = () => {
  const [specializations, setSpecializations] = useState([]);
  const [newSpecialization, setNewSpecialization] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSpecializations();
  }, []);

  const fetchSpecializations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}admin/specializations/`);
      setSpecializations(response.data);
    } catch (err) {
      setError('Error fetching specializations.');
    }
  };

  const addSpecialization = async () => {
    if (!newSpecialization.trim()) return;

    try {
      await axios.post(`${API_BASE_URL}admin/specializations/`, { name: newSpecialization });
      setNewSpecialization('');
      fetchSpecializations();
    } catch (err) {
      setError('Error adding specialization.');
    }
  };

  const updateSpecialization = async (id) => {
    if (!editingName.trim()) return;

    try {
      await axios.patch(`${API_BASE_URL}admin/specializations/${id}/`, { name: editingName });
      setEditingId(null);
      setEditingName('');
      fetchSpecializations();
    } catch (err) {
      setError('Error updating specialization.');
    }
  };

  const deleteSpecialization = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}admin/specializations/${id}/`);
      fetchSpecializations();
    } catch (err) {
      setError('Error deleting specialization.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Specializations</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      {/* Add Specialization */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="New Specialization"
          value={newSpecialization}
          onChange={(e) => setNewSpecialization(e.target.value)}
          className="border rounded-lg p-2 flex-1"
        />
        <button
          onClick={addSpecialization}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* Specialization List */}
      <ul className="list-disc pl-6">
        {specializations.map((specialization) => (
          <li key={specialization.id} className="flex items-center mb-2">
            {editingId === specialization.id ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="border rounded-lg p-2 flex-1"
                />
                <button
                  onClick={() => updateSpecialization(specialization.id)}
                  className="ml-2 bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{specialization.name}</span>
                <button
                  onClick={() => {
                    setEditingId(specialization.id);
                    setEditingName(specialization.name);
                  }}
                  className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSpecialization(specialization.id)}
                  className="ml-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecializationManager;
