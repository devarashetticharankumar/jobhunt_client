// import React, { useState } from "react";
// import { API_URL } from "../data/apiPath";

// const ContactUs = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${API_URL}/api/contact`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ firstName, lastName, email, message }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setStatus(data.message);
//         setFirstName("");
//         setLastName("");
//         setEmail("");
//         setMessage("");
//       } else {
//         const errorData = await response.json();
//         setStatus(errorData.error || "Failed to send message");
//       }
//     } catch (error) {
//       console.error(error);
//       setStatus("Failed to send message");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-16 bg-[#FAFAFA]">
//       <h2 className="text-3xl font-semibold text-center mb-8">Contact Us</h2>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//         <div className="mb-4">
//           <label
//             htmlFor="firstName"
//             className="block text-gray-700 font-semibold mb-2"
//           >
//             First Name*
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             className="create-job-input"
//             value={firstName}
//             placeholder="John"
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="lastName"
//             className="block text-gray-700 font-semibold mb-2"
//           >
//             Last Name
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             className="create-job-input"
//             value={lastName}
//             placeholder="Dev"
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="block text-gray-700 font-semibold mb-2"
//           >
//             Email*
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="create-job-input"
//             value={email}
//             placeholder="example@gmail.com"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label
//             htmlFor="message"
//             className="block text-gray-700 font-semibold mb-2"
//           >
//             Message
//           </label>
//           <textarea
//             id="message"
//             className="create-job-input"
//             value={message}
//             placeholder="Ask us anything related to jobs"
//             onChange={(e) => setMessage(e.target.value)}
//           />
//         </div>
//         <div className="flex items-center justify-center">
//           <button
//             type="submit"
//             className="bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContactUs;

import React, { useState } from "react";
import { API_URL } from "../data/apiPath";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-[#FAFAFA]">
      <h2 className="text-3xl font-semibold text-center mb-8">Contact Us</h2>
      {status && <p className="text-center text-red-500 mb-4">{status}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="firstName"
            className="block text-gray-700 font-semibold mb-2"
          >
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            className="create-job-input"
            value={firstName}
            placeholder="John"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-gray-700 font-semibold mb-2"
          >
            Last Name*
          </label>
          <input
            type="text"
            id="lastName"
            className="create-job-input"
            value={lastName}
            placeholder="Dev"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email*
          </label>
          <input
            type="email"
            id="email"
            className="create-job-input"
            value={email}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 font-semibold mb-2"
          >
            Message*
          </label>
          <textarea
            id="message"
            className="create-job-input"
            value={message}
            placeholder="Ask us anything related to jobs"
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
