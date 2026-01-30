import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileCard from "../components/dashboard/ProfileCard";
import DashboardBanner from "../components/dashboard/DashboardBanner";
import JobWidget from "../components/dashboard/JobWidget";
import InArticleAd from "../components/InArticleAd";
import InFeedAd from "../components/InFeedAd";
import { API_URL } from "../data/apiPath";
import SkeletonLoading from "../components/SkeletonLoading";
import { FaSearch, FaFilter, FaChevronLeft, FaChevronRight, FaLightbulb, FaRocket } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "../components/Pagination";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, user, isLoading: isAuthLoading } = useAuth0();

  // Search & Pagination State
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Fetch jobs and blogs
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (query) params.append("search", query);
      params.append("page", currentPage);
      params.append("limit", itemsPerPage);

      try {
        const [jobsRes, blogsRes] = await Promise.all([
          fetch(`${API_URL}/jobs/all-jobs?${params.toString()}`),
          fetch(`${API_URL}/blogs/all-blogs`)
        ]);

        if (jobsRes.ok) {
          const data = await jobsRes.json();
          setJobs(data.jobs || []);
          setTotalPages(data.totalPages || 1);
        }

        if (blogsRes.ok) {
          const data = await blogsRes.json();
          const blogList = Array.isArray(data) ? data : [];
          setBlogs(blogList.slice(0, 3));
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load feed");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [query, currentPage]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-12">
      <Helmet>
        <title>Jobs Feed | JobNirvana</title>
        <meta name="description" content="Search and apply for the latest job opportunities on JobNirvana." />
      </Helmet>

      {/* Premium Sticky Search Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm transition-all duration-300">
        <div className="max-w-[1240px] mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            <div className="flex-1 relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search jobs by title, skills or companies..."
                value={query}
                onChange={handleSearch}
                className="w-full pl-12 pr-6 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none text-sm transition-all shadow-inner group-hover:bg-gray-100 group-focus-within:shadow-lg group-focus-within:bg-white"
              />
            </div>
            <button className="hidden md:flex items-center gap-2 px-6 py-3.5 bg-[#091e42] text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200">
              <FaFilter className="text-xs" /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 pt-10 mt-12">
        <div className="lg:grid lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN (25%) - Profile & Quick Insights */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <ProfileCard />

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <FaRocket className="text-5xl text-blue-600" />
              </div>
              <h4 className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <FaLightbulb /> Growth Tips
              </h4>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">
                Updating your profile daily increases your visibility to recruiters by <span className="text-blue-600 text-sm">40%</span>.
              </p>
              <Link to="/profile" className="mt-4 block text-[10px] font-extrabold text-[#091e42] uppercase hover:underline">
                Update Profile Now
              </Link>
            </div>
          </div>

          {/* CENTER COLUMN (50%) - Jobs Feed */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <DashboardBanner />

            {/* In-Feed Announcement Ad */}
            <div className="bg-white rounded-2xl p-2 border border-dashed border-gray-200 shadow-sm">
              <InFeedAd />
            </div>

            {isLoading ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-50">
                <SkeletonLoading />
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-100 text-red-600 p-8 rounded-2xl font-bold text-center">
                {error}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Top Banner Ad */}
                  <div className="mb-6">
                    <InArticleAd />
                  </div>

                  {jobs.map((job, index) => (
                    <div key={job._id || index}>
                      <JobWidget
                        title={index === 0 ? (query ? `Results for "${query}"` : "Recommended for you") : null}
                        count={index === 0 ? jobs.length : null}
                        jobs={[job]}
                      />
                      {/* Increased Ad Density (Every 2nd job) */}
                      {(index + 1) % 2 === 0 && (
                        <div className="my-6">
                          <InFeedAd />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* High Frequency Ad Injection */}
                  <div className="py-4">
                    <InArticleAd />
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </motion.div>
              </AnimatePresence>
            )}

            {/* Bottom Ad */}
            <div className="bg-white rounded-2xl p-2 border border-dashed border-gray-200">
              <InFeedAd />
            </div>
          </div>

          {/* RIGHT COLUMN (25%) - Extras & Sticky Ads */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28">

            {/* Career Insights Section */}
            {blogs.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                  <h4 className="font-extrabold text-[#091e42] text-sm">Career Insights</h4>
                  <Link to="/blogs" className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wider">View All</Link>
                </div>
                <div className="divide-y divide-gray-50">
                  {blogs.map((blog, idx) => (
                    <Link key={idx} to={`/blog/${blog.slug || blog._id}`} className="block p-4 hover:bg-blue-50/50 transition-colors group">
                      <h5 className="text-xs font-bold text-gray-700 group-hover:text-blue-600 line-clamp-2 leading-relaxed">
                        {blog.title}
                      </h5>
                      <span className="text-[9px] text-gray-400 font-bold uppercase mt-2 block tracking-widest">
                        {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sticky Sidebar Ad */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden">
              <InArticleAd />
            </div>

            {/* Fraud Protection Widget */}
            <div className="bg-[#091e42] rounded-2xl p-6 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">🛡️ Trust & Safety</h4>
              <p className="text-[10px] text-blue-100/70 leading-relaxed font-medium">
                JobNirvana never asks candidates for money. Beware of fraudsters claiming to represent us.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
