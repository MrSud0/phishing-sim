import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  validateToken,
} from "../services/api";
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mfaSecret: "",
    isMfaEnabled: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      if (!isValid) {
        console.warn("Unauthorized access - Redirecting to login.");
        navigate("/login");
      } else {
        setIsAuthenticated(true);
        fetchUsers();
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setMessage("Error fetching users.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await createUser(formData);
      setMessage("User added successfully!");
      resetForm();
      fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
      setMessage("Failed to add user.");
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      await updateUser(editingId, formData);
      setMessage("User updated successfully!");
      resetForm();
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      setMessage("Failed to update user.");
    }
  };

  const handleEdit = (user) => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      mfaSecret: user.mfaSecret,
      isMfaEnabled: user.isMfaEnabled,
    });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setMessage("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      setMessage("Failed to delete user.");
    }
  };

  const resetForm = () => {
    setFormData({ firstName: "", lastName: "", email: "", password: "", mfaSecret: "", isMfaEnabled: false });
    setEditingId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
            <p className="text-slate-800 font-medium">Verifying session...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-screen bg-opacity-35">
      <Menu />
      
      {/* Container with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Simple Header */}
        <div className="mb-6 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg backdrop-blur-sm">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-emerald-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
          </div>
          <p className="mt-2 text-slate-600 ml-11">Manage system users securely</p>
        </div>
          
          {message && (
            <div className="text-center text-lg mt-4 p-3 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
              {message}
            </div>
          )}

          {/* User Management Form */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              {editingId ? 'Edit User' : 'Add New User'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  {key === 'isMfaEnabled' ? (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name={key}
                        id={key}
                        className="w-4 h-4 text-emerald-600 bg-slate-100 border-slate-300 rounded focus:ring-emerald-500 focus:ring-2"
                        checked={formData[key]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                      />
                      <label htmlFor={key} className="ml-2 text-sm font-medium text-slate-800">
                        MFA Enabled
                      </label>
                    </div>
                  ) : (
                    <input
                      name={key}
                      type={key === "password" ? "password" : "text"}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                      className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 transition-colors w-full"
                      value={formData[key]}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4">
              {editingId ? (
                <div className="flex space-x-4">
                  <button 
                    onClick={handleUpdate} 
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-lg transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={resetForm} 
                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white p-3 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleCreate} 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-lg transition-colors duration-200"
                >
                  Add User
                </button>
              )}
            </div>
          </div>

          {/* User Table */}
          <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800">
                  <tr>
                    {["First Name", "Last Name", "Email", "Password", "MFA Secret", "MFA Enabled", "Created At", "Actions"].map((header) => (
                      <th key={header} className="px-4 py-3 text-left text-white font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 text-slate-800 border-b border-slate-200">{user.firstName}</td>
                      <td className="px-4 py-3 text-slate-800 border-b border-slate-200">{user.lastName}</td>
                      <td className="px-4 py-3 text-slate-800 border-b border-slate-200">{user.email}</td>
                      <td className="px-4 py-3 text-slate-800 border-b border-slate-200">
                        <span className="text-slate-400">••••••••</span>
                      </td>
                      <td className="px-4 py-3 text-slate-800 border-b border-slate-200">
                        <span className="text-xs bg-slate-100 px-2 py-1 rounded font-mono">
                          {user.mfaSecret ? user.mfaSecret.substring(0, 8) + '...' : 'None'}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b border-slate-200">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.isMfaEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isMfaEnabled ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-800 border-b border-slate-200">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 border-b border-slate-200">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEdit(user)} 
                            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded transition-colors duration-200"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(user.id)} 
                            className="px-3 py-1 bg-red-400 hover:bg-red-600 text-white rounded transition-colors duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserManagement;