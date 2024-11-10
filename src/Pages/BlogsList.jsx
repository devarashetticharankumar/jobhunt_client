// import React, { useEffect, useState } from "react";
// import { API_URL } from "../data/apiPath";
// import { Link } from "react-router-dom";

// const BlogsList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [categories, setCategories] = useState([]); // To store unique categories
//   const [message, setMessage] = useState("");
//   const [searchQuery, setSearchQuery] = useState(""); // State for search query
//   const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await fetch(`${API_URL}/blogs/all-blogs`);
//         const data = await response.json();

//         if (response.ok) {
//           setBlogs(data);
//           setFilteredBlogs(data); // Initially set filteredBlogs to all blogs

//           // Extract unique categories from blogs
//           const uniqueCategories = [
//             ...new Set(data.map((blog) => blog.category)),
//           ];
//           setCategories(uniqueCategories);
//         } else {
//           setMessage(data.message || "Failed to fetch blogs");
//         }
//       } catch (error) {
//         setMessage("Error fetching blogs");
//       }
//     };

//     fetchBlogs();
//   }, []);

//   // Handle the search input and filter blogs
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     // Filter blogs based on the search query and selected category
//     filterBlogs(query, selectedCategory);
//   };

//   // Handle category button click and filter blogs
//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);

//     // Filter blogs based on the selected category and search query
//     filterBlogs(searchQuery, category);
//   };

//   // Filter blogs based on search query and category
//   const filterBlogs = (query, category) => {
//     const filtered = blogs.filter((blog) => {
//       const matchesQuery = blog.title.toLowerCase().includes(query);
//       const matchesCategory = category ? blog.category === category : true;
//       return matchesQuery && matchesCategory;
//     });
//     setFilteredBlogs(filtered);
//   };

//   return (
//     <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-5 bg-[#FAFAFA] my-5">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">All Blogs</h2>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder="Search blogs by title"
//           className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//       </div>

//       {/* Category Buttons */}
//       <div className="mb-6 flex flex-wrap gap-3">
//         <button
//           className={`px-4 py-2 rounded-full ${
//             !selectedCategory
//               ? "bg-teal-500 text-white"
//               : "bg-gray-200 text-gray-800"
//           } hover:bg-teal-600`}
//           onClick={() => handleCategoryClick("")}
//         >
//           All
//         </button>
//         {categories.map((category, index) => (
//           <button
//             key={index}
//             className={`px-4 py-2 rounded-full ${
//               selectedCategory === category
//                 ? "bg-teal-500 text-white"
//                 : "bg-gray-200 text-gray-800"
//             } hover:bg-teal-600`}
//             onClick={() => handleCategoryClick(category)}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {message && <p className="text-red-500 text-lg font-medium">{message}</p>}

//       {/* Grid Layout for Blogs */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredBlogs.map((blog) => (
//           <div
//             key={blog._id}
//             className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105"
//           >
//             {/* Thumbnail on Top */}
//             {blog.thumbnail && (
//               <img
//                 src={blog.thumbnail}
//                 alt={blog.title}
//                 className="w-full h-56 object-cover rounded-xl mb-4 shadow-md transition-all duration-300 ease-in-out transform"
//               />
//             )}

//             {/* Content Below Thumbnail */}
//             <Link to={`/blog/${blog.slug}`}>
//               <div className="flex flex-col">
//                 <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-all duration-200 mb-2">
//                   {blog.title.length > 50
//                     ? `${blog.title.slice(0, 50)}...`
//                     : blog.title}
//                 </h3>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogsList;

import React, { useEffect, useState } from "react";
import { API_URL } from "../data/apiPath";
import { Link } from "react-router-dom";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/all-blogs`);
        const data = await response.json();

        if (response.ok) {
          setBlogs(data);
          setFilteredBlogs(data);

          const uniqueCategories = [
            ...new Set(data.map((blog) => blog.category)),
          ];
          setCategories(uniqueCategories);
        } else {
          setMessage(data.message || "Failed to fetch blogs");
        }
      } catch (error) {
        setMessage("Error fetching blogs");
      }
    };

    fetchBlogs();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterBlogs(query, selectedCategory);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    filterBlogs(searchQuery, category);
  };

  const filterBlogs = (query, category) => {
    const filtered = blogs.filter((blog) => {
      const matchesQuery = blog.title.toLowerCase().includes(query);
      const matchesCategory = category ? blog.category === category : true;
      return matchesQuery && matchesCategory;
    });
    setFilteredBlogs(filtered);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-5 bg-[#FAFAFA] my-5">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Blogs</h2>

      {/* Layout for Mobile (Column) and Desktop (Row) */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-md order-1 md:order-none">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Categories
          </h3>
          <button
            className={`w-auto mr-2 mb-2 px-4 py-2 rounded-lg text-center ${
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
              className={`w-auto mr-2 mb-2 px-4 py-2 rounded-lg text-center ${
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
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105"
              >
                {blog.thumbnail && (
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-xl mb-4 shadow-md transition-all duration-300 ease-in-out transform"
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
        </div>
      </div>

      {message && <p className="text-red-500 text-lg font-medium">{message}</p>}
    </div>
  );
};

export default BlogsList;
