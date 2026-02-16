// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { API_URL } from "../data/apiPath";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const CreateResume = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     personalInfo: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       location: "",
//       socialLinks: {
//         linkedin: "",
//         github: "",
//         personalWebsite: "",
//       },
//     },
//     professionalSummary: "",
//     wantedJobTitle: "",
//     workExperience: [
//       {
//         jobTitle: "",
//         companyName: "",
//         startDate: "",
//         endDate: "",
//         description: "",
//         skillsUsed: [],
//       },
//     ],
//     education: [
//       {
//         degree: "",
//         institutionName: "",
//         graduationDate: "",
//       },
//     ],
//     skills: [""],
//     certifications: [
//       {
//         name: "",
//         organization: "",
//         date: "",
//       },
//     ],
//     projects: [
//       {
//         title: "",
//         description: "",
//         technologies: [""],
//         startDate: "",
//         endDate: "",
//         projectLink: "",
//       },
//     ],
//     languages: [""],
//     references: [
//       {
//         name: "",
//         relationship: "",
//         contact: "",
//       },
//     ],
//     internships: [
//       {
//         title: "",
//         company: "",
//         startDate: "",
//         endDate: "",
//         description: "",
//       },
//     ],
//     acknowledgment: "",
//   });

//   const handleChange = (e, path, index, subPath) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => {
//       if (path) {
//         if (index !== undefined) {
//           const updatedItems = [...prevState[path]];
//           if (subPath) {
//             updatedItems[index] = {
//               ...updatedItems[index],
//               [subPath]: { ...updatedItems[index][subPath], [name]: value },
//             };
//           } else {
//             updatedItems[index] = { ...updatedItems[index], [name]: value };
//           }
//           return { ...prevState, [path]: updatedItems };
//         }
//         if (subPath) {
//           return {
//             ...prevState,
//             [path]: {
//               ...prevState[path],
//               [subPath]: { ...prevState[path][subPath], [name]: value },
//             },
//           };
//         }
//         return {
//           ...prevState,
//           [path]: { ...prevState[path], [name]: value },
//         };
//       }
//       return { ...prevState, [name]: value };
//     });
//   };

//   const handleSkillChange = (e, field, index) => {
//     const { value } = e.target;
//     const updatedSkills = [...formData[field]];
//     updatedSkills[index] = value; // Make sure this is just a string
//     setFormData((prevData) => ({
//       ...prevData,
//       [field]: updatedSkills,
//     }));
//   };

//   const handleAddField = (path) => {
//     setFormData((prevState) => {
//       const template = Array.isArray(prevState[path][0])
//         ? [""]
//         : typeof prevState[path][0] === "object"
//         ? {}
//         : "";
//       return { ...prevState, [path]: [...prevState[path], template] };
//     });
//   };

//   const handleRemoveField = (path, index) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [path]: prevState[path].filter((_, i) => i !== index),
//     }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${API_URL}/resumes/create-resume`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();
//       console.log(result);

//       if (response.ok) {
//         toast.success("Resume created successfully!");
//         navigate("/resume-builder");
//       } else {
//         toast.error(result.message || "Failed to create resume");
//       }
//     } catch (error) {
//       toast.error("Error creating resume");
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 flex">
//       <div className="w-1/2 pr-4">
//         <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
//           Create Your Resume
//         </h1>
//         <form onSubmit={onSubmit} className="bg-white p-8 shadow-lg rounded-lg">
//           {/* Personal Information */}
//           <section className="space-y-6">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Personal Information
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.personalInfo.firstName}
//                 onChange={(e) => handleChange(e, "personalInfo")}
//                 className="border p-2 rounded-md w-full"
//                 required
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.personalInfo.lastName}
//                 onChange={(e) => handleChange(e, "personalInfo")}
//                 className="border p-2 rounded-md w-full"
//                 required
//               />
//             </div>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.personalInfo.email}
//               onChange={(e) => handleChange(e, "personalInfo")}
//               className="border p-2 rounded-md w-full"
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone"
//               value={formData.personalInfo.phone}
//               onChange={(e) => handleChange(e, "personalInfo")}
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               name="location"
//               placeholder="Location"
//               value={formData.personalInfo.location}
//               onChange={(e) => handleChange(e, "personalInfo")}
//               className="border p-2 rounded-md w-full"
//               required
//             />
//             <input
//               type="text"
//               name="github"
//               placeholder="GitHub"
//               value={formData.personalInfo.socialLinks.github}
//               onChange={(e) =>
//                 handleChange(e, "personalInfo", undefined, "socialLinks")
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               name="linkedin"
//               placeholder="LinkedIn"
//               value={formData.personalInfo.socialLinks.linkedin}
//               onChange={(e) =>
//                 handleChange(e, "personalInfo", undefined, "socialLinks")
//               }
//               className="border p-2 rounded-md w-full"
//             />
//             <input
//               type="text"
//               name="personalWebsite"
//               placeholder="Personal Website"
//               value={formData.personalInfo.socialLinks.personalWebsite}
//               onChange={(e) =>
//                 handleChange(e, "personalInfo", undefined, "socialLinks")
//               }
//               className="border p-2 rounded-md w-full"
//             />
//           </section>

//           {/* Professional Summary */}
//           <section className="mt-6 space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Professional Summary
//             </h2>
//             <textarea
//               name="professionalSummary"
//               placeholder="A brief summary about your career..."
//               value={formData.professionalSummary}
//               onChange={(e) => handleChange(e)}
//               className="border p-2 rounded-md w-full"
//             />
//           </section>

//           {/* Wanted Job Title */}
//           <section className="mt-6 space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Wanted Job Title
//             </h2>
//             <input
//               type="text"
//               name="wantedJobTitle"
//               placeholder="Desired Job Title"
//               value={formData.wantedJobTitle}
//               onChange={(e) => handleChange(e)}
//               className="border p-2 rounded-md w-full"
//             />
//           </section>

//           {/* Work Experience */}
//           <section className="mt-6 space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Work Experience
//             </h2>
//             {formData.workExperience.map((exp, index) => (
//               <div key={index} className="space-y-2">
//                 <input
//                   type="text"
//                   name="jobTitle"
//                   placeholder="Job Title"
//                   value={exp.jobTitle}
//                   onChange={(e) => handleChange(e, "workExperience", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <input
//                   type="text"
//                   name="companyName"
//                   placeholder="Company Name"
//                   value={exp.companyName}
//                   onChange={(e) => handleChange(e, "workExperience", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input
//                     type="date"
//                     name="startDate"
//                     placeholder="Start Date"
//                     value={exp.startDate}
//                     onChange={(e) => handleChange(e, "workExperience", index)}
//                     className="border p-2 rounded-md w-full"
//                   />
//                   <input
//                     type="date"
//                     name="endDate"
//                     placeholder="End Date"
//                     value={exp.endDate}
//                     onChange={(e) => handleChange(e, "workExperience", index)}
//                     className="border p-2 rounded-md w-full"
//                   />
//                 </div>
//                 <textarea
//                   name="description"
//                   placeholder="Job Description"
//                   value={exp.description}
//                   onChange={(e) => handleChange(e, "workExperience", index)}
//                   className="border p-2 rounded-md w-full"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => handleRemoveField("workExperience", index)}
//                   className="text-red-500"
//                 >
//                   Remove Experience
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => handleAddField("workExperience")}
//               className="text-indigo-600"
//             >
//               Add Work Experience
//             </button>
//           </section>

//           {/* Education */}
//           <section className="mt-6 space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">Education</h2>
//             {formData.education.map((edu, index) => (
//               <div key={index} className="space-y-2">
//                 <input
//                   type="text"
//                   name="degree"
//                   placeholder="Degree"
//                   value={edu.degree}
//                   onChange={(e) => handleChange(e, "education", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <input
//                   type="text"
//                   name="institutionName"
//                   placeholder="Institution Name"
//                   value={edu.institutionName}
//                   onChange={(e) => handleChange(e, "education", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <input
//                   type="date"
//                   name="graduationDate"
//                   value={edu.graduationDate}
//                   onChange={(e) => handleChange(e, "education", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveField("education", index)}
//                   className="text-red-500 mt-2"
//                 >
//                   Remove Education
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => handleAddField("education")}
//               className="text-blue-500 mt-4"
//             >
//               Add Education
//             </button>
//           </section>

//           {/* Certifications */}
//           <section className="mt-6 space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Certifications
//             </h2>
//             {formData.certifications.map((certi, index) => (
//               <div key={index} className="space-y-2">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={certi.name}
//                   onChange={(e) => handleChange(e, "certifications", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <input
//                   type="text"
//                   name="organization"
//                   placeholder="Organization"
//                   value={certi.organization}
//                   onChange={(e) => handleChange(e, "certifications", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <input
//                   type="date"
//                   name="date"
//                   value={certi.date}
//                   onChange={(e) => handleChange(e, "certifications", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveField("certifications", index)}
//                   className="text-red-500 mt-2"
//                 >
//                   Remove Certification
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => handleAddField("certifications")}
//               className="text-blue-500 mt-4"
//             >
//               Add Certification
//             </button>
//           </section>

//           {/* Skills */}
//           <section className="mt-6 space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
//             <div className="space-y-2">
//               {formData.skills.map((skill, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   name="skills"
//                   placeholder="Skill"
//                   value={skill}
//                   onChange={(e) => handleSkillChange(e, "skills", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => handleAddField("skills")}
//               className="text-blue-500 mt-2"
//             >
//               Add Skill
//             </button>
//           </section>

//           {/* Projects */}
//           <section className="mt-6 space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
//             {formData.projects.map((project, index) => (
//               <div key={index} className="space-y-2">
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Project Title"
//                   value={project.title}
//                   onChange={(e) => handleChange(e, "projects", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <textarea
//                   name="description"
//                   placeholder="Project Description"
//                   value={project.description}
//                   onChange={(e) => handleChange(e, "projects", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <div>
//                   <h3 className="text-lg font-semibold">Technologies Used</h3>
//                   {project.technologies.map((tech, techIndex) => (
//                     <input
//                       key={techIndex}
//                       type="text"
//                       placeholder="Technology"
//                       value={tech}
//                       onChange={(e) => {
//                         const updatedTechnologies = [...project.technologies];
//                         updatedTechnologies[techIndex] = e.target.value;
//                         setFormData((prevData) => {
//                           const updatedProjects = [...prevData.projects];
//                           updatedProjects[index].technologies =
//                             updatedTechnologies;
//                           return { ...prevData, projects: updatedProjects };
//                         });
//                       }}
//                       className="border p-2 rounded-md w-full"
//                     />
//                   ))}
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const updatedProjects = [...formData.projects];
//                       updatedProjects[index].technologies.push(""); // Add a new empty technology input
//                       setFormData((prevData) => ({
//                         ...prevData,
//                         projects: updatedProjects,
//                       }));
//                     }}
//                     className="text-blue-500 mt-2"
//                   >
//                     Add Technology
//                   </button>
//                 </div>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={project.startDate}
//                   onChange={(e) => handleChange(e, "projects", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <input
//                   type="date"
//                   name="endDate"
//                   value={project.endDate}
//                   onChange={(e) => handleChange(e, "projects", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <input
//                   type="url"
//                   name="projectLink"
//                   placeholder="Project Link"
//                   value={project.projectLink}
//                   onChange={(e) => handleChange(e, "projects", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveField("projects", index)}
//                   className="text-red-500 mt-2"
//                 >
//                   Remove Project
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => handleAddField("projects")}
//               className="text-blue-500 mt-4"
//             >
//               Add project
//             </button>
//           </section>
//           {/* Languages */}
//           <section className="mt-6 space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">Languages</h2>
//             <div className="space-y-2">
//               {formData.languages.map((language, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   name="languages"
//                   placeholder="Language"
//                   value={language}
//                   onChange={(e) => handleSkillChange(e, "languages", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => handleAddField("languages")}
//               className="text-blue-500 mt-2"
//             >
//               Add Language
//             </button>
//           </section>

//           {/* References */}
//           <section className="mt-6 space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">References</h2>
//             {formData.references.map((ref, index) => (
//               <div key={index} className="space-y-2">
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={ref.name}
//                   onChange={(e) => handleChange(e, "references", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <input
//                   type="text"
//                   name="relationship"
//                   placeholder="Relationship"
//                   value={ref.relationship}
//                   onChange={(e) => handleChange(e, "references", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <input
//                   type="tel"
//                   name="contact"
//                   placeholder="Contact"
//                   value={ref.contact}
//                   onChange={(e) => handleChange(e, "references", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveField("references", index)}
//                   className="text-red-500 mt-2"
//                 >
//                   Remove Reference
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => handleAddField("references")}
//               className="text-blue-500 mt-4"
//             >
//               Add Reference
//             </button>
//           </section>

//           {/* Internships */}
//           <section className="mt-6 space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">Internships</h2>
//             {formData.internships.map((exp, index) => (
//               <div key={index} className="space-y-2">
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Title"
//                   value={exp.title}
//                   onChange={(e) => handleChange(e, "internships", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <input
//                   type="text"
//                   name="company"
//                   placeholder="Company"
//                   value={exp.company}
//                   onChange={(e) => handleChange(e, "internships", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input
//                     type="date"
//                     name="startDate"
//                     placeholder="Start Date"
//                     value={exp.startDate}
//                     onChange={(e) => handleChange(e, "internships", index)}
//                     className="border p-2 rounded-md w-full"
//                   />
//                   <input
//                     type="date"
//                     name="endDate"
//                     placeholder="End Date"
//                     value={exp.endDate}
//                     onChange={(e) => handleChange(e, "internships", index)}
//                     className="border p-2 rounded-md w-full"
//                   />
//                 </div>
//                 <textarea
//                   name="description"
//                   placeholder="Internship Description"
//                   value={exp.description}
//                   onChange={(e) => handleChange(e, "internships", index)}
//                   className="border p-2 rounded-md w-full"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveField("internships", index)}
//                   className="text-red-500"
//                 >
//                   Remove Internship
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => handleAddField("internships")}
//               className="text-indigo-600"
//             >
//               Add Internship
//             </button>
//           </section>

//           {/* Acknowledgment */}
//           <section className="mt-6 space-y-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Acknowledgment
//             </h2>
//             <textarea
//               name="acknowledgment"
//               placeholder="Acknowledgment..."
//               value={formData.acknowledgment}
//               onChange={(e) => handleChange(e)}
//               className="border p-2 rounded-md w-full"
//             />
//           </section>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="mt-8 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
//           >
//             Save Resume
//           </button>
//         </form>
//       </div>

//       {/* Resume Preview Section */}
//       <div className="w-1/2 pl-4">
//         <h1 className="text-3xl font-bold text-indigo-700 mb-4">
//           Resume Preview
//         </h1>
//         <div className="bg-white p-4 shadow-lg rounded-lg">
//           <h2 className="text-xl font-semibold">
//             {formData.personalInfo.firstName} {formData.personalInfo.lastName}
//           </h2>
//           <p>
//             {formData.personalInfo.email} | {formData.personalInfo.phone}
//           </p>
//           <p>{formData.personalInfo.location}</p>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Professional Summary</h3>
//             <p>{formData.professionalSummary}</p>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Wanted Job Title</h3>
//             <p>{formData.wantedJobTitle}</p>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Work Experience</h3>
//             {formData.workExperience.map((exp, index) => (
//               <div key={index} className="border-b pb-2 mb-2">
//                 <h4 className="font-semibold">
//                   {exp.jobTitle} at {exp.companyName}
//                 </h4>
//                 <p>
//                   {exp.startDate} - {exp.endDate}
//                 </p>
//                 <p>{exp.description}</p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Education</h3>
//             {formData.education.map((edu, index) => (
//               <div key={index} className="border-b pb-2 mb-2">
//                 <h4 className="font-semibold">
//                   {edu.degree} from {edu.institutionName}
//                 </h4>
//                 <p>Graduated: {edu.graduationDate}</p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Skills</h3>
//             <p>{formData.skills.join(", ")}</p>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Certifications</h3>
//             {formData.certifications.map((certi, index) => (
//               <div key={index} className="border-b pb-2 mb-2">
//                 <h4 className="font-semibold">
//                   {certi.name} from {certi.organization}
//                 </h4>
//                 <p>Date: {certi.date}</p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Projects</h3>
//             {formData.projects.map((project, index) => (
//               <div key={index} className="border-b pb-2 mb-2">
//                 <h4 className="font-semibold">{project.title}</h4>
//                 <p>{project.description}</p>
//                 <p>Technologies: {project.technologies.join(", ")}</p>
//                 <p>
//                   {project.startDate} - {project.endDate}
//                 </p>
//                 <p>
//                   Link:{" "}
//                   <a
//                     href={project.projectLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {project.projectLink}
//                   </a>
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Languages</h3>
//             <p>{formData.languages.join(", ")}</p>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">References</h3>
//             {formData.references.map((ref, index) => (
//               <div key={index} className="border-b pb-2 mb-2">
//                 <h4 className="font-semibold">{ref.name}</h4>
//                 <p>
//                   {ref.relationship} | {ref.contact}
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Internships</h3>
//             {formData.internships.map((exp, index) => (
//               <div key={index} className="border-b pb-2 mb-2">
//                 <h4 className="font-semibold">
//                   {exp.title} at {exp.company}
//                 </h4>
//                 <p>
//                   {exp.startDate} - {exp.endDate}
//                 </p>
//                 <p>{exp.description}</p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Acknowledgment</h3>
//             <p>{formData.acknowledgment}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateResume;

import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import { FaUser, FaUserCircle, FaBriefcase, FaGraduationCap, FaWrench, FaCertificate, FaProjectDiagram, FaGlobe, FaUsers, FaSave, FaTrash, FaPlus, FaPhone, FaMapMarkerAlt, FaEnvelope, FaChevronLeft, FaChevronRight, FaPalette, FaMagic } from "react-icons/fa";
import TemplateModern from "../components/resume-templates/TemplateModern";
import TemplateProfessional from "../components/resume-templates/TemplateProfessional";
import TemplateCreative from "../components/resume-templates/TemplateCreative";
import TemplateMinimalist from "../components/resume-templates/TemplateMinimalist";
import TemplateExecutive from "../components/resume-templates/TemplateExecutive";
import TemplateSimple from "../components/resume-templates/TemplateSimple";
import TemplateAcademic from "../components/resume-templates/TemplateAcademic";
import TemplateTech from "../components/resume-templates/TemplateTech";
import TemplateDesigner from "../components/resume-templates/TemplateDesigner";
import TemplateCompact from "../components/resume-templates/TemplateCompact";
import TemplateBold from "../components/resume-templates/TemplateBold";
import TemplateCorporate from "../components/resume-templates/TemplateCorporate";
import TemplateElegant from "../components/resume-templates/TemplateElegant";
import TemplateStartup from "../components/resume-templates/TemplateStartup";
import TemplateClassic from "../components/resume-templates/TemplateClassic";

const CreateResume = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, isLoading: authLoading } =
    useAuth0();

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Personal Info", icon: <FaUser /> },
    { title: "Summary", icon: <FaBriefcase /> },
    { title: "Experience", icon: <FaBriefcase /> },
    { title: "Education", icon: <FaGraduationCap /> },
    { title: "Skills", icon: <FaWrench /> },
    { title: "Projects", icon: <FaProjectDiagram /> },
    { title: "Extra", icon: <FaPlus /> }
  ];

  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      websites: [],
      socialLinks: {
        linkedin: "",
        facebook: "",
        twitter: "",
        instagram: "",
        github: "",
        personalWebsite: "",
      },
    },
    professionalSummary: "",
    wantedJobTitle: "",
    workExperience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    languages: [],
    references: [],
    internships: [],
    acknowledgment: "",
    template: "modern", // Default template
  });

  // Fetch resume if editing
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${API_URL}/resumes/resume/${editId}?t=${Date.now()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setFormData(data.data);
        } else {
          toast.error("Failed to load resume for editing");
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };

    if (editId && isAuthenticated) {
      fetchResume();
    }
  }, [editId, isAuthenticated, getAccessTokenSilently]);

  const handleChange = (e, path, index, subPath) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      if (path) {
        if (index !== undefined) {
          const updatedItems = [...prevState[path]];
          if (subPath) {
            updatedItems[index] = {
              ...updatedItems[index],
              [subPath]: { ...updatedItems[index][subPath], [name]: value },
            };
          } else {
            updatedItems[index] = { ...updatedItems[index], [name]: value };
          }
          return { ...prevState, [path]: updatedItems };
        }
        if (subPath) {
          return {
            ...prevState,
            [path]: {
              ...prevState[path],
              [subPath]: { ...prevState[path][subPath], [name]: value },
            },
          };
        }
        return {
          ...prevState,
          [path]: { ...prevState[path], [name]: value },
        };
      }
      return { ...prevState, [name]: value };
    });
  };

  const handleArrayChange = (e, path, index, subArrayField, subIndex) => {
    const { value } = e.target;
    setFormData((prevState) => {
      // Case 1: Updating a nested array inside an object (e.g., projects[index].technologies[subIndex])
      if (subArrayField && typeof subIndex === "number") {
        const updatedItems = [...(prevState[path] || [])];
        if (!updatedItems[index]) return prevState;

        const updatedSubArray = [...(updatedItems[index][subArrayField] || [])];
        updatedSubArray[subIndex] = value;

        updatedItems[index] = {
          ...updatedItems[index],
          [subArrayField]: updatedSubArray,
        };
        return { ...prevState, [path]: updatedItems };
      }

      // Case 2: Updating a simple array (e.g., skills[index])
      if (typeof index === "number") {
        const updatedArray = [...(prevState[path] || [])];
        updatedArray[index] = value;
        return { ...prevState, [path]: updatedArray };
      }

      return prevState;
    });
  };

  const handleAddField = (path, indexOrSubPath, subArrayField) => {
    setFormData((prevState) => {
      // Access the template for the new item if it's a top-level array addition
      const templates = {
        workExperience: {
          jobTitle: "",
          companyName: "",
          startDate: "",
          endDate: "",
          description: "",
          skillsUsed: [],
        },
        education: {
          degree: "",
          institutionName: "",
          graduationDate: "",
          coursework: [],
        },
        skills: "",
        certifications: { name: "", organization: "", date: "" },
        projects: {
          title: "",
          description: "",
          technologies: [],
          startDate: "",
          endDate: "",
          projectLink: "",
        },
        languages: "",
        references: { name: "", relationship: "", contact: "" },
        internships: {
          title: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      };

      // Case 1: Adding to a nested array (e.g., projects[index].technologies)
      // Usage: handleAddField("projects", index, "technologies")
      if (typeof indexOrSubPath === "number" && subArrayField) {
        const index = indexOrSubPath;
        const updatedItems = [...(prevState[path] || [])];

        // Ensure the item exists
        if (!updatedItems[index]) return prevState;

        updatedItems[index] = {
          ...updatedItems[index],
          [subArrayField]: [...(updatedItems[index][subArrayField] || []), ""],
        };

        return { ...prevState, [path]: updatedItems };
      }

      // Case 2: Adding to a simple nested object/array path (e.g. personalInfo.websites)
      if (path.includes(".")) {
        const [parent, child] = path.split(".");
        return {
          ...prevState,
          [parent]: {
            ...prevState[parent],
            [child]: [...(prevState[parent][child] || []), ""],
          },
        };
      }

      // Case 3: Adding a new item to a top-level array (e.g., adding a new project)
      // Usage: handleAddField("projects")
      const template = templates[path] !== undefined ? templates[path] : "";
      return {
        ...prevState,
        [path]: [...(prevState[path] || []), template],
      };
    });
  };

  const handleRemoveField = (path, index, subArrayField, subIndex) => {
    setFormData((prevState) => {
      // Case 1: Removing from a nested array (e.g., projects[index].technologies[subIndex])
      // Usage: handleRemoveField("projects", index, "technologies", techIndex)
      if (typeof index === "number" && subArrayField && typeof subIndex === "number") {
        const updatedItems = [...(prevState[path] || [])];
        if (!updatedItems[index]) return prevState;

        updatedItems[index] = {
          ...updatedItems[index],
          [subArrayField]: (updatedItems[index][subArrayField] || []).filter(
            (_, i) => i !== subIndex
          ),
        };
        return { ...prevState, [path]: updatedItems };
      }

      // Case 2: Removing from a simple nested object/array path (e.g. personalInfo.websites)
      if (path.includes(".")) {
        const [parent, child] = path.split(".");
        return {
          ...prevState,
          [parent]: {
            ...prevState[parent],
            [child]: (prevState[parent][child] || []).filter((_, i) => i !== index),
          },
        };
      }

      // Case 3: Removing an item from a top-level array (e.g., removing a project)
      // Usage: handleRemoveField("projects", index)
      return {
        ...prevState,
        [path]: (prevState[path] || []).filter((_, i) => i !== index),
      };
    });
  };

  const handleAIAction = async (action, data, index) => {
    if (action === 'enhance' && (!data || data.trim() === '')) {
      toast.error("Please enter some text in the description first!");
      return;
    }

    try {
      const token = await getAccessTokenSilently();
      const endpoint = action === 'summary' ? '/ai-resume/generate-summary' : '/ai-resume/enhance-bullet';
      const body = action === 'summary' ? data : { bullet: data };

      const toastId = toast.loading(`${action === 'summary' ? 'Generating summary...' : 'Enhancing bullet...'}`);

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      console.log(`AI ${action} result:`, result);

      if (response.ok) {
        if (action === 'summary') {
          setFormData(prev => ({ ...prev, professionalSummary: result.summary, aiGeneratedSummary: true }));
          toast.update(toastId, { render: "Summary generated!", type: "success", isLoading: false, autoClose: 2000 });
        } else {
          if (formData.workExperience[index].description === result.enhancedBullet) {
            toast.update(toastId, { render: "Already strong! No changes needed.", type: "info", isLoading: false, autoClose: 2000 });
          } else {
            setFormData(prev => {
              const updatedExp = [...prev.workExperience];
              updatedExp[index] = { ...updatedExp[index], description: result.enhancedBullet };
              return { ...prev, workExperience: updatedExp };
            });
            toast.update(toastId, { render: "Bullet enhanced!", type: "success", isLoading: false, autoClose: 2000 });
          }
        }
      } else {
        toast.update(toastId, { render: result.message || "Action failed", type: "error", isLoading: false, autoClose: 2000 });
      }
    } catch (error) {
      console.error(`AI ${action} error:`, error);
      toast.error(`Failed to perform AI ${action}`);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please log in to create a resume");
      loginWithRedirect();
      return;
    }

    const deepClean = (obj) => {
      if (Array.isArray(obj)) {
        return obj
          .map((v) => deepClean(v))
          .filter((v) => v !== undefined && v !== null && v !== "");
      } else if (obj !== null && typeof obj === "object") {
        return Object.fromEntries(
          Object.entries(obj)
            .filter(([k]) => !["_id", "userId", "createdAt", "updatedAt", "__v"].includes(k))
            .map(([k, v]) => [k, deepClean(v)])
            .filter(([_, v]) => v !== undefined && v !== null && v !== "")
        );
      }
      return obj === "" ? undefined : obj;
    };

    const cleanedFormData = deepClean(formData);

    // Ensure nested arrays aren't just empty objects if they were empty arrays and strip system fields
    const { _id, userId, createdAt, updatedAt, __v, ...rest } = cleanedFormData;
    const finalData = {
      ...rest,
      workExperience: cleanedFormData.workExperience?.length ? cleanedFormData.workExperience : undefined,
      education: cleanedFormData.education?.length ? cleanedFormData.education : undefined,
      skills: cleanedFormData.skills?.length ? cleanedFormData.skills : undefined,
      certifications: cleanedFormData.certifications?.length ? cleanedFormData.certifications : undefined,
      projects: cleanedFormData.projects?.length ? cleanedFormData.projects : undefined,
      languages: cleanedFormData.languages?.length ? cleanedFormData.languages : undefined,
      references: cleanedFormData.references?.length ? cleanedFormData.references : undefined,
      internships: cleanedFormData.internships?.length ? cleanedFormData.internships : undefined,
    };

    try {
      const token = await getAccessTokenSilently();
      const url = editId ? `${API_URL}/resumes/update-resume/${editId}` : `${API_URL}/resumes/create-resume`;
      const method = editId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(editId ? "Resume updated successfully!" : "Resume created successfully!");
        navigate("/resume-builder");
      } else {
        toast.error(result.message || "Failed to save resume");
      }
    } catch (error) {
      toast.error("Error saving resume");
      console.error("Error:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-screen-2xl container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-8">
          Create Your Resume
        </h1>
        <p className="text-gray-700 text-lg mb-4">
          Please log in to create a resume
        </p>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-28">
      <Helmet>
        <title>Free AI Resume Builder - Create & Download CV | JobNirvana</title>
        <meta name="description" content="Build a professional resume in minutes with JobNirvana's free AI Resume Builder. Choose from modern templates and download your CV as a PDF." />
        <meta name="keywords" content="resume builder, cv maker, free resume template, ai resume, professional cv" />
        <meta property="og:title" content="Free AI Resume Builder | JobNirvana" />
        <meta property="og:description" content="Create a standout resume in minutes with our easy-to-use AI builder." />
        <link rel="canonical" href={`${window.location.origin}/utils/resume-builder`} />
      </Helmet>
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side - Editor Form (Wizard Style) */}
        <div className="w-full lg:w-1/2 xl:w-[48%] flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200"
          >
            {/* Stepper Component */}
            <div className="flex justify-between items-center px-2 py-4 relative overflow-x-auto scrollbar-hide">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center z-10 min-w-[80px]">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentStep === index
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110"
                      : index < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                      }`}
                  >
                    {index < currentStep ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.icon
                    )}
                  </button>
                  <span className={`text-[10px] sm:text-xs font-bold mt-2 truncate w-full text-center ${currentStep === index ? "text-indigo-600" : "text-gray-400"
                    }`}>
                    {step.title}
                  </span>
                </div>
              ))}
              {/* Progress Line */}
              <div className="absolute top-9 left-10 right-10 h-[2px] bg-gray-100 -z-0">
                <div
                  className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Step 0: Personal Information */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <FaUser className="text-lg" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="e.g. John"
                      value={formData.personalInfo.firstName}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="e.g. Doe"
                      value={formData.personalInfo.lastName}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.personalInfo.email}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.personalInfo.phone}
                      onChange={(e) => handleChange(e, "personalInfo")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Location & Presence</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        placeholder="City, Country"
                        value={formData.personalInfo.location}
                        onChange={(e) => handleChange(e, "personalInfo")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-gray-50 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
                      <input
                        type="url"
                        name="linkedin"
                        placeholder="https://linkedin.com/in/username"
                        value={formData.personalInfo.socialLinks.linkedin}
                        onChange={(e) => handleChange(e, "personalInfo", undefined, "socialLinks")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-gray-50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub URL</label>
                      <input
                        type="url"
                        name="github"
                        placeholder="https://github.com/username"
                        value={formData.personalInfo.socialLinks.github}
                        onChange={(e) => handleChange(e, "personalInfo", undefined, "socialLinks")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 outline-none bg-gray-50 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Professional Summary */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <FaBriefcase className="text-lg" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Target Job Title</h2>
                  </div>
                  <input
                    type="text"
                    name="wantedJobTitle"
                    placeholder="e.g. Senior Full Stack Developer"
                    value={formData.wantedJobTitle}
                    onChange={(e) => handleChange(e)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none bg-gray-50 font-semibold"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <FaUserCircle className="text-lg" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Professional Summary</h2>
                  </div>
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={() => handleAIAction('summary', formData)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-xs font-bold shadow-md shadow-indigo-100"
                    >
                      <FaMagic /> Generate Professional Summary
                    </button>
                  </div>
                  <textarea
                    name="professionalSummary"
                    placeholder="Write a compelling summary of your professional journey..."
                    value={formData.professionalSummary}
                    onChange={(e) => handleChange(e)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none bg-gray-50 text-sm leading-relaxed"
                    rows={8}
                  />
                </motion.div>
              </div>
            )}



            {/* Step 2: Work Experience */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <FaBriefcase className="text-lg" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">Work Experience</h2>
                    <p className="text-sm text-gray-500">Track your professional growth</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddField("workExperience")}
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors flex items-center gap-2"
                  >
                    <FaPlus size={12} /> Add
                  </button>
                </div>

                <div className="space-y-6">
                  {(formData.workExperience || []).map((exp, index) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={index}
                      className="p-5 bg-gray-50 rounded-xl border border-gray-200 relative group transition-all hover:border-indigo-200 hover:shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveField("workExperience", index)}
                        className="absolute top-4 right-4 p-2 bg-white text-gray-400 hover:text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"
                        title="Remove Entry"
                      >
                        <FaTrash size={14} />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2 md:col-span-1">
                          <label className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-1 block">Job Title</label>
                          <input
                            type="text"
                            name="jobTitle"
                            placeholder="e.g. Senior Developer"
                            value={exp.jobTitle}
                            onChange={(e) => handleChange(e, "workExperience", index)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white font-medium"
                            required
                          />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-1 block">Company</label>
                          <input
                            type="text"
                            name="companyName"
                            placeholder="e.g. Google"
                            value={exp.companyName}
                            onChange={(e) => handleChange(e, "workExperience", index)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white font-medium"
                            required
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-1 block">Start Date</label>
                          <input
                            type="date"
                            name="startDate"
                            value={exp.startDate}
                            onChange={(e) => handleChange(e, "workExperience", index)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 outline-none bg-white text-gray-600"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-1 block">End Date</label>
                          <input
                            type="date"
                            name="endDate"
                            value={exp.endDate}
                            onChange={(e) => handleChange(e, "workExperience", index)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 outline-none bg-white text-gray-600"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold uppercase text-gray-500 tracking-wider block">Description</label>
                          <button
                            type="button"
                            onClick={() => handleAIAction('enhance', exp.description, index)}
                            className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-2 py-1 rounded-md"
                          >
                            <FaMagic size={10} /> Enhance with AI
                          </button>
                        </div>
                        <textarea
                          name="description"
                          placeholder="Describe your responsibilities and achievements..."
                          value={exp.description}
                          onChange={(e) => handleChange(e, "workExperience", index)}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none bg-white text-sm leading-relaxed resize-y"
                        />
                      </div>
                    </motion.div>
                  ))}

                  {(formData.workExperience || []).length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                      <p className="text-gray-500 text-sm">No work experience added yet.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Education */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <FaGraduationCap className="text-lg" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">Education</h2>
                    <p className="text-sm text-gray-500">Academic background and qualifications</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddField("education")}
                    className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-semibold hover:bg-purple-100 transition-colors flex items-center gap-2"
                  >
                    <FaPlus size={12} /> Add
                  </button>
                </div>

                <div className="space-y-6">
                  {(formData.education || []).map((edu, index) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={index}
                      className="p-5 bg-gray-50 rounded-xl border border-gray-200 relative group transition-all hover:border-purple-200 hover:shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveField("education", index)}
                        className="absolute top-4 right-4 p-2 bg-white text-gray-400 hover:text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all z-10"
                        title="Remove Entry"
                      >
                        <FaTrash size={14} />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2 md:col-span-1">
                          <label className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-1 block">Degree</label>
                          <input
                            type="text"
                            name="degree"
                            placeholder="e.g. Bachelor of Science in CS"
                            value={edu.degree}
                            onChange={(e) => handleChange(e, "education", index)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none bg-white font-medium"
                            required
                          />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                          <label className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-1 block">Institution</label>
                          <input
                            type="text"
                            name="institutionName"
                            placeholder="e.g. University of Technology"
                            value={edu.institutionName}
                            onChange={(e) => handleChange(e, "education", index)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none bg-white font-medium"
                            required
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-1 block">Graduation Date</label>
                          <input
                            type="date"
                            name="graduationDate"
                            value={edu.graduationDate}
                            onChange={(e) => handleChange(e, "education", index)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-500 outline-none bg-white text-gray-600"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {(formData.education || []).length === 0 && (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                      <p className="text-gray-500 text-sm">No education added yet.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4: Skills */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
              >

                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                      <FaWrench className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-800">Skills</h2>
                      <p className="text-sm text-gray-500">Technical and soft skills</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddField("skills")}
                      className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg text-sm font-semibold hover:bg-orange-100 transition-colors flex items-center gap-2"
                    >
                      <FaPlus size={12} /> Add
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(formData.skills || []).map((skill, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          name="skills"
                          placeholder="e.g. React.js"
                          value={skill}
                          onChange={(e) => handleArrayChange(e, "skills", index)}
                          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none bg-white font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveField("skills", index)}
                          className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors border border-gray-200 hover:border-red-200"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))}
                    {(formData.skills || []).length === 0 && (
                      <p className="text-gray-500 text-sm italic col-span-2">No skills listed.</p>
                    )}
                  </div>
                </motion.div>

                {/* Certifications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                      <FaCertificate className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-800">Certifications</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddField("certifications")}
                      className="px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg text-sm font-semibold hover:bg-yellow-100 transition-colors flex items-center gap-2"
                    >
                      <FaPlus size={12} /> Add
                    </button>
                  </div>

                  <div className="space-y-6">
                    {(formData.certifications || []).map((certi, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                        <button
                          type="button"
                          onClick={() => handleRemoveField("certifications", index)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FaTrash />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="name"
                            placeholder="Certification Name"
                            value={certi.name}
                            onChange={(e) => handleChange(e, "certifications", index)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none bg-white"
                            required
                          />
                          <input
                            type="text"
                            name="organization"
                            placeholder="Organization"
                            value={certi.organization}
                            onChange={(e) => handleChange(e, "certifications", index)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none bg-white"
                            required
                          />
                          <input
                            type="date"
                            name="date"
                            value={certi.date}
                            onChange={(e) => handleChange(e, "certifications", index)}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none bg-white text-gray-600"
                            required
                          />
                        </div>
                      </div>
                    ))}
                    {(formData.certifications || []).length === 0 && (
                      <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-sm">No certifications added yet.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Step 5: Projects */}
            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                  <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                    <FaProjectDiagram className="text-lg" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">Projects</h2>
                    <p className="text-sm text-gray-500">Share your notable works</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddField("projects")}
                    className="px-4 py-2 bg-teal-50 text-teal-600 rounded-lg text-sm font-semibold hover:bg-teal-100 transition-colors flex items-center gap-2"
                  >
                    <FaPlus size={12} /> Add
                  </button>
                </div>

                <div className="space-y-6">
                  {(formData.projects || []).map((project, index) => (
                    <div key={index} className="p-5 bg-gray-50 rounded-xl border border-gray-200 relative group">
                      <button
                        type="button"
                        onClick={() => handleRemoveField("projects", index)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrash />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          name="title"
                          placeholder="Project Title"
                          value={project.title}
                          onChange={(e) => handleChange(e, "projects", index)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none bg-white font-bold"
                          required
                        />
                        <input
                          type="url"
                          name="projectLink"
                          placeholder="Project Link (URL)"
                          value={project.projectLink}
                          onChange={(e) => handleChange(e, "projects", index)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none bg-white text-blue-600"
                        />
                        <input
                          type="date"
                          name="startDate"
                          value={project.startDate}
                          onChange={(e) => handleChange(e, "projects", index)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none bg-white text-gray-600"
                          required
                        />
                        <input
                          type="date"
                          name="endDate"
                          value={project.endDate}
                          onChange={(e) => handleChange(e, "projects", index)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none bg-white text-gray-600"
                        />
                      </div>
                      <textarea
                        name="description"
                        placeholder="Project Description"
                        value={project.description}
                        onChange={(e) => handleChange(e, "projects", index)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none bg-white text-sm mb-4"
                        rows={3}
                      />

                      {/* Tech Stack */}
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Technologies</label>
                        <div className="flex flex-wrap gap-2">
                          {(project.technologies || []).map((tech, techIndex) => (
                            <div key={techIndex} className="flex items-center bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
                              <input
                                type="text"
                                value={tech}
                                onChange={(e) => handleArrayChange(e, "projects", index, "technologies", techIndex)}
                                className="w-24 px-2 py-1 bg-transparent text-sm outline-none"
                                placeholder="Tech"
                              />
                              <button type="button" onClick={() => handleRemoveField("projects", index, "technologies", techIndex)} className="px-2 text-gray-400 hover:text-red-500">×</button>
                            </div>
                          ))}
                          <button type="button" onClick={() => handleAddField("projects", index, "technologies")} className="text-sm text-blue-500 font-medium px-2">+ Add</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 6: Extra Sections */}
            {currentStep === 6 && (
              <div className="space-y-6">
                {/* Languages */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <FaGlobe className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-800">Languages</h2>
                    </div>
                    <button type="button" onClick={() => handleAddField("languages")} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors flex items-center gap-2">
                      <FaPlus size={12} /> Add
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(formData.languages || []).map((language, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          name="languages"
                          placeholder="e.g. English"
                          value={language}
                          onChange={(e) => handleArrayChange(e, "languages", index)}
                          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 outline-none bg-white font-medium"
                        />
                        <button type="button" onClick={() => handleRemoveField("languages", index)} className="p-2.5 text-gray-400 hover:text-red-500">
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* References */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                      <FaUsers className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-800">References</h2>
                    </div>
                    <button type="button" onClick={() => handleAddField("references")} className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-semibold hover:bg-green-100 transition-colors flex items-center gap-2">
                      <FaPlus size={12} /> Add
                    </button>
                  </div>
                  <div className="space-y-4">
                    {(formData.references || []).map((ref, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative">
                        <button type="button" onClick={() => handleRemoveField("references", index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                          <FaTrash size={14} />
                        </button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input type="text" name="name" placeholder="Name" value={ref.name} onChange={(e) => handleChange(e, "references", index)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none" />
                          <input type="text" name="relationship" placeholder="Relationship" value={ref.relationship} onChange={(e) => handleChange(e, "references", index)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none" />
                          <input type="text" name="contact" placeholder="Contact" value={ref.contact} onChange={(e) => handleChange(e, "references", index)} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none col-span-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Acknowledgment */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Acknowledgment</h2>
                  <textarea
                    name="acknowledgment"
                    placeholder="I hereby declare that the info provided is true..."
                    value={formData.acknowledgment}
                    onChange={(e) => handleChange(e)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 outline-none bg-white text-sm"
                    rows={4}
                  />
                </motion.div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-8">
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${currentStep === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  }`}
              >
                <FaChevronLeft size={14} /> Previous
              </button>

              {currentStep === steps.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:shadow-xl transition-all"
                >
                  <FaSave size={14} /> Finalize & Save
                </motion.button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                  className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all"
                >
                  Next <FaChevronRight size={14} />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Resume Preview Section */}
        {/* Right Column (Preview) */}
        <div className="w-full lg:w-1/2 min-h-screen sticky top-28 hidden lg:block h-[calc(100vh-140px)]">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 h-full flex flex-col">
            <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
              <h3 className="font-bold text-gray-700 flex items-center gap-2">
                <FaPalette className="text-gray-400" /> Template:
                <div className="flex bg-gray-200 rounded-lg p-1 ml-2 flex-wrap gap-1">
                  {[
                    "modern", "professional", "creative", "minimalist", "executive", "simple",
                    "academic", "tech", "designer", "compact", "bold", "corporate",
                    "elegant", "startup", "classic"
                  ].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData({ ...formData, template: t })}
                      className={`px-3 py-1 text-xs font-bold uppercase rounded-md transition-all ${formData.template === t
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </h3>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
              </div>
            </div>

            <div className="overflow-y-auto custom-scrollbar flex-1 bg-gray-100 p-8">
              <div id="resume-preview-content" className="mx-auto w-full max-w-[210mm] transition-all duration-300">
                {(!formData.template || formData.template === "modern") && <TemplateModern data={formData} />}
                {formData.template === "professional" && <TemplateProfessional data={formData} />}
                {formData.template === "creative" && <TemplateCreative data={formData} />}
                {formData.template === "minimalist" && <TemplateMinimalist data={formData} />}
                {formData.template === "executive" && <TemplateExecutive data={formData} />}
                {formData.template === "simple" && <TemplateSimple data={formData} />}
                {formData.template === "academic" && <TemplateAcademic data={formData} />}
                {formData.template === "tech" && <TemplateTech data={formData} />}
                {formData.template === "designer" && <TemplateDesigner data={formData} />}
                {formData.template === "compact" && <TemplateCompact data={formData} />}
                {formData.template === "bold" && <TemplateBold data={formData} />}
                {formData.template === "corporate" && <TemplateCorporate data={formData} />}
                {formData.template === "elegant" && <TemplateElegant data={formData} />}
                {formData.template === "startup" && <TemplateStartup data={formData} />}
                {formData.template === "classic" && <TemplateClassic data={formData} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CreateResume;
