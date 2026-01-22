import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

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
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-4 md:py-12">
      <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-4 md:p-16 text-center relative overflow-hidden shadow-2xl">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 relative z-10 leading-tight">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">Dream Job</span> Today
        </h1>
        <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
          Over 10,000+ jobs available. Search by role, location, or company and take the next step in your career.
        </p>

        <form onSubmit={handleSearch} className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-2 transition-colors">
            <div className="flex-1 relative group">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                name="title"
                id="title"
                value={query}
                onChange={handleInputChange}
                aria-label="Search Job Title"
                placeholder="Job title, keywords, or company"
                className="w-full h-14 pl-12 pr-4 rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-400 bg-transparent focus:bg-blue-50/50 dark:focus:bg-gray-700/50 focus:outline-none transition-colors border-none"
                autoComplete="off"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-20 top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 max-h-60 overflow-auto divide-y divide-gray-50 dark:divide-gray-700">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-6 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer text-left text-gray-700 dark:text-gray-200 transition-colors flex items-center justify-between group/item"
                    >
                      <span className="font-medium">{suggestion.jobTitle}</span>
                      <span className="text-gray-400 text-sm group-hover/item:text-blue-500">Select</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="h-px md:h-auto md:w-px bg-gray-200 dark:bg-gray-700 my-2 md:my-0"></div>

            <div className="flex-1 relative group">
              <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                name="location"
                id="location"
                value={location}
                onChange={handleSearchByLocation}
                aria-label="Search Location"
                placeholder="City, State or Zip"
                className="w-full h-14 pl-12 pr-4 rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-400 bg-transparent focus:bg-blue-50/50 dark:focus:bg-gray-700/50 focus:outline-none transition-colors border-none"
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 px-8 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Banner;
