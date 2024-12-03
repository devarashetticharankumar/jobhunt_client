import { useEffect, useRef, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import NewsLetter from "../components/NewsLetter";
import { API_URL } from "../data/apiPath";
import InFeedAd from "../components/InFeedAd"; // Import the InFeedAd component
import "react-loading-skeleton/dist/skeleton.css";
import { Helmet } from "react-helmet"; // Import Helmet

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const itemsPerPage = 10;

  const jobsRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/jobs/all-jobs`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return res.json();
      })
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    if (value) {
      const filteredSuggestions = jobs
        .filter((job) =>
          job.jobTitle.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 10); // Show up to 10 suggestions
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.jobTitle);
    setSuggestions([]);
  };

  const filteredItems = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearchByLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page on search
    setSuggestions([]); // Clear suggestions when searching

    // Scroll to the jobs section
    if (jobsRef.current) {
      jobsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredData = () => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (location) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobLocation.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
          qualification,
        }) =>
          jobLocation.toLowerCase() === selectedCategory.toLowerCase() ||
          postingDate >= selectedCategory ||
          parseInt(maxPrice) <= parseInt(selectedCategory) ||
          salaryType.toLowerCase() === selectedCategory.toLowerCase() ||
          experienceLevel.toLowerCase() === selectedCategory.toLowerCase() ||
          employmentType.toLowerCase() === selectedCategory.toLowerCase()
        // qualification.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    const { startIndex, endIndex } = calculatePageRange();
    const slicedJobs = filteredJobs.slice(startIndex, endIndex);

    // Add an ad after every 3 job cards
    const result = [];
    const adFrequency = 3; // Adjust this number as needed

    slicedJobs.forEach((data, i) => {
      result.push(<Card key={`job-${i}`} data={data} />);
      if ((i + 1) % adFrequency === 0) {
        result.push(<InFeedAd key={`ad-${i}`} />);
      }
    });

    return result;
  };

  const result = filteredData();

  return (
    <div>
      <Helmet>
        <title>jobNirvana - Find Your Dream Job</title>
        <meta
          name="description"
          content="Explore a wide range of job opportunities across various categories. Find your dream job at JobNirvana."
        />
        <meta
          name="keywords"
          content="jobs, job search, job portal, employment, career opportunities, JobNirvana"
        />
        <meta name="author" content="CharanKumar" />
        <meta property="og:title" content="JobNirvana - Find Your Dream Job" />
        <meta
          property="og:description"
          content="Explore a wide range of job opportunities across various categories. Find your dream job at JobNirvana."
        />
        <meta property="og:url" content="https://jobnirvana.netlify.app" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:image"
          content="https://i.imgur.com/0qGt7qj.png"
        />{" "}
        {/* Replace with your logo URL */}
        <link rel="canonical" href={`${window.location.href}`} />
      </Helmet>
      <Banner
        query={query}
        handleInputChange={handleInputChange}
        location={location}
        handleSearchByLocation={handleSearchByLocation}
        handleSearch={handleSearch}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
      />

      <div className="bg-[#FAFAFa] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar
            handleChange={handleChange}
            handleClick={handleClick}
            setJobs={jobs}
          />
        </div>

        <div className="col-span-2 bg-white" ref={jobsRef}>
          {isLoading ? (
            <div>
              <div className="animate-pulse space-y-4">
                {/* Skeleton Header Section */}
                <div className="flex items-center mb-6 mt-6 space-x-4">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-300 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-36 md:w-48 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-28 md:w-32"></div>
                  </div>
                </div>

                {/* Skeleton Content Section */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/5 md:w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/4 md:w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>

                {/* Skeleton Large Content Block */}
                <div className="my-6 h-32 md:h-40 bg-gray-300 rounded"></div>

                {/* Skeleton Small Content Section */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-2/5 md:w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3 md:w-1/4"></div>
                </div>

                {/* Skeleton Button */}
                <div className="h-10 md:h-12 bg-gray-300 rounded w-full mt-6"></div>
              </div>

              <div className="animate-pulse space-y-4">
                {/* Skeleton Header Section */}
                <div className="flex items-center mb-6 mt-6 space-x-4">
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-300 rounded-lg"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-36 md:w-48 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-28 md:w-32"></div>
                  </div>
                </div>

                {/* Skeleton Content Section */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/5 md:w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/4 md:w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>

                {/* Skeleton Large Content Block */}
                <div className="my-6 h-32 md:h-40 bg-gray-300 rounded"></div>

                {/* Skeleton Small Content Section */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-2/5 md:w-1/3"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3 md:w-1/4"></div>
                </div>

                {/* Skeleton Button */}
                <div className="h-10 md:h-12 bg-gray-300 rounded w-full mt-6"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center lg:mt-32">
              <p className="text-red-500">{error}</p>
            </div>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <div className="text-center m-auto flex flex-col items-center justify-center">
              <h3 className="text-lg font-bold mb-2">{result.length} jobs</h3>
              <p>No data found.</p>
            </div>
          )}

          {/* Pagination controls */}
          {result.length > 0 && (
            <div className="flex items-center justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Previous
              </button>
              <span className="mx-2">
                page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}{" "}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded">
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default Home;
