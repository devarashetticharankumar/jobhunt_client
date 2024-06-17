import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../data/apiPath";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);

  const applyLink = () => {
    window.open(job.ApplyLink);
  };

  return (
    <div className="max-w-screen-2xl container max-auto xl:px-24 px-4 py-5 bg-[#FAFAFA] my-5">
      <div className="flex flex-wrap justify-center mb-4 items-center">
        <img
          src={job.companyLogo}
          alt={job.companyName}
          className="w-24 h-24 mr-4"
        />
        <div>
          <h1 className="text-2xl text-semibold font-bold">{job.jobTitle}</h1>
          <h4 className="text-xl font-semibold">{job.companyName}</h4>
        </div>
      </div>
      <div className="flex flex-wrap justify-between mb-4">
        <div>
          <p>
            <span className="font-semibold">Salary:</span> {job.minPrice}k -
            {job.maxPrice}k {job.salaryType}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {job.jobLocation}
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
      </div>
      <p className="mb-4">
        <span className="font-semibold">Description: </span> {job.description}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Required Skills: </span>
      </p>
      <ul>
        {job.skills && (
          <ul>
            {job.skills?.map((skill, index) => (
              <li key={index}>{skill.label}</li>
            ))}
          </ul>
        )}
      </ul>
      <button
        className="bg-blue text-white  px-5 py-2 rounded-sm mt-5 mr-8"
        onClick={applyLink}
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobDetails;
