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
          value={"canada"}
          title={"Canada"}
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value="new york"
          title="New York"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="india"
          title="India"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="boston"
          title="Boston"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
