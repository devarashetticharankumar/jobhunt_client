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
      <h2>job_id:{id}</h2>
      <button
        className="bg-blue text-white  px-5 py-2 rounded-sm "
        onClick={applyLink}
      >
        Apply Link
      </button>
      <h1 className="text-2xl text-semibold font-bold mt-2 mb-2">
        Title:{job.jobTitle}
      </h1>
      <h4 className="text-xl font-semibold mb-2">company:{job.companyName}</h4>
      <p>Description:{job.description}</p>
      <p>postedAt:{job.createAt}</p>
    </div>
  );
};

export default JobDetails;
