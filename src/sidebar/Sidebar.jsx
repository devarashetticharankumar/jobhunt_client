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

import Location from "./Location";
import Salary from "./Salary";
import WorkExperience from "./WorkExperience";
import EmploymentType from "./EmploymentType";
import JobPostingData from "./JobPostingData";
import InArticleAd from "../components/InArticleAd";

const Sidebar = ({ handleChange, handleClick, setJobs }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openSections, setOpenSections] = useState({
    location: true,
    salary: true,
    jobPostingData: true,
    workExperience: true,
    employmentType: true,
  });

  const handleResize = () => setIsMobile(window.innerWidth <= 768);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderSection = (key, title, Component, props = {}) => (
    <div className="py-5 border-b border-gray-200 last:border-0">
      <div
        className="flex items-center justify-between cursor-pointer mb-3"
        onClick={() => toggleSection(key)}
      >
        <h4 className="font-bold text-gray-900 text-sm uppercaset tracking-wide">{title}</h4>
        <span className={`text-gray-400 transform transition-transform duration-200 ${openSections[key] ? "rotate-180" : ""}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${openSections[key] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="text-sm text-gray-600 space-y-2">
          <Component handleChange={handleChange} {...props} />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-left ${isMobile ? 'mb-6' : ''}`}>
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H21M7 12H17M10 18H14" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          All Filters
        </h3>
        {!isMobile && (
          <button
            className="text-xs font-semibold text-blue-600 hover:underline transition-colors"
            onClick={() => window.location.reload()}
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col">
        {renderSection("location", "Location", Location, { setJobs })}
        {renderSection("salary", "Salary", Salary, { handleClick })}
        {renderSection("workExperience", "Experience", WorkExperience)}
        {renderSection("jobPostingData", "Mode of Hire", JobPostingData)}
        {renderSection("employmentType", "Department", EmploymentType)}
      </div>

      {/* Standard Ad Box */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="bg-gray-50 rounded border border-dashed border-gray-300 min-h-[200px] flex flex-col items-center justify-center p-4">
          <span className="text-xs text-gray-400 mb-2">Advertisement</span>
          <InArticleAd />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
