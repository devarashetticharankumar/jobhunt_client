import React, { useState } from "react";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", { firstName, lastName, email, message });
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-16 bg-[#FAFAFA]">
      <h2 className="text-3xl font-semibold text-center mb-8">Contact Us</h2>
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
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="create-job-input"
            value={lastName}
            placeholder="Dev"
            onChange={(e) => setLastName(e.target.value)}
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
            Message
          </label>
          <textarea
            id="message"
            className="create-job-input"
            value={message}
            placeholder="Ask us anything related to jobs"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
