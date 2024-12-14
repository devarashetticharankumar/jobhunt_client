import React, { useState } from "react";
import { FaEnvelopeOpenText } from "react-icons/fa6";
import { API_URL } from "../data/apiPath";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import LatestBlogs from "./LatestBlogs";

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
        initial={{ opacity: 0, x: 50 }} // Start 50px to the right
        animate={{ opacity: 1, x: 0 }} // End at its natural position
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Email me for jobs
        </h3>
        <p className="text-primary/75 text-base mb-4">
          Subscribe with your email and be the first to hear about new job
          opportunities, along with helpful tips and resources for your career
          journey!
        </p>
        <div className="w-full space-y-4">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Example@gmail.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
          />
          <input
            type="submit"
            value="Subscribe"
            className="w-full bg-blue hover:bg-blue text-white font-bold py-3 px-4 rounded-md transition duration-300"
            onClick={handleSubscribe}
          />
          {isValidEmail && (
            <input
              type="submit"
              value="Unsubscribe"
              className="w-full block py-2 pl-3 border focus:outline-none bg-red-600 text-white rounded font-semibold cursor-pointer"
              onClick={handleUnsubscribe}
            />
          )}
        </div>
      </motion.div>
      <ToastContainer /> {/* Add the ToastContainer component here */}
      <LatestBlogs />
    </div>
  );
};

export default NewsLetter;
