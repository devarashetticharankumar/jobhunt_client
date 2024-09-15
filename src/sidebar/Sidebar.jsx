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

const Sidebar = ({ handleChange, handleClick, setJobs }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openSections, setOpenSections] = useState({
    location: false,
    salary: false,
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
      className={`space-y-5 ${isMobile ? "p-4" : " "} ${
        isMobile ? "bg-white" : " "
      } rounded-md`}
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h3 className="text-xl font-bold mb-2 text-gray-800">Filters</h3>

      {isMobile ? (
        // Flex layout for mobile view
        <div className="flex flex-col gap-3">
          {Object.keys(openSections).map((section) => (
            <div key={section} className="w-full">
              <button
                className="w-full p-2 text-left bg-gray-50 text-black border-black rounded-md"
                onClick={() => toggleSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
              {openSections[section] && (
                <div className="p-2 bg-white border border-gray-200 rounded-md shadow-sm mt-2">
                  {section === "location" && (
                    <Location handleChange={handleChange} setJobs={setJobs} />
                  )}
                  {section === "salary" && (
                    <Salary
                      handleChange={handleChange}
                      handleClick={handleClick}
                    />
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
        <div>
          <Location handleChange={handleChange} setJobs={setJobs} />
          <Salary handleChange={handleChange} handleClick={handleClick} />
          <WorkExperience handleChange={handleChange} />
          <EmploymentType handleChange={handleChange} />
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
