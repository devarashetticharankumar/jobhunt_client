import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react"; // Import the useAuth0 hook
import { API_URL } from "../data/apiPath";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet"; // Import Helmet

const MyBlogs = () => {
  const { user, getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
    useAuth0();
  const [blogs, setBlogs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else if (user) {
      const fetchBlogs = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch(`${API_URL}/blogs/all-blogs`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          // Sort blogs by createdAt date (most recent first)
          data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setBlogs(data);
        } catch (error) {
          console.error("Error fetching blogs:", error);
          toast.error("Error fetching blogs. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchBlogs();
    }
  }, [
    isAuthenticated,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    navigate,
  ]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < blogs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = () => {
    const filter = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setBlogs(filter);
  };

  const handleDelete = async (slug) => {
    // Confirm deletion with the user
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/blogs/blog/${slug}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (response.ok) {
        // Use toast instead of alert
        toast.success("Blog deleted successfully!");
        // Optionally, re-fetch the list of blogs here
      } else {
        throw new Error("Blog deletion not acknowledged");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog. Please try again.");
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* Add Helmet for meta tags */}
      <Helmet>
        <title>My Blogs - BlogNirvana</title>
        <meta
          name="description"
          content="View and manage your blog posts on BlogNirvana. Keep track of your posted blogs, edit details, and delete listings as needed."
        />
        <meta
          name="keywords"
          content="blogs, blog posts, manage blogs, BlogNirvana"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <PageHeader title={"My Blogs"} path={"My blogs"} />
      <ToastContainer />
      <div className="my-blogs-container">
        <div className="search-box p-2 text-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Ex: React Blog"
            onChange={(e) => setSearchText(e.target.value)}
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
          />
          <button
            className="bg-blue hover:bg-indigo-700 text-white font-semibold px-8 py-2 rounded-sm mb-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <section className="py-1 bg-blueGray-50">
        <motion.div
          className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4 mx-auto mt-5"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
        >
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center w-full">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Blogs
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to="/create-blog">
                    <button
                      className="bg-blue hover:bg-indigo-700 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-2 rounded-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      POST A NEW BLOG
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto no-scrollbar">
              {isLoading ? (
                <div className="flex items-center justify-center h-20">
                  <p>Loading...</p>
                </div>
              ) : (
                <table className="items-center bg-transparent w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        NO.
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        TITLE
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        AUTHOR
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        EDIT
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        DELETE
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentBlogs.map((blog, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {blog.title}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {blog.author}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <Link to={`/blog/update/${blog.slug}`}>
                            <button className="text-blue-500">Edit</button>
                          </Link>
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            className="text-red-500"
                            onClick={() => handleDelete(blog.slug)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 mx-2 bg-gray-200 rounded"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 mx-2 bg-gray-200 rounded"
              onClick={nextPage}
              disabled={indexOfLastItem >= blogs.length}
            >
              Next
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MyBlogs;
