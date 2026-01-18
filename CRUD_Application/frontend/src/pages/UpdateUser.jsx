import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function UpdateUser({ closeUpdateModel, userToEdit, refreshUsers }) {
  const { backendURL } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    status: "Active",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name || "",
        email: userToEdit.email || "",
        number: userToEdit.number || "",
        status: userToEdit.status || "Active",
      });
    }
  }, [userToEdit]);

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
      setErrorMessage('All fields are required');
      return;
    }
  
    try {

      const res = await axios.patch(
        `${backendURL}/api/user/updatedContact/${userToEdit._id}`,
        { name, email, number, status },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (res.data.success) {
        refreshUsers();      
        closeUpdateModel();  
      } else {
        setErrorMessage(res.data.message || 'Update failed');
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || 'Something went wrong!');
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => closeUpdateModel()}
    >
      <form
        className="bg-white w-96 rounded-xl p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4 text-center">Update User</h2>

        {errorMessage && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">
            {errorMessage}
          </div>
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="User Name"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="tel"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Phone Number"
          maxLength={10}
          className="w-full mb-3 p-2 border rounded"
        />
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
          Update User
        </button>

        <button
          type="button"
          onClick={closeUpdateModel}
          className="w-full mt-3 text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;