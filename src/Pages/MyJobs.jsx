import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../data/apiPath";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { MdSearch, MdEdit, MdDelete, MdAdd, MdWorkOutline, MdPeople } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

const MyJobs = () => {
  const { user, getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else if (user) {
      const fetchJobs = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${API_URL}/jobs/myJobs/${user.email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) throw new Error("Failed");
          const data = await response.json();
          // Sort is already done by backend, but ensuring descending createdAt just in case or keep existing order
          setJobs(data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          toast.error("Failed to fetch jobs.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchJobs();
    }
  }, [isAuthenticated, user, getAccessTokenSilently, loginWithRedirect]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Filter logic
  const filteredJobs = jobs.filter((job) =>
    (job?.jobTitle || "").toLowerCase().includes(searchText.toLowerCase())
  );
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < filteredJobs.length) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/jobs/job/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        toast.success("Job deleted successfully!");
        setJobs(jobs.filter((job) => job._id !== id));
      } else {
        toast.error("Failed to delete.");
      }
    } catch (error) {
      toast.error("Error deleting job.");
    }
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
        <title>My Jobs | JobNirvana</title>
      </Helmet>
      <ToastContainer />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Jobs</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Manage all your job postings in one place</p>
          </div>
          <Link to="/post-job">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-transform hover:scale-105">
              <MdAdd className="text-xl" /> Post New Job
            </button>
          </Link>
        </div>

        {/* Search & Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors">
          {/* Search Bar */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
            <div className="relative max-w-md">
              <MdSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search by job title..."
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-shadow shadow-sm placeholder-gray-400"
              />
            </div>
          </div>

          {/* Jobs Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">No.</th>
                  <th className="px-6 py-4 font-semibold">Job Title</th>
                  <th className="px-6 py-4 font-semibold">Company</th>
                  <th className="px-6 py-4 font-semibold">Salary</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {currentJobs.length > 0 ? (
                  currentJobs.map((job, index) => (
                    <motion.tr
                      key={job._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800 dark:text-gray-200">{job.jobTitle}</div>
                        <div className="text-xs text-gray-400">{job.employmentType}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        {/* {job.companyLogo && <img src={job.companyLogo} className="w-6 h-6 rounded-full object-cover" />} */}
                        {job.companyName}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                        {job.minPrice}k - {job.maxPrice}k
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <Link to={`/edit-job/${job._id}`}>
                            <button className="p-2 text-blue-600 bg-blue-100 hover:bg-blue-600 hover:text-white dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white rounded-lg transition-colors" title="Edit">
                              <MdEdit className="text-lg" />
                            </button>
                          </Link>
                          <Link to={`/job-applicants/${job._id}`}>
                            <button className="p-2 text-purple-600 bg-purple-100 hover:bg-purple-600 hover:text-white dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-600 dark:hover:text-white rounded-lg transition-colors" title="View Applicants">
                              <MdPeople className="text-lg" />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="p-2 text-red-600 bg-red-100 hover:bg-red-600 hover:text-white dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white rounded-lg transition-colors"
                            title="Delete"
                          >
                            <MdDelete className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      <div className="flex flex-col items-center justify-center">
                        <MdWorkOutline className="text-6xl text-gray-200 dark:text-gray-600 mb-4" />
                        <p className="text-lg">No jobs found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredJobs.length > itemsPerPage && (
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-center gap-4 bg-gray-50/50 dark:bg-gray-700/50">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition ${currentPage === 1 ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm text-gray-700 dark:text-gray-300'}`}
              >
                Previous
              </button>
              <span className="flex items-center text-gray-600 dark:text-gray-300">
                Page {currentPage} of {Math.ceil(filteredJobs.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={indexOfLastItem >= filteredJobs.length}
                className={`px-4 py-2 rounded-lg font-medium transition ${indexOfLastItem >= filteredJobs.length ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm text-gray-700 dark:text-gray-300'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MyJobs;
