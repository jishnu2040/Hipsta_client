import React, { useState } from "react";
import axios from "axios";
import 'font-awesome/css/font-awesome.min.css';


function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [salon, setSalon] = useState(null); // Store salon details
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // Make an API call to search for the salon by name
      axios.get(`http://127.0.0.1:8000/api/v1/partner/search/?name=${searchQuery}`)
        .then(response => {
          if (response.data) {
            setSalon(response.data);
            setShowPopup(true); // Show the popup with the result
          } else {
            alert("Salon not found!");
            setShowPopup(false);
          }
        })
        .catch(error => {
          console.error("There was an error fetching the salon!", error);
        });
    }
  };

  return (
    <div className="-screen flex  justify-center items-center bg-gradient-to-r from-teal-400 to-blue-500 p-2 rounded-xl">
      <div className="bg-white p-4 rounded-xl shadow-2xl w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-lg font-bold text-gray-800 mb-4">Find Your Favourite Salon</h1>
        <div className="flex w-full gap-2">
      <input
        type="text"
        placeholder="Search salon by name"
        className="flex-grow bg-gray-100 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button
        className="bg-blue-700 hover:bg-blue-800 transition-colors text-white font-bold px-4 py-3 rounded-lg flex items-center"
        onClick={handleSearch}
      >
        <span className="hidden md:inline">Search</span> {/* Show text only on medium screens and up */}
        <i className="fa fa-search md:hidden" aria-hidden="true"></i> {/* Show icon only on mobile screens */}
      </button>
    </div>
      </div>

      {showPopup && salon && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-12 rounded-xl shadow-2xl relative w-full max-w-3xl">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{salon.name}</h2>
            <p className="text-lg mb-4"><strong>Location:</strong> {salon.location}</p>
            <p className="text-lg mb-4"><strong>Services:</strong> {salon.services.join(", ")}</p>
            <p className="text-lg"><strong>Contact:</strong> {salon.contact}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
