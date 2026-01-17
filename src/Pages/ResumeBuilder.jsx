
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { FaPlus, FaFileAlt, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import TemplateModern from "../components/resume-templates/TemplateModern";
import TemplateProfessional from "../components/resume-templates/TemplateProfessional";
import TemplateCreative from "../components/resume-templates/TemplateCreative";
import TemplateMinimalist from "../components/resume-templates/TemplateMinimalist";
import TemplateExecutive from "../components/resume-templates/TemplateExecutive";
import TemplateSimple from "../components/resume-templates/TemplateSimple";
import TemplateAcademic from "../components/resume-templates/TemplateAcademic";
import TemplateTech from "../components/resume-templates/TemplateTech";
import TemplateDesigner from "../components/resume-templates/TemplateDesigner";
import TemplateCompact from "../components/resume-templates/TemplateCompact";
import TemplateBold from "../components/resume-templates/TemplateBold";
import TemplateCorporate from "../components/resume-templates/TemplateCorporate";
import TemplateElegant from "../components/resume-templates/TemplateElegant";
import TemplateStartup from "../components/resume-templates/TemplateStartup";
import TemplateClassic from "../components/resume-templates/TemplateClassic";

const ResumeBuilder = () => {
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, user } = useAuth0();

  const fetchResumes = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/resumes/all-resumes?t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch resumes");
      }

      setResumes(data.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchResumes();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/resumes/resume/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Resume deleted successfully");
        setResumes((prev) => prev.filter((r) => r._id !== id));
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete resume");
      }
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("An error occurred while deleting the resume");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const getTemplateComponent = (templateName, data) => {
    switch (templateName) {
      case "modern": return <TemplateModern data={data} />;
      case "professional": return <TemplateProfessional data={data} />;
      case "creative": return <TemplateCreative data={data} />;
      case "minimalist": return <TemplateMinimalist data={data} />;
      case "executive": return <TemplateExecutive data={data} />;
      case "simple": return <TemplateSimple data={data} />;
      case "academic": return <TemplateAcademic data={data} />;
      case "tech": return <TemplateTech data={data} />;
      case "designer": return <TemplateDesigner data={data} />;
      case "compact": return <TemplateCompact data={data} />;
      case "bold": return <TemplateBold data={data} />;
      case "corporate": return <TemplateCorporate data={data} />;
      case "elegant": return <TemplateElegant data={data} />;
      case "startup": return <TemplateStartup data={data} />;
      case "classic": return <TemplateClassic data={data} />;
      default: return <TemplateModern data={data} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 text-3xl">
            <FaFileAlt />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            Resume Builder
          </h1>
          <p className="text-gray-600 mb-8">
            Create professional resumes in minutes. Please log in to manage your resumes.
          </p>
          <button
            onClick={() => loginWithRedirect()}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30"
          >
            Log In / Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">My Resumes</h1>
            <p className="text-lg text-gray-600">Manage and customize your professional profiles</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            )}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Create New Resume Card */}
          <motion.div variants={itemVariants}>
            <Link
              to="/create-resume"
              className="group h-full min-h-[400px] border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50 rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer"
            >
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:shadow-md transition-all duration-300 mb-4">
                <FaPlus className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Create New Resume</h3>
              <p className="text-gray-500 mt-2">Start from scratch</p>
            </Link>
          </motion.div>

          {/* Existing Resumes */}
          {resumes.map((resume) => (
            <motion.div
              key={resume._id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {resume.template || "Modern"}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
                    Updated: {new Date(resume.lastModified || Date.now()).toLocaleDateString()}
                  </span>
                </div>

                {/* Preview Container */}
                <div className="w-full h-64 bg-gray-100 mb-4 rounded-xl overflow-hidden relative border border-gray-200">
                  <div className="absolute top-0 left-0 w-[800px] transform origin-top-left scale-[0.35] pointer-events-none">
                    {getTemplateComponent(resume.template || "modern", resume)}
                  </div>
                  {/* Overlay to prevent interaction and provide a link feeling */}
                  <Link to={`/resume/${resume._id}`} className="absolute inset-0 z-10 block"></Link>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                  {resume.wantedJobTitle || (resume.personalInfo?.firstName ? `${resume.personalInfo.firstName}'s Resume` : "Untitled Resume")}
                </h3 >
              </div>

              <div className="flex gap-2 mt-auto">
                <Link
                  to={`/resume/${resume._id}`}
                  className="flex-1 bg-gray-50 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-xs border border-gray-200"
                >
                  <FaFileAlt className="text-gray-400" /> View
                </Link>
                <Link
                  to={`/create-resume?id=${resume._id}`}
                  className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 text-xs shadow-md shadow-indigo-100"
                >
                  <FaEdit /> Edit
                </Link>
                <button
                  className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all border border-gray-100 hover:border-red-100"
                  onClick={() => handleDelete(resume._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div >
          ))}
        </motion.div >

        {
          resumes.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12 py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200"
            >
              <p className="text-gray-500 mb-4">No resumes found. Create your first one!</p>
            </motion.div>
          )
        }
      </div >
    </div >
  );
};

export default ResumeBuilder;

