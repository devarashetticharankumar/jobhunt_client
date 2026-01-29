import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../data/apiPath";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { MdWorkOutline, MdOpenInNew, MdLocationOn } from "react-icons/md";
import { FaBuilding, FaCalendarAlt, FaStar } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import ProfileCard from "../components/dashboard/ProfileCard";
import InArticleAd from "../components/InArticleAd";
import SkeletonLoading from "../components/SkeletonLoading";

const MyApplications = () => {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Mock user for ProfileCard if not fully loaded from Auth0
    const mockUser = {
        name: user?.name || "Job Seeker",
        role: "Job Seeker",
        location: "India",
        photoUrl: user?.picture || ""
    };

    useEffect(() => {
        if (!isLoading && isAuthenticated === false) {
            loginWithRedirect();
        } else if (user) {
            fetchApplications();
        }
    }, [isAuthenticated, user]);

    const fetchApplications = async () => {
        try {
            const response = await fetch(`${API_URL}/applications/my-applications/${user.email}`);
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to load applications");
        } finally {
            setIsLoading(false);
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentApps = applications.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(applications.length / itemsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'hired': return 'bg-green-50 text-green-700 border-green-100';
            case 'rejected': return 'bg-red-50 text-red-700 border-red-100';
            case 'external-click': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
            default: return 'bg-blue-50 text-blue-700 border-blue-100';
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans pb-12">
            <Helmet>
                <title>My Applications | JobNirvana</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <ToastContainer />

            {/* Top Header Placeholder / Search context */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-[1240px] mx-auto px-4 py-4">
                    <h1 className="text-xl font-bold text-[#091e42]">My Applications ({applications.length})</h1>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto px-4 pt-8">
                <div className="lg:grid lg:grid-cols-12 gap-6 items-start">

                    {/* LEFT COLUMN (25%) */}
                    <div className="hidden lg:block lg:col-span-3 sticky top-24">
                        <ProfileCard user={mockUser} />
                    </div>

                    {/* MAIN FEED (50%) */}
                    <div className="col-span-12 lg:col-span-6 space-y-4">
                        {isLoading ? (
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <SkeletonLoading />
                            </div>
                        ) : currentApps.length > 0 ? (
                            <>
                                {currentApps.map((app, index) => (
                                    <React.Fragment key={app._id}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow relative"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex-1">
                                                    <Link to={`/job/${app.jobId}`} className="text-lg font-bold text-[#091e42] hover:text-blue-600 transition-colors">
                                                        {app.jobTitle}
                                                    </Link>
                                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mt-1">
                                                        <FaBuilding className="text-gray-400" />
                                                        {app.companyName}
                                                        <span className="flex items-center gap-0.5 text-xs text-orange-500 font-bold ml-1">
                                                            <FaStar /> 4.0
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>
                                                    {app.status === 'external-click' ? 'Applied on Ext Site' : app.status || 'Applied'}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-6">
                                                <div className="flex items-center gap-1">
                                                    <FaCalendarAlt className="text-gray-400" />
                                                    Applied on {new Date(app.appliedAt).toLocaleDateString()}
                                                </div>
                                                <div className="hidden sm:block text-gray-300">|</div>
                                                <div className="flex items-center gap-1">
                                                    <MdLocationOn className="text-gray-400 text-sm" />
                                                    Remote / On-site
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-100">
                                                <Link to={`/job/${app.jobId}`} className="text-blue-600 font-bold text-sm hover:underline">
                                                    View Job Details
                                                </Link>
                                                {app.applyUrl && (
                                                    <a href={app.applyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-500 hover:text-blue-600 text-sm font-medium">
                                                        Visit Source <MdOpenInNew />
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>

                                        {/* Inject In-Feed Ad every 4 items */}
                                        {(index + 1) % 4 === 0 && (
                                            <div className="py-2">
                                                <InArticleAd />
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}

                                {/* Pagination */}
                                <div className="flex items-center justify-center gap-4 py-6">
                                    <button
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                        className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                    >
                                        Prev
                                    </button>
                                    <span className="text-sm font-medium text-gray-600">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={nextPage}
                                        disabled={currentPage >= totalPages}
                                        className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
                                <MdWorkOutline className="text-6xl text-gray-200 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No applications yet</h3>
                                <p className="text-gray-500 mb-6">Start applying to jobs to track them here.</p>
                                <Link to="/jobs" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                                    Browse Jobs
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN (25%) */}
                    <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
                        {/* Sidebar Ad 1 */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">📈</div>
                                <h4 className="font-bold text-gray-900 text-sm">Application Insights</h4>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Keep your profile updated to increase your chances of getting noticed by recruiters by 40%.
                            </p>
                            <button className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition">
                                Update Profile
                            </button>
                        </div>

                        {/* Sticky Sidebar Ad */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 overflow-hidden">
                            <span className="text-[10px] text-gray-300 uppercase block mb-1 text-center font-bold tracking-widest">Advertisement</span>
                            <InArticleAd />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MyApplications;
