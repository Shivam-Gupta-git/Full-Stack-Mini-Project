import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function AddUser({ closeModal }) {
  const { backendURL } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    status: "Active",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        alert('User is successfully Registered')
      } else {
        setErrorMessage(response.data.message || "Add User failed");
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      setErrorMessage(`⚠️ ${message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => closeModal(false)}
    >
      <div
        className="bg-white w-96 rounded-xl p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Add User</h2>

        {errorMessage && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">
            {errorMessage}
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="tel"
          name="number"
          placeholder="Phone Number"
          maxLength={10}
          value={formData.number}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        {/* Status Dropdown (Enum Safe) */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="w-full bg-amber-400 py-2 rounded font-semibold hover:bg-amber-500"
        >
          Add User
        </button>

        <button
          type="button"
          onClick={() => closeModal(false)}
          className="w-full mt-3 text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddUser;
