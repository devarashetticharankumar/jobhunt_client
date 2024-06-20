import React, { useState } from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log(email);
    setEmail("");
  };
  return (
    <div>
      <div>
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Example@gmail.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
          />
          <input
            type="submit"
            value={"Subscribe"}
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue text-white rounded font-semibold cursor-pointer"
            onClick={handleSubscribe}
          />
        </div>
      </div>
      {/* second part */}
      <div className="mt-20">
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
            value={"Upload your resume"}
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue text-white rounded font-semibold cursor-pointer"
            onClick={handleSubscribe}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
