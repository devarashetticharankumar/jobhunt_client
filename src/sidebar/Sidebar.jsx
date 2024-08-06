// import React from "react";
// import Location from "./Location";
// import Salary from "./Salary";
// import JobPostingData from "./JobPostingData";
// import WorkExperience from "./WorkExperience";
// import EmploymentType from "./EmploymentType";

// const Sidebar = ({ handleChange, handleClick, setJobs }) => {
//   return (
//     <div className="space-y-5">
//       <h3 className="text-xl font-bold mb-2">Filters</h3>
//       <Location handleChange={handleChange} setJobs={setJobs} />
//       <Salary handleChange={handleChange} handleClick={handleClick} />
//       <JobPostingData handleChange={handleChange} />
//       <WorkExperience handleChange={handleChange} />
//       <EmploymentType handleChange={handleChange} />
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { motion } from "framer-motion";
import Location from "./Location";
import Salary from "./Salary";
import JobPostingData from "./JobPostingData";
import WorkExperience from "./WorkExperience";
import EmploymentType from "./EmploymentType";

const Sidebar = ({ handleChange, handleClick, setJobs }) => {
  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h3 className="text-xl font-bold mb-2">Filters</h3>
      <Location handleChange={handleChange} setJobs={setJobs} />
      <Salary handleChange={handleChange} handleClick={handleClick} />
      <JobPostingData handleChange={handleChange} />
      <WorkExperience handleChange={handleChange} />
      <EmploymentType handleChange={handleChange} />
    </motion.div>
  );
};

export default Sidebar;
