// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useLoaderData, useParams } from "react-router-dom";
// import CreatableSelect from "react-select/creatable";
// import { API_URL } from "../data/apiPath";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import the CSS file

// const UpdateJob = () => {
//   const { id } = useParams();
//   const {
//     _id,
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

//   const [selectedOptions, setSelectedOPtions] = useState(null);
//   const [jobDescription, setJobDescription] = useState(""); // State for Rich Text Editor

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   // const onSubmit = (data) => {
//   //   data.skills = selectedOptions;
//   //   // console.log(data);
//   //   fetch(`${API_URL}/jobs/update-job/${id}`, {
//   //     method: "PATCH",
//   //     headers: { "content-type": "application/json" },
//   //     body: JSON.stringify(data),
//   //   })
//   //     .then((res) => res.json())
//   //     .then((result) => {
//   //       console.log(result);
//   //       if (result.acknowledged === true) {
//   //         alert("job updated successfully!!");
//   //       }
//   //       reset();
//   //     });
//   // };

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
//         if (result.acknowledged) {
//           console.log("Job update acknowledged");
//           alert("Job updated successfully!!");
//         } else {
//           console.log("Job update not acknowledged", result);
//           alert(`${result.message}`);
//         }
//         reset(); // Ensure reset is called correctly
//       })
//       .catch((error) => {
//         console.error("Error updating job:", error);
//         alert("An error occurred while updating the job.");
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
//     { value: "CSS", label: "CSS" },
//   ];

//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
//       [{ size: [] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [
//         { list: "ordered" },
//         { list: "bullet" },
//         { indent: "-1" },
//         { indent: "+1" },
//       ],
//       ["link", "image", "video"],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "header",
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
//   ];

//   return (
//     <div className="max-w-screen-2xl container max-auto xl:px-24 px-4">
//       {/* form  */}
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
//                 required="true"
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
//                 required="true"
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
//                 <option value="Internship">Internship</option>
//                 <option value="Work remotely">Work Remotely</option>
//                 <option value="Experienced">Experienced</option>
//               </select>
//             </div>
//           </div>
//           {/* fifth row */}
//           <div>
//             <label className="block mb-2 text-lg">Required Skill Sets:</label>
//             <CreatableSelect
//               defaultValue={skills}
//               onChange={setSelectedOPtions}
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
//                 <option value="Temporary">Temporary</option>
//               </select>
//             </div>
//           </div>

//           {/* seventh row */}
//           <div className="w-full">
//             <label className="block mb-2 text-lg">Job Description</label>
//             <ReactQuill
//               value={jobDescription}
//               onChange={setJobDescription}
//               modules={modules}
//               formats={formats}
//               defaultValue={setJobDescription}
//               className="create-job-input"
//               placeholder="Enter job description..."
//               theme="snow"
//             />
//           </div>

//           {/*  eighth row*/}
//           <div className="w-full">
//             <label className="block mb-2 text-lg">Job Posted by</label>
//             <input
//               type="email"
//               defaultValue={postedBy}
//               placeholder="Your email"
//               {...register("postedBy")}
//               className="create-job-input"
//             />
//           </div>

//           {/*  nine row*/}
//           <div className="w-full">
//             <label className="block mb-2 text-lg">Apply Link</label>
//             <input
//               type="url"
//               defaultValue={ApplyLink}
//               placeholder="Apply Link"
//               {...register("ApplyLink")}
//               className="create-job-input"
//             />
//           </div>

//           <input
//             type="submit"
//             className="bg-blue hover:bg-indigo-700 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer "
//           />
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
        if (result.acknowledged) {
          console.log("Job update acknowledged");
          alert("Job updated successfully!!");
        } else {
          console.log("Job update not acknowledged", result);
          alert(`${result.message}`);
        }
        reset(); // Ensure reset is called correctly
      })
      .catch((error) => {
        console.error("Error updating job:", error);
        alert("An error occurred while updating the job.");
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="max-w-screen-2xl container max-auto xl:px-24 px-4">
      <PageHeader title={"Update a Job"} path={"Update-job"} />

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
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work Remotely</option>
                <option value="Experienced">Experienced</option>
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
                <option value="Part-Time">Part-Time</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
          </div>

          {/* seventh row */}
          <div>
            <label className="block mb-2 text-lg">Job Description</label>
            <ReactQuill
              value={jobDescription} // Set the value of the editor
              onChange={setJobDescription} // Handle content changes
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
              <label className="block mb-2 text-lg">Job Apply Link</label>
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
