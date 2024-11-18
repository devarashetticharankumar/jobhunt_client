import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";
import RelatedjobCards from "../components/RelatedJobsCard"; // Make sure you have this component for displaying individual blog cards

const RelatedBlogs = ({ currentBlog }) => {
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    if (currentBlog) {
      // Fetch related blogs based on author, category, or tags
      fetch(`${API_URL}/blogs/all-blogs`)
        .then((res) => res.json())
        .then((data) => {
          const filteredBlogs = data.filter(
            (blog) =>
              blog._id !== currentBlog._id && // Exclude the current blog
              blog.category === currentBlog.category // Check if there's any common tag
          );
          // Limit the related blogs to 10
          setRelatedBlogs(filteredBlogs.slice(0, 10));
        });
    }
  }, [currentBlog]);

  if (relatedBlogs.length === 0) return <p>No related blogs found.</p>;

  return (
    <div className="space-y-4">
      {relatedBlogs.map((blog) => (
        <div key={blog._id}>
          <RelatedjobCards data={blog} />
        </div>
      ))}
    </div>
  );
};

export default RelatedBlogs;
