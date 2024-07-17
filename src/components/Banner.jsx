/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { API_URL } from "../data/apiPath";

const Banner = ({
  query,
  handelInputChange,
  location,
  handelSearchByLocation,
}) => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/jobs/all-jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, [searchText]);

  const handleSearch = () => {
    const filter = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setJobs(filter);
  };
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14">
      <h1 className="text-5xl font-bold text-primary">
        Find your <span className="text-blue">new job</span> today
      </h1>
      <p className="text-lg text-black/70 mb-8">
        Thousands of jobs in the computer, engineering and technology sectors
        are waiting for you.
      </p>

      <form>
        <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
          <div className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full">
            <input
              type="text"
              name="title"
              id="title"
              value={query}
              onChange={handelInputChange}
              // onChange={(e) => setSearchText(e.target.value)}
              placeholder="what position are you looking for?"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
            />
            <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
          </div>
          <div className="flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full">
            <input
              type="text"
              name="title"
              id="title"
              value={location}
              onChange={handelSearchByLocation}
              placeholder="Location"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
            />
            <FiMapPin className="absolute mt-2.5 ml-2 text-gray-400" />
          </div>
          <button
            type="submit"
            className="bg-blue hover:bg-indigo-700 py-2 px-8 text-white md:rounded-s-none rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Banner;
