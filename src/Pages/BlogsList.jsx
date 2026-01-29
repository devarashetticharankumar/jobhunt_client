import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import InFeedAd from "../components/InFeedAd";
import InArticleAd from "../components/InArticleAd";
import ProfileCard from "../components/dashboard/ProfileCard";
import SkeletonLoading from "../components/SkeletonLoading";
import { useAuth0 } from "@auth0/auth0-react";
import { FaSearch, FaRegClock, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const BlogsList = () => {
  const { user } = useAuth0();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const blogsPerPage = 8;


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/all-blogs`);
        const data = await response.json();
        if (response.ok) {
          setBlogs(data);
          setCategories([...new Set(data.map((blog) => blog.category))]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesQuery = blog.title.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategory ? blog.category === selectedCategory : true;
    return matchesQuery && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      <Helmet>
        <title>Career Insights & Industry Trends | JobNirvana Blog</title>
        <meta name="description" content="Explore the latest job market insights, career tips, and industry trends." />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-10 mb-8">
        <div className="max-w-[1240px] mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-[#091e42] mb-4">
            Career Insights & Trends
          </h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            Stay ahead in your professional journey with our latest articles and guidance.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mt-8 relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search articles..."
              className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4">
        <div className="lg:grid lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDEBAR (25%) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <ProfileCard />

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Categories</h2>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryClick("")}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-bold transition-all ${!selectedCategory ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  All Articles
                </button>
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => handleCategoryClick(cat)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedCategory === cat ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN FEED (50%) */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            {isLoading ? (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <SkeletonLoading />
              </div>
            ) : paginatedBlogs.length > 0 ? (
              <>
                {paginatedBlogs.map((blog, index) => (
                  <React.Fragment key={blog._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group"
                    >
                      <Link to={`/blog/${blog.slug}`} className="flex flex-col md:flex-row h-full">
                        {blog.thumbnail && (
                          <div className="md:w-1/3 relative overflow-hidden h-48 md:h-auto">
                            <img
                              src={blog.thumbnail}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-6 md:w-2/3 flex flex-col">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded">
                              {blog.category}
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-gray-400">
                              <FaRegClock /> 5 min read
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-[#091e42] group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                            {blog.title}
                          </h3>
                          <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                            <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              Read Full Article <FaChevronRight className="text-[10px]" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>

                    {/* In-Feed Ad every 3 posts */}
                    {(index + 1) % 3 === 0 && (
                      <div className="py-2">
                        <InFeedAd />
                      </div>
                    )}
                  </React.Fragment>
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 py-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold disabled:opacity-50 hover:bg-gray-50 transition-colors"
                    >
                      Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1 ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold disabled:opacity-50 hover:bg-gray-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-500 mb-6">Try a different search term or category.</p>
                <button onClick={() => { setSearchQuery(""); setSelectedCategory(""); }} className="text-blue-600 font-bold hover:underline">
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR (25%) */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-[#091e42] mb-4">Newsletter</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Get the latest career tips and industry news delivered to your inbox.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500/20 mb-3"
              />
              <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                Subscribe Now
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

      {/* Bottom Sticky Ad for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <InFeedAd />
      </div>
    </div>
  );
};

export default BlogsList;
