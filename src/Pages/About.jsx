import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../assets/Designer.png";
import { GoDotFill } from "react-icons/go";
const About = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-5 bg-[#FAFAFA] my-5 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center text-center lg:mb-12">
          <div className="lg:w-full lg:mb-0 mb-1">
            <h1 className="text-4xl font-bold leading-tight text-center mb-4">
              About Us
            </h1>
            <p className="text-gray-600 text-xl mb-8 ">
              {`JobNirvana is more than just a job board - it's a community of job
              seekers, employers, and career experts dedicated to helping you
              succeed.`}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="lg:w-1/4 md:w-full px-4">
            <img
              src={aboutImg}
              alt="About Us Image"
              className="w-full rounded-lg shadow-lg mb-8 "
            />
          </div>
          <div className="lg:w-3/4 md:w-full px-4">
            <p className="text-gray-600 leading-relaxed mb-4">
              Our mission is to connect job seekers with their dream jobs and
              help employers find the best talent. We believe that everyone
              deserves a career that brings them fulfillment and happiness.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              {`Our team is comprised of experienced professionals from various
              industries, including HR, recruitment, and career coaching. We're
              passionate about helping people achieve their career goals and
              making a positive impact on the job market.`}
            </p>
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed mb-4">
              <li className="flex items-center gap-1">
                <GoDotFill /> We believe in the power of community and
                collaboration.
              </li>
              <li className="flex items-center gap-1">
                <GoDotFill />
                {`We're committed to providing high-quality job listings and
                career resources.`}
              </li>
              <li className="flex items-center  gap-1">
                <GoDotFill />
                {`We're dedicated to helping job seekers achieve their career
                goals.`}
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              Want to learn more about our team and how we can help you?{" "}
              <Link to="/contact-us" className="text-blue-600 underline">
                Get in touch with us!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
