import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../data/apiPath";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { MdWorkOutline, MdOpenInNew } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

const MyApplications = () => {
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        if (isLoading && isAuthenticated === false) {
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

    const nextPage = () => {
        if (indexOfLastItem < applications.length) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors">
            <Helmet>
                <title>My Applications | JobNirvana</title>
            </Helmet>
            <ToastContainer />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
            >
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Applications</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Track the jobs you've applied to</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">No.</th>
                                    <th className="px-6 py-4 font-semibold">Job Title</th>
                                    <th className="px-6 py-4 font-semibold">Company</th>
                                    <th className="px-6 py-4 font-semibold">Applied On</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {currentApps.length > 0 ? (
                                    currentApps.map((app, index) => (
                                        <motion.tr
                                            key={app._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                                {index + 1 + (currentPage - 1) * itemsPerPage}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-800 dark:text-gray-200">{app.jobTitle}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                {app.companyName}
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                {new Date(app.appliedAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${app.status === 'external-click' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200' :
                                                        app.status === 'hired' ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200' :
                                                            app.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200' :
                                                                'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200'
                                                    }`}>
                                                    {app.status === 'external-click' ? 'Applied on Ext Site' : app.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Link to={`/job/${app.jobId}`}>
                                                    <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">View Job</button>
                                                </Link>
                                                {app.applyUrl && (
                                                    <a href={app.applyUrl} target="_blank" rel="noopener noreferrer" className="ml-4 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" title="Visit Link">
                                                        <MdOpenInNew className="inline text-lg" />
                                                    </a>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center justify-center">
                                                <MdWorkOutline className="text-6xl text-gray-200 mb-4" />
                                                <p className="text-lg">You haven't applied to any jobs yet.</p>
                                                <Link to="/jobs">
                                                    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Browse Jobs</button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {applications.length > itemsPerPage && (
                        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-center gap-4 bg-gray-50/50 dark:bg-gray-800 transition-colors">
                            <button onClick={prevPage} disabled={currentPage === 1} className={`px-4 py-2 rounded-lg font-medium transition ${currentPage === 1 ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-700 border hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm text-gray-700 dark:text-gray-200'}`}>Previous</button>
                            <span className="flex items-center text-gray-600 dark:text-gray-400">Page {currentPage} of {Math.ceil(applications.length / itemsPerPage)}</span>
                            <button onClick={nextPage} disabled={indexOfLastItem >= applications.length} className={`px-4 py-2 rounded-lg font-medium transition ${indexOfLastItem >= applications.length ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-white dark:bg-gray-700 border hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm text-gray-700 dark:text-gray-200'}`}>Next</button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default MyApplications;
