// import React, { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import MyJobs from "../Pages/MyJobs";

// const ProfilePage = () => {
//   const { user, isAuthenticated, isLoading, logout } = useAuth0();
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     profilePicture: user?.picture || "",
//     bio: user?.bio || "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdateProfile = (e) => {
//     e.preventDefault();
//     // Update user profile logic, if any (e.g., save to Auth0 user metadata or a backend)
//     setEditMode(false); // After updating, toggle back to view mode
//   };

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
//       <h2 className="text-2xl font-semibold mb-4">
//         {editMode ? "Edit Profile" : "Profile"}
//       </h2>

//       {isAuthenticated ? (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center mb-6">
//             <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
//               <img
//                 src={formData.profilePicture || "/default-profile.jpg"}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div>
//               <h3 className="text-xl font-medium">{formData.name}</h3>
//               <p className="text-gray-500">{formData.email}</p>
//             </div>
//           </div>

//           <form onSubmit={handleUpdateProfile}>
//             <div className="space-y-4">
//               <div className="form-group">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   disabled={!editMode}
//                   className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div className="form-group">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   disabled
//                   className="mt-1 block w-full px-4 py-2 border bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div className="form-group">
//                 <label
//                   htmlFor="bio"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Bio
//                 </label>
//                 <textarea
//                   id="bio"
//                   name="bio"
//                   value={formData.bio}
//                   onChange={handleInputChange}
//                   disabled={!editMode}
//                   className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             </div>

//             <div className="mt-4 flex items-center space-x-4">
//               {editMode && (
//                 <button
//                   type="submit"
//                   className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   Save Changes
//                 </button>
//               )}
//               <button
//                 type="button"
//                 onClick={() => setEditMode(!editMode)}
//                 className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
//               >
//                 {editMode ? "Cancel" : "Edit Profile"}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <button
//               onClick={() => logout({ returnTo: window.location.origin })}
//               className="w-full px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
//             >
//               Log Out
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p>You need to log in to view your profile.</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineWorkOutline, MdOutlineArticle, MdLogout, MdEdit, MdSave, MdCancel, MdPerson, MdEmail, MdDescription, MdAssignment } from "react-icons/md";

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    bio: "",
  });

  const navigate = useNavigate();

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
    console.log("Profile updated:", formData);
    setEditMode(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Profile Access</h2>
        <p className="text-gray-600 text-lg mb-8">Please log in to view and manage your profile.</p>
        <button
          onClick={() => logout({ returnTo: window.location.origin })} // Actually this should be login logic, but let's assume redirect
          className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-colors"
      >
        {/* Banner Section */}
        <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition text-sm font-medium"
            >
              <MdLogout className="text-lg" /> Logout
            </button>
          </div>
        </div>

        <div className="px-8 pb-8">
          {/* Header Section (Avatar & Actions) */}
          <div className="relative flex flex-col sm:flex-row items-end -mt-16 sm:-mt-20 mb-6 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-gray-800 shadow-lg overflow-hidden bg-gray-200 z-10"
            >
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="flex-1 sm:mb-4 text-center sm:text-left z-0 mt-4 sm:mt-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{formData.name}</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium">{formData.email}</p>
            </div>

            <div className="mb-4 z-10">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold shadow-md transition-all ${editMode
                  ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/40 dark:text-red-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                {editMode ? (
                  <><MdCancel /> Cancel</>
                ) : (
                  <><MdEdit /> Edit Profile</>
                )}
              </button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Personal Info Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-600">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                  <MdPerson className="text-blue-600 dark:text-blue-400" /> Personal Details
                </h3>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                      <div className="relative">
                        <MdPerson className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!editMode}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${editMode ? 'border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white ring-2 ring-transparent focus:ring-blue-500' : 'border-transparent bg-transparent dark:text-gray-300'} transition-all outline-none`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                      <div className="relative">
                        <MdEmail className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          disabled
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-transparent bg-transparent text-gray-500 dark:text-gray-400 cursor-not-allowed outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                    <div className="relative">
                      <MdDescription className="absolute left-3 top-3 text-gray-400" />
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        rows="4"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${editMode ? 'border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white ring-2 ring-transparent focus:ring-blue-500' : 'border-transparent bg-transparent dark:text-gray-300'} transition-all outline-none resize-none`}
                        placeholder="Tell us a little about yourself..."
                      />
                    </div>
                  </div>

                  {editMode && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex justify-end pt-2"
                    >
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-2.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition shadow-lg"
                      >
                        <MdSave /> Save Changes
                      </button>
                    </motion.div>
                  )}
                </form>
              </div>
            </div>

            {/* Right Column: Dashboard Actions */}
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-gray-700/50 p-6 rounded-2xl border border-blue-100 dark:border-gray-600">
                <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-4">Dashboard</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/my-applications")}
                    className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all group border border-transparent dark:border-gray-600"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-800 dark:text-gray-200 group-hover:text-white">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition">
                        <MdAssignment />
                      </div>
                      My Applications
                    </div>
                    <span className="text-gray-400 group-hover:text-indigo-200">→</span>
                  </button>

                  <button
                    onClick={() => navigate("/my-job")}
                    className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all group border border-transparent dark:border-gray-600"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-800 dark:text-gray-200 group-hover:text-white">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition">
                        <MdOutlineWorkOutline />
                      </div>
                      My Jobs
                    </div>
                    <span className="text-gray-400 group-hover:text-blue-200">→</span>
                  </button>

                  <button
                    onClick={() => navigate("/my-blogs")}
                    className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md hover:purple-600 dark:hover:bg-purple-600 hover:text-white transition-all group border border-transparent dark:border-gray-600"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-800 dark:text-gray-200 group-hover:text-white">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition">
                        <MdOutlineArticle />
                      </div>
                      My Blogs
                    </div>
                    <span className="text-gray-400 group-hover:text-purple-200">→</span>
                  </button>

                  {/* Add more quick actions if needed (e.g., Post Job) */}
                  <button
                    onClick={() => navigate("/post-job")}
                    className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md hover:bg-green-600 dark:hover:bg-green-600 hover:text-white transition-all group border border-transparent dark:border-gray-600"
                  >
                    <div className="flex items-center gap-3 font-semibold text-gray-800 dark:text-gray-200 group-hover:text-white">
                      <div className="p-2 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-lg group-hover:bg-green-500 group-hover:text-white transition">
                        <span className="text-lg font-bold">+</span>
                      </div>
                      Post New Job
                    </div>
                    <span className="text-gray-400 group-hover:text-green-200">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default ProfilePage;
