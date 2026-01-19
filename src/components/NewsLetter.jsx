import React, { useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { API_URL } from "../data/apiPath";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import LatestBlogs from "./LatestBlogs";
import InArticleAd from "./InArticleAd";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase()) && email.length <= 320;
  };

  const handleChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setIsValidEmail(validateEmail(email));
  };

  const handleSubscribe = async () => {
    if (!isValidEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/subscriptions/subscribe`, {
        email,
      });
      toast.success(response.data.message);
      setEmail("");
      setIsValidEmail(false);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred.");
      setEmail("");
      setIsValidEmail(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!isValidEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/subscriptions/unsubscribe`,
        { email }
      );
      toast.success(response.data.message);
      setEmail("");
      setIsValidEmail(false);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred.");
      setEmail("");
      setIsValidEmail(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-gray-900">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
            <FaEnvelopeOpenText />
          </div>
          Email me for jobs
        </h3>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Subscribe for fresh job opportunities and career tips delivered to your inbox!
        </p>
        <div className="w-full space-y-3">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full block py-3 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
          <input
            type="submit"
            value="Subscribe Now"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md cursor-pointer text-sm"
            onClick={handleSubscribe}
          />
          {isValidEmail && (
            <input
              type="submit"
              value="Unsubscribe"
              className="w-full block py-2.5 px-4 border border-red-100 bg-red-50 text-red-600 rounded-xl font-semibold cursor-pointer hover:bg-red-100 transition-colors text-sm"
              onClick={handleUnsubscribe}
            />
          )}
        </div>
      </motion.div>
      <ToastContainer position="bottom-right" theme="light" />

      {/* Integrated Latest Blogs */}
      <LatestBlogs />

      {/* Sticky Ad for Newsletter Column */}
      <div className="mt-8 sticky top-4">
        <div className="text-xs text-center text-gray-400 mb-2">Advertisement</div>
        <InArticleAd />
      </div>

    </div>
  );
};

export default NewsLetter;
