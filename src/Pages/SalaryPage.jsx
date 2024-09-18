import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { motion } from "framer-motion";
import { API_URL } from "../data/apiPath";
import { Link } from "react-router-dom";

const SalaryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [salary, setSalary] = useState([]);
  const [filteredSalary, setFilteredSalary] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; // Number of jobs to show per page

  useEffect(() => {
    fetch(`${API_URL}/jobs/all-jobs`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return res.json();
      })
      .then((data) => {
        setSalary(data);
        setFilteredSalary(data);
      });
  }, []);

  const handleSearch = () => {
    const filtered = salary.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSalary(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Get current jobs for the page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredSalary.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredSalary.length / jobsPerPage);

  // Handle pagination change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <motion.div
      className="max-w-screen-2xl container mx-auto xl:px-24 px-4"
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <PageHeader title={"Estimated Salary"} path={"Salary"} />

      <motion.div
        className="mt-5"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeIn", delay: 0.2 }}
      >
        <div className="search-box p-2 text-center mb-2">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Eg: Software, Data Analyst"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-blue text-white font-semibold py-2 rounded-sm px-8 mb-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </motion.div>

      {/* Display salary information */}
      <motion.div
        className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeIn", delay: 0.4 }}
      >
        {currentJobs.map((data) => (
          <div key={data._id} className="shadow px-4 py-8">
            <h4 className="font-semibold text-xl">{data.jobTitle}</h4>
            <p className="my-2 font-medium text-blue text-lg">
              Average Salary: {data.minPrice} - {data.maxPrice}{" "}
              {data.salaryType === "Monthly" ? "k" : "LPA"} / {data.salaryType}
            </p>
            <div className="flex flex-wrap gap-4">
              <p>{data.experienceLevel}</p>
              <Link to={`/job/${data._id}`} className="underline">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Pagination Controls */}
      <div className="pagination flex justify-center space-x-4 my-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-200 ${
            currentPage === 1 ? "cursor-not-allowed" : "hover:bg-blue"
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 ${
              currentPage === i + 1
                ? "bg-blue text-white"
                : "bg-gray-200 hover:bg-blue"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-200 ${
            currentPage === totalPages ? "cursor-not-allowed" : "hover:bg-blue"
          }`}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default SalaryPage;
