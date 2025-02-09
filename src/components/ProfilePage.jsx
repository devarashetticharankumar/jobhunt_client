import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    bio: "",
  });

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        profilePicture: user.picture || "/default-profile.jpg",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // Implement your update logic here
    console.log("Profile updated:", formData);
    setEditMode(false); // After updating, toggle back to view mode
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-4">
      <h2 className="text-2xl font-semibold mb-4">
        {editMode ? "Edit Profile" : "Profile"}
      </h2>

      {isAuthenticated ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-6 space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-medium">{formData.name}</h3>
              <p className="text-gray-500">{formData.email}</p>
            </div>
          </div>


          <form onSubmit={handleUpdateProfile}>
            <div className="space-y-4">
              <div className="form-group">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                  className="mt-1 block w-full px-4 py-2 border bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="form-group">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!editMode}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus :outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-4">
              {editMode && (
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              )}
              <button
                type="button"
                onClick={() => setEditMode(!editMode)}
                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </form>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => navigate("/my-job")}
              className="w-full px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              My Jobs
            </button>
            <button
              onClick={() => navigate("/my-blogs")}
              className="w-full px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              My Blogs
            </button>
          </div>

          <div className="mt-6">
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="w-full px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Log Out
            </button>
          </div>
        </div>
      ) : (
        <p className="flex items-center justify-center">
          You need to log in to view your profile.
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
