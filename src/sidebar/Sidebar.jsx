// import React from "react";
// import { motion } from "framer-motion";
// import Location from "./Location";
// import Salary from "./Salary";
// import WorkExperience from "./WorkExperience";
// import EmploymentType from "./EmploymentType";
// import Categories from "./Categories";
// import JobPostingData from "./JobPostingData";

// const Sidebar = ({ handleChange, handleClick, setJobs }) => {
//   return (
//     <motion.div
//       className="space-y-5"
//       initial={{ opacity: 0, x: -60 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//     >
//       <h3 className="text-xl font-bold mb-2">Filters</h3>
//       <Location handleChange={handleChange} setJobs={setJobs} />
//       <Salary handleChange={handleChange} handleClick={handleClick} />
//       <WorkExperience handleChange={handleChange} />
//       <EmploymentType handleChange={handleChange} />
//     </motion.div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Location from "./Location";
import Salary from "./Salary";
import WorkExperience from "./WorkExperience";
import EmploymentType from "./EmploymentType";
import JobPostingData from "./JobPostingData";

const Sidebar = ({ handleChange, handleClick, setJobs }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openSections, setOpenSections] = useState({
    location: false,
    salary: false,
    jobPostingData: false,
    workExperience: false,
    employmentType: false,
  });

  // Function to handle window resize
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // Handle section toggle
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className={`space-y-5 ${isMobile ? "p-4" : "p-6 bg-white shadow-sm border border-gray-100"} rounded-xl text-left`}
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
        {!isMobile && <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline" onClick={() => window.location.reload()}>Reset</span>}
      </div>

      {isMobile ? (
        // Flex layout for mobile view
        <div className="flex flex-col gap-3">
          {Object.keys(openSections).map((section) => (
            <div key={section} className="w-full">
              <button
                className="w-full p-3 text-left bg-gray-50 text-gray-800 font-medium rounded-lg flex justify-between items-center"
                onClick={() => toggleSection(section)}
              >
                {section === "jobPostingData" ? "Date Posted" : section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                <span className={`transform transition-transform ${openSections[section] ? "rotate-180" : ""}`}>▼</span>
              </button>
              {openSections[section] && (
                <div className="p-4 bg-white border border-gray-100 rounded-lg mt-2">
                  {section === "location" && (
                    <Location handleChange={handleChange} setJobs={setJobs} />
                  )}
                  {section === "salary" && (
                    <Salary
                      handleChange={handleChange}
                      handleClick={handleClick}
                    />
                  )}
                  {section === "jobPostingData" && (
                    <JobPostingData handleChange={handleChange} />
                  )}
                  {section === "workExperience" && (
                    <WorkExperience handleChange={handleChange} />
                  )}
                  {section === "employmentType" && (
                    <EmploymentType handleChange={handleChange} />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Regular layout for desktop view
        <div className="space-y-6 divide-y divide-gray-100">
          <div className="pt-2"><Location handleChange={handleChange} setJobs={setJobs} /></div>
          <div className="pt-6"><Salary handleChange={handleChange} handleClick={handleClick} /></div>
          <div className="pt-6"><JobPostingData handleChange={handleChange} /></div>
          <div className="pt-6"><WorkExperience handleChange={handleChange} /></div>
          <div className="pt-6"><EmploymentType handleChange={handleChange} /></div>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
