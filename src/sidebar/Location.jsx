import React, { useState } from "react";
import InputField from "../components/InputField";

const Location = ({ handleChange, setJobs }) => {
  return (
    <div>
      <h4 className="text-lg font-bold mb-2">Location </h4>

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
          value="hyderabad"
          title="Hyderabad"
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value="bengaluru"
          title="Bengaluru"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="chennai"
          title="Chennai"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="pune"
          title="Pune"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="mumbai"
          title="Mumbai"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="delhi"
          title="Delhi"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="kochi"
          title="Kochi"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
