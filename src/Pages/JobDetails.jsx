import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FaRegStar } from "react-icons/fa";
import RelatedJobs from "../components/RelatedJobs";
import InArticleAd from "../components/InArticleAd"; // Import the InArticleAd component
import { FaRupeeSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import sanitizeHtml from "sanitize-html";

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
        <meta name="robots" content="index, follow" />
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
              alt={job.jobTitle}
              className="w-28 h-28 mr-4 rounded-lg"
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
              <p className="flex items-center">
                <span className="font-semibold">Salary: </span>{" "}
                {/* <FaRupeeSign className="text-sm font-thin" /> */}
                {job.minPrice} - {job.maxPrice}{" "}
                {job.salaryType === "Monthly" ? "k" : "LPA"} / {job.salaryType}
              </p>
              <p className="flex items-center">
                <span className="font-semibold">Location:</span>{" "}
                {/* <FaLocationDot className="text-sm font-thin" /> */}
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
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: job.description }}
            ></div>
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

          <div className="flex flex-wrap items-center justify-between gap-6 rounded-md p-5 bg-[#d8f3ff] lg:w-3/4  min-w-fit">
            <div>
              <h4 className="text-sky-700 text-xl font-medium">
                Interested in this job?
              </h4>
              <p className="text-sky-700 text-base">
                Apply now to get started!
              </p>
            </div>
            <div>
              <motion.button
                className="bg-blue hover:bg-blue text-white font-bold py-3 px-4 rounded-md transition duration-300"
                onClick={applyLink}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Apply Now
              </motion.button>
            </div>
          </div>
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
