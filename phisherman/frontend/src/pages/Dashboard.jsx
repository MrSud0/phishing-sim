import React, { useEffect, useState } from "react";
import {
  getSensitiveData,
  createSensitiveData,
  updateSensitiveData,
  deleteSensitiveData,
  validateToken,
} from "../services/api";
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function Dashboard() {
  const navigate = useNavigate();
  const [sensitiveData, setSensitiveData] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    ssn: "",
    creditCardNumber: "",
    bankAccountNumber: "",
    phoneNumber: "",
    address: "",
    email: "",
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      if (!isValid) {
        console.warn("Unauthorized access to Dashboard - Redirecting to login.");
        navigate("/login");
      } else {
        setIsAuthenticated(true);
        fetchData();
      }
    };
    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await getSensitiveData();
      setSensitiveData(response.data.data);
    } catch (err) {
      console.error("Error fetching sensitive data:", err);
      setMessage("Error fetching data.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await createSensitiveData(formData);
      setMessage("Data added successfully!");
      resetForm();
      fetchData();
    } catch (err) {
      console.error("Error creating data:", err);
      setMessage("Failed to add data.");
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      await updateSensitiveData(editingId, formData);
      setMessage("Data updated successfully!");
      resetForm();
      fetchData();
    } catch (err) {
      console.error("Error updating data:", err);
      setMessage("Failed to update data.");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      fullName: item.fullName,
      ssn: item.ssn,
      creditCardNumber: item.creditCardNumber,
      bankAccountNumber: item.bankAccountNumber,
      phoneNumber: item.phoneNumber,
      address: item.address,
      email: item.email,
      notes: item.notes,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteSensitiveData(id);
      setMessage("Data deleted successfully!");
      fetchData();
    } catch (err) {
      console.error("Error deleting data:", err);
      setMessage("Failed to delete data.");
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      ssn: "",
      creditCardNumber: "",
      bankAccountNumber: "",
      phoneNumber: "",
      address: "",
      email: "",
      notes: "",
    });
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
    <div className="min-h-screen bg-opacity-35">
      <Menu />
      
      {/* Container with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl text-center bg-white p-6 rounded-lg font-bold text-slate-800">Dashboard</h1>
          
          {message && (
            <div className="text-center text-lg mt-4 p-3 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
              {message}
            </div>
          )}

          {/* CRUD Form */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              {editingId ? 'Edit Data' : 'Add New Data'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  name={key}
                  type="text"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  className="p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800 transition-colors"
                  value={formData[key]}
                  onChange={handleInputChange}
                />
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
                  Add Data
                </button>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800">
                  <tr>
                    {["Full Name", "SSN", "Credit Card", "Bank Account", "Phone", "Address", "Email", "Notes", "Actions"].map((header) => (
                      <th key={header} className="px-4 py-3 text-left text-white font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sensitiveData.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      {Object.keys(formData).map((field) => (
                        <td key={field} className="px-4 py-3 text-slate-800 border-b border-slate-200">
                          {item[field]}
                        </td>
                      ))}
                      <td className="px-4 py-3 border-b border-slate-200">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded transition-colors duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200"
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

export default Dashboard;