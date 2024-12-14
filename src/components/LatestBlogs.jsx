import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { API_URL } from "../data/apiPath";

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/all-blogs`);
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data); // Store the data (which should be 3 latest blogs)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Once the data is fetched, stop loading
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="py-8">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        // Skeleton loader while loading blogs
        <div className="flex flex-col space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 animate-pulse rounded-lg overflow-hidden"
            >
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-center text-lg">No blogs found.</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {blogs.slice(0, 4).map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog.slug}`} // Use Link for redirection
              className="bg-white shadow-lg rounded-md overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img
                src={blog.thumbnail || "/default-thumbnail.jpg"}
                alt={blog.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {blog.title.slice(0, 70)}
                </h3>
                <p className="text-gray-600 mb-1">
                  {blog.author} on <br></br>
                  {new Date(blog.publishedDate).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestBlogs;
