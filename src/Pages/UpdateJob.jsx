// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useLoaderData, useParams } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";
// import { API_URL } from "../data/apiPath";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import the CSS file
// import PageHeader from "../components/PageHeader";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { color } from "framer-motion";

// const UpdateJob = () => {
//   const { id } = useParams();
//   const {
//     jobTitle,
//     companyName,
//     minPrice,
//     maxPrice,
//     salaryType,
//     jobLocation,
//     postingDate,
//     experienceLevel,
//     companyLogo,
//     employmentType,
//     description,
//     postedBy,
//     skills,
//     ApplyLink,
//   } = useLoaderData();

//   const [selectedOptions, setSelectedOptions] = useState(skills || []);
//   const [jobDescription, setJobDescription] = useState(description || ""); // Set initial value

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     data.skills = selectedOptions;
//     data.description = jobDescription;

//     fetch(`${API_URL}/jobs/update-job/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     })
//       .then((res) => {
//         console.log("Response status:", res.status);
//         return res.json();
//       })
//       .then((result) => {
//         console.log("API result:", result);
//         //   if (result.acknowledged) {
//         //     console.log("Job update acknowledged");
//         //     alert("Job updated successfully!!");
//         //   } else {
//         //     console.log("Job update not acknowledged", result);
//         //     alert(`${result.message}`);
//         //   }
//         //   reset(); // Ensure reset is called correctly
//         // })
//         // .catch((error) => {
//         //   console.error("Error updating job:", error);
//         //   alert("An error occurred while updating the job.");
//         // });
//         if (result.acknowledged) {
//           console.log("Job update acknowledged");
//           toast.success("Job updated successfully!"); // Use toast instead of alert
//         } else {
//           console.log("Job update not acknowledged", result);
//           toast.error(`${result.message}`); // Use toast for error message
//         }
//         reset(); // Ensure reset is called correctly
//       })
//       .catch((error) => {
//         console.error("Error updating job:", error);
//         toast.error("An error occurred while updating the job."); // Use toast for error message
//       });
//   };

//   const options = [
//     { value: "JavaScript", label: "JavaScript" },
//     { value: "Python", label: "Python" },
//     { value: "C++", label: "C++" },
//     { value: "React", label: "React" },
//     { value: "Java", label: "Java" },
//     { value: "Redux", label: "Redux" },
//     { value: "HTML", label: "HTML" },
//     { value: "Angular", label: "Angular" },
//     { value: "C", label: "C" },
//     { value: "SQL", label: "SQL" },
//     { value: "mySQL", label: "mySQL" },
//     { value: "communication", label: "communication" },
//     { value: "C#", label: "C#" },
//     { value: "GoLang", label: "GoLang" },
//   ];

//   const modules = {
//     toolbar: [
//       // [{ header: [1, 2, 3, 4, false] }],
//       [{ font: [] }],
//       [{ size: [] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ color: [] }, { background: [] }], // Enable color and background formats
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ align: [] }],
//       ["link", "image"],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     // "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "video",
//     "color", // Ensure color is included
//     "background",
//     "align", // Ensure background is included
//   ];

//   return (
//     <div className="max-w-screen-2xl container max-auto xl:px-24 px-4">
//       <PageHeader title={"Update a Job"} path={"Update-job"} />
//       <ToastContainer />

//       <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           {/* first row */}
//           <div className="create-job-flex">
//             <div className="lg:w-1/2 w-full">
//               <label className="block mb-2 text-lg">Job Title</label>
//               <input
//                 type="text"
//                 defaultValue={jobTitle}
//                 placeholder="Ex: Web Developer"
//                 {...register("jobTitle")}
//                 required
//                 className="create-job-input"
//               />
//             </div>
//             <div className="lg:w-1/2 w-full">
//               <label className="block mb-2 text-lg">Company Name </label>
//               <input
//                 type="text"
//                 defaultValue={companyName}
//                 placeholder="Ex: Google Inc."
//                 {...register("companyName")}
//                 required
//                 className="create-job-input"
//               />
//             </div>
//           </div>
//           {/* second row */}
//           <div className="create-job-flex">
//             <div className="lg:w-1/2 w-full">
//               <label className="block mb-2 text-lg">Minimum Salary</label>
//               <input
//                 type="text"
//                 defaultValue={minPrice}
//                 placeholder="$13k"
//                 {...register("minPrice")}
//                 className="create-job-input"
//               />
//             </div>
//             <div className="lg:w-1/2 w-full">
//               <label className="block mb-2 text-lg">Maximum Salary</label>
//               <input
//                 type="text"
//                 defaultValue={maxPrice}
//                 placeholder="$50k"
//                 {...register("maxPrice")}
//                 className="create-job-input"
//               />
//             </div>
//           </div>
//           {/* third row */}
//           <div className="create-job-flex">
//             <div className="lg:w-1/2 w-full">
//               <label className="block mb-2 text-lg">Salary Type</label>
//               <select {...register("salaryType")} className="create-job-input">
//                 <option value={salaryType}>{salaryType}</option>
//                 <option value="Hourly">Hourly</option>
//                 <option value="Monthly">Monthly</option>
//                 <option value="Yearly">Yearly</option>
//               </select>
//             </div>
//             <div className="lg:w-1/2 w-full">
//               <label className="block mb-2 text-lg">Job Location</label>
//               <input
//                 type="text"
//                 defaultValue={jobLocation}
//                 placeholder="Ex: India"
//                 {...register("jobLocation")}
//                 className="create-job-input"
//               />
//             </div>
//           </div>
//           {/* Fourth row */}
//           <div className="create-job-flex">
//             <div className="lg:w-1/2 w-full">
//               <label className="block mb-2 text-lg">Job posting Date</label>
//               <input
//                 type="date"
//                 defaultValue={postingDate}
//                 placeholder="DD-MM-YY"
//                 {...register("postingDate")}
//                 className="create-job-input"
//               />
//             </div>

//             <div className="lg:w-1/2 w-full">
//               <label className="block mb-2 text-lg">Experience Level</label>
//               <select
//                 {...register("experienceLevel")}
//                 className="create-job-input"
//               >
//                 <option value={experienceLevel}>{experienceLevel}</option>
//                 <option value="Any Experience">Any Experience</option>
//                 <option value="fresher">Fresher</option>
//                 <option value="1-2 years">1-2 years</option>
//                 <option value="3-4 years">3-4 years</option>
//                 <option value="above 5 years">more than 5</option>
//                 <option value="entry-level">Entry-Level</option>
//                 <option value="mid-level">Mid-Level</option>
//                 <option value="mid-level">MidSenior-Level</option>
//                 <option value="experienced">Experienced</option>
//                 <option value="Intern">Intern</option>
//                 <option value="Work remotely">Work Remotely</option>
//               </select>
//             </div>
//           </div>
//           {/* fifth row */}
//           <div>
//             <label className="block mb-2 text-lg">Required Skill Sets:</label>
//             <CreatableSelect
//               value={selectedOptions}
//               onChange={setSelectedOptions}
//               options={options}
//               isMulti
//               className="create-job-input py-4"
//             />
//           </div>

//           {/* sixth row */}
//           <div className="create-job-flex">
//             <div className="lg:w-1/2 w-full">
//               <label className="block mb-2 text-lg">Company Logo</label>
//               <input
//                 type="url"
//                 defaultValue={companyLogo}
//                 placeholder="paste your company logo URL: https://logo.com/img1"
//                 {...register("companyLogo")}
//                 className="create-job-input"
//               />
//             </div>

//             <div className="lg:w-1/2 w-full">
//               <label className="block mb-2 text-lg">Employment Type</label>
//               <select
//                 {...register("employmentType")}
//                 className="create-job-input"
//               >
//                 <option value={employmentType}>{employmentType}</option>
//                 <option value="Full-time">Full-time</option>
//                 <option value="Part-time">Part-time</option>
//                 <option value="Internship">Internship</option>
//                 <option value="Temporary">Temporary</option>
//                 <option value="Freelance">Freelance</option>
//                 <option value="Freelance">Contract</option>
//               </select>
//             </div>
//           </div>

//           {/* seventh row */}
//           <div>
//             <label className="block mb-2 text-lg">Job Description</label>
//             <ReactQuill
//               value={jobDescription}
//               onChange={setJobDescription}
//               modules={modules}
//               formats={formats}
//               className="create-job-input"
//               placeholder="Enter job description..."
//               theme="snow"
//             />
//           </div>

//           {/* eighth row */}
//           <div className="create-job-flex">
//             <div className="lg:w-1/2 w-full">
//               <label className="block mb-2 text-lg">Apply Link</label>
//               <input
//                 type="url"
//                 defaultValue={ApplyLink}
//                 placeholder="https://example.com/apply"
//                 {...register("ApplyLink")}
//                 className="create-job-input"
//               />
//             </div>
//             <div className="lg:w-1/2 w-full">
//               <label className="block mb-2 text-lg">Posted By</label>
//               <input
//                 type="text"
//                 defaultValue={postedBy}
//                 placeholder="Name or Email"
//                 {...register("postedBy")}
//                 className="create-job-input"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue text-white py-2 px-4 rounded"
//           >
//             Update Job
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateJob;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { API_URL } from "../data/apiPath";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the CSS file
import PageHeader from "../components/PageHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { color } from "framer-motion";

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
  const [jobDescription, setJobDescription] = useState(description || ""); // Set initial value

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
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((result) => {
        console.log("API result:", result);
        //   if (result.acknowledged) {
        //     console.log("Job update acknowledged");
        //     alert("Job updated successfully!!");
        //   } else {
        //     console.log("Job update not acknowledged", result);
        //     alert(`${result.message}`);
        //   }
        //   reset(); // Ensure reset is called correctly
        // })
        // .catch((error) => {
        //   console.error("Error updating job:", error);
        //   alert("An error occurred while updating the job.");
        // });
        if (result.acknowledged) {
          console.log("Job update acknowledged");
          toast.success("Job updated successfully!"); // Use toast instead of alert
        } else {
          console.log("Job update not acknowledged", result);
          toast.error(`${result.message}`); // Use toast for error message
        }
        reset(); // Ensure reset is called correctly
      })
      .catch((error) => {
        console.error("Error updating job:", error);
        toast.error("An error occurred while updating the job."); // Use toast for error message
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

  // const modules = {
  //   toolbar: [
  //     // [{ header: [1, 2, 3, 4, false] }],
  //     [{ font: [] }],
  //     [{ size: [] }],
  //     ["bold", "italic", "underline", "strike"],
  //     [{ color: [] }, { background: [] }], // Enable color and background formats
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     [{ align: [] }],
  //     ["link", "image"],
  //     ["clean"],
  //   ],
  // };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Ensure `header` is part of the toolbar
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

  // const formats = [
  //   // "header",
  //   "font",
  //   "size",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "list",
  //   "bullet",
  //   "indent",
  //   "link",
  //   "image",
  //   "video",
  //   "color", // Ensure color is included
  //   "background",
  //   "align", // Ensure background is included
  // ];

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
    <div className="max-w-screen-2xl container max-auto xl:px-24 px-4">
      <PageHeader title={"Update a Job"} path={"Update-job"} />
      <ToastContainer />

      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* first row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={jobTitle}
                placeholder="Ex: Web Developer"
                {...register("jobTitle")}
                required
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name </label>
              <input
                type="text"
                defaultValue={companyName}
                placeholder="Ex: Google Inc."
                {...register("companyName")}
                required
                className="create-job-input"
              />
            </div>
          </div>
          {/* second row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                defaultValue={minPrice}
                placeholder="$13k"
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                defaultValue={maxPrice}
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
                <option value={salaryType}>{salaryType}</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                defaultValue={jobLocation}
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
                defaultValue={postingDate}
                placeholder="DD-MM-YY"
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
                <option value={experienceLevel}>{experienceLevel}</option>
                <option value="Any Experience">Any Experience</option>
                <option value="fresher">Fresher</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-4 years">3-4 years</option>
                <option value="above 5 years">more than 5</option>
                <option value="entry-level">Entry-Level</option>
                <option value="mid-level">Mid-Level</option>
                <option value="mid-level">MidSenior-Level</option>
                <option value="experienced">Experienced</option>
                <option value="Intern">Intern</option>
                <option value="Work remotely">Work Remotely</option>
              </select>
            </div>
          </div>
          {/* fifth row */}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets:</label>
            <CreatableSelect
              value={selectedOptions}
              onChange={setSelectedOptions}
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
                defaultValue={companyLogo}
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
                <option value={employmentType}>{employmentType}</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Temporary">Temporary</option>
                <option value="Freelance">Freelance</option>
                <option value="Freelance">Contract</option>
              </select>
            </div>
          </div>

          {/* seventh row */}
          <div>
            <label className="block mb-2 text-lg">Job Description</label>
            <ReactQuill
              value={jobDescription}
              onChange={setJobDescription}
              modules={modules}
              formats={formats}
              className="create-job-input"
              placeholder="Enter job description..."
              theme="snow"
            />
          </div>

          {/* eighth row */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Apply Link</label>
              <input
                type="url"
                defaultValue={ApplyLink}
                placeholder="https://example.com/apply"
                {...register("ApplyLink")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Posted By</label>
              <input
                type="text"
                defaultValue={postedBy}
                placeholder="Name or Email"
                {...register("postedBy")}
                className="create-job-input"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue text-white py-2 px-4 rounded"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
