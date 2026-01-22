import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { API_URL } from "../data/apiPath";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PageHeader from "../components/PageHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const UpdateJob = () => {
  const { id } = useParams();
  const {
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    companyLogo,
    employmentType,
    description,
    postedBy,
    skills,
    ApplyLink,
  } = useLoaderData();

  const [selectedOptions, setSelectedOptions] = useState(skills || []);
  const [jobDescription, setJobDescription] = useState(description || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOptions;
    data.description = jobDescription;

    fetch(`${API_URL}/jobs/update-job/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.acknowledged) {
          toast.success("Job updated successfully!");
        } else {
          toast.error(`${result.message}`);
        }
        reset();
      })
      .catch((error) => {
        console.error("Error updating job:", error);
        toast.error("An error occurred while updating the job.");
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
    { value: "SQL", label: "SQL" },
    { value: "mySQL", label: "mySQL" },
    { value: "communication", label: "communication" },
    { value: "C#", label: "C#" },
    { value: "GoLang", label: "GoLang" },
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["blockquote", "code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "header",
    "list",
    "bullet",
    "indent",
    "align",
    "direction",
    "link",
    "image",
    "video",
    "blockquote",
    "code-block",
    "script",
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12 pt-0 mx-auto transition-colors">
      <Helmet>
        <title>Update Job - JobNirvana</title>
        <meta
          name="description"
          content="Update your job posting on JobNirvana"
        />
        <link rel="canonical" href="https://jobnirvana.netlify.app/edit-job" />
      </Helmet>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 py-16 px-4 mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Update Job Listing
          </h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            Edit your job details to keep candidates informed.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 border-b pb-4 border-gray-100 dark:border-gray-700">
              Edit Job Details
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Row 1: Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Job Title</label>
                  <input
                    type="text"
                    defaultValue={jobTitle}
                    placeholder="e.g. Senior Full Stack Developer"
                    {...register("jobTitle")}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Company Name</label>
                  <input
                    type="text"
                    defaultValue={companyName}
                    placeholder="e.g. Acme Corp"
                    {...register("companyName")}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
                  />
                </div>
              </div>

              {/* Row 2: Salary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Minimum Salary</label>
                  <input
                    type="text"
                    defaultValue={minPrice}
                    placeholder="e.g. $50k"
                    {...register("minPrice")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Maximum Salary</label>
                  <input
                    type="text"
                    defaultValue={maxPrice}
                    placeholder="e.g. $120k"
                    {...register("maxPrice")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
                  />
                </div>
              </div>

              {/* Row 3: Salary Type & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Salary Type</label>
                  <div className="relative">
                    <select
                      {...register("salaryType")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800 appearance-none cursor-pointer"
                    >
                      <option value={salaryType}>{salaryType}</option>
                      <option value="Hourly">Hourly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Job Location</label>
                  <input
                    type="text"
                    defaultValue={jobLocation}
                    placeholder="e.g. New York, Remote"
                    {...register("jobLocation")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
                  />
                </div>
              </div>

              {/* Row 4: Date & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Posting Date</label>
                  <input
                    type="date"
                    defaultValue={postingDate}
                    {...register("postingDate")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Experience Level</label>
                  <div className="relative">
                    <select
                      {...register("experienceLevel")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800 appearance-none cursor-pointer"
                    >
                      <option value={experienceLevel}>{experienceLevel}</option>
                      <option value="Any Experience">Any Experience</option>
                      <option value="fresher">Fresher</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-4 years">3-4 years</option>
                      <option value="Not Mention">Not Mention</option>
                      <option value="above 5 years">5+ Years</option>
                      <option value="entry-level">Entry-Level</option>
                      <option value="mid-level">Mid-Level</option>
                      <option value="experienced">Senior-Level</option>
                      <option value="Intern">Internship</option>
                      <option value="Work remotely">Remote</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 5: Skills */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Required Skills</label>
                <CreatableSelect
                  value={selectedOptions}
                  onChange={setSelectedOptions}
                  options={options}
                  isMulti
                  className="basic-multi-select"
                  classNamePrefix="select"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderRadius: '0.75rem',
                      padding: '4px',
                      borderColor: state.isFocused ? '#6366f1' : '#e5e7eb',
                      boxShadow: state.isFocused ? '0 0 0 4px rgba(99, 102, 241, 0.1)' : 'none',
                      backgroundColor: '#f9fafb',
                      "&:hover": { borderColor: '#d1d5db' }
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: '#e0e7ff',
                      borderRadius: '0.375rem',
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: '#4338ca',
                      fontWeight: 600,
                    }),
                  }}
                />
              </div>

              {/* Row 6: Logo & Employment Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Company Logo URL</label>
                  <input
                    type="url"
                    defaultValue={companyLogo}
                    placeholder="https://company.com/logo.png"
                    {...register("companyLogo")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Employment Type</label>
                  <div className="relative">
                    <select
                      {...register("employmentType")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800 appearance-none cursor-pointer"
                    >
                      <option value={employmentType}>{employmentType}</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Temporary">Temporary</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Contract">Contract</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 7: Job Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Job Description</label>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
                  <ReactQuill
                    value={jobDescription}
                    onChange={setJobDescription}
                    modules={modules}
                    formats={formats}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    theme="snow"
                    className="h-64 mb-12 border-none dark:text-white"
                  />
                </div>
              </div>

              {/* Row 8: Contact & Apply Link */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Job Posted By (Email)</label>
                  <input
                    type="text"
                    defaultValue={postedBy}
                    placeholder="recruiter@company.com"
                    {...register("postedBy")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Application Link</label>
                  <input
                    type="url"
                    defaultValue={ApplyLink}
                    placeholder="https://company.com/apply"
                    {...register("ApplyLink")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-gray-50 dark:bg-gray-700 dark:text-white focus:bg-white dark:focus:bg-gray-800"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Update Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateJob;
