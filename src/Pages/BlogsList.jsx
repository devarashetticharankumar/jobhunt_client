import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import InFeedAd from "../components/InFeedAd";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const blogsPerPage = 9; // Number of blogs per page

  // Fetch blogs data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/all-blogs`);
        const data = await response.json();

        if (response.ok) {
          setBlogs(data);
          setFilteredBlogs(data);

          // Set unique categories for the filter
          const uniqueCategories = [
            ...new Set(data.map((blog) => blog.category)),
          ];
          setCategories(uniqueCategories);

          // Calculate total pages for pagination
          setTotalPages(Math.ceil(data.length / blogsPerPage));
        } else {
          setMessage(data.message || "Failed to fetch blogs");
        }
      } catch (error) {
        setMessage("Error fetching blogs");
      }
    };

    fetchBlogs();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterBlogs(query, selectedCategory, currentPage);
  };

  // Handle category filter click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    filterBlogs(searchQuery, category, currentPage);
  };

  // Filter blogs based on search query, category, and pagination
  const filterBlogs = (query, category, page) => {
    const filtered = blogs.filter((blog) => {
      const matchesQuery = blog.title.toLowerCase().includes(query);
      const matchesCategory = category ? blog.category === category : true;
      return matchesQuery && matchesCategory;
    });

    // Calculate pagination for the current page
    const startIndex = (page - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    const paginatedBlogs = filtered.slice(startIndex, endIndex);

    setFilteredBlogs(paginatedBlogs);
  };

  // Handle page change in pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    filterBlogs(searchQuery, selectedCategory, pageNumber);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-5 bg-[#FAFAFA] my-5">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>jobNirvana-Blogs | JobNirvana</title>
        <meta
          name="description"
          content="Discover the latest job market insights, career tips, and industry trends with JobNirvana's blog. Stay informed and boost your professional growth."
        />
        <meta
          name="keywords"
          content="blogs, job insights, career tips, professional development, industry trends, JobNirvana"
        />
        <meta property="og:title" content="Latest Blogs | JobNirvana" />
        <meta
          property="og:description"
          content="Stay updated with the latest blogs on JobNirvana. Get insights on job market trends, career advice, and more to help you succeed professionally."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.href}`} />
        <link rel="canonical" href={`${window.location.href}`} />
      </Helmet>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Blogs</h1>

      {/* Add Google Ad Banner */}
      {/* Layout for Mobile (Column) and Desktop (Row) */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md order-1 md:order-none">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Categories
          </h3>

          {/* Horizontal scroll on mobile devices */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible space-x-2 py-2 md:space-x-0 md:space-y-2">
            <button
              className={`w-auto px-4  py-2 rounded-lg text-center ${
                !selectedCategory
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-teal-600`}
              onClick={() => handleCategoryClick("")}
            >
              All
            </button>

            {categories.map((category, index) => (
              <button
                key={index}
                className={`w-auto px-4 py-2 rounded-lg text-center ${
                  selectedCategory === category
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } hover:bg-teal-600`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content (Blogs List) */}
        <div className="w-full md:w-3/4 order-2 md:order-none">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search blogs by title"
              className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Grid Layout for Blogs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, index) => (
              <div
                key={blog._id}
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105"
              >
                {blog.thumbnail && (
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-lg mb-4 shadow-md transition-all duration-300 ease-in-out transform"
                  />
                )}
                <Link to={`/blog/${blog.slug}`}>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-all duration-200 mb-2">
                      {blog.title.length > 50
                        ? `${blog.title.slice(0, 50)}...`
                        : blog.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg mx-2"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg mx-2 ${
                  currentPage === index + 1
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg mx-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mb-6">
        <InFeedAd />
      </div>
    </div>
  );
};

export default BlogsList;
