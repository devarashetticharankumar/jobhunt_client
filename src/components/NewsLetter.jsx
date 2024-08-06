import React, { useState } from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
import { API_URL } from "../data/apiPath";
import axios from "axios";
import { motion } from "framer-motion";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/subscriptions/subscribe`, {
        email,
      });
      setMessage(response.data.message);
      setEmail("");
      setIsValidEmail(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response.data.message || "An error occurred.");
      setEmail("");
      setIsValidEmail(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleUnsubscribe = async () => {
    if (!isValidEmail) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/subscriptions/unsubscribe`,
        { email }
      );
      setMessage(response.data.message);
      setEmail("");
      setIsValidEmail(false);
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      setMessage(error.response.data.message || "An error occurred.");
      setEmail("");
      setIsValidEmail(false);
      setTimeout(() => setMessage(""), 5000);
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
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue text-white rounded font-semibold cursor-pointer"
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
          {message && <p className="text-center text-pink-800">{message}</p>}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }} // Start 50px to the right
        animate={{ opacity: 1, x: 0 }} // End at its natural position
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-20"
      >
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get noticed faster
        </h3>
        <p className="text-primary/75 text-base mb-4">
          To increase your chances of getting noticed faster when uploading a
          resume.
        </p>
        <div className="w-full space-y-4">
          <input
            type="submit"
            value="Upload your resume"
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue text-white rounded font-semibold cursor-pointer"
            onClick={() => {}}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default NewsLetter;
