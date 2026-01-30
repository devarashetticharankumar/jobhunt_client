import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { motion } from "framer-motion";
import { API_URL } from "../data/apiPath";
import { Link } from "react-router-dom";
import InFeedAd from "../components/InFeedAd";
import InArticleAd from "../components/InArticleAd";
import { Helmet } from "react-helmet-async";
import SkeletonLoading from "../components/SkeletonLoading";
import ProfileCard from "../components/dashboard/ProfileCard";
import { FaStar, FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import Pagination from "../components/Pagination";

const SalaryPage = () => {
  const { user } = useAuth0();
  const [searchText, setSearchText] = useState("");
  const [salary, setSalary] = useState([]);
  const [filteredSalary, setFilteredSalary] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;


  useEffect(() => {
    fetch(`${API_URL}/jobs/all-salaries`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return res.json();
      })
      .then((data) => {
        setSalary(data);
        setFilteredSalary(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const filtered = salary.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSalary(filtered);
    setCurrentPage(1);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredSalary.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredSalary.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      <Helmet>
        <title>Estimated Salary | JobNirvana</title>
        <meta
          name="description"
          content="Explore estimated salaries for various job titles in the tech industry. Find out the average salary range for roles such as Software Engineer, Data Analyst, and more."
        />
        <link rel="canonical" href={`${window.location.href}`} />
      </Helmet>

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-8 md:py-12 mb-8">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#091e42] mb-4">
              Estimated Salary Insights
            </h1>
            <p className="text-gray-500 font-medium text-lg leading-relaxed">
              Benchmark your earnings with the latest salary data for top tech roles.
            </p>
          </div>

          {/* In-Header Search */}
          <div className="mt-8 flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative group">
              <input
                type="text"
                className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                placeholder="Enter role (e.g., 'React Developer')"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            </div>
            <button
              onClick={handleSearch}
              className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 whitespace-nowrap"
            >
              Search Salaries
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4">
        <div className="lg:grid lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDEBAR (25%) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <ProfileCard />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mt-6">
              <h4 className="font-bold text-[#091e42] mb-4 text-sm uppercase tracking-wider">Salary Tips</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">💡</div>
                  <p className="text-xs text-gray-500 leading-relaxed">Negotiate based on market data rather than current earnings.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">📊</div>
                  <p className="text-xs text-gray-500 leading-relaxed">Location and company size impact ranges significantly.</p>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN FEED (50%) */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            {loading ? (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <SkeletonLoading />
              </div>
            ) : currentJobs.length > 0 ? (
              <>
                {currentJobs.map((data, index) => (
                  <React.Fragment key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all relative group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-xl text-[#091e42] group-hover:text-blue-600 transition-colors">
                            {data.jobTitle}
                          </h4>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mt-2">
                            <FaBriefcase className="text-[10px]" /> {data.experienceLevel}
                          </span>
                        </div>
                        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 text-xl font-bold">
                          ₹
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[11px] text-gray-400 uppercase font-bold tracking-widest block mb-1">Market Range</span>
                            <p className="font-bold text-2xl text-[#091e42]">
                              {data.minPrice} - {data.maxPrice} <span className="text-sm text-gray-400 font-medium">{data.salaryType === "Monthly" ? "k" : "LPA"}</span>
                            </p>
                          </div>
                          <Link
                            to={`/job/${data.slug || data._id}`}
                            className="px-4 py-2 bg-white border border-gray-200 text-[#091e42] font-bold text-xs rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                          >
                            Explore Jobs
                          </Link>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><FaStar className="text-orange-400" /> High Demand</span>
                        <span>|</span>
                        <span>Updated Weekly</span>
                      </div>
                    </motion.div>

                    {/* In-Feed Ad Every 3 Items */}
                    {(index + 1) % 3 === 0 && (
                      <div className="py-2">
                        <InFeedAd />
                      </div>
                    )}
                  </React.Fragment>
                ))}

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-dashed border-gray-300">
                <FaMoneyBillWave className="text-5xl text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No data found</h3>
                <p className="text-gray-500 mb-6">Try searching for a different role or keyword.</p>
                <button onClick={() => { setSearchText(""); setFilteredSalary(salary); }} className="text-blue-600 font-bold hover:underline">
                  Reset Search
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR (25%) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
            <div className="bg-[#091e42] text-white rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <h4 className="text-lg font-bold mb-2">Unlock Premium Jobs</h4>
              <p className="text-blue-100 text-xs leading-relaxed mb-4">
                Access salaries for 50,000+ companies and get direct recruiter access.
              </p>
              <button className="w-full py-3 bg-white text-[#091e42] font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors">
                Upgrade to Premium
              </button>
            </div>

            {/* Sticky Sidebar Ad */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 overflow-hidden">
              <span className="text-[10px] text-gray-300 uppercase block mb-1 text-center font-bold tracking-widest">Advertisement</span>
              <InArticleAd />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SalaryPage;
