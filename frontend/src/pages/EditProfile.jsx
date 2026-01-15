"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { FaUser, FaArrowLeft, FaUpload } from "react-icons/fa"

const EditProfile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    profilePic: "",
  })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        })

        setFormData({
          fullName: response.data.fullName || "",
          email: response.data.email || "",
          gender: response.data.gender || "",
          profilePic: response.data.profilePic || "",
        })

        if (response.data.profilePic) {
          setImagePreview(response.data.profilePic)
        }

        setLoading(false)
      } catch (err) {
        setError("Failed to load profile. Please try again.")
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setUpdating(true)

    try {
      // Create a FormData object if there's an image file to upload
      if (imageFile) {
        const imageData = new FormData()
        imageData.append("profileImage", imageFile)

        // Upload image first
        const imageResponse = await axios.post("http://localhost:5000/api/users/upload-profile-image", imageData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        // Update the profilePic URL in formData
        formData.profilePic = imageResponse.data.imageUrl
      }

      // Now update the user profile with all data
      await axios.put("http://localhost:5000/api/users/profile", formData, {
        withCredentials: true,
      })

      // Update localStorage with the new user data
      const storedUser = JSON.parse(localStorage.getItem("user"))
      if (storedUser) {
        const updatedUser = { ...storedUser, ...formData }
        localStorage.setItem("user", JSON.stringify(updatedUser))

        // Dispatch custom event to notify components of user state change
        window.dispatchEvent(new Event("userStateChanged"))
      }

      setSuccess("Profile updated successfully!")
      setUpdating(false)

      // Navigate back to profile after a brief delay
      setTimeout(() => {
        navigate("/profile")
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile. Please try again.")
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A0522D]"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-yellow-700 text-white p-4 md:p-6 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">Edit Profile</h1>
          <button onClick={() => navigate("/profile")} className="flex items-center text-white hover:text-gray-200">
            <FaArrowLeft className="mr-1" /> Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6">
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

          {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">{success}</div>}

          {/* Profile Image */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full mb-4 bg-gray-100 flex items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/default-avatar.png"
                  }}
                />
              ) : (
                <FaUser size={48} className="text-gray-400" />
              )}
            </div>
            <label className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center gap-2">
              <FaUpload /> Upload Photo
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updating}
              className={`px-6 py-2 bg-gradient-to-r from-purple-600 to-yellow-700 text-white rounded-md hover:opacity-90 transition ${
                updating ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {updating ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
