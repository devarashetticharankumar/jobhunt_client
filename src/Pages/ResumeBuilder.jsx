import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { FaPlus, FaFileAlt, FaEdit, FaTrash, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ProfileCard from "../components/dashboard/ProfileCard";
import InFeedAd from "../components/InFeedAd";
import InArticleAd from "../components/InArticleAd";
import SkeletonLoading from "../components/SkeletonLoading";

// Import all templates for preview
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
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch resumes");
      setResumes(data.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchResumes();
    else setIsLoading(false);
  }, [isAuthenticated, getAccessTokenSilently]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/resumes/resume/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
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

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
        <div className="max-w-md w-full text-center p-10 bg-white rounded-[32px] shadow-xl border border-gray-100">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-600 text-4xl shadow-inner">
            <FaFileAlt />
          </div>
          <h1 className="text-3xl font-extrabold text-[#091e42] mb-4 tracking-tight">AI Resume Builder</h1>
          <p className="text-gray-500 font-medium leading-relaxed mb-10">
            Create job-winning resumes in 5 minutes with our premium AI-tuned templates.
          </p>
          <button
            onClick={() => loginWithRedirect()}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-3"
          >
            Sign In to Start <FaChevronRight className="text-xs" />
          </button>
          <p className="mt-6 text-xs text-gray-400 font-bold uppercase tracking-widest">Free for all Job Seekers</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12 pt-8">
      <Helmet>
        <title>My Resumes | JobNirvana Resume Builder</title>
        <meta name="description" content="Manage your professional resumes and CVs on JobNirvana. Create, edit, and download high-quality resume templates." />
      </Helmet>

      {/* Header / Intro */}
      <div className="max-w-[1240px] mx-auto px-4 mb-10 mt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-200">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#091e42] leading-tight">My Resumes</h1>
            <p className="text-gray-500 text-lg font-medium mt-2">Manage your professional profiles and CVs</p>
          </div>
          <Link
            to="/create-resume"
            className="px-8 py-4 bg-[#091e42] hover:bg-black text-white font-bold rounded-2xl transition-all shadow-lg shadow-gray-200 flex items-center gap-3 whitespace-nowrap"
          >
            <FaPlus /> Create New Resume
          </Link>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4">
        <div className="lg:grid lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDEBAR (25%) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <ProfileCard />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
              <h4 className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest mb-4">ATS Checklist</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-500 font-medium">Use a clean, single-column layout for better parsing.</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-500 font-medium">Highlight your quantifiable achievements with metrics.</p>
                </div>
                <div className="flex items-start gap-3 text-orange-400">
                  <FaLightbulb className="mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-600 font-bold">Try our Premium AI Templates for 2x more callbacks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT (50%) */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            {isLoading ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <SkeletonLoading />
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-2xl font-bold">
                {error}
              </div>
            ) : resumes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resumes.map((resume, index) => (
                  <React.Fragment key={resume._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                    >
                      {/* Preview Thumb */}
                      <div className="relative h-48 bg-gray-50 border-b border-gray-50 overflow-hidden">
                        <div className="absolute top-0 left-0 w-[600px] transform origin-top-left scale-[0.4] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                          {getTemplateComponent(resume.template || "modern", resume)}
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-gray-600 shadow-sm border border-gray-100">
                            {resume.template || "Modern"}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-extrabold text-[#091e42] truncate text-lg group-hover:text-blue-600 transition-colors">
                          {resume.wantedJobTitle || "Professional Resume"}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium mt-1">
                          Last updated: {new Date(resume.lastModified || Date.now()).toLocaleDateString()}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-50">
                          <Link
                            to={`/resume/${resume._id}`}
                            className="flex-1 py-2.5 bg-[#091e42] text-white rounded-xl text-xs font-bold text-center hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200"
                          >
                            View
                          </Link>
                          <Link
                            to={`/create-resume?id=${resume._id}`}
                            className="flex-1 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold text-center hover:bg-blue-100 transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(resume._id)}
                            className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-gray-50"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* In-Feed Ad every 4 items */}
                    {(index + 1) % 4 === 0 && (
                      <div className="col-span-1 md:col-span-2 py-2">
                        <InFeedAd />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 text-3xl">
                  <FaFileAlt />
                </div>
                <h3 className="text-xl font-bold text-[#091e42] mb-2">No resumes found</h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">Build your professional profile and download ATS-friendly resumes for free.</p>
                <Link
                  to="/create-resume"
                  className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 inline-flex items-center gap-3"
                >
                  <FaPlus /> Build Your First Resume
                </Link>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR (25%) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
            <div className="bg-[#091e42] text-white rounded-2xl p-8 relative overflow-hidden group shadow-xl">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-lg font-bold mb-3">Resume Score</h3>
              <p className="text-blue-100/70 text-xs leading-relaxed mb-6">
                Upload your resume and get an instant ATS-compatibility score and improvement tips.
              </p>
              <button className="w-full py-4 bg-white text-[#091e42] font-bold rounded-xl text-xs hover:bg-blue-50 transition-all shadow-lg">
                Analyze Resume
              </button>
            </div>

            {/* Sticky Sidebar Ad */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden">
              <span className="text-[10px] text-gray-300 uppercase block mb-2 text-center font-bold tracking-widest">Advertisement</span>
              <InArticleAd />
            </div>

            {/* Recommended Ad */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden">
              <InFeedAd />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
