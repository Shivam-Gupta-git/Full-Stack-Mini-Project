import React, { Suspense, lazy, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const UpdateUser = lazy(() => import("./UpdateUser"));

function Home() {
  const {
    users,
    totalUser,
    getAllUserData,
    getPaginationAPI,
    backendURL,
    loading,
    page,
    totalPage,
  } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const baseUsers = search.trim() ? totalUser : users;

  const searchedUsers = search.trim()
    ? baseUsers.filter((user) => {
        const name = user.name?.toLowerCase() || "";
        const email = user.email?.toLowerCase() || "";
        const number = user.number || "";

        return (
          name.includes(search.toLowerCase()) ||
          email.includes(search.toLowerCase()) ||
          number.includes(search)
        );
      })
    : baseUsers;

  const finalUsers = searchedUsers.filter(
    (user) => statusFilter === "All" || user.status === statusFilter
  );

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = async (id) => {
    console.log("Deleting user ID:", id);

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await axios.delete(
        `${backendURL}/api/user/deleteContacd/${id}`
      );

      console.log("Delete response:", response.data);

      if (response.data.success) {
        getPaginationAPI(page, 5);
        getAllUserData();
      }
    } catch (error) {
      console.log("Delete failed", error.response?.data || error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage your users efficiently
          </p>
        </div>
        <div className="text-gray-700 font-medium">
          Total Users:{" "}
          <span className="text-blue-600 font-bold">{totalUser.length}</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 md:p-5 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search by name, email or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full min-w-150 text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-gray-700">Name</th>
              <th className="p-4 text-gray-700">Email</th>
              <th className="p-4 text-gray-700">Phone</th>
              <th className="p-4 text-gray-700">Status</th>
              <th className="p-4 text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {finalUsers.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-500 font-medium"
                >
                  No users found
                </td>
              </tr>
            ) : (
              finalUsers.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-800">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email || "-"}</td>
                  <td className="p-4 text-gray-600">+91 {user.number}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!search && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => getPaginationAPI(page - 1, 5)}
            disabled={page === 1}
            className="px-4 py-1 bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition"
          >
            Prev
          </button>

          <span className="text-gray-700 font-medium">
            Page {page} of {totalPage}
          </span>

          <button
            onClick={() => getPaginationAPI(page + 1, 5)}
            disabled={page === totalPage}
            className="px-4 py-1 bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Update Modal */}
      {showEditModal && selectedUser && (
        <Suspense fallback={<p className="text-gray-700">Loading...</p>}>
          <UpdateUser
            closeUpdateModel={() => setShowEditModal(false)}
            selectedUser={selectedUser}
          />
        </Suspense>
      )}
    </div>
  );
}

export default Home;