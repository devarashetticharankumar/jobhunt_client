// import React, { useState } from "react";
// import InputField from "../components/InputField";

// const Location = ({ handleChange, setJobs }) => {
//   return (
//     <div>
//       <h4 className="text-lg font-bold mb-2">Location </h4>

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
//           value="hyderabad"
//           title="Hyderabad"
//           name="test"
//         />

//         <InputField
//           handleChange={handleChange}
//           value="bengaluru"
//           title="Bengaluru"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="chennai"
//           title="Chennai"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="pune"
//           title="Pune"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="mumbai"
//           title="Mumbai"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="delhi"
//           title="Delhi"
//           name="test"
//         />
//         <InputField
//           handleChange={handleChange}
//           value="kochi"
//           title="Kochi"
//           name="test"
//         />
//       </div>
//     </div>
//   );
// };

// export default Location;

import React, { useState, useEffect } from "react";
import InputField from "../components/InputField";

const Location = ({ handleChange }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("all"); // Default to "all"

  // Function to check window width for mobile view
  const checkMobileView = () => {
    setIsMobile(window.innerWidth <= 768); // Mobile view if width <= 768px
  };

  useEffect(() => {
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSelectedLocation(value); // Update the selected location
    handleChange(e); // Pass the change event to parent component
  };

  return (
    <div>
      <h4 className="text-lg font-bold mb-2">Location</h4>

      {!isMobile ? (
        // Render radio buttons for desktop view
        <div>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="all"
              value=""
              checked={selectedLocation === "all"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>All
          </label>

          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="hyderabad"
              value="hyderabad"
              checked={selectedLocation === "hyderabad"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Hyderabad
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="bengaluru"
              value="bengaluru"
              checked={selectedLocation === "bengaluru"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Bengaluru
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="chennai"
              value="chennai"
              checked={selectedLocation === "chennai"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Chennai
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="pune"
              value="pune"
              checked={selectedLocation === "pune"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Pune
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="mumbai"
              value="mumbai"
              checked={selectedLocation === "mumbai"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Mumbai
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="delhi"
              value="delhi"
              checked={selectedLocation === "delhi"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Delhi
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="kochi"
              value="kochi"
              checked={selectedLocation === "kochi"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Kochi
          </label>
        </div>
      ) : (
        // Render select dropdown for mobile view
        <select
          onChange={handleLocationChange}
          className="w-full p-2 border rounded"
          value={selectedLocation}
        >
          <option value="">All</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="bengaluru">Bengaluru</option>
          <option value="chennai">Chennai</option>
          <option value="pune">Pune</option>
          <option value="mumbai">Mumbai</option>
          <option value="delhi">Delhi</option>
          <option value="kochi">Kochi</option>
        </select>
      )}
    </div>
  );
};

export default Location;
