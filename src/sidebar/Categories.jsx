import React from "react";
import InputField from "../components/InputField";

const Categories = ({ handleChange }) => {
  console.log(Categories);

  return (
    <div>
      <h4 className="text-lg font-bold mb-2"> Based on Qualification </h4>

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
          value="Btech"
          title="BTech"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Degree"
          title="Degree"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Internship"
          title="Internship"
          name="test"
        />
      </div>
    </div>
  );
};

export default Categories;
