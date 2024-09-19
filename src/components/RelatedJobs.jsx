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
//           setRelatedJobs(filteredJobs);
//         });
//     }
//   }, [currentJob]);

//   if (relatedJobs.length === 0) return null;

//   return (
//     <div className="mt-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {relatedJobs.map((job) => (
//           <RelatedJobCard key={job._id} data={job} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedJobs;

import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";
import RelatedJobCard from "../components/RelatedJobsCard";

const RelatedJobs = ({ currentJob }) => {
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    if (currentJob) {
      // Fetch related jobs based on companyName, jobLocation, or experienceLevel
      fetch(`${API_URL}/jobs/all-jobs`)
        .then((res) => res.json())
        .then((data) => {
          const filteredJobs = data.filter(
            (job) =>
              job._id !== currentJob._id && // Exclude the current job
              (job.companyName === currentJob.companyName ||
                job.jobLocation === currentJob.jobLocation ||
                job.experienceLevel === currentJob.experienceLevel)
          );
          // Limit the related jobs to 8
          setRelatedJobs(filteredJobs.slice(0, 8));
        });
    }
  }, [currentJob]);

  if (relatedJobs.length === 0) return <p>No related jobs found.</p>;

  return (
    <div className="space-y-4">
      {relatedJobs.map((job) => (
        <div key={job._id}>
          <RelatedJobCard data={job} />
        </div>
      ))}
    </div>
  );
};

export default RelatedJobs;
