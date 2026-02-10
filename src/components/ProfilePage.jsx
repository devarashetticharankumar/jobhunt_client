import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  MdOutlineWorkOutline, MdOutlineArticle, MdLogout, MdEdit, MdSave, MdCancel,
  MdPerson, MdEmail, MdDescription, MdAssignment, MdVerified, MdAnalytics, MdRocketLaunch,
  MdAddCircleOutline, MdPostAdd, MdSettings, MdDashboard
} from "react-icons/md";
import { FaCheckCircle, FaStar, FaLightbulb, FaTools } from "react-icons/fa";
import InArticleAd from "../components/InArticleAd";
import InFeedAd from "../components/InFeedAd";
import SkeletonLoading from "./SkeletonLoading";

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const isAdmin = user?.email === "jobhunt2580@gmail.com";
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
        bio: user.bio || "Crafting a professional journey with passion and purpose.",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // Simulate API call
    console.log("Profile updated:", formData);
    setEditMode(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F9FA]">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
        <div className="max-w-md w-full text-center p-12 bg-white rounded-[40px] shadow-2xl border border-gray-100">
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <MdPerson className="text-5xl" />
          </div>
          <h2 className="text-3xl font-black text-[#091e42] mb-4">Member Access</h2>
          <p className="text-gray-500 font-medium mb-10 leading-relaxed">Join JobNirvana to unlock your personalized career dashboard and track your success.</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-4 bg-[#091e42] text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      <Helmet>
        <title>{formData.name} | Professional Profile | JobNirvana</title>
        <meta name="description" content="Manage your professional profile, track applications, and optimize your carrier on JobNirvana." />
      </Helmet>

      {/* ULTRA-PREMIUM BANNER HEADER */}
      <div className="relative h-64 lg:h-80 bg-gradient-to-br from-[#091e42] via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[120px] -mr-48 -mt-48 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[100px] -ml-24 -mb-24"></div>
        </div>

        <div className="max-w-[1240px] mx-auto px-6 h-full relative flex items-end pb-12 lg:pb-16">
          <div className="absolute top-6 right-6 flex gap-4">
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-full hover:bg-red-500/80 transition-all text-xs font-black uppercase tracking-widest shadow-lg"
            >
              <MdLogout className="text-lg" /> Logout
            </button>
          </div>

          {/* Profile Avatar Overlay */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 w-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative group"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] border-8 border-white shadow-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                <img src={formData.profilePicture} alt="User avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                {editMode && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-black uppercase tracking-widest">Change</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 border-4 border-white rounded-full flex items-center justify-center shadow-lg text-white" title="Verified Professional">
                <MdVerified />
              </div>
            </motion.div>

            <div className="flex-1 text-center md:text-left text-white mb-2">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 drop-shadow-md">
                {formData.name}
              </h1>
              <p className="text-blue-100/70 font-bold flex items-center justify-center md:justify-start gap-2">
                <MdEmail className="text-blue-300" /> {formData.email}
              </p>
            </div>

            <div className="mb-2">
              <button
                onClick={() => setEditMode(!editMode)}
                className={`flex items-center gap-3 px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95 ${editMode
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-white text-[#091e42] hover:bg-blue-50"
                  }`}
              >
                {editMode ? <><MdCancel /> Cancel</> : <><MdEdit /> Edit Profile</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 mt-12">
        <div className="lg:grid lg:grid-cols-12 gap-8 items-start">

          {/* MAIN CONTENT (66%) */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            {/* Dynamic Intro Card */}
            <motion.div
              layout
              className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <MdDescription className="text-[120px] text-[#091e42]" />
              </div>

              <h3 className="text-xl font-black text-[#091e42] mb-6 flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><MdPerson /></div>
                Professional Summary
              </h3>

              <AnimatePresence mode="wait">
                {editMode ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none font-bold transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Job Category</label>
                        <select className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 outline-none font-bold">
                          <option>Full Stack Developer</option>
                          <option>UI/UX Designer</option>
                          <option>Product Manager</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Short Bio</label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none font-bold transition-all resize-none"
                      />
                    </div>
                    <div className="flex justify-end pt-4">
                      <button
                        onClick={handleUpdateProfile}
                        className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-3"
                      >
                        <MdSave /> Save Changes
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-gray-600 font-medium leading-[1.8] text-lg">
                      {formData.bio}
                    </p>

                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="p-6 bg-[#F8F9FA] rounded-[32px] text-center">
                        <h4 className="text-2xl font-black text-[#091e42]">12</h4>
                        <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Active Apps</span>
                      </div>
                      <div className="p-6 bg-blue-50/50 rounded-[32px] text-center">
                        <h4 className="text-2xl font-black text-blue-600">85%</h4>
                        <span className="text-[9px] font-extrabold text-blue-400 uppercase tracking-widest">Profile Score</span>
                      </div>
                      <div className="p-6 bg-[#F8F9FA] rounded-[32px] text-center">
                        <h4 className="text-2xl font-black text-[#091e42]">24</h4>
                        <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest">Shortlists</span>
                      </div>
                      <div className="p-6 bg-green-50 text-green-700 rounded-[32px] text-center">
                        <h4 className="text-2xl font-black">2</h4>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest">Offers</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* In-Feed Mid Page Ad */}
            <div className="bg-white rounded-[40px] p-4 border border-dashed border-gray-200">
              <InFeedAd />
            </div>

            {/* Quick Actions / Link Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#091e42] text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <MdAssignment className="text-5xl text-blue-400 mb-8" />
                <h3 className="text-2xl font-black mb-4">Track Applications</h3>
                <p className="text-blue-100/70 text-sm font-medium mb-10 leading-relaxed">View all your job submissions and their current real-time status.</p>
                <button
                  onClick={() => navigate("/my-applications")}
                  className="w-full py-4 bg-white text-[#091e42] font-black rounded-2xl hover:bg-blue-50 transition-all shadow-lg"
                >
                  View Status Board
                </button>
              </div>

              <div className="bg-blue-600 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <MdOutlineWorkOutline className="text-5xl text-blue-200 mb-8" />
                <h3 className="text-2xl font-black mb-4">Saved Opportunities</h3>
                <p className="text-blue-100/70 text-sm font-medium mb-10 leading-relaxed">You have 15 unsaved jobs in your search history. Don't miss out!</p>
                <button
                  onClick={() => navigate("/jobs")}
                  className="w-full py-4 bg-[#091e42] text-white font-black rounded-2xl hover:bg-black transition-all shadow-lg"
                >
                  Explore Jobs
                </button>
              </div>
            </div>

            {/* ADMIN CONTROL CENTER - ONLY FOR ADMIN */}
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[40px] p-10 shadow-xl border-2 border-blue-50 relative overflow-hidden mt-8"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-[#091e42] flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                      <FaTools />
                    </div>
                    Admin Control Center
                  </h3>
                  <span className="px-4 py-1.5 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                    Authorized Access
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Post New Job", link: "/post-job", icon: <MdPostAdd />, color: "bg-blue-600", desc: "Create new listings" },
                    { label: "Create Blog Post", link: "/create-blog", icon: <MdOutlineArticle />, color: "bg-indigo-600", desc: "Write new articles" },
                    { label: "Manage Jobs", link: "/my-job", icon: <MdOutlineWorkOutline />, color: "bg-[#091e42]", desc: "Edit/Delete existing jobs" },
                    { label: "Manage Blogs", link: "/my-blogs", icon: <MdSettings />, color: "bg-gray-800", desc: "Update existing blogs" },
                    { label: "Aggregator Hub", link: "/admin/aggregator", icon: <MdDashboard />, color: "bg-green-600", desc: "Manage Automated Feeds" }
                  ].map((action, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(action.link)}
                      className="group flex items-center gap-5 p-5 bg-[#F8F9FA] hover:bg-white hover:shadow-2xl hover:shadow-gray-200 rounded-3xl transition-all border border-transparent hover:border-gray-100 text-left"
                    >
                      <div className={`w-14 h-14 ${action.color} text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-transform group-hover:scale-110`}>
                        {action.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-[#091e42] text-sm mb-0.5">{action.label}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{action.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

          </div>

          {/* SIDEBAR (33%) */}
          <div className="col-span-12 lg:col-span-4 space-y-8 sticky top-28">

            {/* Career Readiness Score */}
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8 flex items-center justify-between">
                Job Readiness <MdAnalytics className="text-lg text-blue-600" />
              </h4>

              <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" className="stroke-current text-gray-100" strokeWidth="12" fill="transparent" />
                  <motion.circle
                    cx="80" cy="80" r="70"
                    className="stroke-current text-blue-600"
                    strokeWidth="12" fill="transparent"
                    strokeDasharray="440"
                    initial={{ strokeDashoffset: 440 }}
                    animate={{ strokeDashoffset: 440 - (440 * 0.85) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-black text-[#091e42]">85%</span>
                  <span className="block text-[9px] font-bold text-gray-400 uppercase">Strong</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-gray-600">
                  <span>Profile Integrity</span>
                  <span className="text-blue-600">95/100</span>
                </div>
                <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div className="w-[95%] h-full bg-blue-600 rounded-full"></div>
                </div>

                <div className="flex items-center gap-3 pt-6 text-orange-400">
                  <FaLightbulb className="text-xl" />
                  <p className="text-[11px] font-bold leading-relaxed text-gray-500">
                    Adding a professional video pitch can boost your readiness to <span className="text-[#091e42] font-black">98%</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky Sidebar Ad */}
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-2 overflow-hidden">
              <span className="text-[10px] text-gray-300 uppercase block mb-2 text-center font-bold tracking-widest">Network Featured</span>
              <InArticleAd />
            </div>

            {/* Quick Links Menu */}
            <div className="bg-white rounded-[40px] p-6 shadow-sm border border-gray-100">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-4">Navigation Hub</h4>
              <div className="space-y-2">
                {[
                  { icon: <MdAssignment />, label: "Applications", link: "/my-applications" },
                  { icon: <MdOutlineArticle />, label: "Resume Builder", link: "/resume-builder" },
                  { icon: <FaStar />, label: "Premium Services", link: "/salary" },
                  { icon: <MdRocketLaunch />, label: "Hiring Webinars", link: "/blogs" }
                ].map((link, i) => (
                  <Link
                    key={i}
                    to={link.link}
                    className="flex items-center justify-between p-4 hover:bg-blue-50 rounded-3xl transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-gray-50 text-gray-400 rounded-2xl group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                        {link.icon}
                      </div>
                      <span className="text-sm font-black text-gray-600 group-hover:text-[#091e42] transition-colors">{link.label}</span>
                    </div>
                    <span className="text-gray-300 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Ad Unit */}
            <div className="bg-white rounded-[40px] p-2 border border-dashed border-gray-200">
              <InFeedAd />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
