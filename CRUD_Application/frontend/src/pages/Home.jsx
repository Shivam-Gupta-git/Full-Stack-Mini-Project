import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import UpdateUser from "./UpdateUser";

function Home() {
  const { users, getAllUserData } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const filteredUsers = users.filter((user) => {
    const name = user.name?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";
    const number = user.number || "";

    const matchSearch =
      name.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase()) ||
      number.includes(search);

    const matchStatus = statusFilter === "All" || user.status === statusFilter;

    return matchSearch && matchStatus;
  });


  const handleEditClick = (user) => {
    setSelectedUser(user);     
    setShowEditModal(true);    
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-semibold text-gray-800 mb-2">User Dashboard</h1>
      <p className="text-sm text-gray-500 mb-4">Manage your users efficiently</p>


      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, email or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 border rounded-md focus:outline-none"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-10 text-center">
          <p className="text-gray-500">No users found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="p-3 text-left font-medium">Name</th>
                <th className="p-3 text-left font-medium">Email</th>
                <th className="p-3 text-left font-medium">Phone</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3 text-gray-600">{user.email || "—"}</td>
                  <td className="p-3 text-gray-600">{user.number}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button className="text-sm text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showEditModal && selectedUser && (
        <UpdateUser
          closeUpdateModel={() => setShowEditModal(false)}
          userToEdit={selectedUser}
          refreshUsers={getAllUserData}
        />
      )}
    </div>
  );
}

export default Home;