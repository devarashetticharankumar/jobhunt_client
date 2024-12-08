// import React, { useEffect, useState } from "react";
// import { API_URL } from "../data/apiPath";
// import RelatedJobCard from "../components/RelatedJobsCard";

// const RelatedJobs = ({ currentJob }) => {
//   const [relatedJobs, setRelatedJobs] = useState([]);

//   useEffect(() => {
//     if (currentJob) {
//       // Fetch related jobs based on companyName, jobLocation, or experienceLevel
//       fetch(`${API_URL}/jobs/all-jobs`)
//         .then((res) => res.json())
//         .then((data) => {
//           const filteredJobs = data.filter(
//             (job) =>
//               job._id !== currentJob._id && // Exclude the current job
//               (job.companyName === currentJob.companyName ||
//                 job.jobLocation === currentJob.jobLocation ||
//                 job.experienceLevel === currentJob.experienceLevel)
//           );
//           // Limit the related jobs to 8
//           setRelatedJobs(filteredJobs.slice(0, 10));
//         });
//     }
//   }, [currentJob]);

//   if (relatedJobs.length === 0) return <p>No related jobs found.</p>;

//   return (
//     <div className="space-y-4">
//       {relatedJobs.map((job) => (
//         <div key={job._id}>
//           <RelatedJobCard data={job} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RelatedJobs;

import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";
import RelatedJobCard from "../components/RelatedJobsCard";
import GoogleAds from "../components/GoogleAds"; // Ad Component

const RelatedJobs = ({ currentJob }) => {
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    if (currentJob) {
      fetch(`${API_URL}/jobs/all-jobs`)
        .then((res) => res.json())
        .then((data) => {
          const filteredJobs = data.filter(
            (job) =>
              job._id !== currentJob._id &&
              (job.companyName === currentJob.companyName ||
                job.jobLocation === currentJob.jobLocation ||
                job.experienceLevel === currentJob.experienceLevel)
          );
          setRelatedJobs(filteredJobs.slice(0, 10));
        })
        .catch((error) => console.error("Error fetching related jobs:", error));
    }
  }, [currentJob]);

  if (relatedJobs.length === 0) return <p>No related jobs found.</p>;

  return (
    <div className="space-y-4">
      {relatedJobs.map((job, index) => (
        <React.Fragment key={job._id}>
          <RelatedJobCard data={job} />
          {/* Display Ad after every 3 jobs */}
          {(index + 1) % 3 === 0 && <GoogleAds />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default RelatedJobs;
