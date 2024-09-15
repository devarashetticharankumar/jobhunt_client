// import React from "react";
// import Button from "./Button";
// import InputField from "../components/InputField";
// import { motion } from "framer-motion";

// const Salary = ({ handleChange, handleClick }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -60 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6, ease: "easeIn" }}
//     >
//       <h4 className="text-lg font-bold mb-2">Salary</h4>
//       <div className="mb-4">
//         <Button onClickHandler={handleClick} value="hourly" title="Hourly" />
//         <Button onClickHandler={handleClick} value="monthly" title="Monthly" />
//         <Button onClickHandler={handleClick} value="yearly" title="Yearly" />
//       </div>
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
//           value={30}
//           title="< 30k"
//           name="test2"
//         />
//         <InputField
//           handleChange={handleChange}
//           value={50}
//           title="<50k"
//           name="test2"
//         />
//         <InputField
//           handleChange={handleChange}
//           value={80}
//           title="<80k"
//           name="test2"
//         />
//         <InputField
//           handleChange={handleChange}
//           value={100}
//           title="<1 Lakh"
//           name="test2"
//         />
//       </div>
//     </motion.div>
//   );
// };

// export default Salary;

import React, { useState, useEffect } from "react";
import Button from "./Button";
import InputField from "../components/InputField";
import { motion } from "framer-motion";

const Salary = ({ handleChange, handleClick }) => {
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
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <h4 className="text-lg font-bold mb-2">Salary</h4>

      <div className="mb-4">
        <Button onClickHandler={handleClick} value="hourly" title="Hourly" />
        <Button onClickHandler={handleClick} value="monthly" title="Monthly" />
        <Button onClickHandler={handleClick} value="yearly" title="Yearly" />
      </div>

      {!isMobile ? (
        // Render radio buttons for desktop view
        <div>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="test"
              id="test"
              value=""
              onChange={handleChange}
            />
            <span className="checkmark"></span>All
          </label>
          <InputField
            handleChange={handleChange}
            value={30}
            title="< 30k"
            name="test2"
          />
          <InputField
            handleChange={handleChange}
            value={50}
            title="<50k"
            name="test2"
          />
          <InputField
            handleChange={handleChange}
            value={80}
            title="<80k"
            name="test2"
          />
          <InputField
            handleChange={handleChange}
            value={100}
            title="<1 Lakh"
            name="test2"
          />
        </div>
      ) : (
        // Render select dropdown for mobile view
        <select onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">All</option>
          <option value={30}>{"< 30k"}</option>
          <option value={50}>{"< 50k"}</option>
          <option value={80}>{"< 80k"}</option>
          <option value={100}>{"< 1 Lakh"}</option>
        </select>
      )}
    </motion.div>
  );
};

export default Salary;
