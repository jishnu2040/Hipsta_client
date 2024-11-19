import React, { useState } from "react";
import axios from "axios";
import 'font-awesome/css/font-awesome.min.css';

const SearchForm = ({ onSearch }) => {
  const [searchQueryName, setSearchQueryName] = useState("");
  const [searchQueryLocation, setSearchQueryLocation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ name: searchQueryName, location: searchQueryLocation });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 w-full">
      {/* Salon Name Search */}
      <div className="w-full md:w-1/2">
        <input
          id="salon-name"
          type="text"
          placeholder="Search services"
          value={searchQueryName}
          onChange={(e) => setSearchQueryName(e.target.value)}
          className="w-full bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
        />
      </div>

      {/* Location Search */}
      <div className="w-full md:w-1/2">
        <input
          id="salon-location"
          type="text"
          placeholder="Search by location"
          value={searchQueryLocation}
          onChange={(e) => setSearchQueryLocation(e.target.value)}
          className="w-full bg-white border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
        />
      </div>
    </form>
  );
};

const SearchResultPopup = ({ salon, onClose }) => {
  if (!salon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl relative w-full max-w-3xl">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{salon.name}</h2>
        <p className="text-lg mb-4"><strong>Location:</strong> {salon.location}</p>
        <p className="text-lg mb-4"><strong>Services:</strong> {salon.services.join(", ")}</p>
        <p className="text-lg"><strong>Contact:</strong> {salon.contact}</p>
      </div>
    </div>
  );
};

function Search() {
  const [salon, setSalon] = useState(null);

  const handleSearch = async ({ name, location }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/partner/search/?name=${name}&location=${location}`);
      if (response.data) {
        setSalon(response.data);
      } else {
        alert("Salon not found!");
      }
    } catch (error) {
      console.error("There was an error fetching the salon!", error);
    }
  };

  return (
    <div className="bg-gray-100 rounded-xl w-full max-w-4xl mx-auto p-8 mt-2">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Find the Perfect Experience</h1>
      <SearchForm onSearch={handleSearch} />
      <button
        type="submit"
        className="mt-6  bg-gray-800 hover:bg-blue-800 transition-colors text-white font-bold px-6 py-2 rounded-lg w-full md:w-auto"
      >
        <i className="fa fa-search mr-2"></i> Search
      </button>
      <SearchResultPopup salon={salon} onClose={() => setSalon(null)} />
    </div>
  );
}

export default Search;
