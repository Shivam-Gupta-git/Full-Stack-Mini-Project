import { useState } from "react";
import AddUser from "../pages/AddUser";

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  // console.log(showLogin)
  return (
    <>
    
    <div className="w-full h-20 bg-amber-400 flex items-center px-6 shadow-md sticky top-0">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center">
        <h1 className="text-xl font-bold text-gray-900">User Management</h1>
        <p className="text-sm text-gray-700">MERN Stack Application</p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex justify-end items-center">
        <button
          className="bg-black text-white px-5 py-2 rounded-lg 
                     hover:bg-gray-800 transition duration-200 shadow"
                     onClick={() => setShowLogin(true)}
        >
          + Add User
        </button>
      </div>
    </div>

    {
      showLogin && <AddUser closeModal={() => setShowLogin(false)}/>
    }
    </>
  );
}

export default Header;
