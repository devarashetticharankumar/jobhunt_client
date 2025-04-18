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
import NewsLetter from "../components/NewsLetter";
import ShareButton from "../components/ShareButton";
import { GiMoneyStack } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import { MdWorkHistory } from "react-icons/md";
import AdPopup from "../components/AdPopup";
import jobdetailsimg from "../../public/jobdetailsimg.jpg";


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
  // const injectAds = (htmlContent) => {
  //   const paragraphs = htmlContent.split(/<\/p>/); // Split by paragraph
  //   return paragraphs.map((paragraph, index) => (
  //     <React.Fragment key={index}>
  //       <div
  //         className="ql-editor"
  //         dangerouslySetInnerHTML={{ __html: sanitizeHtml(paragraph) + "</p>" }}
  //       ></div>
  //       {index > 0 && index % 3 === 0 && <InArticleAd />}{" "}
  //       {/* Show ad every 2 paragraphs */}
  //     </React.Fragment>
  //   ));
  // };
  // const injectAds = (htmlContent) => {
  //   const paragraphs = htmlContent.split(/<\/p>/); // Split by paragraph
  //   return paragraphs.map((paragraph, index) => (
  //     <React.Fragment key={index}>
  //       <div
  //         className="text-gray-900 ql-editor"
  //         dangerouslySetInnerHTML={{
  //           __html: paragraph + "</p>",
  //         }}
  //       ></div>
  //       {index > 0 && index % 3 === 0 && <InArticleAd />}{" "}
  //       {/* Show ad every 3 paragraphs */}
  //     </React.Fragment>
  //   ));
  // };
  const injectAds = (htmlContent) => {
    // Split paragraphs and handle any leftover <br/> tags
    const paragraphs = htmlContent
      .split(/<\/p>/)
      .filter((para) => para.trim() !== ""); // Remove empty entries
    return paragraphs.map((paragraph, index) => (
      <React.Fragment key={index}>
        <div
          className="text-gray-900 ql-editor"
          style={{ paddingTop: "0px", paddingBottom: "0px" }}
          dangerouslySetInnerHTML={{
            __html: paragraph.trim() + "</p>", // Ensure valid closing
          }}
        ></div>
        {index > 0 && index % 3 === 0 && <InArticleAd />}{" "}
        {/* Show ad every 3 paragraphs */}
      </React.Fragment>
    ));
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-5">
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
              currency: "USD",
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
            className="w-full md:w-3/4 bg-white lg:p-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >

{/*               <div className="flex flex-wrap items-center justify-center bg-cover bg-center p-4 rounded-md"
                style={{ backgroundImage: `url(${jobdetailsimg})` }}>
              <div className="flex flex-wrap items-center justify-center mb-2 lg:gap-6">
                <img
                  src={job?.companyLogo}
                  alt={job?.jobTitle}
                  className="w-24 h-24 rounded-md mb-1"
                />
                <div className="flex flex-col lg:text-left text-center ">
                  <h1 className="text-3xl font-bold text-white">
                    {job?.jobTitle}
                  </h1>
                  <h2 className="text-lg text-white">{job?.companyName}</h2>
                </div>
              </div>
            </div> */}
                        <div
              className="relative flex flex-wrap items-center justify-center bg-cover bg-center p-4 rounded-md"
              style={{ backgroundImage: `url(${jobdetailsimg})` }}
            >
              <div className="flex flex-wrap items-center justify-center mb-2 lg:gap-6">
                <img
                  src={job?.companyLogo}
                  alt={job?.jobTitle}
                  className="w-24 h-24 rounded-md mb-1"
                />
                <div className="flex flex-col lg:text-left text-center">
                  <h1 className="text-3xl font-bold text-white">
                    {job?.jobTitle}
                  </h1>
                  <h2 className="text-lg text-white">{job?.companyName}</h2>
                </div>
              </div>
              <div className="absolute bottom-2 right-2">
                <ShareButton
                  jobTitle={job.jobTitle}
                  companyName={job.companyName}
                  jobLocation={job.jobLocation}
                />
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8  shadow-sm p-4 rounded-md bg-slate-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <GiMoneyStack className="text-2xl text-green-700" />
                  <p className="text-gray-700">
                    <span className="font-semibold">Salary:</span>{" "}
                    {job?.minPrice} - {job?.maxPrice}{" "}
                    {job?.salaryType === "Monthly" ? "k" : "LPA"} /{" "}
                    {job?.salaryType}{" "}
                    <span className="text-gray-400">(Estimated)</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <MdLocationOn className="text-2xl text-blue-700" />
                  <p className="text-gray-700">
                    <span className="font-semibold">Location:</span>{" "}
                    {job?.jobLocation}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <BsFillCalendarDateFill className="text-xl text-yellow-700" />
                  <p className="text-gray-700">
                    <span className="font-semibold">Posted On:</span>{" "}
                    {formatDate(job?.createdAt)}
                  </p>
                </div>
              </div>
              <div className="space-y-3 lg:mt-0 mt-3">
                <div className="flex items-center space-x-2">
                  <FcSettings className="text-xl" />
                  <p className="text-gray-700">
                    <span className="font-semibold">Experience Level:</span>{" "}
                    {job?.experienceLevel}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <MdWorkHistory className="text-xl text-red-700" />
                  <p className="text-gray-700">
                    <span className="font-semibold">Employment Type:</span>{" "}
                    {job?.employmentType}
                  </p>
                </div>
              </div>
            </div>
            <InArticleAd />

            <motion.div className="mb-6 mt-6">
              {/* <p className="text-xl font-semibold">Description: </p> */}
              {/* <div
                className="text-gray-700 ql-editor"
                dangerouslySetInnerHTML={{ __html: job?.description }}
              ></div> */}
              <div>
                {/* Inject ads into job description */}
                {injectAds(job?.description || " ")}
              </div>
            </motion.div>

            {/* Insert In-Article Ad after Description */}
            {/* <InArticleAd /> */}

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
            <InArticleAd />

{/*             <div className="flex flex-wrap items-center justify-between gap-6 rounded-sm p-5 bg-[#d8f3ff] lg:w-3/4  min-w-fit">
              <div>
                <h4 className="text-sky-700 text-xl font-medium">
                  Interested in this job?
                </h4>
                <p className="text-sky-700 text-base">
                  Apply now to get started!
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <motion.button
                  className="bg-blue-800 hover:bg-blue text-white font-bold py-3 px-4 rounded-sm transition duration-300"
                  onClick={applyLink}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  Apply Now
                </motion.button>
              
              </div>
            </div> */}
             <div className="flex items-center">
              <p>Interested in this job? </p>{" "}
              <button
                className=" text-sky-600 font-bold underline"
                onClick={applyLink}
              >
                Apply Now
              </button>
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
            <AdPopup />
          </motion.div>

          {/* Right Side: Related Jobs (25%) */}
          <motion.div
            className="w-full md:w-1/4 bg-white mt-8 md:mt-0 md:ml-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
          <NewsLetter />
            <h2 className="text-2xl font-bold mb-4 bg-blue-600 p-1 text-white">
              Related Jobs
            </h2>
            <RelatedJobs currentJob={job} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;




