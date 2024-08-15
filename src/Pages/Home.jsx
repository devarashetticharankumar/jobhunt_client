// import { useEffect, useState } from "react";
// import Banner from "../components/Banner";
// import Card from "../components/Card";
// import Jobs from "./Jobs";
// import Sidebar from "../sidebar/Sidebar";
// import NewsLetter from "../components/NewsLetter";
// import { API_URL } from "../data/apiPath";
// import Footer from "../components/Footer";

// const Home = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   const [query, setQuery] = useState("");
//   const [location, setLocation] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     setIsLoading(true);
//     fetch(`${API_URL}/jobs/all-jobs`)
//       .then((res) => res.json())
//       .then((data) => {
//         setJobs(data);
//         setIsLoading(false);
//       });
//   }, []);

//   // console.log(jobs);

//   // handle input change
//   const handelInputChange = (event) => {
//     setQuery(event.target.value);
//   };

//   // filter jobs by location
//   const handelSearchByLocation = (event) => {
//     setLocation(event.target.value);
//   };
//   const filteredLocation = jobs.filter(
//     (locations) =>
//       locations.jobLocation.toLowerCase().indexOf(location.toLowerCase()) !== -1
//   );

//   // filter jobs by title

//   const filteredItems = jobs.filter(
//     (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
//   );

//   // ==============radio filtering =========================

//   const handleChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   // ==============button based filtering =========================

//   const handleClick = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   // =============calculate the index range

//   const calculatePageRange = () => {
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return { startIndex, endIndex };
//   };

//   // ========function for the next page
//   const nextPage = () => {
//     if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   // ========function for the previous page
//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // ===============main functions===========

//   const filteredData = (jobs, selected, query) => {
//     let filteredJobs = jobs;

//     // filtering input items
//     if (query) {
//       filteredJobs = filteredItems;
//     }

//     if (location) {
//       filteredJobs = filteredLocation;
//     }

//     // category filtering

//     if (selected) {
//       filteredJobs = filteredJobs.filter(
//         ({
//           jobLocation,
//           maxPrice,
//           experienceLevel,
//           salaryType,
//           employmentType,
//           postingDate,
//         }) =>
//           jobLocation.toLowerCase() === selected.toLowerCase() ||
//           postingDate >= selected ||
//           parseInt(maxPrice) <= parseInt(selected) ||
//           salaryType.toLowerCase() === selected.toLowerCase() ||
//           experienceLevel.toLowerCase() === selected.toLowerCase() ||
//           employmentType.toLowerCase() === selected.toLowerCase()
//       );

//       // console.log(filteredJobs);
//     }

//     // ========slice the data based on current page===========

//     const { startIndex, endIndex } = calculatePageRange();
//     filteredJobs = filteredJobs.slice(startIndex, endIndex);
//     return filteredJobs.map((data, i) => <Card key={i} data={data} />);
//   };

//   const result = filteredData(jobs, selectedCategory, query);

//   return (
//     <div>
//       <Banner
//         query={query}
//         handelInputChange={handelInputChange}
//         location={location}
//         handelSearchByLocation={handelSearchByLocation}
//       />

//       {/* main content */}
//       <div className="bg-[#FAFAFa] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
//         {/* Left side */}
//         <div className="bg-white p-4 rounded">
//           <Sidebar
//             handleChange={handleChange}
//             handleClick={handleClick}
//             setJobs={jobs}
//           />
//         </div>

//         {/* job cards */}
//         <div className="col-span-2 bg-white">
//           {isLoading ? (
//             <p className="font-medium flex items-center justify-center mt-16">
//               Loading...
//             </p>
//           ) : result.length > 0 ? (
//             <Jobs result={result} />
//           ) : (
//             <>
//               <h3 className="text-lg font-bold mb-2">{result.length} jobs</h3>
//               <p>No data found.</p>
//             </>
//           )}

//           {/*  pagination*/}
//           {result.length > 0 ? (
//             <div className="flex justify-center mt-4 space-x-8">
//               <button
//                 onClick={prevPage}
//                 disabled={currentPage === 1}
//                 className="hover:underline"
//               >
//                 Previous
//               </button>
//               <span className="mx-2">
//                 page {currentPage} of{" "}
//                 {Math.ceil(filteredItems.length / itemsPerPage)}
//               </span>
//               <button
//                 onClick={nextPage}
//                 disabled={
//                   currentPage === Math.ceil(filteredItems.length / itemsPerPage)
//                 }
//                 className="hover:underline"
//               >
//                 Next
//               </button>
//             </div>
//           ) : (
//             ""
//           )}
//         </div>

//         {/* Right side */}
//         <div className="bg-white p-4 rounded">
//           <NewsLetter />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useEffect, useRef, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import NewsLetter from "../components/NewsLetter";
import { API_URL } from "../data/apiPath";
import Footer from "../components/Footer";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const jobsRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/jobs/all-jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchByLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to the first page on search

    // Scroll to the jobs section
    if (jobsRef.current) {
      jobsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredLocation = jobs.filter((job) =>
    job.jobLocation.toLowerCase().includes(location.toLowerCase())
  );

  const filteredItems = jobs.filter((job) =>
    job.jobTitle.toLowerCase().includes(query.toLowerCase())
  );

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
      filteredJobs = filteredItems;
    }

    if (location) {
      filteredJobs = filteredLocation;
    }

    // categoty filtering

    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selectedCategory.toLowerCase() ||
          postingDate >= selectedCategory ||
          parseInt(maxPrice) <= parseInt(selectedCategory) ||
          salaryType.toLowerCase() === selectedCategory.toLowerCase() ||
          experienceLevel.toLowerCase() === selectedCategory.toLowerCase() ||
          employmentType.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData();

  return (
    <div>
      <Banner
        query={query}
        handleInputChange={handleInputChange}
        location={location}
        handleSearchByLocation={handleSearchByLocation}
        handleSearch={handleSearch}
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
            <p className="font-medium flex items-center justify-center mt-16">
              Loading...
            </p>
          ) : result.length > 0 ? (
            <Jobs result={result} />
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{result.length} jobs</h3>
              <p>No data found.</p>
            </>
          )}

          {result.length > 0 && (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                }
                className="hover:underline"
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
