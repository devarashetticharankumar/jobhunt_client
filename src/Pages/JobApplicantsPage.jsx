import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../data/apiPath";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MdArrowBack, MdDownload, MdCheckCircle, MdCancel, MdPerson, MdEmail, MdDescription } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobApplicantsPage = () => {
    const { jobId } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const [applicants, setApplicants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [jobTitle, setJobTitle] = useState("");

    useEffect(() => {
        fetchApplicants();
    }, [jobId]);

    const fetchApplicants = async () => {
        try {
            // Fetch Job Title Context if possible (Optional, or just fetch job details)
            // fetch(`${API_URL}/jobs/job/${jobId}`).then(res => res.json()).then(data => setJobTitle(data.jobTitle));

            const response = await fetch(`${API_URL}/applications/job/${jobId}`);
            if (!response.ok) throw new Error("Failed to fetch applicants");
            const data = await response.json();
            setApplicants(data);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to load applicants");
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const response = await fetch(`${API_URL}/applications/status/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                toast.success(`Applicant marked as ${status}`);
                setApplicants(applicants.map(app =>
                    app._id === id ? { ...app, status } : app
                ));
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating status");
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Job Applicants | JobNirvana</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <ToastContainer />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
            >
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link to="/my-job" className="text-gray-500 hover:text-blue-600 flex items-center gap-2 mb-2 transition-colors">
                            <MdArrowBack /> Back to My Jobs
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Applicants ({applicants.length})</h1>
                        <p className="text-gray-500">Manage applications for this job position</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/80 text-gray-600 text-sm uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Candidate</th>
                                    <th className="px-6 py-4 font-semibold">Contact</th>
                                    <th className="px-6 py-4 font-semibold">Cover Letter</th>
                                    <th className="px-6 py-4 font-semibold">Resume</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {applicants.length > 0 ? (
                                    applicants.map((app) => (
                                        <tr key={app._id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-900 flex items-center gap-2">
                                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><MdPerson /></div>
                                                    {app.applicantName}
                                                </div>
                                                <div className="text-xs text-gray-400 mt-1 ml-9">Applied: {new Date(app.appliedAt).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <MdEmail className="text-gray-400" /> {app.applicantEmail}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="max-w-xs truncate text-gray-600" title={app.coverLetter || "No cover letter provided"}>
                                                    {app.coverLetter || <span className="text-gray-300 italic">None</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {app.resumePath ? (
                                                    <a
                                                        href={`${API_URL}/${app.resumePath.replace(/\\/g, '/')}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-blue-600 rounded-lg text-sm font-medium transition-colors"
                                                    >
                                                        <MdDownload /> Download
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">Unavailable</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${app.status === 'shortlisted' ? 'bg-green-100 text-green-700' :
                                                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleStatusUpdate(app._id, 'shortlisted')}
                                                        className="p-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
                                                        title="Shortlist"
                                                    >
                                                        <MdCheckCircle className="text-lg" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                                        className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                                                        title="Reject"
                                                    >
                                                        <MdCancel className="text-lg" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            No applications found for this job yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default JobApplicantsPage;
