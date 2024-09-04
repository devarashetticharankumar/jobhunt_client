import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Card from "../components/Card";
import RelatedJobs from "../components/RelatedJobs";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);

  useEffect(() => {
    // Fetch the current job details
    fetch(`${API_URL}/jobs/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
      });
  }, [id]);

  const applyLink = () => {
    window.open(job.ApplyLink);
  };

  // Filter related jobs by companyName

  // Utility function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const jobTitle = job.jobTitle || "Job Details"; // Fallback title
  const jobDescription = job.description || "Latest jobs are posted!!";

  // Construct the canonical URL
  const canonicalUrl = `${window.location.origin}/jobs/${id}`;

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-5 bg-[#FAFAFA] my-5">
      <Helmet>
        <title>{jobTitle} - JobNirvana</title>
        <meta name="description" content={jobDescription} />
        <meta property="og:title" content={jobTitle} />
        <meta property="og:description" content={jobDescription} />
        <meta property="og:image" content={job.companyLogo} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <motion.div
        className="flex flex-wrap justify-center mb-4 items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <img
          src={job.companyLogo}
          alt={job.companyName}
          className="w-24 h-24 mr-4"
        />
        <div>
          <h1 className="text-2xl text-semibold font-bold ">{job.jobTitle}</h1>
          <h4 className="text-xl font-semibold">{job.companyName}</h4>
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
            <span className="font-semibold">Location:</span> {job.jobLocation}
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
      <motion.p
        className="mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="font-semibold">Description: </span>
        <p
          dangerouslySetInnerHTML={{
            __html: job.description,
          }}
          className="text-gray-600"
        ></p>
      </motion.p>
      <motion.p
        className="mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <span className="font-semibold">Required Skills: </span>
      </motion.p>
      <motion.ul
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {job.skills && (
          <ul>
            {job.skills?.map((skill, index) => (
              <li className="text-gray-600 font-medium" key={index}>
                {skill.label}
              </li>
            ))}
          </ul>
        )}
      </motion.ul>
      <motion.button
        className="bg-blue hover:bg-indigo-700 text-white  px-5 py-2 rounded-sm mt-5 mr-8"
        onClick={applyLink}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Apply Now
      </motion.button>

      {/* Related Jobs Section */}
      <RelatedJobs currentJob={job} />
    </div>
  );
};

export default JobDetails;
