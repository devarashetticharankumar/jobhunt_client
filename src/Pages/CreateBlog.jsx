import React, { useState } from "react";
import { API_URL } from "../data/apiPath";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import PageHeader from "../components/PageHeader";
import { Helmet } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";

import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Ensure `header` is part of the toolbar
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["blockquote", "code-block"],
    ["clean"],
  ],
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "header",
  "list",
  "bullet",
  "indent",
  "align",
  "direction",
  "link",
  "image",
  "video",
  "blockquote",
  "code-block",
  "script",
];

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState("");

  const handleTagChange = (e) => {
    const inputTags = e.target.value.split(",").map((tag) => tag.trim());
    setTags(inputTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(content);

    const blogData = { title, content, category, author, tags, thumbnail };

    try {
      const response = await fetch(`${API_URL}/blogs/create-blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Blog created successfully!");
        toast.success("Blog created successfully!");
      } else {
        setMessage(data.message || "Failed to create blog");
        toast.error(data.message || "Failed to create blog");
      }
    } catch (error) {
      setMessage("Error creating blog");
      toast.error("Error creating blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12 pt-0 mx-auto">
      <Helmet>
        <title>Create Blog - JobNirvana</title>
        <meta
          name="description"
          content="Create a new blog post and share your knowledge with the community."
        />
        <link rel="canonical" href="https://jobnirvana.netlify.app/create-blog" />
      </Helmet>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 py-16 px-4 mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-4"
          >
            Share Your Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-teal-100 text-lg max-w-2xl mx-auto"
          >
            Write compelling articles and connect with the professional community.
          </motion.p>
        </div>
      </div>

      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4 border-gray-100">
              Blog Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title & Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">Blog Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="e.g. The Future of Web Development"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none bg-gray-50 focus:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">Author Name</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Category & Thumbnail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    placeholder="e.g. Technology"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none bg-gray-50 focus:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 block">Thumbnail URL</label>
                  <input
                    type="url"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    required
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Blog Content</label>
                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200 focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-500/10 transition-all">
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    className="h-64 mb-12 border-none"
                    placeholder="Write your article here..."
                    theme="snow"
                    required
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tags.join(", ")}
                  onChange={handleTagChange}
                  placeholder="e.g. React, JavaScript, Career"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none bg-gray-50 focus:bg-white"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-teal-500/30 transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Publish Blog
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-gray-500 text-sm">{message}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateBlog;
