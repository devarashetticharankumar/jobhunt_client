import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import illustration from "../assets/bannerimg.png";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Banner = ({
  query,
  handleInputChange,
  location,
  handleSearchByLocation,
  handleSearch,
  suggestions,
  handleSuggestionClick,
}) => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-4 md:py-20">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Left Side Text */}
        <div className="md:w-1/2 w-full">
          <motion.h1
            className="text-5xl font-bold text-primary py-1"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
          >
            Discover <span className="text-blue">Your Dream Job</span> Today
          </motion.h1>
          <motion.p
            className="text-lg text-black/70 mb-8"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {`Explore thousands of opportunities across various industries. Whether you're looking for a remote position, a tech role, or an entry-level job, we've got you covered.`}
          </motion.p>
        </div>

        {/* Right Side Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <motion.img
            src={illustration}
            alt="Job search illustration"
            className="w-3/4 max-w-sm h-auto object-contain" // Adjusted size here
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>
      </div>
      {/* Form Section */}
      <form onSubmit={handleSearch} className="mt-8">
        <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
          <motion.div
            className="relative flex md:rounded-e-none rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <input
              type="text"
              name="title"
              id="title"
              value={query}
              onChange={handleInputChange}
              placeholder="E.g., Software Developer, Data Analyst"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
            />
            <FiSearch className="absolute mt-4 ml-2 text-gray-400" />

            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-auto mt-10 rounded-md">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    {suggestion.jobTitle}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          <motion.div
            className="flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full "
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <input
              type="text"
              name="location"
              id="location"
              value={location}
              onChange={handleSearchByLocation}
              placeholder="City, State"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
            />
            <FiMapPin className="absolute mt-4 ml-2 text-gray-400" />
          </motion.div>

          <motion.button
            type="submit"
            className=" bg-blue hover:bg-blue text-white font-bold py-3 px-4 rounded-md "
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Search Jobs
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
