import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEdit, FaShoppingBag } from "react-icons/fa";


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/users/profile`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile. Please try again.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A0522D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-[#A0522D] text-white rounded hover:bg-[#8B4513]"
        >
          Return Home
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-xl mb-4">Please log in to view your profile</div>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-[#A0522D] text-white rounded hover:bg-[#8B4513]"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-[#5A3E36] to-[#A0522D] text-white p-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Profile Image Section */}
          <div className="p-6 md:w-1/3 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200">
            <div className="relative w-32 h-32 overflow-hidden rounded-full mb-4 bg-gray-100 flex items-center justify-center">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
              ) : (
                <FaUser size={48} className="text-gray-400" />
              )}
            </div>
            <h2 className="text-xl font-semibold text-center">
              {user.fullName}
            </h2>
            <p className="text-gray-500 text-center mb-4">{user.email}</p>
            <button
              onClick={handleEditProfile}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#A0522D] text-white rounded-md hover:bg-[#8B4513] transition w-full"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>

          {/* User Details Section */}
          <div className="p-6 md:w-2/3">
            <h3 className="text-lg font-semibold mb-4 text-[#5A3E36]">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium capitalize">{user.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-[#5A3E36] flex items-center">
              <FaShoppingBag className="mr-2" /> Order History
            </h3>

            {user.orders && user.orders.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {user.orders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order._id || `#${index + 1}`}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${order.total?.toFixed(2) || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status || "Processing"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 border rounded-md bg-gray-50">
                <p className="text-gray-500">No order history available</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UserProfile;
