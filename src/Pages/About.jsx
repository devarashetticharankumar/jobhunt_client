import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../assets/Designer.png";
import { GoDotFill } from "react-icons/go";
const About = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto md:px-24 px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="md:flex">
          {/* Image Section */}
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <img
              src={aboutImg}
              alt="About JobNirvana"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/10"></div>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              About <span className="text-blue-600">Us</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              JobNirvana is more than just a job board - it's a community of job
              seekers, employers, and career experts dedicated to helping you
              succeed.
            </p>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                Connect job seekers with their dream jobs and help employers find the best talent.
                We believe everyone deserves a career that brings fulfillment.
              </p>

              <div className="pt-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Our Core Values</h3>
                <ul className="space-y-3">
                  {[
                    "Community & Collaboration",
                    "High-Quality Listings",
                    "User Success Dedication"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700 font-medium">
                      <GoDotFill className="text-blue-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-4 border-t border-gray-100">
                <Link
                  to="/contact-us"
                  className="inline-flex justify-center items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
