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
              id="New York, NY"
              value="New York, NY"
              checked={selectedLocation === "New York, NY"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>New York, NY
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="San Francisco, CA"
              value="San Francisco, CA"
              checked={selectedLocation === "San Francisco, CA"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>San Francisco, CA
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="Los Angeles, CA"
              value="Los Angeles, CA"
              checked={selectedLocation === "Los Angeles, CA"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Los Angeles, CA
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="Seattle, WA"
              value="Seattle, WA"
              checked={selectedLocation === "Seattle, WA"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Seattle, WA
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="Washington, DC"
              value="Washington, DC"
              checked={selectedLocation === "Washington, DC"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Washington, DC
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="Austin, TX"
              value="Austin, TX"
              checked={selectedLocation === "Austin, TX"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Austin, TX
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="Boston, MA"
              value="Boston, MA"
              checked={selectedLocation === "Boston, MA"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Boston, MA
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="Chicago, IL"
              value="Chicago, IL"
              checked={selectedLocation === "Chicago, IL"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Chicago, IL
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="Dallas, TX"
              value="Dallas, TX"
              checked={selectedLocation === "Dallas, TX"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Dallas, TX
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="Atlanta, GA"
              value="Atlanta, GA"
              checked={selectedLocation === "Atlanta, GA"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Atlanta, GA
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="Denver, CO"
              value="Denver, CO"
              checked={selectedLocation === "Denver, CO"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Denver, CO
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="Houston, TX"
              value="Houston, TX"
              checked={selectedLocation === "Houston, TX"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Houston, TX
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="San Diego, CA"
              value="San Diego, CA"
              checked={selectedLocation === "San Diego, CA"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>San Diego, CA
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="Charlotte, NC"
              value="Charlotte, NC"
              checked={selectedLocation === "Charlotte, NC"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Charlotte, NC
          </label>
          <label className="sidebar-label-container">
            <input
              type="radio"
              name="location"
              id="Phoenix, AZ"
              value="Phoenix, AZ"
              checked={selectedLocation === "Phoenix, AZ"}
              onChange={handleLocationChange}
            />
            <span className="checkmark"></span>Phoenix, AZ
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
          <option value="New York, NY">New York, NY</option>
          <option value="San Francisco, CA">San Francisco, CA</option>
          <option value="Los Angeles, CA">Los Angeles, CA</option>
          <option value="Seattle, WA">Seattle, WA</option>
          <option value="Washington, DC">Washington, DC</option>
          <option value="Austin, TX">Austin, TX</option>
          <option value="Boston, MA">Boston, MA</option>
          <option value="Chicago, IL">Chicago, IL</option>
          <option value="Dallas, TX">Dallas, TX</option>
          <option value="Atlanta, GA">Atlanta, GA</option>
          <option value="Denver, CO">Denver, CO</option>
          <option value="Houston, TX">Houston, TX</option>
          <option value="San Diego, CA">San Diego, CA</option>
          <option value="Charlotte, NC">Charlotte, NC</option>
          <option value="Phoenix, AZ">Phoenix, AZ</option>
        </select>
      )}
    </div>
  );
};

export default Location;
