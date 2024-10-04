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

//       const data = await response.json();

//       if (response.ok) {
//         setStatus(data.message);
//         setFirstName("");
//         setLastName("");
//         setEmail("");
//         setMessage("");
//       } else {
//         setStatus(data.error || "Failed to send message");
//       }
//     } catch (error) {
//       console.error(error);
//       setStatus("Failed to send message");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-16 bg-[#FAFAFA]">
//       <h2 className="text-3xl font-semibold text-center mb-8">Contact Us</h2>
//       {status && <p className="text-center text-red-500 mb-4">{status}</p>}
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
//             Last Name*
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             className="create-job-input"
//             value={lastName}
//             placeholder="Dev"
//             onChange={(e) => setLastName(e.target.value)}
//             required
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
//             Message*
//           </label>
//           <textarea
//             id="message"
//             className="create-job-input"
//             value={message}
//             placeholder="Ask us anything related to jobs"
//             onChange={(e) => setMessage(e.target.value)}
//             required
//           />
//         </div>
//         <div className="flex items-center justify-center">
//           <button
//             type="submit"
//             className="bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ContactUs;

import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";
import aboutImg from "../assets/contactusimg.jpg";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

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
        setIsSuccess(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(data.error || "Failed to send message");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message");
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row w-full max-w-4xl">
        {/* Left Side: Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={aboutImg}
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:w-1/2 p-8">
          <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
          {status && (
            <p
              className={`mb-4 ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {status}
            </p>
          )}
          <form onSubmit={handleSubmit}>
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
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lastName}
                placeholder="Doe"
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
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={message}
                placeholder="Your message here..."
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="5"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue hover:bg-blue text-white font-bold py-3 px-4 rounded-md transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
