import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { API_URL } from "../data/apiPath";
import "react-quill/dist/quill.snow.css";
import InArticleAd from "../components/InArticleAd";
import InFeedAd from "../components/InFeedAd";
import BlogShareButton from "../components/BlogShareButton";
import SkeletonLoading from "../components/SkeletonLoading";
import { FaRegClock, FaCalendarAlt, FaUser, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

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
            .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
            .filter((b) => b.slug !== slug)
            .slice(0, 6);
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
    window.scrollTo(0, 0);
  }, [slug]);

  if (message) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{message}</h2>
          <Link to="/blogs" className="text-blue-600 font-bold hover:underline">Return to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-12">
      <Helmet>
        {blog && (
          <>
            <title>{blog.title} | JobNirvana Blog</title>
            <meta name="description" content={blog.content?.slice(0, 160).replace(/<[^>]*>?/gm, '')} />
            <meta property="og:title" content={blog.title} />
            <meta property="og:image" content={blog.thumbnail} />
            <link rel="canonical" href={window.location.href} />
          </>
        )}
      </Helmet>

      {/* Main Content Container */}
      <div className="max-w-[1240px] mx-auto px-4 lg:pt-12 pt-6">
        <div className="lg:grid lg:grid-cols-12 gap-10 items-start">

          {/* LEFT SIDE: ARTICLE (Col 8) */}
          <div className="col-span-12 lg:col-span-8">
            {loadingBlog ? (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <SkeletonLoading />
              </div>
            ) : blog && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Visual Header */}
                <div className="relative h-[300px] md:h-[450px]">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-extrabold rounded-full uppercase tracking-widest mb-4 inline-block shadow-xl">
                      {blog.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
                      {blog.title}
                    </h1>

                    {/* Mobile-Only Sidebar Ad Fallback (Above-the-Fold) */}
                    <div className="lg:hidden mt-4 bg-white/10 rounded-xl p-1 backdrop-blur-sm">
                      <InFeedAd />
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-10">
                  {/* Meta Stats Row */}
                  <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-gray-100 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl uppercase border border-blue-100">
                        {blog.author?.[0] || <FaUser className="text-sm" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{blog.author || "JobNirvana Team"}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(blog.publishedDate).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1"><FaRegClock /> 6 min read</span>
                        </div>
                      </div>
                    </div>
                    <BlogShareButton blogTitle={blog.title} />
                  </div>

                  {/* AD: Top of Article */}
                  <div className="mb-10">
                    <InArticleAd />
                  </div>

                  {/* Blog Body */}
                  <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed ql-editor">
                    {(() => {
                      const contentSegments = blog.content.split(/<\/p>/);
                      return contentSegments.map((segment, index) => (
                        <React.Fragment key={index}>
                          <div dangerouslySetInnerHTML={{ __html: `${segment}</p>` }} />
                          {/* Inject Ad every 3 paragraphs */}
                          {(index + 1) % 3 === 0 && index < contentSegments.length - 1 && (
                            <div className="my-10 py-4 border-y border-gray-50 flex flex-col items-center">
                              <InArticleAd />
                            </div>
                          )}
                        </React.Fragment>
                      ));
                    })()}
                  </div>

                  {/* Tags & Footer */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="mt-12 pt-10 border-t border-gray-100">
                      <h4 className="text-sm font-bold text-[#091e42] mb-4 uppercase tracking-wider">Topic Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag, i) => (
                          <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all cursor-pointer">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AD: Bottom of Article */}
                  <div className="mt-12">
                    <InArticleAd />
                  </div>
                </div>
              </motion.article>
            )}
          </div>

          {/* RIGHT SIDEBAR (Col 4) */}
          <div className="col-span-12 lg:col-span-4 space-y-8 sticky top-24">

            {/* Sidebar Ad 1 (Sticky) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden">
              <InFeedAd />
            </div>

            {/* Newsletter Unit */}
            <div className="bg-[#091e42] rounded-2xl p-8 text-white relative overflow-hidden group shadow-xl">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-xl font-bold mb-3">Professional Insights</h3>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-6">
                Join 50,000+ readers getting our weekly digest of market trends and career advice.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-sm outline-none focus:bg-white/20 transition-all"
                />
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all">
                  Subscribe for Free
                </button>
              </div>
            </div>

            {/* Latest Articles Sidebar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-extrabold text-[#091e42]">Latest Stories</h3>
                <Link to="/blogs" className="text-xs text-blue-600 font-bold hover:underline">View All</Link>
              </div>
              <div className="p-3">
                {loadingLatestBlogs ? (
                  <SkeletonLoading />
                ) : (
                  latestBlogs.map((lBlog) => (
                    <Link
                      to={`/blog/${lBlog.slug}`}
                      key={lBlog.slug}
                      className="flex gap-4 p-3 hover:bg-blue-50/50 rounded-xl transition-all group"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                        <img
                          src={lBlog.thumbnail}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold text-blue-600 uppercase mb-1 block">{lBlog.category}</span>
                        <h4 className="text-sm font-bold text-[#091e42] group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                          {lBlog.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 mt-2">{new Date(lBlog.publishedDate).toLocaleDateString()}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar Ad 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden">
              <InArticleAd />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
