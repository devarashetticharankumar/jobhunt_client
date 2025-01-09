// import React, { useState } from "react";

// const ResumeTips = ({ jobDescription }) => {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [tips, setTips] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Handle file upload
//   const handleFileUpload = (e) => {
//     setResumeFile(e.target.files[0]);
//   };

//   // Extract text from a file (PDF or text)
//   const extractResumeText = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const text = reader.result;
//         resolve(text);
//       };
//       reader.onerror = () => {
//         reject("Error reading file");
//       };
//       reader.readAsText(file);
//     });
//   };

//   // Generate tips using OpenAI
//   const generateTips = async () => {
//     if (!resumeFile) {
//       alert("Please upload your resume.");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Extract resume text
//       const resumeText = await extractResumeText(resumeFile);

//       // Access OpenAI API Key from environment variables
//       const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // Ensure this is correctly set in your `.env` file

//       if (!apiKey) {
//         alert("API Key not found. Please check your .env file.");
//         setLoading(false);
//         return;
//       }

//       // OpenAI Request
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
//             model: "text-davinci-003",
//             prompt,
//             max_tokens: 500,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch OpenAI API");
//       }

//       const data = await response.json();
//       setTips(
//         data.choices[0]?.text.trim() || "No tips generated. Please try again."
//       );
//     } catch (error) {
//       console.error("Error generating tips:", error);
//       alert("Failed to generate tips. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h2>ATS-Friendly Resume Tips</h2>
//       <p>{jobDescription}</p>

//       <input
//         type="file"
//         accept=".txt,.pdf"
//         onChange={handleFileUpload}
//         style={{ marginBottom: "20px" }}
//       />
//       <button onClick={generateTips} disabled={loading}>
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
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey) {
        alert("API Key not found. Please check your .env file.");
        setLoading(false);
        return;
      }

      const prompt = `
        Job Description: ${jobDescription}
        Resume Content: ${resumeText}

        Provide ATS-friendly tips for improving the resume to match this job description. Include:
        - Missing keywords and skills
        - Formatting suggestions
        - Actionable examples
      `;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are an assistant that provides ATS-friendly resume tips.",
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 500,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to fetch OpenAI API"
        );
      }

      const data = await response.json();
      setTips(
        data.choices[0]?.message.content.trim() ||
          "No tips generated. Please try again."
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
      {/* <p>{jobDescription}</p> */}
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
