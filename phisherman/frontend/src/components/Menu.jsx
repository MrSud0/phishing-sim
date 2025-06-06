import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";

function Menu() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logging out...");

    try {
      const token = localStorage.getItem("authToken");
      console.log("Token:", token);
      if (token) {
        await logoutUser(token); 
      }
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 text-white shadow-md">
      {/* Container that matches the page containers */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo/Brand section (optional) */}
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-emerald-400">Phishing Simulator</h2>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-1">
              <button 
                onClick={() => navigate("/dashboard")} 
                className="text-white hover:text-emerald-400 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-slate-700 border border-slate-600 font-medium text-lg"
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate("/users")} 
                className="text-white hover:text-emerald-400 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-slate-700 border border-slate-600 font-medium text-lg"
              >
                User Management
              </button>
              <button 
                onClick={() => navigate("/phishing")} 
                className="text-white hover:text-emerald-400 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-slate-700 border border-slate-600 font-medium text-lg"
              >
                Phishing Simulation
              </button>
            </div>

            {/* Logout section */}
            <div>
              <button 
                onClick={handleLogout} 
                className="text-white hover:text-red-400 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-slate-700 font-medium text-lg border border-slate-600 hover:border-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;