import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { Helmet } from "react-helmet-async";
import { FaStar, FaMapMarkerAlt, FaBriefcase, FaWallet } from "react-icons/fa";
import { FiShare2, FiArrowRight } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import RelatedJobs from "../components/RelatedJobs";
import InArticleAd from "../components/InArticleAd";
import InFeedAd from "../components/InFeedAd";
import ShareButton from "../components/ShareButton";
import GoogleAds from "../components/GoogleAds";
import ResumeAnalyzerModal from "../components/ResumeAnalyzerModal";
import JobAlertModal from "../components/JobAlertModal";

// Helper component for Sidebar Job Items (mimicking 'Jobs you might be interested in')
const SidebarJobItem = ({ job }) => (
  <Link to={`/job/${job._id}`} className="block border-b border-gray-100 last:border-0 py-4 hover:bg-gray-50 transition-colors">
    <h4 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 leading-snug">
      {job.jobTitle}
    </h4>
    <p className="text-gray-500 text-xs mb-2">{job.companyName}</p>
    <div className="flex items-center gap-3 text-xs text-gray-500">
      <span className="flex items-center gap-1"><FaStar className="text-yellow-400" /> 4.1</span>
      <span className="flex items-center gap-1"><FaMapMarkerAlt /> {job.jobLocation}</span>
    </div>
    <div className="mt-2 text-xs text-gray-400 text-right">
      Posted {calculateTimeAgo(job.createdAt)}
    </div>
  </Link>
);

const calculateTimeAgo = (dateString) => {
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
};

const JobDetails = () => {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]); // State for Similar Jobs
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

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

        // Fetch similar jobs matching Location, Title, and Company
        fetch(`${API_URL}/jobs/all-jobs`)
          .then(res => res.json())
          .then(responseData => {
            // Safely extract array
            const allJobs = Array.isArray(responseData) ? responseData : (responseData.jobs || []);

            const currentTitle = data.jobTitle?.toLowerCase() || "";
            const currentLocation = data.jobLocation?.toLowerCase() || "";
            const currentCompany = data.companyName?.toLowerCase() || "";

            const matches = allJobs.filter(j => {
              if (j._id === data._id) return false;
              const t = j.jobTitle?.toLowerCase() || "";
              const l = j.jobLocation?.toLowerCase() || "";
              const c = j.companyName?.toLowerCase() || "";

              return (
                (currentCompany && c.includes(currentCompany)) ||
                (currentLocation && l.includes(currentLocation)) ||
                (currentTitle && t.includes(currentTitle))
              );
            });

            // Fallback logic
            let result = matches;
            if (result.length < 5) {
              const others = allJobs.filter(j => j._id !== data._id && !matches.includes(j));
              result = [...matches, ...others];
            }

            // Hard Fallback (Mock Data) if absolutely nothing found
            if (result.length === 0) {
              result = [
                { _id: "mock1", jobTitle: "Software Engineer", companyName: "Tech Setup", jobLocation: "Bangalore", employmentType: "Full-time", createdAt: new Date().toISOString() },
                { _id: "mock2", jobTitle: "Frontend Dev", companyName: "Web UI Ltd", jobLocation: "Remote", employmentType: "Contract", createdAt: new Date().toISOString() },
                { _id: "mock3", jobTitle: "Product Manager", companyName: "Biz Corp", jobLocation: "Mumbai", employmentType: "Full-time", createdAt: new Date().toISOString() }
              ];
            }

            setSimilarJobs(result.slice(0, 8));
          })
          .catch(err => {
            console.log("Similar jobs error", err);
            // Error Fallback
            setSimilarJobs([
              { _id: "mock1", jobTitle: "Software Engineer", companyName: "Tech Setup", jobLocation: "Bangalore", employmentType: "Full-time", createdAt: new Date().toISOString() },
              { _id: "mock2", jobTitle: "Frontend Dev", companyName: "Web UI Ltd", jobLocation: "Remote", employmentType: "Contract", createdAt: new Date().toISOString() }
            ]);
          });
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setIsLoading(false);
      });
  }, [slug]);

  const handleShare = () => {
    const jobUrl = window.location.href;
    const shareText = `Hi Everyone,

🚀 We’re hiring for **${job.jobTitle}** at **${job.companyName}**, located in **${job.jobLocation}**!

📌 Job Details: ${jobUrl}

If you or someone in your network is interested, please check out the details.

Feel free to share this opportunity within your network.

#hiring #jobopportunity #career #${job.jobTitle.replace(/\s+/g, "")} #${job.companyName.replace(/\s+/g, "")} #${job.jobLocation.replace(/\s+/g, "")}`;

    if (navigator.share) {
      navigator.share({
        title: `Check out this job: ${job.jobTitle}`,
        text: shareText,
        url: jobUrl
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText)
        .then(() => alert("Job details copied to clipboard!"))
        .catch(() => alert("Failed to copy details"));
    }
  };

  const applyLink = () => {
    if (job?.ApplyLink) window.open(job.ApplyLink, "_blank");
  };

  const canonicalUrl = `${window.location.origin}/job/${slug}`;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!job) return <div className="text-center py-20">Job not found</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#17171d] pb-10">
      <Helmet>
        <title>{job.jobTitle} - {job.companyName}</title>
        <meta name="description" content={job.description.slice(0, 150)} />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-4 pt-6">

        {/* Layout Grid (items-stretch is default, allowing sidebar to match main content height for stickiness) */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT COLUMN (Main Content) */}
          <div className="w-full lg:w-[68%] space-y-6">

            {/* 1. HEADER CARD */}
            <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-6 md:p-8 relative overflow-hidden">
              {/* Logo Top Right (Optional placement based on Naukri) */}
              {job.companyLogo && (
                <div className="absolute top-6 right-6 w-16 h-16 border border-gray-100 rounded-lg p-1 bg-white">
                  <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain" />
                </div>
              )}

              <h1 className="text-xl md:text-2xl font-bold text-[#091e42] mb-1">{job.jobTitle}</h1>

              <div className="flex items-center gap-2 mb-4 text-sm">
                <Link to={`/company/${encodeURIComponent(job.companyName)}`} className="font-semibold text-gray-700 hover:text-blue-600 hover:underline">
                  {job.companyName}
                </Link>
                <span className="flex items-center gap-1 text-orange-500 font-bold text-xs"><FaStar /> 4.1</span>
                <span className="text-gray-400 text-xs">(423 Reviews)</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-8 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-gray-400" />
                  <span>{job.experienceLevel || "0 - 5 years"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaWallet className="text-gray-400" />
                  <span>{job.minPrice} - {job.maxPrice} {job.salaryType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>{job.jobLocation}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center border-t border-gray-100 pt-5 mt-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Posted: <b>{calculateTimeAgo(job.createdAt)}</b></span>
                  <GoDotFill className="text-[6px] text-gray-300" />
                  <span>Openings: <b>1</b></span>
                  <GoDotFill className="text-[6px] text-gray-300" />
                  <span>Applicants: <b>406</b></span>
                </div>

                <div className="ml-auto flex gap-3">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors"
                  >
                    <FiShare2 /> Share
                  </button>
                  {/* Save button removed for monetization optimization */}
                </div>
              </div>
            </div>

            {/* 2. JOB HIGHLIGHTS (If applies, else generic) */}
            <div className="my-2">
              <InArticleAd />
            </div>

            {/* 3. JOB DESCRIPTION */}
            <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <h2 className="text-lg font-bold text-[#091e42] mb-4">Job description</h2>

              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed mb-6">
                {(() => {
                  const content = job.description || "";
                  // Split content by closing paragraph tags
                  const paragraphs = content.split(/<\/p>/i);
                  // Filter empty strings and append closing tag back (except strictly empty/whitespace only chunks if any)
                  // Note: split consumes the delimiter.

                  if (paragraphs.length <= 6) {
                    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
                  }

                  const elements = [];
                  const interval = 3; // Inject every 3 paragraphs
                  let buffer = "";
                  let pCount = 0;

                  paragraphs.forEach((part, index) => {
                    if (!part.trim()) return;

                    // Reconstruct paragraph
                    buffer += part + "</p>";
                    pCount++;

                    if (pCount === interval) {
                      elements.push(<div key={`chunk-${index}`} dangerouslySetInnerHTML={{ __html: buffer }} />);
                      elements.push(
                        <div key={`ad-insert-${index}`} className="my-6">
                          <InFeedAd />
                        </div>
                      );
                      buffer = "";
                      pCount = 0;
                    }
                  });

                  // Flush remaining buffer
                  if (buffer) {
                    elements.push(<div key="chunk-final" dangerouslySetInnerHTML={{ __html: buffer }} />);
                  }

                  return elements;
                })()}
              </div>

              {/* Role & Industry Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mt-6 pt-6 border-t border-gray-100 text-sm">
                <div className="space-y-1">
                  <span className="block text-gray-400 text-xs uppercase tracking-wide">Role</span>
                  <span className="font-semibold text-gray-800">{job.jobTitle}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-gray-400 text-xs uppercase tracking-wide">Industry Type</span>
                  <span className="font-semibold text-gray-800">IT Services & Consulting</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-gray-400 text-xs uppercase tracking-wide">Department</span>
                  <span className="font-semibold text-gray-800">Engineering - Software & QA</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-gray-400 text-xs uppercase tracking-wide">Employment Type</span>
                  <span className="font-semibold text-gray-800">{job.employmentType}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-gray-400 text-xs uppercase tracking-wide">Role Category</span>
                  <span className="font-semibold text-gray-800">Software Development</span>
                </div>
              </div>

              {/* Ad between Table and Skills (Revenue Optimization) */}
              <div className="my-6">
                <InArticleAd />
              </div>

              {/* Skills */}
              <div className="mt-8">
                <h3 className="text-base font-bold text-[#091e42] mb-3">Key Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 text-sm font-medium hover:border-blue-400 hover:text-blue-600 cursor-default bg-white">
                      {typeof skill === 'object' ? skill.label : skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="my-4">
              <InFeedAd />
            </div>

            {/* Apply Section (Moved here) */}
            <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Interested in this job?</h3>
                <p className="text-sm text-gray-500">Apply now to get noticed by recruiters.</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={applyLink}
                  className="text-gray-400 hover:text-blue-600 font-bold py-2 text-sm transition-all flex items-center gap-2"
                >
                  Apply on company site <FiArrowRight className="text-[10px]" />
                </button>
              </div>
            </div>

            {/* Similar Jobs Section */}
            {similarJobs.length > 0 && (
              <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-6 md:p-8">
                <h3 className="font-bold text-[#091e42] mb-4 text-base">Similar jobs</h3>
                <div className="flex flex-col gap-4">
                  {similarJobs.map(simJob => (
                    <Link key={simJob._id} to={`/job/${simJob._id}`} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm mb-1">{simJob.jobTitle}</h4>
                          <p className="text-gray-600 text-xs mb-2">{simJob.companyName}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><FaMapMarkerAlt /> {simJob.jobLocation}</span>
                            <span className="flex items-center gap-1"><FaBriefcase /> {simJob.employmentType}</span>
                          </div>
                        </div>
                        {simJob.companyLogo && <img src={simJob.companyLogo} alt="logo" className="w-10 h-10 object-contain" />}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="my-4">
              <InArticleAd />
            </div>

            {/* 5. ABOUT COMPANY */}
            <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-6 md:p-8">
              <h2 className="text-lg font-bold text-[#091e42] mb-4">About Company</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {job.companyDescription || (
                  <>
                    Learn more about <Link to={`/company/${encodeURIComponent(job.companyName)}`} className="text-blue-600 hover:underline">{job.companyName}</Link>. We are hiring for talented individuals to join our team.
                  </>
                )}
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-sm mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-gray-400 text-xs">Address</span>
                    <span className="text-gray-700 font-medium">{job.jobLocation || "Location available on request"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. WARNING (Safety Tip) */}
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 flex gap-4 items-start">
              <div className="text-xl">⚠️</div>
              <div>
                <h4 className="font-bold text-gray-800 text-sm">Beware of Imposters</h4>
                <p className="text-xs text-gray-600 mt-1">
                  JobNirvana never requests money for job applications. If someone asks for payment, please report it immediately. <a href="#" className="text-blue-600 hover:underline">Read more</a>
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (Sidebar) */}
          <div className="w-full lg:w-[32%] space-y-6">

            {/* Similar Jobs Widget */}
            <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-5 border border-gray-100">
              <h3 className="font-bold text-[#091e42] mb-4 text-base">Jobs you might be interested in</h3>

              <div className="flex flex-col gap-4">
                {similarJobs.slice(0, 5).map((job) => (
                  <Link key={job._id} to={`/job/${job._id}`} className="block bg-white hover:bg-gray-50 transition-colors py-3 border-b border-gray-100 last:border-0 relative">
                    <div className="flex justify-between items-start gap-3">
                      {/* Left Content */}
                      <div className="w-full">
                        <h4 className="font-bold text-[#091e42] text-[15px] mb-0.5 leading-snug">{job.jobTitle}</h4>
                        <p className="text-[#445571] text-sm mb-1.5">{job.companyName}</p>

                        <div className="flex items-center gap-2 text-xs text-[#445571] mb-3">
                          <span className="flex items-center font-bold text-[#1a1a1a]"><FaStar className="text-orange-400 mr-1 text-sm" /> 3.7</span>
                          <span className="text-gray-300">|</span>
                          <span>7135 reviews</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-[#445571]">
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span>{job.jobLocation}</span>
                        </div>
                      </div>

                      {/* Right Logo */}
                      {job.companyLogo && (
                        <div className="w-12 h-12 flex-shrink-0 border border-gray-100 rounded p-1 bg-white flex items-center justify-center">
                          <img src={job.companyLogo} alt="logo" className="w-full h-full object-contain" />
                        </div>
                      )}
                    </div>

                    {/* Posted Date Absolute */}
                    <div className="absolute bottom-3 right-0 text-[11px] text-gray-400">
                      Posted {calculateTimeAgo(job.createdAt)}
                    </div>
                  </Link>
                ))}
              </div>

              <Link to="/jobs" className="block text-right text-sm font-bold text-blue-600 mt-4 hover:underline">
                View all
              </Link>
            </div>

            {/* Reviews Widget */}
            <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-5 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-[#091e42] text-sm">Reviews</h3>
                <a href="#" className="text-xs text-blue-600 font-bold">Read all 423 reviews</a>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {job.jobTitle} in {job.jobLocation}
              </div>

              {/* Fake Review Item */}
              <div className="border-t border-gray-100 pt-3">
                <div className="flex gap-1 mb-1 text-orange-400 text-xs"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="text-gray-300" /></div>
                <p className="text-xs text-gray-600 italic">"Great work culture and supportive management..."</p>
                <p className="text-xs text-gray-400 mt-1">- Anonymous Employee</p>
              </div>
            </div>

            {/* Ad Unit */}
            <div className="sticky top-24 min-h-[250px] flex items-center justify-center">
              <GoogleAds />
            </div>

          </div>

        </div>
      </div>

      {/* Modals */}
      <JobAlertModal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)} jobTitle={job.jobTitle} skills={job.skills} />
      <ResumeAnalyzerModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} jobTitle={job.jobTitle} jobDescription={job.description} />

    </div>
  );
};

export default JobDetails;
