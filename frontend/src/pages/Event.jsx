"use client"

import { useState } from "react"
import axios from "../api/axios"
import { useNavigate } from "react-router-dom"

const AddEvent = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append("image", image)

    try {
      const response = await axios.post("http://localhost:5000/api/events/upload-event-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data.imageUrl
    } catch (err) {
      console.error("Image upload failed:", err)
      alert("Image upload failed")
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    let imageUrl = ""
    if (image) {
      imageUrl = await uploadImage()
      if (!imageUrl) {
        setIsLoading(false)
        return
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events/create",
        {
          title,
          description,
          date,
          location,
          image: imageUrl,
        },
        { withCredentials: true },
      )

      alert(response.data.message || "Event created!")
      navigate("/api/events") // redirect to event listing page
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || "Failed to create event")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-gray-800">Add New Event</h2>

        {previewImage && (
          <div className="mb-4">
            <img
              src={previewImage || "/placeholder.svg"}
              alt="Preview"
              className="rounded-md w-full max-h-60 object-cover"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded focus:ring focus:ring-orange-500"
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:ring focus:ring-orange-500"
              rows={4}
              placeholder="Event description"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded focus:ring focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:ring focus:ring-orange-500"
              placeholder="Event location"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Event Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full border px-3 py-2 rounded focus:ring focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded text-white ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-700 hover:bg-orange-600"
            }`}
          >
            {isLoading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddEvent
