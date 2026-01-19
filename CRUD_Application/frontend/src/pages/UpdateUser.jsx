import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function UpdateUser({ closeUpdateModel, selectedUser }) {
  const { backendURL,  getPaginationAPI } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    status: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        number: selectedUser.number || "",
        status: selectedUser.status || "Active",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "number" ? value.replace(/\D/g, "") : value,
    }));
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
      const res = await axios.patch(
        `${backendURL}/api/user/updatedContact/${selectedUser._id}`,
        { name, email, number, status },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        getPaginationAPI();
        closeUpdateModel();
      } else {
        setErrorMessage(res.data.message || "Update failed");
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || err.message || "Something went wrong!"
      );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeUpdateModel}
    >
      <form
        className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl transform transition-all duration-300 scale-100 hover:scale-105"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
          Update User
        </h2>

        {errorMessage && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
            {errorMessage}
          </div>
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="User Name"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
        />

        <input
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Phone Number"
          maxLength={10}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="w-full bg-amber-400 py-3 rounded-lg font-semibold text-white hover:bg-amber-500 transition"
        >
          Update User
        </button>

        <button
          type="button"
          onClick={closeUpdateModel}
          className="w-full mt-3 text-center text-gray-500 hover:text-gray-700 underline"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;