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
import { Helmet } from "react-helmet";
import { API_URL } from "../data/apiPath";
import "react-quill/dist/quill.snow.css";
import InArticleAd from "../components/InArticleAd";
import InFeedAd from "../components/InArticleAd";

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
    <div className="bg-white lg:py-12 py-6 lg:px-6 md:px-3 px-3 min-h-screen">
      {message && (
        <p className="text-red-500 text-center text-lg font-semibold">
          {message}
        </p>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:gap-10 gap-1">
        {/* Blog Content */}
        <div className="flex-1">
          {loadingBlog ? (
            <SkeletonLoader type="blog" />
          ) : (
            blog && (
              <>
                {/* React Helmet for SEO */}
                <Helmet>
                  <title>{blog.title} | jobNirvana-Blogs</title>
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

                <div className="bg-white rounded-sm overflow-hidden">
                  {/* Blog Thumbnail */}
                  {blog.thumbnail && (
                    <img
                      src={blog.thumbnail}
                      alt={`Thumbnail for ${blog.title}`}
                      className="w-full lg:h-96 object-cover"
                    />
                  )}

                  <div className="lg:p-8 py-2">
                    {/* Blog Title */}
                    <h1 className="text-3xl font-bold font-serif text-gray-800 mb-4 text-center">
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
                    <p className="text-center text-sm text-green-500 uppercase font-medium mb-6">
                      CATEGORY: {blog.category}
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
                    {/* <div
                      className="prose prose-lg text-gray-700 mx-auto leading-relaxed ql-editor"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div> */}
                    <div className="prose prose-lg text-gray-700 mx-auto leading-relaxed ql-editor">
                      {(() => {
                        // Split the blog content into paragraphs or sections
                        const contentSegments = blog.content.split(/<\/p>/); // Adjust the split regex as needed

                        // Iterate and inject ads between content segments
                        return contentSegments.map((segment, index) => (
                          <React.Fragment key={index}>
                            {/* Render the current segment */}
                            <div
                              dangerouslySetInnerHTML={{
                                __html: `${segment}</p>`,
                              }}
                            />

                            {/* Insert ad after every 3rd segment */}
                            {(index + 1) % 10 === 0 &&
                              index < contentSegments.length - 1 && (
                                <InArticleAd />
                              )}
                          </React.Fragment>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </>
            )
          )}
        </div>

        {/* Latest Blogs Sidebar */}
        <div className="w-full lg:w-1/3">
          {loadingLatestBlogs ? (
            <SkeletonLoader type="latestBlogs" />
          ) : (
            <div className="bg-white rounded-sm p-4">
              <h2 className="text-2xl font-semibold mb-4 bg-blue-600 p-1 text-white">
                Latest Blogs
              </h2>
              <div className="space-y-4">
                {latestBlogs.map((latestBlog) => (
                  <Link
                    to={`/blog/${latestBlog.slug}`}
                    key={latestBlog.slug}
                    className="block bg-gray-50 hover:bg-gray-100 p-4 rounded-sm"
                  >
                    {latestBlog.thumbnail && (
                      <img
                        src={latestBlog.thumbnail}
                        alt={`Thumbnail for ${latestBlog.title}`}
                        className="w-full h-44 object-cover rounded-sm mb-3"
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
          )}
          {/* <InFeedAd /> */}
          <InArticleAd />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
