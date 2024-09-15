// import React from "react";
// import InputField from "../components/InputField";

// const JobPostingData = ({ handleChange }) => {
//   const now = new Date();

//   const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
//   const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
//   const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

//   // Convert date to string
//   const today = now.toISOString().slice(0, 10);
//   const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
//   const sevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0, 10);
//   const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0, 10);

//   return (
//     <div>
//       <h4 className="text-lg font-bold mb-2">Date of Posting </h4>

//       <div>
//         <label className="sidebar-label-container">
//           <input
//             type="radio"
//             name="test"
//             id="test"
//             value=""
//             onChange={handleChange}
//           />
//           <span className="checkmark"></span>All Time
//         </label>
//         <InputField
//           handleChange={handleChange}
//           value={twentyFourHoursAgoDate}
//           title="Last 24 Hours"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value={sevenDaysAgoDate}
//           title="Last 7 Days"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value={thirtyDaysAgoDate}
//           title="Last Month"
//           name="test"
//         />
//       </div>
//     </div>
//   );
// };

// export default JobPostingData;

import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";

const JobPostingData = ({ handleChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Format these dates to ISO format (e.g., "2024-08-31")
  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const sevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0, 10);
  const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0, 10);
  // Function to check window width
  const checkMobileView = () => {
    setIsMobile(window.innerWidth <= 768); // Mobile view if width <= 768px
  };

  useEffect(() => {
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  return (
    <div>
      <h4 className="text-lg font-bold mb-2">Date of Posting</h4>

      {!isMobile ? (
        // Render radio buttons for desktop view
        <div>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="jobPostingDate"
              id="all-time"
              value=""
              onChange={handleChange}
            />
            <span className="checkmark"></span>All Time
          </label>
          <InputField
            handleChange={handleChange}
            value={twentyFourHoursAgoDate}
            title="Last 24 Hours"
            name="jobPostingDate"
          />
          <InputField
            handleChange={handleChange}
            value={sevenDaysAgoDate}
            title="Last 7 Days"
            name="jobPostingDate"
          />
          <InputField
            handleChange={handleChange}
            value={thirtyDaysAgoDate}
            title="Last Month"
            name="jobPostingDate"
          />
        </div>
      ) : (
        // Render select dropdown for mobile view
        <select
          name="jobPostingDate"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Time</option>
          <option value={twentyFourHoursAgoDate}>Last 24 Hours</option>
          <option value={sevenDaysAgoDate}>Last 7 Days</option>
          <option value={thirtyDaysAgoDate}>Last Month</option>
        </select>
      )}
    </div>
  );
};

export default JobPostingData;
