import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../data/apiPath";

const JobMarquee = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_URL}/jobs/all-jobs`);
        const data = await response.json();

        // Log to check the fetched data
        console.log("Fetched jobs:", data);

        // Ensure jobs are sorted based on the createdAt field
        const latestJobs = data
          .filter((job) => job.createdAt) // Filter out jobs without createdAt
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);

        setJobs(latestJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  if (jobs.length === 0) {
    return <p>Loading jobs...</p>; // Display message when jobs are not fetched
  }

  return (
    <div className=" relative overflow-hidden max-w-screen-2xl container mx-auto xl:px-24 px-4 py-5 bg-[#FAFAFA]">
      <div
        className="absolute w-full flex space-x-8 animate-marquee hover:animate-none"
        style={{ animationDuration: `${jobs.length * 10}s` }}
      >
        {jobs.map((job) => (
          <Link
            key={job._id} // Use job._id for the unique key
            to={`/job/${job._id}`} // Redirect to job details page
            className="p-4 bg-gray-100 text-black rounded-lg shadow-md flex-shrink-0"
          >
            {/* Check if the company logo is present, else use a placeholder */}
            {job.companyLogo ? (
              <img
                src={job.companyLogo}
                alt={`${job.companyName} logo`}
                className="w-12 h-12 object-contain mb-2"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-300 flex items-center justify-center mb-2">
                <span className="text-white">No Logo</span>
              </div>
            )}
            <h3 className="font-semibold">{job.jobTitle}</h3>
            <p className="text-sm">{job.companyName}</p>
            <p className="text-sm text-gray-600">{job.jobLocation}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobMarquee;
