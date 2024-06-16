import React from "react";
import Button from "./Button";
import InputField from "../components/InputField";

const Salary = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h4 className="text-lg font-bold mb-2">Salary</h4>
      <div className="mb-4">
        <Button onClickHandler={handleClick} value="hourly" title="Hourly" />
        <Button onClickHandler={handleClick} value="monthly" title="Monthly" />
        <Button onClickHandler={handleClick} value="yearly" title="Yearly" />
      </div>
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
    </div>
  );
};

export default Salary;
