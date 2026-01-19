// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import { API_URL } from "../data/apiPath";
// import "react-quill/dist/quill.snow.css";
// import InArticleAd from "../components/InArticleAd";
// import InFeedAd from "../components/InArticleAd";

// // Skeleton loader component
// const SkeletonLoader = ({ type }) => {
//   switch (type) {
//     case "blog":
//       return (
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="w-full h-96 bg-gray-300 animate-pulse"></div>
//           <div className="lg:p-8 py-2">
//             <div className="h-10 bg-gray-300 animate-pulse rounded mb-4"></div>
//             <div className="h-6 bg-gray-300 animate-pulse rounded mb-4 w-1/4"></div>
//             <div className="h-4 bg-gray-300 animate-pulse rounded mb-6 w-1/6"></div>
//             <div className="h-4 bg-gray-300 animate-pulse rounded mb-4"></div>
//             <div className="h-4 bg-gray-300 animate-pulse rounded mb-6"></div>
//           </div>
//         </div>
//       );
//     case "latestBlogs":
//       return (
//         <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
//           <div className="h-6 bg-gray-300 animate-pulse rounded mb-4"></div>
//           <div className="space-y-4">
//             {[...Array(3)].map((_, index) => (
//               <div
//                 key={index}
//                 className="h-20 bg-gray-300 animate-pulse rounded mb-4"
//               ></div>
//             ))}
//           </div>
//         </div>
//       );
//     default:
//       return null;
//   }
// };

// const BlogDetails = () => {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [latestBlogs, setLatestBlogs] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loadingBlog, setLoadingBlog] = useState(true);
//   const [loadingLatestBlogs, setLoadingLatestBlogs] = useState(true);

//   useEffect(() => {
//     const fetchBlogDetails = async () => {
//       try {
//         const response = await fetch(`${API_URL}/blogs/blog/${slug}`);
//         const data = await response.json();

//         if (response.ok) {
//           setBlog(data);
//           setLoadingBlog(false);
//         } else {
//           setMessage(data.message || "Blog not found");
//         }
//       } catch (error) {
//         setMessage("Error fetching blog");
//         setLoadingBlog(false);
//       }
//     };

//     const fetchLatestBlogs = async () => {
//       try {
//         const response = await fetch(`${API_URL}/blogs/all-blogs`);
//         const data = await response.json();

//         if (response.ok) {
//           const sortedBlogs = data
//             .sort(
//               (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
//             )
//             .filter((blog) => blog.slug !== slug)
//             .slice(0, 10);

//           setLatestBlogs(sortedBlogs);
//           setLoadingLatestBlogs(false);
//         }
//       } catch (error) {
//         console.error("Error fetching latest blogs", error);
//         setLoadingLatestBlogs(false);
//       }
//     };

//     fetchBlogDetails();
//     fetchLatestBlogs();
//   }, [slug]);

//   return (
//     <div className="bg-gray-50 lg:py-12 py-6 lg:px-6 md:px-3 px-1 min-h-screen">
//       {message && (
//         <p className="text-red-500 text-center text-lg font-semibold">
//           {message}
//         </p>
//       )}

//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
//         {/* Blog Content */}
//         <div className="flex-1">
//           {loadingBlog ? (
//             <SkeletonLoader type="blog" />
//           ) : (
//             blog && (
//               <>
//                 {/* React Helmet for SEO */}
//                 <Helmet>
//                   <title>{blog.title} | jobNirvana-Blogs</title>
//                   <meta
//                     name="description"
//                     content={blog.content.slice(0, 160)}
//                   />
//                   <meta
//                     name="keywords"
//                     content={blog.tags ? blog.tags.join(", ") : "blog, article"}
//                   />
//                   <meta property="og:title" content={blog.title} />
//                   <meta
//                     property="og:description"
//                     content={blog.content.slice(0, 160)}
//                   />
//                   <meta property="og:image" content={blog.thumbnail} />
//                   <meta property="og:url" content={`${window.location.href}`} />
//                   <meta name="twitter:card" content="summary_large_image" />
//                   <link rel="canonical" href={`${window.location.href}`} />
//                 </Helmet>

//                 <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                   {/* Blog Thumbnail */}
//                   {blog.thumbnail && (
//                     <img
//                       src={blog.thumbnail}
//                       alt={blog.title}
//                       className="w-full lg:h-96 object-cover"
//                     />
//                   )}

//                   <div className="lg:p-8 py-2">
//                     {/* Blog Title */}
//                     <h1 className="text-3xl font-bold font-serif text-gray-800 mb-4 text-center">
//                       {blog.title}
//                     </h1>

//                     {/* Author and Published Date */}
//                     <div className="text-center text-sm text-gray-600 mb-4">
//                       <span>
//                         By <span className="font-medium">{blog.author}</span> on{" "}
//                         {new Date(blog.publishedDate).toLocaleDateString()}
//                       </span>
//                     </div>

//                     {/* Category */}
//                     <p className="text-center text-sm text-green-500 uppercase font-medium mb-6">
//                       CATEGORY: {blog.category}
//                     </p>

//                     {/* Tags */}
//                     {blog.tags && blog.tags.length > 0 && (
//                       <div className="flex justify-center flex-wrap gap-2 mb-6">
//                         {blog.tags.map((tag, index) => (
//                           <span
//                             key={index}
//                             className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
//                           >
//                             #{tag}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                     <InArticleAd />

//                     {/* Blog Content */}
//                     <div
//                       className="prose prose-lg text-gray-700 mx-auto leading-relaxed ql-editor"
//                       dangerouslySetInnerHTML={{ __html: blog.content }}
//                     ></div>
//                   </div>
//                 </div>
//               </>
//             )
//           )}
//         </div>

//         {/* Latest Blogs Sidebar */}
//         <div className="w-full lg:w-1/3">
//           {loadingLatestBlogs ? (
//             <SkeletonLoader type="latestBlogs" />
//           ) : (
//             <div className="bg-white rounded-lg shadow-lg p-4">
//               <h3 className="text-2xl underline font-semibold text-gray-800 mb-4">
//                 Latest Blogs
//               </h3>
//               <div className="space-y-4">
//                 {latestBlogs.map((latestBlog) => (
//                   <Link
//                     to={`/blog/${latestBlog.slug}`}
//                     key={latestBlog.slug}
//                     className="block bg-gray-50 hover:bg-gray-100 p-4 rounded-lg shadow transition"
//                   >
//                     {latestBlog.thumbnail && (
//                       <img
//                         src={latestBlog.thumbnail}
//                         alt={latestBlog.title}
//                         className="w-full h-44 object-cover rounded-lg mb-3"
//                       />
//                     )}
//                     <h4 className="text-md font-medium text-gray-800 mb-1">
//                       {latestBlog.title.length > 40
//                         ? `${latestBlog.title.slice(0, 40)}...`
//                         : latestBlog.title}
//                     </h4>
//                     <p className="text-sm text-gray-500">
//                       {new Date(latestBlog.publishedDate).toLocaleDateString()}
//                     </p>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}
//           <InFeedAd />
//           <InArticleAd />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { API_URL } from "../data/apiPath";
import "react-quill/dist/quill.snow.css";
import InArticleAd from "../components/InArticleAd";
import InFeedAd from "../components/InFeedAd";
import BlogShareButton from "../components/BlogShareButton";
import AdPopup from "../components/AdPopup";

// Skeleton loader component
const SkeletonLoader = ({ type }) => {
  switch (type) {
    case "blog":
      return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full h-96 bg-gray-300 animate-pulse"></div>
          <div className="lg:p-8 py-2">
            <div className="h-10 bg-gray-300 animate-pulse rounded mb-4"></div>
            <div className="h-6 bg-gray-300 animate-pulse rounded mb-4 w-1/4"></div>
            <div className="h-4 bg-gray-300 animate-pulse rounded mb-6 w-1/6"></div>
            <div className="h-4 bg-gray-300 animate-pulse rounded mb-4"></div>
            <div className="h-4 bg-gray-300 animate-pulse rounded mb-6"></div>
          </div>
        </div>
      );
    case "latestBlogs":
      return (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="h-6 bg-gray-300 animate-pulse rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-20 bg-gray-300 animate-pulse rounded mb-4"
              ></div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [loadingLatestBlogs, setLoadingLatestBlogs] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/blog/${slug}`);
        const data = await response.json();

        if (response.ok) {
          setBlog(data);
          setLoadingBlog(false);
        } else {
          setMessage(data.message || "Blog not found");
        }
      } catch (error) {
        setMessage("Error fetching blog");
        setLoadingBlog(false);
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
            .slice(0, 10);

          setLatestBlogs(sortedBlogs);
          setLoadingLatestBlogs(false);
        }
      } catch (error) {
        console.error("Error fetching latest blogs", error);
        setLoadingLatestBlogs(false);
      }
    };

    fetchBlogDetails();
    fetchLatestBlogs();
  }, [slug]);

  return (
    <div className="bg-gray-50 min-h-screen lg:py-12 py-6 px-4">
      {message && (
        <p className="text-red-500 text-center text-lg font-semibold mb-4">
          {message}
        </p>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:gap-10 gap-8">
        {/* Blog Content */}
        <div className="flex-1">
          {loadingBlog ? (
            <SkeletonLoader type="blog" />
          ) : (
            blog && (
              <>
                {/* React Helmet for SEO */}
                <Helmet>
                  <title>{blog.title} | JobNirvana-Blogs</title>
                  <meta
                    name="description"
                    content={blog.content.slice(0, 160)}
                  />
                  <meta
                    name="keywords"
                    content={blog.tags ? blog.tags.join(", ") : "blog, article"}
                  />
                  <meta property="og:title" content={blog.title} />
                  <meta
                    property="og:description"
                    content={blog.content.slice(0, 160)}
                  />
                  <meta name="robots" content="index, follow" />

                  <meta property="og:image" content={blog.thumbnail} />
                  <meta property="og:url" content={`${window.location.href}`} />
                  <meta name="twitter:card" content="summary_large_image" />
                  <link rel="canonical" href={`${window.location.href}`} />

                  {/* Schema.org JSON-LD for Blog Post */}
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "BlogPosting",
                      headline: blog.title || "Default Blog Title",
                      description:
                        blog.content?.slice(0, 160).replace(/["<>]/g, "") ||
                        "Default Blog Description",
                      image:
                        blog.thumbnail || "https://i.imgur.com/0qGt7qj.png",
                      author: {
                        "@type": "Person",
                        name: blog.author || "Admin",
                      },
                      datePublished:
                        blog.publishedDate || new Date().toISOString(),
                      dateModified:
                        blog.publishedDate || new Date().toISOString(),
                      mainEntityOfPage: window.location.href,
                      publisher: {
                        "@type": "Organization",
                        name: "JobNirvana",
                        logo: {
                          "@type": "ImageObject",
                          url: "https://i.imgur.com/0qGt7qj.png",
                        },
                      },
                    })}
                  </script>
                </Helmet>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Blog Thumbnail */}
                  {blog.thumbnail && (
                    <div className="relative h-64 lg:h-96 w-full">
                      <img
                        src={blog.thumbnail}
                        alt={`Thumbnail for ${blog.title}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wide mb-3 inline-block shadow-lg">{blog.category}</span>
                        <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight shadow-black drop-shadow-lg">
                          {blog.title}
                        </h1>
                      </div>
                    </div>
                  )}

                  <div className="lg:p-10 p-6">
                    {/* Author and Share */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase">
                          {blog.author?.[0] || "A"}
                        </div>
                        <div className="text-sm">
                          <p className="font-bold text-gray-900">{blog.author || "JobNirvana Team"}</p>
                          <p className="text-gray-500">{new Date(blog.publishedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <BlogShareButton blogTitle={blog.title} />
                    </div>

                    {/* Blog Content */}
                    <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed font-sans ql-editor">
                      {(() => {
                        const contentSegments = blog.content.split(/<\/p>/);
                        return contentSegments.map((segment, index) => (
                          <React.Fragment key={index}>
                            <div dangerouslySetInnerHTML={{ __html: `${segment}</p>` }} />
                            {(index + 1) % 10 === 0 && index < contentSegments.length - 1 && (<InArticleAd />)}
                          </React.Fragment>
                        ));
                      })()}
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="mt-10 pt-8 border-t border-gray-100">
                        <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Related Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.map((tag, index) => (
                            <span key={index} className="px-4 py-2 bg-gray-50 text-gray-600 hover:text-blue-600 rounded-lg text-sm font-medium border border-gray-200 transition-colors cursor-pointer">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-8">
                      <InArticleAd />
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </div>

        {/* Latest Blogs Sidebar */}
        <div className="w-full lg:w-1/3 space-y-8">
          {loadingLatestBlogs ? (
            <SkeletonLoader type="latestBlogs" />
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900">Latest Articles</h3>
              </div>
              <div className="p-2">
                {latestBlogs.map((latestBlog) => (
                  <Link
                    to={`/blog/${latestBlog.slug}`}
                    key={latestBlog.slug}
                    className="flex gap-4 p-3 hover:bg-blue-50/50 rounded-xl transition-colors group"
                  >
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      {latestBlog.thumbnail && (
                        <img
                          src={latestBlog.thumbnail}
                          alt={latestBlog.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">New</span>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                        {latestBlog.title}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {new Date(latestBlog.publishedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <InArticleAd />
          <AdPopup />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
