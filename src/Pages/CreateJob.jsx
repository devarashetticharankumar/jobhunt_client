import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

import { API_URL } from "../data/apiPath";
const CreateJob = () => {
  const [selectedOptions, setSelectedOPtions] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOptions;
    // console.log(data);
    fetch(`${API_URL}/post-job`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result.acknowledged === true) {
          alert("job posted successfully");
        }
        reset();
      });
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "Python", label: "Python" },
    { value: "C++", label: "C++" },
    { value: "React", label: "React" },
    { value: "Java", label: "Java" },
    { value: "Redux", label: "Redux" },
    { value: "HTML", label: "HTML" },
    { value: "Angular", label: "Angular" },
    { value: "C", label: "C" },
    { value: "CSS", label: "CSS" },
  ];

  const [minDate, setMinDate] = useState(getTodayDateString());

  function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return (
    <div className="max-w-screen-2xl container max-auto xl:px-24 px-4">
      {/* form  */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* first row */}

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                placeholder="Ex: Web Developer"
                {...register("jobTitle")}
                required="true"
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name </label>
              <input
                type="text"
                placeholder="Ex: Google Inc."
                {...register("companyName")}
                required="true"
                className="create-job-input"
              />
            </div>
          </div>
          {/* second row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="number"
                placeholder="$13k"
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="number"
                placeholder="$50k"
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>
          {/* third row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value="">Choose your Salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="Ex: India"
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>
          {/* Fourth row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job posting Date</label>
              <input
                type="date"
                placeholder="DD-MM-YY"
                min={minDate}
                value={minDate}
                defaultValue={minDate}
                onChange={(e) => setMinDate(e.target.value)}
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value="">Choose your experience</option>
                <option value="Any Experience">Any Experience</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-4 years">3-4 years</option>
                <option value="4-5 years">4-5 years</option>
                <option value="above 5 years">more than 5</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work Remotely</option>
              </select>
            </div>
          </div>
          {/* fifth row */}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets:</label>
            <CreatableSelect
              defaultValue={selectedOptions}
              onChange={setSelectedOPtions}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          {/* sixth row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder="paste your company logo URL: https://logo.com/img1"
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
              >
                <option value="">Choose your employment type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* seventh row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              {...register("description")}
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-400"
              rows={6}
              placeholder="Job Description"
              defaultValue={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
              }
            />
          </div>

          {/*  eighth row*/}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted by</label>
            <input
              type="email"
              placeholder="Your email"
              {...register("postedBy")}
              className="create-job-input"
              required="true"
            />
          </div>
          {/*  nine row*/}
          <div className="w-full">
            <label className="block mb-2 text-lg">Apply Link</label>
            <input
              type="url"
              placeholder="Apply Link"
              {...register("ApplyLink")}
              className="create-job-input"
            />
          </div>

          <input
            type="submit"
            className="bg-blue hover:bg-indigo-700 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer "
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
