// import React, { useState } from "react";

// const ResumeTips = ({ jobDescription }) => {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [tips, setTips] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileUpload = (e) => {
//     setResumeFile(e.target.files[0]);
//   };

//   const extractResumeText = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = () => reject("Error reading file");
//       reader.readAsText(file);
//     });
//   };

//   const generateTips = async () => {
//     if (!resumeFile) {
//       alert("Please upload your resume.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const resumeText = await extractResumeText(resumeFile);
//       const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

//       if (!apiKey) {
//         alert("API Key not found. Please check your .env file.");
//         setLoading(false);
//         return;
//       }

//       const prompt = `
//         Job Description: ${jobDescription}
//         Resume Content: ${resumeText}

//         Provide ATS-friendly tips for improving the resume to match this job description. Include:
//         - Missing keywords and skills
//         - Formatting suggestions
//         - Actionable examples
//       `;

//       const response = await fetch(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${apiKey}`,
//           },
//           body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: [
//               {
//                 role: "system",
//                 content:
//                   "You are an assistant that provides ATS-friendly resume tips.",
//               },
//               { role: "user", content: prompt },
//             ],
//             max_tokens: 500,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           errorData.error?.message || "Failed to fetch OpenAI API"
//         );
//       }

//       const data = await response.json();
//       setTips(
//         data.choices[0]?.message.content.trim() ||
//           "No tips generated. Please try again."
//       );
//     } catch (error) {
//       console.error("Error generating tips:", error);
//       alert(error.message || "Failed to generate tips. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-[#d8f3ff] my-6 p-5 rounded-sm">
//       <h2 className="text-xl font-medium text-sky-700 mb-4">
//         Before applying for this job, ensure that your resume is optimized for
//         Applicant Tracking Systems (ATS). Check if it meets the necessary
//         criteria to increase your chances of getting noticed by employers.
//       </h2>
//       {/* <p>{jobDescription}</p> */}
//       <input
//         type="file"
//         accept=".txt,.pdf"
//         onChange={handleFileUpload}
//         style={{ marginBottom: "20px" }}
//       />
//       <button
//         onClick={generateTips}
//         disabled={loading}
//         className="bg-blue-800 hover:bg-blue text-white font-normal py-3 px-4 rounded-sm transition duration-300"
//       >
//         {loading ? "Generating..." : "Generate Tips"}
//       </button>
//       {tips && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Tips for Improving Your Resume:</h3>
//           <pre
//             style={{
//               whiteSpace: "pre-wrap",
//               background: "#f9f9f9",
//               padding: "10px",
//               borderRadius: "5px",
//             }}
//           >
//             {tips}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumeTips;

import React, { useState } from "react";

const ResumeTips = ({ jobDescription }) => {
  const [resumeFile, setResumeFile] = useState(null);
  const [tips, setTips] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const extractResumeText = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject("Error reading file");
      reader.readAsText(file);
    });
  };

  const generateTips = async () => {
    if (!resumeFile) {
      alert("Please upload your resume.");
      return;
    }

    setLoading(true);
    try {
      const resumeText = await extractResumeText(resumeFile);
      const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
      console.log(import.meta.env.VITE_DEEPSEEK_API_KEY);

      if (!apiKey) {
        alert("API Key not found. Please check your .env file.");
        setLoading(false);
        return;
      }

      const response = await fetch("https://api.deepseek.com/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          resume: resumeText,
          jobDescription: jobDescription,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to fetch DeepSeek API"
        );
      }

      const data = await response.json();
      setTips(
        data?.tips ||
          "No tips generated. Please ensure inputs are formatted correctly."
      );
    } catch (error) {
      console.error("Error generating tips:", error);
      alert(error.message || "Failed to generate tips. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#d8f3ff] my-6 p-5 rounded-sm">
      <h2 className="text-xl font-medium text-sky-700 mb-4">
        Before applying for this job, ensure that your resume is optimized for
        Applicant Tracking Systems (ATS). Check if it meets the necessary
        criteria to increase your chances of getting noticed by employers.
      </h2>
      <input
        type="file"
        accept=".txt,.pdf"
        onChange={handleFileUpload}
        style={{ marginBottom: "20px" }}
      />
      <button
        onClick={generateTips}
        disabled={loading}
        className="bg-blue-800 hover:bg-blue text-white font-normal py-3 px-4 rounded-sm transition duration-300"
      >
        {loading ? "Generating..." : "Generate Tips"}
      </button>
      {tips && (
        <div style={{ marginTop: "20px" }}>
          <h3>Tips for Improving Your Resume:</h3>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              background: "#f9f9f9",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {tips}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ResumeTips;
