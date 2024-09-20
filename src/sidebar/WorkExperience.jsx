// import React from "react";
// import InputField from "../components/InputField";

// const WorkExperience = ({ handleChange }) => {
//   return (
//     <div>
//       <h4 className="text-lg font-bold mb-2">Work Experience </h4>

//       <div>
//         <label className="sidebar-label-container">
//           <input
//             type="radio"
//             name="test"
//             id="test"
//             value=""
//             onChange={handleChange}
//           />
//           <span className="checkmark"></span>Any Experience
//         </label>
//         <InputField
//           handleChange={handleChange}
//           value="0-1 years"
//           title="0-1 years"
//           name="test"
//         />

//         <InputField
//           handleChange={handleChange}
//           value="1-2 years"
//           title="1-2 years"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="3-4 years"
//           title="3-4 years"
//           name="test"
//         />

//         <InputField
//           handleChange={handleChange}
//           value="above 5 years"
//           title="more than 5 years"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="entry-level"
//           title="Entry-Level"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="mid-level"
//           title="Mid-Level"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="experienced"
//           title="Experienced"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="Intern"
//           title="Intern"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="Work remotely"
//           title="Work remotely"
//           name="test"
//         />
//       </div>
//     </div>
//   );
// };

// export default WorkExperience;

import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";

const WorkExperience = ({ handleChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Function to check window width for mobile view
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
      <h4 className="text-lg font-bold mb-2">Work Experience </h4>

      {!isMobile ? (
        // Render radio buttons for desktop view
        <div>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="experience"
              id="experience"
              value=""
              onChange={handleChange}
            />
            <span className="checkmark"></span>Any Experience
          </label>
          <InputField
            handleChange={handleChange}
            value="fresher"
            title="Fresher"
            name="experience"
          />
          <InputField
            handleChange={handleChange}
            value="1-2 years"
            title="1-2 years"
            name="experience"
          />
          <InputField
            handleChange={handleChange}
            value="3-4 years"
            title="3-4 years"
            name="experience"
          />
          <InputField
            handleChange={handleChange}
            value="above 5 years"
            title="more than 5 years"
            name="experience"
          />
          <InputField
            handleChange={handleChange}
            value="entry-level"
            title="Entry-Level"
            name="experience"
          />
          <InputField
            handleChange={handleChange}
            value="mid-level"
            title="Mid-Level"
            name="experience"
          />
          <InputField
            handleChange={handleChange}
            value="experienced"
            title="Experienced"
            name="experience"
          />
          <InputField
            handleChange={handleChange}
            value="Intern"
            title="Intern"
            name="experience"
          />
          <InputField
            handleChange={handleChange}
            value="Work remotely"
            title="Work remotely"
            name="experience"
          />
        </div>
      ) : (
        // Render select dropdown for mobile view
        <select onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">Any Experience</option>
          <option value="fresher">Fresher</option>
          <option value="1-2 years">1-2 years</option>
          <option value="3-4 years">3-4 years</option>
          <option value="above 5 years">More than 5 years</option>
          <option value="entry-level">Entry-Level</option>
          <option value="mid-level">Mid-Level</option>
          <option value="experienced">Experienced</option>
          <option value="Intern">Intern</option>
          <option value="Work remotely">Work remotely</option>
        </select>
      )}
    </div>
  );
};

export default WorkExperience;
