import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function AddUser({ closeModal }) {
  const { backendURL, getAllUserData } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    status: "Active",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, number, status } = formData;

    if (!name || !email || !number) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${backendURL}/api/user/addContact`,
        { name, email, number, status },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        closeModal(false);
        getAllUserData();
        alert("✅ User successfully added");
      } else {
        setErrorMessage(response.data.message || "Add User failed");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || error.message || "Something went wrong!"
      );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
      onClick={() => closeModal(false)}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative  transform transition-all duration-300 scale-100 hover:scale-105"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New User
        </h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="tel"
            name="number"
            placeholder="Phone Number"
            maxLength={10}
            value={formData.number}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-white rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Add User
          </button>

          <button
            type="button"
            onClick={() => closeModal(false)}
            className="w-full py-2 text-gray-500 hover:text-gray-700 hover:underline transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;