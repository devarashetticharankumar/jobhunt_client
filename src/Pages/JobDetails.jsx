// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { API_URL } from "../data/apiPath";
// import { motion } from "framer-motion";
// import { Helmet } from "react-helmet";
// import Card from "../components/Card";
// import RelatedJobs from "../components/RelatedJobs";
// import { FaRegStar } from "react-icons/fa";
// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState([]);

//   useEffect(() => {
//     // Fetch the current job details
//     fetch(`${API_URL}/jobs/all-jobs/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setJob(data);
//       });
//   }, [id]);

//   const applyLink = () => {
//     window.open(job.ApplyLink);
//   };

//   // Filter related jobs by companyName

//   // Utility function to format the date
//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const jobTitle = job.jobTitle || "Job Details"; // Fallback title
//   const jobDescription = job.description || "Latest jobs are posted!!";

//   // Construct the canonical URL
//   const canonicalUrl = `${window.location.origin}/jobs/${id}`;

//   return (
//     <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-5 bg-[#FAFAFA] my-5">
//       <Helmet>
//         <title>{jobTitle} - JobNirvana</title>
//         <meta name="description" content={jobDescription} />
//         <meta property="og:title" content={jobTitle} />
//         <meta property="og:description" content={jobDescription} />
//         <meta property="og:image" content={job.companyLogo} />
//         <link rel="canonical" href={canonicalUrl} />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:type" content="website" />
//       </Helmet>
//       <motion.div
//         className="flex flex-wrap justify-center mb-4 items-center"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.9, ease: "easeOut" }}
//       >
//         <img
//           src={job.companyLogo}
//           alt={job.companyName}
//           className="w-24 h-24 mr-4"
//         />
//         <div>
//           <h1 className="text-2xl text-semibold font-bold ">{job.jobTitle}</h1>
//           <h4 className="text-xl font-semibold">{job.companyName}</h4>
//         </div>
//       </motion.div>
//       <motion.div
//         className="flex flex-wrap justify-between mb-4"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <div>
//           <p>
//             <span className="font-semibold">Salary: </span>
//             {job.minPrice} - {job.maxPrice}{" "}
//             {job.salaryType === "Monthly" ? "k" : "LPA"} / {job.salaryType}
//           </p>
//           <p>
//             <span className="font-semibold">Location:</span> {job.jobLocation}
//           </p>
//           <p>
//             <span className="font-semibold">Posted On: </span>
//             {formatDate(job.createdAt)}
//           </p>
//         </div>
//         <div>
//           <p>
//             <span className="font-semibold">Experience Level: </span>
//             {job.experienceLevel}
//           </p>
//           <p>
//             <span className="font-semibold">Employment Type: </span>
//             {job.employmentType}
//           </p>
//         </div>
//       </motion.div>
//       <motion.p
//         className="mb-4"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//       >
//         <span className="font-semibold">Description: </span>
//         <p
//           dangerouslySetInnerHTML={{
//             __html: job.description,
//           }}
//           className="text-gray-600"
//         ></p>
//       </motion.p>
//       <motion.p
//         className="mb-4"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.9, ease: "easeOut" }}
//       >
//         <span className="font-semibold">Required Skills: </span>
//       </motion.p>
//       <motion.ul
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.9, ease: "easeOut" }}
//       >
//         {job.skills && (
//           <ul>
//             {job.skills?.map((skill, index) => (
//               <li
//                 className="text-gray-600 font-medium flex items-center mb-2"
//                 key={index}
//               >
//                 <FaRegStar className="text-yellow-500 mr-2" />
//                 {skill.label}
//               </li>
//             ))}
//           </ul>
//         )}
//       </motion.ul>
//       <motion.button
//         className="bg-blue hover:bg-indigo-700 text-white  px-5 py-2 rounded-sm mt-5 mr-8"
//         onClick={applyLink}
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         Apply Now
//       </motion.button>

//       {/* Related Jobs Section */}
//       <RelatedJobs currentJob={job} />
//     </div>
//   );
// };

// export default JobDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API_URL } from "../data/apiPath";
// import { motion } from "framer-motion";
// import { Helmet } from "react-helmet";
// import { FaRegStar } from "react-icons/fa";
// import RelatedJobs from "../components/RelatedJobs";

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState([]);

//   useEffect(() => {
//     // Fetch the current job details
//     fetch(`${API_URL}/jobs/all-jobs/${id}`)
//       .then((res) => res.json())
//       .then((data) => setJob(data));
//   }, [id]);

//   const applyLink = () => {
//     window.open(job.ApplyLink);
//   };

//   // Utility function to format the date
//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const jobTitle = job.jobTitle || "Job Details";
//   const jobDescription = job.description || "Latest jobs are posted!!";

//   // Construct the canonical URL
//   const canonicalUrl = `${window.location.origin}/jobs/${id}`;

//   return (
//     <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-5 bg-[#FAFAFA] my-5">
//       <Helmet>
//         <title>{jobTitle} - JobNirvana</title>
//         <meta name="description" content={jobDescription} />
//         <meta property="og:title" content={jobTitle} />
//         <meta
//           name="keywords"
//           content={`${jobTitle}, ${job.companyName}, jobs, ${job.jobLocation}, ${job.experienceLevel}`}
//         />
//         <meta property="og:description" content={jobDescription} />
//         <meta property="og:image" content={job.companyLogo} />
//         <link rel="canonical" href={canonicalUrl} />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:type" content="website" />
//       </Helmet>

//       {/* Flexbox layout for Job Details and Related Jobs */}
//       <div className="flex flex-col md:flex-row justify-between">
//         {/* Left Side: Job Details (75%) */}
//         <motion.div
//           className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-lg"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, ease: "easeOut" }}
//         >
//           <motion.div className="flex flex-wrap items-center justify-center mb-6 ">
//             <img
//               src={job.companyLogo}
//               alt={job.companyName}
//               className="w-28 h-28 mr-4"
//             />

//             <div>
//               <h1 className="text-2xl font-bold">{job.jobTitle}</h1>
//               <h4 className="text-lg text-gray-600">{job.companyName}</h4>
//             </div>
//           </motion.div>

//           <motion.div
//             className="flex flex-wrap justify-between mb-4"
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             <div>
//               <p>
//                 <span className="font-semibold">Salary: </span>
//                 {job.minPrice} - {job.maxPrice}{" "}
//                 {job.salaryType === "Monthly" ? "k" : "LPA"} / {job.salaryType}
//               </p>
//               <p>
//                 <span className="font-semibold">Location:</span>{" "}
//                 {job.jobLocation}
//               </p>
//               <p>
//                 <span className="font-semibold">Posted On: </span>
//                 {formatDate(job.createdAt)}
//               </p>
//             </div>
//             <div>
//               <p>
//                 <span className="font-semibold">Experience Level: </span>
//                 {job.experienceLevel}
//               </p>
//               <p>
//                 <span className="font-semibold">Employment Type: </span>
//                 {job.employmentType}
//               </p>
//             </div>
//           </motion.div>

//           <motion.div className="mb-6">
//             <p className="text-lg font-semibold">Description: </p>
//             <p
//               className="text-gray-700"
//               dangerouslySetInnerHTML={{ __html: job.description }}
//             ></p>
//           </motion.div>

//           <motion.div className="mb-6">
//             <p className="text-lg font-semibold">Required Skills: </p>
//             <ul>
//               {job.skills?.map((skill, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center text-gray-700 mb-2"
//                 >
//                   <FaRegStar className="text-yellow-500 mr-2" />
//                   {skill.label}
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           <motion.button
//             className=" bg-blue hover:bg-blue text-white font-bold py-3 px-4 rounded-md transition duration-300"
//             onClick={applyLink}
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//           >
//             Apply Now
//           </motion.button>
//         </motion.div>

//         {/* Right Side: Related Jobs (25%) */}
//         <motion.div
//           className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg mt-8 md:mt-0 md:ml-4"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, ease: "easeOut" }}
//         >
//           <h2 className="text-2xl font-bold mb-4">Related Jobs</h2>
//           <RelatedJobs currentJob={job} />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default JobDetails;

// src/pages/JobDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FaRegStar } from "react-icons/fa";
import RelatedJobs from "../components/RelatedJobs";
import InArticleAd from "../components/InArticleAd"; // Import the InArticleAd component

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);

  useEffect(() => {
    // Fetch the current job details
    fetch(`${API_URL}/jobs/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((error) => console.error("Error fetching job details:", error));
  }, [id]);

  const applyLink = () => {
    window.open(job.ApplyLink, "_blank");
  };

  // Utility function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const jobTitle = job.jobTitle || "Job Details";
  const jobDescription = job.description || "Latest jobs are posted!!";

  // Construct the canonical URL
  const canonicalUrl = `${window.location.origin}/jobs/${id}`;

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-5 bg-[#FAFAFA] my-5">
      <Helmet>
        <title>{jobTitle} - JobNirvana</title>
        <meta name="description" content={jobDescription} />
        <meta property="og:title" content={jobTitle} />
        <meta
          name="keywords"
          content={`${jobTitle}, ${job.companyName}, jobs, ${job.jobLocation}, ${job.experienceLevel}`}
        />
        <meta property="og:description" content={jobDescription} />
        <meta property="og:image" content={job.companyLogo} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Flexbox layout for Job Details and Related Jobs */}
      <div className="flex flex-col md:flex-row justify-between">
        {/* Left Side: Job Details (75%) */}
        <motion.div
          className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <motion.div className="flex flex-wrap items-center justify-center mb-6 ">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-28 h-28 mr-4"
            />

            <div>
              <h1 className="text-2xl font-bold">{job.jobTitle}</h1>
              <h4 className="text-lg text-gray-600">{job.companyName}</h4>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-between mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div>
              <p>
                <span className="font-semibold">Salary: </span>
                {job.minPrice} - {job.maxPrice}{" "}
                {job.salaryType === "Monthly" ? "k" : "LPA"} / {job.salaryType}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {job.jobLocation}
              </p>
              <p>
                <span className="font-semibold">Posted On: </span>
                {formatDate(job.createdAt)}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Experience Level: </span>
                {job.experienceLevel}
              </p>
              <p>
                <span className="font-semibold">Employment Type: </span>
                {job.employmentType}
              </p>
            </div>
          </motion.div>

          <motion.div className="mb-6">
            <p className="text-lg font-semibold">Description: </p>
            <p
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: job.description }}
            ></p>
          </motion.div>

          {/* Insert In-Article Ad after Description */}
          {job.description && <InArticleAd />}

          <motion.div className="mb-6">
            <p className="text-lg font-semibold">Required Skills: </p>
            <ul>
              {job.skills?.map((skill, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 mb-2"
                >
                  <FaRegStar className="text-yellow-500 mr-2" />
                  {skill.label}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.button
            className="bg-blue hover:bg-blue text-white font-bold py-3 px-4 rounded-md transition duration-300"
            onClick={applyLink}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Apply Now
          </motion.button>
        </motion.div>

        {/* Right Side: Related Jobs (25%) */}
        <motion.div
          className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg mt-8 md:mt-0 md:ml-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold mb-4">Related Jobs</h2>
          <RelatedJobs currentJob={job} />
        </motion.div>
      </div>
    </div>
  );
};

export default JobDetails;
