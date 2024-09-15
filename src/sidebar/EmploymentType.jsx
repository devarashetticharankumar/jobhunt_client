// import React from "react";
// import InputField from "../components/InputField";

// const EmploymentType = ({ handleChange }) => {
//   return (
//     <div>
//       <h4 className="text-lg font-bold mb-2">Type of Employment </h4>

//       <div>
//         <label className="sidebar-label-container">
//           <input
//             type="radio"
//             name="test"
//             id="test"
//             value=""
//             onChange={handleChange}
//           />
//           <span className="checkmark"></span>All
//         </label>
//         <InputField
//           handleChange={handleChange}
//           value="Full-time"
//           title="Full-time"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="Part-time"
//           title="Part-time"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="Internship"
//           title="Internship"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="Freelance"
//           title="Freelance"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="Temporary"
//           title="Temporary"
//           name="test"
//         />
//       </div>
//     </div>
//   );
// };

// export default EmploymentType;

import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";

const EmploymentType = ({ handleChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Function to check the window width
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
      <h4 className="text-lg font-bold mb-2">Type of Employment</h4>

      {/* Render radio buttons for desktop view */}
      {!isMobile ? (
        <div>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="test"
              id="all"
              value=""
              onChange={handleChange}
            />
            <span className="checkmark"></span>All
          </label>
          <InputField
            handleChange={handleChange}
            value="Full-time"
            title="Full-time"
            name="test"
          />
          <InputField
            handleChange={handleChange}
            value="Part-time"
            title="Part-time"
            name="test"
          />
          <InputField
            handleChange={handleChange}
            value="Internship"
            title="Internship"
            name="test"
          />
          <InputField
            handleChange={handleChange}
            value="Freelance"
            title="Freelance"
            name="test"
          />
          <InputField
            handleChange={handleChange}
            value="Temporary"
            title="Temporary"
            name="test"
          />
        </div>
      ) : (
        // Render select dropdown for mobile view
        <select onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">All</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Freelance">Freelance</option>
          <option value="Temporary">Temporary</option>
        </select>
      )}
    </div>
  );
};

export default EmploymentType;
