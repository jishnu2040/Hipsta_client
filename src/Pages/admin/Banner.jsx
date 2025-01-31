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

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const S3_BASE_URL = "https://hipsta-s3.s3.ap-south-1.amazonaws.com/";

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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  const uploadImageToS3 = async (imageFile) => {
    try {
      const response = await axios.post(`${API_BASE_URL}partner/get-presigned-url/`, {
        file_name: `banners/${imageFile.name}`,
        file_type: imageFile.type,
      });

      const { url, file_key } = response.data;

      await axios.put(url, imageFile, {
        headers: { "Content-Type": imageFile.type },
      });

      return file_key; // Return file_key to be passed as image_url
    } catch (error) {
      console.error("Error uploading image to S3:", error);
      throw new Error("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      let imageKey = null;

      if (form.image) {
        imageKey = await uploadImageToS3(form.image);
      }

      const bannerData = {
        title: form.title,
        description: form.description,
        image_url: imageKey, // Pass file_key as image_url
        start_date: form.start_date,
        end_date: form.end_date,
        is_active: form.is_active,
      };

      await axios.post(`${API_BASE_URL}core/banners/`, bannerData);
      fetchBanners();
      setForm({
        title: "",
        description: "",
        image: null,
        start_date: "",
        end_date: "",
        is_active: true,
      });

      document.querySelector('input[type="file"]').value = "";
    } catch (error) {
      console.error("Error creating banner:", error);
      setErrorMessage("Failed to create banner. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}core/banners/${id}/`);
      fetchBanners();
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

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
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Banner"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Existing Banners</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <li
            key={banner.id}
            className="p-4 bg-white shadow-md rounded-lg space-y-2"
          >
            <h3 className="text-lg font-bold">{banner.title}</h3>
            <p className="text-gray-600">{banner.description}</p>
            {banner.image_url && (
              <img
                src={`${S3_BASE_URL}${banner.image_url}`}
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
