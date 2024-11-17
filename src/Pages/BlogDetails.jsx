// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import { API_URL } from "../data/apiPath";
// import "react-quill/dist/quill.snow.css";
// import InArticleAd from "../components/InArticleAd";
// import InFeedAd from "../components/InArticleAd";

// const BlogDetails = () => {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [latestBlogs, setLatestBlogs] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchBlogDetails = async () => {
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

//     // const fetchLatestBlogs = async () => {
//     //   try {
//     //     const response = await fetch(`${API_URL}/blogs/all-blogs`);
//     //     const data = await response.json();

//     //     if (response.ok) {
//     //       // Sort blogs by published date (assuming they have a `publishedDate` field)
//     //       const sortedBlogs = data
//     //         .sort(
//     //           (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
//     //         )
//     //         .slice(0, 5); // Limit to 5 latest blogs
//     //       setLatestBlogs(sortedBlogs);
//     //     }
//     //   } catch (error) {
//     //     console.error("Error fetching latest blogs", error);
//     //   }
//     // };
//     const fetchLatestBlogs = async () => {
//       try {
//         const response = await fetch(`${API_URL}/blogs/all-blogs`);
//         const data = await response.json();

//         if (response.ok) {
//           // Sort blogs by published date (assuming they have a `publishedDate` field)
//           const sortedBlogs = data
//             .sort(
//               (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
//             )
//             .filter((blog) => blog.slug !== slug) // Exclude the current blog
//             .slice(0, 5); // Limit to 5 latest blogs

//           setLatestBlogs(sortedBlogs);
//         }
//       } catch (error) {
//         console.error("Error fetching latest blogs", error);
//       }
//     };

//     fetchBlogDetails();
//     fetchLatestBlogs();
//   }, [slug]);

//   return (
//     <div className="bg-white py-16 px-4 min-h-screen">
//       {message && (
//         <p className="text-red-500 text-center text-lg font-semibold">
//           {message}
//         </p>
//       )}

//       <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
//         {/* Blog Content */}
//         <div className="flex-1">
//           {blog && (
//             <>
//               {/* React Helmet for SEO */}
//               <Helmet>
//                 <title>{blog.title} | jobNirvana-Blogs</title>
//                 <meta name="description" content={blog.content.slice(0, 160)} />
//                 <meta
//                   name="keywords"
//                   content={blog.tags ? blog.tags.join(", ") : "blog, article"}
//                 />
//                 <meta property="og:title" content={blog.title} />
//                 <meta
//                   property="og:description"
//                   content={blog.content.slice(0, 160)}
//                 />
//                 <meta property="og:image" content={blog.thumbnail} />
//                 <meta property="og:url" content={`${window.location.href}`} />
//                 <meta name="twitter:card" content="summary_large_image" />
//               </Helmet>

//               <div className="bg-gray-50 rounded-2xl shadow-md overflow-hidden">
//                 {/* Blog Thumbnail */}
//                 {blog.thumbnail && (
//                   <img
//                     src={blog.thumbnail}
//                     alt={blog.title}
//                     className="w-full h-80 object-cover rounded-t-2xl"
//                   />
//                 )}

//                 <div className="lg:p-10">
//                   {/* Blog Title */}
//                   <h1 className="text-center lg:text-4xl text-2xl font-serif font-semibold text-gray-900 mb-4">
//                     {blog.title}
//                   </h1>

//                   {/* Author and Published Date */}
//                   <div className="text-center text-gray-500 text-sm mb-6">
//                     <span>
//                       <span className="font-medium text-gray-700">
//                         {blog.author}
//                       </span>{" "}
//                       | {new Date(blog.publishedDate).toLocaleDateString()}
//                     </span>
//                   </div>

//                   {/* Category */}
//                   <p className="text-center text-green-600 font-medium text-sm mb-6 tracking-wider uppercase">
//                     Category: {blog.category}
//                   </p>

//                   {/* Tags */}
//                   {blog.tags && blog.tags.length > 0 && (
//                     <div className="flex justify-center gap-2 mb-8 flex-wrap">
//                       {blog.tags.map((tag, index) => (
//                         <span
//                           key={index}
//                           className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-600 text-xs font-medium"
//                         >
//                           #{tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                   <InArticleAd />
//                   {/* Blog Content */}
//                   <div
//                     className="prose prose-lg lg:prose-xl text-gray-800 mx-auto leading-loose ql-editor"
//                     dangerouslySetInnerHTML={{ __html: blog.content }}
//                   ></div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Latest Blogs Sidebar */}
//         <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Latest Blogs
//           </h3>
//           <div className="space-y-4">
//             {latestBlogs.map((latestBlog) => (
//               <Link
//                 to={`/blog/${latestBlog.slug}`}
//                 key={latestBlog._slug}
//                 className="block bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
//               >
//                 {latestBlog.thumbnail && (
//                   <img
//                     src={latestBlog.thumbnail}
//                     alt={latestBlog.title}
//                     className="w-full h-32 object-cover rounded-lg mb-3"
//                   />
//                 )}
//                 <h4 className="text-md font-semibold text-gray-800 mb-1">
//                   {latestBlog.title.length > 40
//                     ? `${latestBlog.title.slice(0, 40)}...`
//                     : latestBlog.title}
//                 </h4>
//                 <p className="text-sm text-gray-500">
//                   {new Date(latestBlog.publishedDate).toLocaleDateString()}
//                 </p>
//               </Link>
//             ))}
//           </div>
//           <InFeedAd />
//           <InFeedAd />
//         </div>
//       </div>
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

    const fetchLatestBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/all-blogs`);
        const data = await response.json();

        if (response.ok) {
          const sortedBlogs = data
            .sort(
              (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
            )
            .filter((blog) => blog.slug !== slug)
            .slice(0, 5);

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
    <div className="bg-gray-50 lg:py-12 py-6 px-6 min-h-screen">
      {message && (
        <p className="text-red-500 text-center text-lg font-semibold">
          {message}
        </p>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
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

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Blog Thumbnail */}
                {blog.thumbnail && (
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-72 object-cover"
                  />
                )}

                <div className="lg:p-8 py-2">
                  {/* Blog Title */}
                  <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    {blog.title}
                  </h1>

                  {/* Author and Published Date */}
                  <div className="text-center text-sm text-gray-600 mb-4">
                    <span>
                      By <span className="font-medium">{blog.author}</span> on{" "}
                      {new Date(blog.publishedDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Category */}
                  <p className="text-center text-sm text-blue-600 uppercase font-medium mb-6">
                    {blog.category}
                  </p>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex justify-center flex-wrap gap-2 mb-6">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <InArticleAd />

                  {/* Blog Content */}
                  <div
                    className="prose prose-lg text-gray-700 mx-auto leading-relaxed ql-editor"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Latest Blogs Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Latest Blogs
            </h3>
            <div className="space-y-4">
              {latestBlogs.map((latestBlog) => (
                <Link
                  to={`/blog/${latestBlog.slug}`}
                  key={latestBlog.slug}
                  className="block bg-gray-50 hover:bg-gray-100 p-4 rounded-lg shadow transition"
                >
                  {latestBlog.thumbnail && (
                    <img
                      src={latestBlog.thumbnail}
                      alt={latestBlog.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h4 className="text-md font-medium text-gray-800 mb-1">
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
          </div>
          <InFeedAd />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
