import React, { useState } from 'react';
import Profile from "../assets/profile.jpg";

const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  profileImage: Profile,
  events: [
    { name: 'Uddan', date: '2024-09-12', status: 'Completed' },
    { name: 'Inforia-2k24', date: '2024-11-01', status: 'Completed' },
    { name: 'Concert', date: '2024-12-01', status: 'Completed' },
  ],
  certificates: [
    { name: 'Uddan Certificate',  link: '#' },
    { name: 'Inforia-2k24 Winner Certificate', link: '#' },
  ],
 
};

const UserDashboard = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({ ...userData });

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    setEditMode(false);
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
          <div className="flex items-center gap-6">
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-indigo-600"
            />
            <div>
              {editMode ? (
                <>
                  <input name="name" value={profile.name} onChange={handleInputChange} className="border p-1 rounded w-full mb-1" />
                  <input name="email" value={profile.email} onChange={handleInputChange} className="border p-1 rounded w-full mb-1" />
                  <input name="phone" value={profile.phone} onChange={handleInputChange} className="border p-1 rounded w-full" />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                  <p className="text-gray-600">{profile.email}</p>
                  <p className="text-gray-600">{profile.phone}</p>
                </>
              )}
            </div>
          </div>
          <div>
            {editMode ? (
              <button onClick={saveProfile} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
            ) : (
              <button onClick={() => setEditMode(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit Profile</button>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-center">
          <div className="bg-indigo-100 text-indigo-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Events</h3>
            <p className="text-3xl font-bold">{profile.events.length}</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Certificates</h3>
            <p className="text-3xl font-bold">{profile.certificates.length}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <p className="text-3xl font-bold">4</p>
          </div>
        </div>

        {/* Event History */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Events Participated </h3>
          <ul className="space-y-2">
            {profile.events.map((event, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded shadow">
                <strong>{event.name}</strong> — {event.date} <span className="text-sm text-blue-600">({event.status})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Certificates */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Certificates</h3>
          <ul className="space-y-2">
            {profile.certificates.map((cert, index) => (
              <li key={index} className="bg-green-50 p-4 rounded shadow flex justify-between items-center">
                <div>
                  <strong>{cert.name}</strong> {cert.issued}
                </div>
                <a href={cert.link} className="bg-green-600 text-white px-3 py-1 rounded">Download</a>
              </li>
            ))}
          </ul>
        </div>

        

        {/* Settings + Logout */}
        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between gap-4">
         
          <div>
            <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;