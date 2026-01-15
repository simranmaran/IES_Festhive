
import React, { useState, useEffect } from "react";
import { FaUser, FaEdit, FaShoppingBag, FaHome, FaSignInAlt } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Simulate navigate from react-router-dom
  const navigate = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // Mock data for display purposes
        setTimeout(() => {
          setUser({
            fullName: "John Doe",
            email: "john.doe@example.com",
            gender: "male",
            createdAt: "2023-05-15T12:00:00Z",
            profilePic: null,
            orders: [
              {
                _id: "ORD12345",
                createdAt: "2024-04-10T15:30:00Z",
                total: 125.99,
                status: "Delivered"
              },
              {
                _id: "ORD12346",
                createdAt: "2024-05-01T09:15:00Z",
                total: 89.50,
                status: "Processing"
              }
            ]
          });
          setLoading(false);
        }, 1000);
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
        <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-t-2 border-b-2 border-[#A0522D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen p-4">
        <div className="text-red-500 text-lg md:text-xl mb-4 text-center">{error}</div>
        <button
          onClick={() => navigate("/")}
          className="flex items-center px-4 py-2 bg-[#A0522D] text-white rounded hover:bg-[#8B4513] transition"
        >
          <FaHome className="mr-2" /> Return Home
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen p-4">
        <div className="text-lg md:text-xl mb-4 text-center">Please log in to view your profile</div>
        <button
          onClick={() => navigate("/login")}
          className="flex items-center px-4 py-2 bg-[#A0522D] text-white rounded hover:bg-[#8B4513] transition"
        >
          <FaSignInAlt className="mr-2" /> Login
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 md:py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5A3E36] to-[#A0522D] text-white p-4 md:p-6">
          <h1 className="text-xl md:text-2xl font-bold">My Profile</h1>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Profile Image Section */}
          <div className="p-4 md:p-6 md:w-1/3 flex flex-col items-center border-b md:border-b-0 md:border-r border-gray-200">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 overflow-hidden rounded-full mb-4 bg-gray-100 flex items-center justify-center">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser size={36} className="text-gray-400" />
              )}
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-center">
              {user.fullName}
            </h2>
            <p className="text-gray-500 text-center text-sm md:text-base mb-4 break-words w-full">{user.email}</p>
            <button
              onClick={handleEditProfile}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-[#A0522D] text-white rounded-md hover:bg-[#8B4513] transition w-full text-sm md:text-base"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>

          {/* User Details Section */}
          <div className="p-4 md:p-6 md:w-2/3">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-[#5A3E36]">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-5 md:mb-6">
              <div>
                <p className="text-xs md:text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-sm md:text-base">{user.fullName}</p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500">Email</p>
                <p className="font-medium text-sm md:text-base break-words">{user.email}</p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500">Gender</p>
                <p className="font-medium text-sm md:text-base capitalize">{user.gender}</p>
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-sm md:text-base">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-[#5A3E36] flex items-center">
              <FaShoppingBag className="mr-2" /> Order History
            </h3>

            {user.orders && user.orders.length > 0 ? (
              <div className="border rounded-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {user.orders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm">
                          {order._id || `#${index + 1}`}
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm">
                          ${order.total?.toFixed(2) || "N/A"}
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap">
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
              <div className="text-center py-3 md:py-4 border rounded-md bg-gray-50">
                <p className="text-gray-500 text-sm md:text-base">No order history available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;