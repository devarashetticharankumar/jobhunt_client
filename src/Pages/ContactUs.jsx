import React, { useState, useEffect } from "react";
import { API_URL } from "../data/apiPath";
import aboutImg from "../assets/contactusimg.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, message }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        toast.success(data.message || "Message sent successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setIsSuccess(true);
        setStatus("Message sent successfully!");
      } else {
        toast.error(data.error || "Failed to send message.");
        setIsSuccess(false);
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to send message.");
      setIsSuccess(false);
      setStatus("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* React Helmet for SEO */}
      <Helmet>
        <title>Contact Us | JobNirvana</title>
        <meta
          name="description"
          content="Get in touch with JobNirvana. Send us your queries or feedback."
        />
        <meta
          name="keywords"
          content="contact, JobNirvana, feedback, customer support"
        />
        <meta property="og:title" content="Contact Us | JobNirvana" />
        <meta
          property="og:description"
          content="Get in touch with JobNirvana. Send us your queries or feedback."
        />
        <meta property="og:image" content={aboutImg} />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`${window.location.href}`} />
      </Helmet>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row border border-gray-100">
        {/* Left Side: Image & Info */}
        <div className="md:w-1/2 relative bg-blue-600 text-white">
          <img
            src={aboutImg}
            alt="Contact Us"
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
          />
          <div className="relative z-10 p-12 h-full flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">Let's Chat</h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Have questions about your job search or need support? We're here to help you navigate your career journey.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-blue-50">
                <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                  <FiMail className="w-6 h-6" />
                </div>
                <span>support@jobnirvana.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="md:w-1/2 p-8 md:p-12 lg:p-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h2>
          <p className="text-gray-500 mb-8">We'd love to hear from you.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-semibold text-gray-700 block">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiUser />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    value={firstName}
                    placeholder="John"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-semibold text-gray-700 block">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiUser />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    value={lastName}
                    placeholder="Doe"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiMail />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  value={email}
                  placeholder="john@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-gray-700 block">
                Message
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
                  <FiMessageSquare />
                </div>
                <textarea
                  id="message"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  value={message}
                  placeholder="How can we help you?"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows="4"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>Sending...</>
              ) : (
                <>
                  Send Message <FiSend />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default ContactUs;
