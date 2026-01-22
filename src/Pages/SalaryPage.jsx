// import React, { useEffect, useState } from "react";
// import PageHeader from "../components/PageHeader";
// import { motion } from "framer-motion";
// import { API_URL } from "../data/apiPath";
// import { Link } from "react-router-dom";
// import InFeedAd from "../components/InFeedAd"; // Import the InFeedAd component
// import { Helmet } from "react-helmet"; // Import Helmet

// const SalaryPage = () => {
//   const [searchText, setSearchText] = useState("");
//   const [salary, setSalary] = useState([]);
//   const [filteredSalary, setFilteredSalary] = useState([]);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 7; // Number of jobs to show per page

//   useEffect(() => {
//     fetch(`${API_URL}/jobs/all-jobs`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch jobs");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setSalary(data);
//         setFilteredSalary(data);
//       });
//   }, []);

//   const handleSearch = () => {
//     const filtered = salary.filter((job) =>
//       job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredSalary(filtered);
//     setCurrentPage(1); // Reset to the first page after filtering
//   };

//   // Get current jobs for the page
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredSalary.slice(indexOfFirstJob, indexOfLastJob);

//   const totalPages = Math.ceil(filteredSalary.length / jobsPerPage);

//   // Handle pagination change
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <motion.div
//       className="max-w-screen-2xl container mx-auto xl:px-24 px-4"
//       initial={{ opacity: 0, y: -60 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeIn" }}
//     >
//       <Helmet>
//         <title>Estimated Salary - JobNirvana</title>
//         <meta
//           name="description"
//           content="Explore estimated salaries for various job titles in the tech industry. Find out the average salary range for roles such as Software Engineer, Data Analyst, and more."
//         />
//         <meta
//           name="keywords"
//           content="salary, job salary, estimated salary, tech salaries, Software Engineer, Data Analyst, jobs"
//         />
//         <meta property="og:title" content="Estimated Salary - JobNirvana" />
//         <meta
//           property="og:description"
//           content="Explore estimated salaries for various job titles in the tech industry."
//         />
//         <meta property="og:type" content="website" />
//         <meta name="robots" content="index, follow" />

//         <meta
//           property="og:url"
//           content="https://jobnirvana.netlify.app/salary"
//         />
//         <link rel="canonical" href={`${window.location.href}`} />
//       </Helmet>
//       <PageHeader title={"Estimated Salary"} path={"Salary"} />

//       <motion.div
//         className="mt-5"
//         initial={{ opacity: 0, x: -60 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6, ease: "easeIn", delay: 0.2 }}
//       >
//         <div className="search-box p-2 text-center mb-2">
//           <input
//             type="text"
//             name="search"
//             id="search"
//             placeholder="Eg: Software, Data Analyst"
//             className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
//             onChange={(e) => setSearchText(e.target.value)}
//           />
//           <button
//             className="bg-blue text-white font-semibold py-2 rounded-sm px-8 mb-4"
//             onClick={handleSearch}
//           >
//             Search
//           </button>
//         </div>
//       </motion.div>

//       {/* Display salary information */}
//       <motion.div
//         className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center"
//         initial={{ opacity: 0, x: -60 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.6, ease: "easeIn", delay: 0.4 }}
//       >
//         {currentJobs.map((data, index) => (
//           <React.Fragment key={data._id}>
//             <div className="shadow px-4 py-8">
//               <h4 className="font-semibold text-xl">{data.jobTitle}</h4>
//               <p className="my-2 font-medium text-blue-600 text-lg">
//                 Average Salary: {data.minPrice} - {data.maxPrice}{" "}
//                 {data.salaryType === "Monthly" ? "k" : "LPA"} /{" "}
//                 {data.salaryType}
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <p>{data.experienceLevel}</p>
//                 <Link
//                   to={`/job/${data._id}`}
//                   className="underline hover:text-blue-600"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//             {/* Insert an InFeedAd component after every 3 jobs */}
//             {(index + 1) % 3 === 0 && <InFeedAd />}
//           </React.Fragment>
//         ))}
//       </motion.div>

//       {/* Pagination Controls */}
//       <div className="pagination flex flex-wrap justify-center gap-2 my-6">
//         <button
//           onClick={() => paginate(currentPage - 1)}
//           disabled={currentPage === 1}
//           className={`px-3 py-2 bg-gray-200 text-sm ${
//             currentPage === 1 ? "cursor-not-allowed" : "hover:bg-blue-700"
//           } rounded-md`}
//         >
//           Previous
//         </button>

//         {/* Always show the first page */}
//         {currentPage > 2 && (
//           <>
//             <button
//               onClick={() => paginate(1)}
//               className={`px-3 py-2 text-sm rounded-md ${
//                 currentPage === 1
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 hover:bg-blue-700"
//               }`}
//             >
//               1
//             </button>
//             {currentPage > 3 && <span className="px-3 py-2">...</span>}
//           </>
//         )}

//         {/* Show pages around the current page */}
//         {Array.from({ length: totalPages }, (_, i) => i + 1)
//           .filter((page) => page >= currentPage - 1 && page <= currentPage + 1)
//           .map((page) => (
//             <button
//               key={page}
//               onClick={() => paginate(page)}
//               className={`px-3 py-2 text-sm rounded-md ${
//                 currentPage === page
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 hover:bg-blue-700"
//               }`}
//             >
//               {page}
//             </button>
//           ))}

//         {/* Always show the last page */}
//         {currentPage < totalPages - 1 && (
//           <>
//             {currentPage < totalPages - 2 && (
//               <span className="px-3 py-2">...</span>
//             )}
//             <button
//               onClick={() => paginate(totalPages)}
//               className={`px-3 py-2 text-sm rounded-md ${
//                 currentPage === totalPages
//                   ? "bg-blue text-white"
//                   : "bg-gray-200 hover:bg-blue"
//               }`}
//             >
//               {totalPages}
//             </button>
//           </>
//         )}

//         <button
//           onClick={() => paginate(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className={`px-3 py-2 bg-gray-200 text-sm ${
//             currentPage === totalPages
//               ? "cursor-not-allowed"
//               : "hover:bg-blue-700"
//           } rounded-md`}
//         >
//           Next
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default SalaryPage;

import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { motion } from "framer-motion";
import { API_URL } from "../data/apiPath";
import { Link } from "react-router-dom";
import InFeedAd from "../components/InFeedAd";
import { Helmet } from "react-helmet-async";
import Skeleton from "react-loading-skeleton";

const SalaryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [salary, setSalary] = useState([]);
  const [filteredSalary, setFilteredSalary] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9; // Increased items per page for better grid view

  useEffect(() => {
    fetch(`${API_URL}/jobs/all-salaries`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return res.json();
      })
      .then((data) => {
        setSalary(data);
        setFilteredSalary(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const filtered = salary.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSalary(filtered);
    setCurrentPage(1);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredSalary.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredSalary.length / jobsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <motion.div
      className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-10 bg-[#FAFAFA] dark:bg-gray-900 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Helmet>
        <title>Estimated Salary | JobNirvana</title>
        <meta
          name="description"
          content="Explore estimated salaries for various job titles in the tech industry. Find out the average salary range for roles such as Software Engineer, Data Analyst, and more."
        />
        <link rel="canonical" href={`${window.location.href}`} />
      </Helmet>

      {/* Modern Gradient Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-600">
          Estimated Salary
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Discover the competitive salary ranges for top tech roles across the industry.
        </p>
      </div>

      {/* Styled Search Box */}
      <div className="max-w-3xl mx-auto mb-16 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl ring-1 ring-gray-900/5 dark:ring-gray-700">
          <input
            type="text"
            className="flex-1 p-4 pl-6 text-gray-900 dark:text-white bg-transparent outline-none placeholder:text-gray-400 font-medium"
            placeholder="Search role (e.g., 'Software Engineer')"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30"
          >
            Search
          </button>
        </div>
      </div>

      {/* Salary Cards Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-12">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <Skeleton height={30} width="60%" className="mb-4" />
              <Skeleton count={2} />
            </div>
          ))
          : currentJobs.map((data, index) => (
            <React.Fragment key={data._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 border border-gray-100 dark:border-gray-700 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl font-bold text-blue-900 dark:text-blue-100">₹</span>
                </div>

                <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {data.jobTitle}
                </h4>
                <div className="mb-6">
                  <p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                    {data.minPrice} - {data.maxPrice} <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{data.salaryType === "Monthly" ? "k" : "LPA"}</span>
                  </p>
                  <p className="text-sm text-gray-400 mt-1">Average Salary Range</p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    {data.experienceLevel}
                  </span>
                  <Link
                    to={`/job/${data.slug || data._id}`}
                    className="text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </motion.div>
              {/* Insert an InFeedAd component after every 3 jobs */}
              {(index + 1) % 3 === 0 && (
                <div className="lg:col-span-3 md:col-span-2 col-span-1">
                  <InFeedAd />
                </div>
              )}
            </React.Fragment>
          ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-16 mb-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1))
            .map((page, index, array) => (
              <React.Fragment key={page}>
                {index > 0 && array[index - 1] !== page - 1 && <span className="px-2 self-center text-gray-400">...</span>}
                <button
                  onClick={() => paginate(page)}
                  className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === page
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/40"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                >
                  {page}
                </button>
              </React.Fragment>
            ))}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default SalaryPage;
