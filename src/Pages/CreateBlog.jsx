import React, { useState } from "react";
import { API_URL } from "../data/apiPath";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import PageHeader from "../components/PageHeader";
import { Helmet } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";

import "react-quill/dist/quill.snow.css";

import { formatHTMLContent } from "../utils/formatUtils";

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

  // New states for Bulk/Smart features
  const [activeMode, setActiveMode] = useState("manual"); // "manual" or "bulk"
  const [pasteData, setPasteData] = useState("");
  const [bulkData, setBulkData] = useState("");
  const [bulkFormat, setBulkFormat] = useState("json");
  const [isUploading, setIsUploading] = useState(false);

  const blogFieldMap = {
    "Blog Title": "title",
    "Title": "title",
    "Author Name": "author",
    "Author": "author",
    "Category": "category",
    "Thumbnail URL": "thumbnail",
    "Thumbnail": "thumbnail",
    "Blog Content": "content",
    "Content": "content",
    "Tags": "tags"
  };

  const handleAutoFill = () => {
    if (!pasteData.trim()) {
      toast.info("Please paste some blog data first.");
      return;
    }

    const lines = pasteData.split('\n').map(l => l.trim()).filter(l => l);
    const result = {};
    let currentKey = null;

    lines.forEach(line => {
      // Check if line matches a header in our map (case insensitive)
      const foundKey = Object.keys(blogFieldMap).find(k => line.toLowerCase().startsWith(k.toLowerCase() + ":"));
      if (foundKey) {
        currentKey = blogFieldMap[foundKey];
        const val = line.substring(foundKey.length + 1).trim();
        result[currentKey] = val;
      } else if (currentKey) {
        result[currentKey] = result[currentKey] ? result[currentKey] + "\n" + line : line;
      }
    });

    // Populate Fields
    let count = 0;
    Object.keys(result).forEach(key => {
      const val = result[key];
      if (key === 'title') setTitle(val);
      else if (key === 'author') setAuthor(val);
      else if (key === 'category') setCategory(val);
      else if (key === 'thumbnail') setThumbnail(val);
      else if (key === 'content') setContent(formatHTMLContent(val));
      else if (key === 'tags') setTags(val.split(",").map(t => t.trim()));
      count++;
    });

    if (count > 0) {
      toast.success("Blog details auto-filled!");
      setPasteData("");
    } else {
      toast.error("Could not auto-fill. Please check the format (e.g. Title: My Blog).");
    }
  };

  const handleBulkUpload = async () => {
    if (!bulkData.trim()) {
      toast.info(`Please paste ${bulkFormat.toUpperCase()} data first.`);
      return;
    }

    try {
      let parsedData;
      if (bulkFormat === "json") {
        parsedData = JSON.parse(bulkData);
      } else {
        // CSV Parser
        const csvToArray = (text) => {
          let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
          for (l of text) {
            if ('"' === l) {
              if (s && l === p) row[i] += l;
              s = !s;
            } else if (',' === l && s) l = row[++i] = '';
            else if ('\n' === l && s) {
              if ('\r' === p) row[i] = row[i].slice(0, -1);
              row = ret[++r] = [l = row[i = 0] = ''];
            } else row[i] += l;
            p = l;
          }
          return ret;
        };

        const rows = csvToArray(bulkData.trim());
        const headers = rows[0].map(h => h.trim());
        parsedData = rows.slice(1).map(row => {
          const obj = {};
          headers.forEach((header, i) => {
            if (header) {
              let val = row[i]?.trim() || "";
              if (header === 'content') val = formatHTMLContent(val);
              if (header === 'tags') val = val.split(",").map(t => t.trim());
              obj[header] = val;
            }
          });
          return obj;
        }).filter(item => Object.keys(item).length > 0 && item.title);
      }

      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        toast.error("Data must be an array of blog objects with 'title'.");
        return;
      }

      // Ensure formatting for JSON as well
      if (bulkFormat === "json") {
        parsedData = parsedData.map(blog => ({
          ...blog,
          content: formatHTMLContent(blog.content)
        }));
      }

      setIsUploading(true);
      const response = await fetch(`${API_URL}/blogs/bulk-post`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const result = await response.json();
      if (result.acknowledged) {
        toast.success(`Successfully posted ${result.insertedCount} blogs! 🚀`);
        setBulkData("");
      } else {
        toast.error(result.message || "Bulk upload failed.");
      }
    } catch (err) {
      console.error("Bulk upload error:", err);
      toast.error(`Invalid ${bulkFormat.toUpperCase()} format.`);
    } finally {
      setIsUploading(false);
    }
  };

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
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-gray-100 pb-8">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">Blog Creation</h2>
                <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-bold">Mode: {activeMode.replace('-', ' ')}</p>
              </div>

              <div className="flex bg-gray-100 p-1.5 rounded-2xl shadow-inner">
                <button
                  onClick={() => setActiveMode("manual")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeMode === "manual" ? 'bg-white text-teal-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Manual Form
                </button>
                <button
                  onClick={() => setActiveMode("smart")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeMode === "smart" ? 'bg-white text-teal-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  ✨ Smart Auto-fill
                </button>
                <button
                  onClick={() => setActiveMode("bulk")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeMode === "bulk" ? 'bg-white text-teal-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  📦 Bulk Upload
                </button>
              </div>
            </div>

            {activeMode === "manual" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
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
              </div>
            )}

            {activeMode === "smart" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="bg-teal-50 border border-teal-100 p-8 rounded-3xl">
                  <h3 className="text-xl font-bold text-teal-900 mb-2 flex items-center gap-2">
                    <span className="text-2xl">✨</span> Smart Auto-fill
                  </h3>
                  <p className="text-teal-700/70 text-sm leading-relaxed mb-6">
                    Paste your blog details here (Title, Author, Content, etc.) to populate the entire form instantly.
                    Format example: <code className="bg-teal-200/50 px-2 py-0.5 rounded">Title: My Article</code>
                  </p>

                  <textarea
                    value={pasteData}
                    onChange={(e) => setPasteData(e.target.value)}
                    placeholder="Title: The Future of AI\nAuthor: Jane Doe\nContent: This article explores..."
                    className="w-full h-80 p-6 rounded-2xl border border-teal-200 bg-white focus:ring-4 focus:ring-teal-500/10 transition-all outline-none text-gray-700 font-sans leading-relaxed"
                  />

                  <button
                    onClick={handleAutoFill}
                    className="mt-6 w-full py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-2"
                  >
                    Apply Auto-fill <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>⚡</motion.span>
                  </button>
                </div>
                <div className="text-center text-gray-400 text-sm italic">
                  After applying, switch to "Manual Form" to review and publish.
                </div>
              </div>
            )}

            {activeMode === "bulk" && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">Bulk Data Import</h3>
                  <div className="flex items-center bg-gray-100 p-1 rounded-xl shadow-inner">
                    <button
                      onClick={() => setBulkFormat("json")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${bulkFormat === "json" ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}
                    >
                      JSON
                    </button>
                    <button
                      onClick={() => setBulkFormat("csv")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${bulkFormat === "csv" ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'}`}
                    >
                      CSV / Excel
                    </button>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl">
                  <h3 className="text-emerald-900 font-bold flex items-center gap-2 mb-2 italic">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    How to use {bulkFormat.toUpperCase()} Upload
                  </h3>
                  <p className="text-emerald-700/70 text-sm mb-6 leading-relaxed">
                    {bulkFormat === "json"
                      ? "Paste an array of blog objects. Required: title, content, author, category."
                      : "Paste comma-separated values. Headers: title,content,author,category,tags,thumbnail."}
                  </p>

                  <textarea
                    value={bulkData}
                    onChange={(e) => setBulkData(e.target.value)}
                    placeholder={bulkFormat === "json" ? "[\n  {\"title\": \"...\", \"content\": \"...\"}\n]" : "title,content,author,category\nMy Blog,This is content,John Doe,Tech"}
                    className="w-full h-96 p-6 rounded-2xl border border-emerald-200 bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none font-mono text-xs leading-relaxed"
                  />

                  <button
                    onClick={handleBulkUpload}
                    disabled={isUploading}
                    className="mt-6 w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isUploading ? "Processing..." : `Import ${bulkFormat.toUpperCase()} Data 🚀`}
                  </button>
                </div>
              </div>
            )}
            <p className="mt-4 text-center text-gray-500 text-sm font-medium">{message}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateBlog;
