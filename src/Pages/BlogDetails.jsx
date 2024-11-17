// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { API_URL } from "../data/apiPath";

// const BlogDetails = () => {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await fetch(`${API_URL}/blogs/blog/${slug}`);
//         const data = await response.json();

//         if (response.ok) {
//           setBlog(data);
//         } else {
//           setMessage(data.message || "Blog not found");
//         }
//       } catch (error) {
//         setMessage("Error fetching blog");
//       }
//     };

//     fetchBlog();
//   }, [slug]);

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-white py-8 px-4 lg:px-32 min-h-screen">
//       {message && (
//         <p className="text-red-600 text-center text-lg font-medium">
//           {message}
//         </p>
//       )}
//       {blog && (
//         <div className="bg-white rounded-xl shadow-2xl max-w-5xl mx-auto overflow-hidden">
//           {/* Blog Thumbnail */}
//           {blog.thumbnail && (
//             <img
//               src={blog.thumbnail}
//               alt={blog.title}
//               className="w-full h-96 object-cover object-center rounded-xl"
//             />
//           )}

//           <div className="p-10">
//             {/* Blog Title */}
//             <h1 className="lg:text-5xl text-2xl font-bold text-gray-800 text-center mb-4">
//               {blog.title}
//             </h1>

//             {/* Author and Published Date */}
//             <div className="text-center text-gray-600 text-md mb-4">
//               <span>
//                 By{" "}
//                 <span className="font-semibold text-gray-800">
//                   {blog.author}
//                 </span>
//               </span>
//               <span>
//                 {" "}
//                 | Published on:{" "}
//                 {new Date(blog.publishedDate).toLocaleDateString()}
//               </span>
//             </div>

//             {/* Category */}
//             <p className="text-center text-indigo-500 font-medium text-sm mb-6">
//               Category: {blog.category}
//             </p>

//             {/* Tags */}
//             {blog.tags && blog.tags.length > 0 && (
//               <div className="flex justify-center flex-wrap gap-2 mb-8">
//                 {blog.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-medium"
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             )}

//             {/* Blog Content */}
//             <div className="prose prose-lg text-gray-700 mx-auto leading-relaxed">
//               <div
//                 className="text-gray-700"
//                 dangerouslySetInnerHTML={{ __html: blog.content }}
//               ></div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogDetails;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import { API_URL } from "../data/apiPath";
// import "react-quill/dist/quill.snow.css"; // Import Quill CSS here
// import InArticleAd from "../components/InArticleAd"; // Import the InArticleAd component

// const BlogDetails = () => {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await fetch(`${API_URL}/blogs/blog/${slug}`);
//         const data = await response.json();

//         if (response.ok) {
//           setBlog(data);
//         } else {
//           setMessage(data.message || "Blog not found");
//         }
//       } catch (error) {
//         setMessage("Error fetching blog");
//       }
//     };

//     fetchBlog();
//   }, [slug]);

//   return (
//     <div className="bg-white py-16 px-4 min-h-screen">
//       {message && (
//         <p className="text-red-500 text-center text-lg font-semibold">
//           {message}
//         </p>
//       )}

//       {blog && (
//         <>
//           {/* React Helmet for SEO */}
//           <Helmet>
//             <title>{blog.title} | jobNirvana-Blogs</title>
//             <meta name="description" content={blog.content.slice(0, 160)} />
//             <meta
//               name="keywords"
//               content={blog.tags ? blog.tags.join(", ") : "blog, article"}
//             />
//             <meta property="og:title" content={blog.title} />
//             <meta
//               property="og:description"
//               content={blog.content.slice(0, 160)}
//             />
//             <meta property="og:image" content={blog.thumbnail} />
//             <meta property="og:url" content={`${window.location.href}`} />
//             <meta name="twitter:card" content="summary_large_image" />
//           </Helmet>

//           <div className="bg-gray-50 rounded-2xl shadow-md max-w-3xl mx-auto overflow-hidden">
//             {/* Blog Thumbnail */}
//             {blog.thumbnail && (
//               <img
//                 src={blog.thumbnail}
//                 alt={blog.title}
//                 className="w-full h-80 object-cover object-center rounded-t-2xl"
//               />
//             )}

//             <div className=" lg:p-10">
//               {/* Blog Title */}
//               <h1 className="text-center lg:text-4xl text-2xl  font-serif font-semibold text-gray-900 mb-4 leading-snug pt-2">
//                 {blog.title}
//               </h1>

//               {/* Author and Published Date */}
//               <div className="text-center text-gray-500 text-sm mb-6">
//                 <span>
//                   <span className="font-medium text-gray-700">
//                     {blog.author}
//                   </span>
//                   <span>
//                     {" "}
//                     | {new Date(blog.publishedDate).toLocaleDateString()}
//                   </span>
//                 </span>
//               </div>

//               {/* Category */}
//               <p className="text-center text-green-600 font-medium text-sm mb-6 tracking-wider uppercase">
//                 Category: {blog.category}
//               </p>

//               {/* Tags */}
//               {blog.tags && blog.tags.length > 0 && (
//                 <div className="flex justify-center gap-2 mb-8 flex-wrap">
//                   {blog.tags.map((tag, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-600 text-xs font-medium tracking-wide"
//                     >
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//               <InArticleAd />
//               {/* Blog Content */}
//               <div
//                 className="prose prose-lg lg:prose-xl text-gray-800 mx-auto leading-loose ql-editor"
//                 dangerouslySetInnerHTML={{ __html: blog.content }}
//               ></div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default BlogDetails;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { API_URL } from "../data/apiPath";
import "react-quill/dist/quill.snow.css";
import InArticleAd from "../components/InArticleAd";
import InFeedAd from "../components/InArticleAd";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/blog/${slug}`);
        const data = await response.json();

        if (response.ok) {
          setBlog(data);
        } else {
          setMessage(data.message || "Blog not found");
        }
      } catch (error) {
        setMessage("Error fetching blog");
      }
    };

    // const fetchLatestBlogs = async () => {
    //   try {
    //     const response = await fetch(`${API_URL}/blogs/all-blogs`);
    //     const data = await response.json();

    //     if (response.ok) {
    //       // Sort blogs by published date (assuming they have a `publishedDate` field)
    //       const sortedBlogs = data
    //         .sort(
    //           (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
    //         )
    //         .slice(0, 5); // Limit to 5 latest blogs
    //       setLatestBlogs(sortedBlogs);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching latest blogs", error);
    //   }
    // };
    const fetchLatestBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/all-blogs`);
        const data = await response.json();

        if (response.ok) {
          // Sort blogs by published date (assuming they have a `publishedDate` field)
          const sortedBlogs = data
            .sort(
              (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
            )
            .filter((blog) => blog.slug !== slug) // Exclude the current blog
            .slice(0, 5); // Limit to 5 latest blogs

          setLatestBlogs(sortedBlogs);
        }
      } catch (error) {
        console.error("Error fetching latest blogs", error);
      }
    };

    fetchBlogDetails();
    fetchLatestBlogs();
  }, [slug]);

  return (
    <div className="bg-white py-16 px-4 min-h-screen">
      {message && (
        <p className="text-red-500 text-center text-lg font-semibold">
          {message}
        </p>
      )}

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Blog Content */}
        <div className="flex-1">
          {blog && (
            <>
              {/* React Helmet for SEO */}
              <Helmet>
                <title>{blog.title} | jobNirvana-Blogs</title>
                <meta name="description" content={blog.content.slice(0, 160)} />
                <meta
                  name="keywords"
                  content={blog.tags ? blog.tags.join(", ") : "blog, article"}
                />
                <meta property="og:title" content={blog.title} />
                <meta
                  property="og:description"
                  content={blog.content.slice(0, 160)}
                />
                <meta property="og:image" content={blog.thumbnail} />
                <meta property="og:url" content={`${window.location.href}`} />
                <meta name="twitter:card" content="summary_large_image" />
              </Helmet>

              <div className="bg-gray-50 rounded-2xl shadow-md overflow-hidden">
                {/* Blog Thumbnail */}
                {blog.thumbnail && (
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-80 object-cover rounded-t-2xl"
                  />
                )}

                <div className="lg:p-10">
                  {/* Blog Title */}
                  <h1 className="text-center lg:text-4xl text-2xl font-serif font-semibold text-gray-900 mb-4">
                    {blog.title}
                  </h1>

                  {/* Author and Published Date */}
                  <div className="text-center text-gray-500 text-sm mb-6">
                    <span>
                      <span className="font-medium text-gray-700">
                        {blog.author}
                      </span>{" "}
                      | {new Date(blog.publishedDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Category */}
                  <p className="text-center text-green-600 font-medium text-sm mb-6 tracking-wider uppercase">
                    Category: {blog.category}
                  </p>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex justify-center gap-2 mb-8 flex-wrap">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-600 text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <InArticleAd />
                  {/* Blog Content */}
                  <div
                    className="prose prose-lg lg:prose-xl text-gray-800 mx-auto leading-loose ql-editor"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Latest Blogs Sidebar */}
        <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Latest Blogs
          </h3>
          <div className="space-y-4">
            {latestBlogs.map((latestBlog) => (
              <Link
                to={`/blog/${latestBlog.slug}`}
                key={latestBlog._slug}
                className="block bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                {latestBlog.thumbnail && (
                  <img
                    src={latestBlog.thumbnail}
                    alt={latestBlog.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <h4 className="text-md font-semibold text-gray-800 mb-1">
                  {latestBlog.title.length > 40
                    ? `${latestBlog.title.slice(0, 40)}...`
                    : latestBlog.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {new Date(latestBlog.publishedDate).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
          <InFeedAd />
          <InFeedAd />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
