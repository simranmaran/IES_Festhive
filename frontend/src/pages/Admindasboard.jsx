"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { FiUsers, FiBox, FiPlusCircle, FiMail, FiSearch, FiShoppingCart, FiMenu, FiX, FiLogOut } from "react-icons/fi"
import Chart from "react-apexcharts"
import Dashboard from "./Dashboard"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [contacts, setContacts] = useState([])
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    fetchUsers()
    fetchContacts()
    fetchProducts()

    // Check screen size
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup event listener
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users")
      setUsers(Array.isArray(res.data) ? res.data : [])
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/contacts", {
        withCredentials: true,
      })
      setContacts(Array.isArray(res.data) ? res.data : [])
    } catch (error) {
      console.error("Error fetching contacts:", error)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/admin/products")
      setProducts(Array.isArray(res.data) ? res.data : [])
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message)
    }
  }

  const handleLogout = () => {
    // Clear any authentication tokens
    localStorage.removeItem("token")
    // Redirect to home page
    navigate("/")
  }

  const filteredUsers = users.filter(
    (user) =>
      (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const salesData = {
    options: {
      chart: { id: "sales-chart" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
    series: [{ name: "Sales", data: [30, 40, 45, 50, 49, 60] }],
  }

  const SidebarContent = () => (
    <motion.aside
      className={`w-64 bg-white shadow-lg p-5 flex flex-col items-center rounded-r-2xl 
      ${isSmallScreen ? "fixed inset-y-0 left-0 z-50" : "block"}
      ${isSmallScreen && !isSidebarOpen ? "-translate-x-full" : "translate-x-0"}
      transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center mb-6 w-full">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        {isSmallScreen && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Close sidebar"
          >
            <FiX size={24} />
          </button>
        )}
      </div>
      <div className="space-y-4 w-full">
        {[
          { name: "Dashboard", icon: <FiBox />, tab: "dashboard" },
          { name: "Events", icon: <FiPlusCircle />, tab: "events" },
          { name: "View Users", icon: <FiUsers />, tab: "users" },
          { name: "Contact Messages", icon: <FiMail />, tab: "contacts" },
        ].map(({ name, icon, tab }) => (
          <button
            key={tab}
            className={`w-full flex items-center space-x-3 py-3 px-5 rounded-lg text-lg ${
              activeTab === tab ? "bg-[#A0522D] text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => {
              setActiveTab(tab)
              if (isSmallScreen) setIsSidebarOpen(false)
            }}
          >
            {icon} <span>{name}</span>
          </button>
        ))}
      </div>
    </motion.aside>
  )

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-40 flex justify-between items-center p-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-600 hover:text-gray-900"
          aria-label="Open sidebar"
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-red-600 hover:text-red-800" aria-label="Logout">
          <FiLogOut size={24} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      {!isSmallScreen && <SidebarContent />}

      {/* Mobile Sidebar */}
      {isSmallScreen && isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}>
          <SidebarContent />
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 p-4 md:p-8 ${isSmallScreen ? "mt-16" : ""}`}>
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="hidden md:flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  <FiLogOut /> <span>Logout</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                <div className="p-4 md:p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
                  <FiUsers size={40} className="text-blue-500" />
                  <h2 className="text-xl md:text-2xl font-bold mt-2">{users.length}</h2>
                  <p className="text-gray-500">Total Users</p>
                </div>
                <div className="p-4 md:p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
                  <FiShoppingCart size={40} className="text-green-500" />
                  <h2 className="text-xl md:text-2xl font-bold mt-2">{products.length}</h2>
                  <p className="text-gray-500">Total Products</p>
                </div>
                <div className="p-4 md:p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
                  <FiMail size={40} className="text-red-500" />
                  <h2 className="text-xl md:text-2xl font-bold mt-2">{contacts.length}</h2>
                  <p className="text-gray-500">Total Contact Messages</p>
                </div>
              </div>
              <div className="p-4 md:p-6 bg-white shadow-lg rounded-lg">
                <Chart options={salesData.options} series={salesData.series} type="line" height={300} />
              </div>
            </motion.div>
          )}

          {activeTab === "users" && (
            <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">User List</h1>
              <div className="mb-4 flex items-center">
                <input
                  type="text"
                  placeholder="Search by name or email"
                  className="p-2 border rounded-lg w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="ml-2 text-gray-500" size={24} />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-lg rounded-lg p-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Joined On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="border-b">
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "contacts" && (
            <motion.div key="contacts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">Contact Messages</h1>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-lg rounded-lg p-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id} className="border-b">
                        <td className="p-3">{contact.email}</td>
                        <td className="p-3">{contact.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "events" && (
            <motion.div key="events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Dashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AdminDashboard
