import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../data/apiPath";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { MdSearch, MdEdit, MdDelete, MdAdd, MdArticle } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

const MyBlogs = () => {
  const { user, getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const [blogs, setBlogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else if (user) {
      const fetchBlogs = async () => {
        try {
          const token = await getAccessTokenSilently();
          // Currently fetching ALL blogs as per existing logic. 
          // Ideal: Filter by user on backend.
          const response = await fetch(`${API_URL}/blogs/all-blogs`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) throw new Error("Failed");
          const data = await response.json();
          // Backend sorts by publishedDate.
          setBlogs(data);
        } catch (error) {
          console.error("Error fetching blogs:", error);
          toast.error("Failed to fetch blogs.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchBlogs();
    }
  }, [isAuthenticated, user, getAccessTokenSilently, loginWithRedirect]);

  // Pagination & Filter
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const currentBlogs = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < filteredBlogs.length) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const response = await fetch(`${API_URL}/blogs/blog/${slug}`, { method: "DELETE" });
      if (response.ok) {
        toast.success("Blog deleted successfully!");
        setBlogs(blogs.filter((blog) => blog.slug !== slug));
      } else {
        toast.error("Failed to delete.");
      }
    } catch (error) {
      toast.error("Error deleting blog.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>My Blogs | JobNirvana</title>
      </Helmet>
      <ToastContainer />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Blogs</h1>
            <p className="text-gray-500 mt-1">Manage and edit your published articles</p>
          </div>
          <Link to="/create-blog">
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-transform hover:scale-105">
              <MdAdd className="text-xl" /> Post New Blog
            </button>
          </Link>
        </div>

        {/* Search & Content Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Search Bar */}
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <div className="relative max-w-md">
              <MdSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search by blog title..."
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow shadow-sm"
              />
            </div>
          </div>

          {/* Blogs Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-semibold">No.</th>
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Author</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentBlogs.length > 0 ? (
                  currentBlogs.map((blog, index) => (
                    <motion.tr
                      key={blog._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-purple-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-500">
                        {index + 1 + (currentPage - 1) * itemsPerPage}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{blog.title}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {blog.author || "Unknown"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <Link to={`/blog/update/${blog.slug}`}>
                            <button className="p-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-600 hover:text-white transition-colors" title="Edit">
                              <MdEdit className="text-lg" />
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(blog.slug)}
                            className="p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                            title="Delete"
                          >
                            <MdDelete className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <MdArticle className="text-6xl text-gray-200 mb-4" />
                        <p className="text-lg">No blogs found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredBlogs.length > itemsPerPage && (
            <div className="p-6 border-t border-gray-100 flex justify-center gap-4 bg-gray-50/50">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border hover:bg-gray-100 shadow-sm text-gray-700'}`}
              >
                Previous
              </button>
              <span className="flex items-center text-gray-600">
                Page {currentPage} of {Math.ceil(filteredBlogs.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={indexOfLastItem >= filteredBlogs.length}
                className={`px-4 py-2 rounded-lg font-medium transition ${indexOfLastItem >= filteredBlogs.length ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border hover:bg-gray-100 shadow-sm text-gray-700'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MyBlogs;
