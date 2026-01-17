import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { API_URL } from "../data/apiPath";

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/all-blogs`);
        if (!response.ok) {
          throw new Error("The server is currently busy. Please try again later.");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (error || (blogs.length === 0 && !loading)) return null;

  return (
    <div className="mt-8 pt-8 border-t border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Latest Articles</h3>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex gap-4 animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.slice(0, 3).map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog.slug}`}
              className="flex gap-3 group"
            >
              <div className="w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                <img
                  src={blog.thumbnail || "/default-thumbnail.jpg"}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight mb-1">
                  {blog.title}
                </h4>
                <p className="text-xs text-gray-400">
                  {new Date(blog.createdAt || Date.now()).toLocaleDateString()}
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
