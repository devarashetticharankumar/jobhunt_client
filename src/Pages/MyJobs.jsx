import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react"; // Import the useAuth0 hook
import { API_URL } from "../data/apiPath";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";

const MyJobs = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    if (user) {
      const fetchJobs = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${API_URL}/jobs/myJobs/${user.email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setJobs(data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          toast.error("Error fetching jobs. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchJobs();
    }
  }, [user, getAccessTokenSilently]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < jobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = () => {
    const filter = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setJobs(filter);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/jobs/job/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.acknowledged) {
        alert("Job deleted successfully!");
        // Re-fetch jobs after deletion
        await fetchJobs();
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job. Please try again.");
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"My Jobs"} path={"My jobs"} />

      <div className="my-jobs-container">
        <div className="search-box p-2 text-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Ex:React Developer"
            onChange={(e) => setSearchText(e.target.value)}
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
          />
          <button
            className="bg-blue hover:bg-indigo-700 text-white font-semibold px-8 py-2 rounded-sm mb-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <section className="py-1 bg-blueGray-50 ">
        <motion.div
          className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mx-auto mt-5"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
        >
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center w-full">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Jobs
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to="/post-job">
                    <button
                      className="bg-blue hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-2 rounded-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      POST A NEW JOB
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto no-scrollbar">
              {isLoading ? (
                <div className="flex items-center justify-center h-20">
                  <p>Loading...</p>
                </div>
              ) : (
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        NO.
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        TITLE
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        COMPANY NAME
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        SALARY
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        EDIT
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        DELETE
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {job.jobTitle}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {job.companyName}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {job.minPrice}k - {job.maxPrice}k
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button>
                            <Link to={`/edit-job/${job?._id}`}>Edit</Link>
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            className="bg-red-700 text-white rounded-sm px-6 py-2"
                            onClick={() => handleDelete(job._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center text-black space-x-8 mb-8">
          {currentPage > 1 && (
            <button className="hover:underline" onClick={prevPage}>
              Previous
            </button>
          )}
          {indexOfLastItem < jobs.length && (
            <button className="hover:underline" onClick={nextPage}>
              Next
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyJobs;
