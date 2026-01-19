import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FaRegStar } from "react-icons/fa";
import RelatedJobs from "../components/RelatedJobs";
import InArticleAd from "../components/InArticleAd";
import { FaRupeeSign } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import sanitizeHtml from "sanitize-html";
import { GrInstagram } from "react-icons/gr";
import ResumeTips from "./ResumeTips";
import NewsLetter from "../components/NewsLetter";
import ShareButton from "../components/ShareButton";
import { GiMoneyStack } from "react-icons/gi";
import { MdLocationOn } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FcSettings } from "react-icons/fc";
import { MdWorkHistory } from "react-icons/md";
import AdPopup from "../components/AdPopup";
import ResumeAnalyzerModal from "../components/ResumeAnalyzerModal";
import EasyApplyModal from "../components/EasyApplyModal";
import JobAlertModal from "../components/JobAlertModal";
import jobdetailsimg from "../../public/jobdetailsimg.jpg";

const JobDetails = () => {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  useEffect(() => {
    const isId = /^[0-9a-fA-F]{24}$/.test(slug);
    const url = isId
      ? `${API_URL}/jobs/all-jobs/${slug}`
      : `${API_URL}/jobs/job/${slug}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setJob(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setIsLoading(false);
      });
  }, [slug]);

  const applyLink = () => {
    // Legacy Apply Link fallback if needed
    window.open(job.ApplyLink, "_blank");
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const jobTitle = job?.jobTitle || "Job Details";
  const jobDescription = job?.description || "Latest jobs are posted!!";
  const canonicalUrl = `${window.location.origin}/job/${slug}`;

  const injectAds = (htmlContent) => {
    const paragraphs = htmlContent
      .split(/<\/p>/)
      .filter((para) => para.trim() !== "");
    return paragraphs.map((paragraph, index) => (
      <React.Fragment key={index}>
        <div
          className="text-gray-900 ql-editor !px-0"
          style={{ paddingTop: "0px", paddingBottom: "0px", paddingLeft: "0px", paddingRight: "0px" }}
          dangerouslySetInnerHTML={{
            __html: paragraph.trim() + "</p>",
          }}
        ></div>
        {index > 0 && index % 5 === 0 && <InArticleAd />}
      </React.Fragment>
    ));
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-5">
      <Helmet>
        <title>{jobTitle.slice(0, 55)} - JobNirvana</title>
        <meta name="description" content={jobDescription.slice(0, 155)} />
        <meta property="og:title" content={jobTitle} />
        <meta property="og:description" content={jobDescription.slice(0, 155)} />
        <meta property="og:image" content={job?.companyLogo || "/default-logo.png"} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={`${jobTitle}, ${job?.companyName}, ${job?.jobLocation}, ${job?.experienceLevel}`} />
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
          <div className="w-full md:w-3/4 bg-white p-3 lg:p-6 rounded-lg shadow-lg">
            <div className="animate-pulse">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-lg bg-gray-300"></div>
                <div className="ml-4">
                  <div className="h-8 w-48 bg-gray-300 mb-2"></div>
                  <div className="h-6 w-32 bg-gray-300"></div>
                </div>
              </div>
              {/* Skeleton structure ... */}
              <div className="h-6 w-full bg-gray-300 mb-2"></div>
              <div className="h-40 w-full bg-gray-300 mb-4"></div>
            </div>
          </div>
        </div>
      ) : (
        // Job Details Content
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Job Details (70%) */}
          <motion.div
            className="w-full lg:w-[70%] space-y-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                <div className="absolute inset-0 bg-white/10 pattern-grid-lg"></div>
              </div>
              <div className="px-1.5 pb-1.5 md:px-8 md:pb-8">
                <div className="relative -mt-12 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6 w-full">

                    {/* Logo & Mobile Share Wrapper */}
                    <div className="flex justify-between items-end w-full md:w-auto">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-xl shadow-md p-2 flex items-center justify-center border border-gray-100 flex-shrink-0">
                        <img src={job?.companyLogo} alt={job?.companyName} loading="lazy" className="w-full h-full object-contain" />
                      </div>
                      {/* Mobile Share Button */}
                      <div className="md:hidden pb-1">
                        <ShareButton jobTitle={job.jobTitle} companyName={job.companyName} jobLocation={job.jobLocation} />
                      </div>
                    </div>

                    <div className="mb-0 md:mb-2 w-full">
                      <h1 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight mb-1">{job?.jobTitle}</h1>
                      <Link to={`/company/${encodeURIComponent(job?.companyName)}`} className="text-gray-500 font-medium text-base md:text-lg hover:text-blue-600 hover:underline transition-colors block w-fit">
                        {job?.companyName}
                      </Link>
                    </div>
                  </div>

                  {/* Desktop Share Button */}
                  <div className="hidden md:block flex-shrink-0">
                    <ShareButton jobTitle={job.jobTitle} companyName={job.companyName} jobLocation={job.jobLocation} />
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50/50 rounded-xl p-0 md:p-6 border border-blue-100/50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-green-600"><GiMoneyStack className="text-xl" /></div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Salary</p>
                        <p className="font-bold text-gray-900">{job?.minPrice} - {job?.maxPrice} {job?.salaryType === "Monthly" ? "k" : "k"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-blue-600"><MdLocationOn className="text-xl" /></div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Location</p>
                        <p className="font-bold text-gray-900">{job?.jobLocation}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-purple-600"><MdWorkHistory className="text-xl" /></div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Employment Type</p>
                        <p className="font-bold text-gray-900">{job?.employmentType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm text-orange-600"><BsFillCalendarDateFill className="text-xl" /></div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Posted On</p>
                        <p className="font-bold text-gray-900">{formatDate(job?.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* High CTR Ad - Above the Fold */}
            <InArticleAd />

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-0 md:p-8">
              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                {injectAds(job?.description || "")}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job?.skills?.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-200">
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-0 md:p-8 text-center text-white shadow-xl shadow-blue-200">
              <h3 className="text-2xl font-bold mb-2">Interested in this role?</h3>
              <p className="text-blue-100 mb-6">Take the next step in your career and apply today.</p>
              <button
                className="bg-blue-600 px-8 py-3 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2 mx-auto"
                onClick={applyLink}
              >
                Apply Now on Company Site
              </button>
              <div className="mt-6 flex justify-center items-center gap-2 text-blue-200 text-sm">
                <GrInstagram /> Follow us for more updates
              </div>
            </div>

            <InArticleAd />
          </motion.div>

          {/* Right Side: Related Jobs (30%) */}
          <motion.div
            className="w-full lg:w-[30%] space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* AI Resume Scorer Card */}


            {/* Job Alert Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <FaRegStar className="text-yellow-500" /> Job Alerts
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Get notified about similar <strong>{job?.jobTitle}</strong> jobs.
              </p>
              <button
                onClick={() => setIsAlertModalOpen(true)}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors text-sm"
              >
                Activate Alerts
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <NewsLetter />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-900">Related Jobs</h3>
              </div>
              <div className="p-4">
                <RelatedJobs currentJob={job} />
              </div>
            </div>

            <AdPopup />
          </motion.div>
        </div >
      )}

      {/* Modals */}
      <ResumeAnalyzerModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        jobTitle={job?.jobTitle}
        jobDescription={job?.description}
      />

      <EasyApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        job={job}
      />

      <JobAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        jobTitle={job?.jobTitle}
        skills={job?.skills}
      />
    </div >
  );
};

export default JobDetails;
