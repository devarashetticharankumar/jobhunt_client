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
import { GrInstagram } from "react-icons/gr";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null); // Initially null to trigger skeleton loading
  const [isLoading, setIsLoading] = useState(true); // Loading state for skeleton

  useEffect(() => {
    // Fetch the current job details
    fetch(`${API_URL}/jobs/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setIsLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setIsLoading(false);
      });
  }, [id]);

  const applyLink = () => {
    window.open(job.ApplyLink, "_blank");
  };

  // Utility function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const jobTitle = job?.jobTitle || "Job Details";
  const jobDescription = job?.description || "Latest jobs are posted!!";

  // Construct the canonical URL
  const canonicalUrl = `${window.location.origin}/job/${id}`;

  // Helper function to inject ads
  const injectAds = (htmlContent) => {
    const paragraphs = htmlContent.split(/<\/p>/); // Split by paragraph
    return paragraphs.map((paragraph, index) => (
      <React.Fragment key={index}>
        <div
          className="text-gray-700 ql-editor"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(paragraph) + "</p>" }}
        ></div>
        {index > 0 && index % 3 === 0 && <InArticleAd />}{" "}
        {/* Show ad every 2 paragraphs */}
      </React.Fragment>
    ));
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-5 bg-[#FAFAFA] my-5">
      <Helmet>
        <title>{jobTitle.slice(0, 55)} - JobNirvana</title>
        <meta name="description" content={jobDescription.slice(0, 155)} />
        <meta property="og:title" content={jobTitle} />
        <meta
          property="og:description"
          content={jobDescription.slice(0, 155)}
        />
        <meta
          property="og:image"
          content={job?.companyLogo || "/default-logo.png"}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content={`${jobTitle}, ${job?.companyName}, ${job?.jobLocation}, ${job?.experienceLevel}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            title: job?.jobTitle,
            description: jobDescription,
            hiringOrganization: {
              "@type": "Organization",
              name: job?.companyName,
              logo: job?.companyLogo,
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: job?.jobLocation,
              },
            },
            datePosted: job?.createdAt,
            employmentType: job?.employmentType,
            baseSalary: {
              "@type": "MonetaryAmount",
              currency: "INR",
              value: {
                "@type": "QuantitativeValue",
                minValue: job?.minPrice,
                maxValue: job?.maxPrice,
                unitText: job?.salaryType,
              },
            },
            applyUrl: job?.ApplyLink,
          })}
        </script>
      </Helmet>

      {/* Skeleton Loading Effect */}
      {isLoading ? (
        <div className="flex flex-col md:flex-row justify-between">
          {/* Left Side Skeleton */}
          <div className="w-full md:w-3/4 bg-white p-3 lg:p-6 rounded-lg shadow-lg">
            <div className="animate-pulse">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-lg bg-gray-300"></div>
                <div className="ml-4">
                  <div className="h-8 w-48 bg-gray-300 mb-2"></div>
                  <div className="h-6 w-32 bg-gray-300"></div>
                </div>
              </div>

              <div className="flex flex-wrap justify-between mb-4">
                <div className="w-full md:w-1/2 mb-4">
                  <div className="h-6 w-32 bg-gray-300 mb-2"></div>
                  <div className="h-6 w-32 bg-gray-300 mb-2"></div>
                  <div className="h-6 w-32 bg-gray-300 mb-2"></div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="h-6 w-32 bg-gray-300 mb-2"></div>
                  <div className="h-6 w-32 bg-gray-300 mb-2"></div>
                  <div className="h-6 w-32 bg-gray-300 mb-2"></div>
                </div>
              </div>

              <div className="mb-6">
                <div className="h-6 w-32 bg-gray-300 mb-2"></div>
                <div className="h-6 w-full bg-gray-300 mb-2"></div>
                <div className="h-6 w-full bg-gray-300 mb-2"></div>
              </div>
            </div>
          </div>

          {/* Right Side Skeleton */}
          <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg mt-8 md:mt-0 md:ml-4">
            <div className="h-8 w-48 bg-gray-300 mb-4"></div>
            <div className="h-40 w-full bg-gray-300 mb-4"></div>
          </div>
        </div>
      ) : (
        // Job Details Content
        <div className="flex flex-col md:flex-row justify-between">
          {/* Left Side: Job Details (75%) */}
          <motion.div
            className="w-full md:w-3/4 bg-white p-3 lg:p-6 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.div className="flex flex-wrap items-center justify-center mb-6">
              <img
                src={job?.companyLogo}
                alt={job?.jobTitle}
                className="w-24 h-24 mr-4 rounded-lg"
              />
              <div>
                <h1 className="lg:text-3xl text-2xl font-bold">
                  {job?.jobTitle}
                </h1>
                <h2 className="lg:text-2xl text-lg text-gray-600">
                  {job?.companyName}
                </h2>
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
                  <span className="font-semibold">Salary: </span>
                  {job?.minPrice} - {job?.maxPrice}{" "}
                  {job?.salaryType === "Monthly" ? "k" : "LPA"} /{" "}
                  {job?.salaryType}
                </p>
                <p className="flex items-center">
                  <span className="font-semibold">Location:</span>{" "}
                  {job?.jobLocation}
                </p>
                <p>
                  <span className="font-semibold">Posted On: </span>
                  {formatDate(job?.createdAt)}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Experience Level: </span>
                  {job?.experienceLevel}
                </p>
                <p>
                  <span className="font-semibold">Employment Type: </span>
                  {job?.employmentType}
                </p>
              </div>
            </motion.div>

            <motion.div className="mb-6">
              <p className="text-xl font-semibold">Description: </p>
              {/* <div
                className="text-gray-700 ql-editor"
                dangerouslySetInnerHTML={{ __html: job?.description }}
              ></div> */}
              <div>
                {/* Inject ads into job description */}
                {injectAds(job?.description || "")}
              </div>
            </motion.div>

            {/* Insert In-Article Ad after Description */}
            <InArticleAd />

            <motion.div className="mb-6">
              <p className="text-lg font-semibold">Required Skills: </p>
              <ul>
                {job?.skills?.map((skill, index) => (
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
            <div className="mt-3 flex items-center justify-start gap-2 text-xl">
              <GrInstagram className="text-pink-600" />
              <a
                href="https://www.instagram.com/job_nirvana/"
                className="text-gray-900 hover:text-blue-800 underline font-bold"
              >
                Follow Us on Instagram For Updates
              </a>
            </div>
            <InArticleAd />
          </motion.div>

          {/* Right Side: Related Jobs (25%) */}
          <motion.div
            className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm mt-8 md:mt-0 md:ml-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold mb-4">Related Jobs</h2>
            <RelatedJobs currentJob={job} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
