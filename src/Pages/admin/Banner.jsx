import React, { useState, useEffect } from "react";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    start_date: "",
    end_date: "",
    is_active: true,
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

  // Fetch all banners
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}core/banners/`);
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value);
      }
    });

    try {
      await axios.post(`${API_BASE_URL}core/banners/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchBanners();
      setForm({
        title: "",
        description: "",
        image: null,
        start_date: "",
        end_date: "",
        is_active: true,
      });
      document.querySelector('input[type="file"]').value = ""; // Reset file input
    } catch (error) {
      console.error("Error creating banner:", error.response?.data || error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}core/banners/${id}/`);
      fetchBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  // Toggle active status
  const toggleActive = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}core/banners/${id}/toggle_active/`);
      fetchBanners();
    } catch (error) {
      console.error("Error toggling active status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Banners</h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow-md rounded-lg mb-8 space-y-4"
      >
        <h2 className="text-xl font-semibold">Add a New Banner</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
            required
          />
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border border-gray-300 rounded-lg p-2 w-full"
          required
        ></textarea>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="datetime-local"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <input
            type="datetime-local"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="is_active" className="text-gray-600">
            Active:
          </label>
          <input
            type="checkbox"
            name="is_active"
            checked={form.is_active}
            onChange={handleChange}
            id="is_active"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add Banner
        </button>
      </form>

      {/* Banner List Section */}
      <h2 className="text-xl font-semibold mb-4">Existing Banners</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <li
            key={banner.id}
            className="p-4 bg-white shadow-md rounded-lg space-y-2"
          >
            <h3 className="text-lg font-bold">{banner.title}</h3>
            <p className="text-gray-600">{banner.description}</p>
            {banner.image && (
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-40 object-cover rounded-md"
              />
            )}
            <p className="text-sm">
              <strong>Start Date:</strong>{" "}
              {new Date(banner.start_date).toLocaleString()}
            </p>
            <p className="text-sm">
              <strong>End Date:</strong>{" "}
              {new Date(banner.end_date).toLocaleString()}
            </p>
            <p className="text-sm">
              <strong>Active:</strong> {banner.is_active ? "Yes" : "No"}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleActive(banner.id)}
                className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600"
              >
                Toggle Active
              </button>
              <button
                onClick={() => handleDelete(banner.id)}
                className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Banner;
