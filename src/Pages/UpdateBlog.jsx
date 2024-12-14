import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import PageHeader from "../components/PageHeader";
import { Helmet } from "react-helmet";
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

const UpdateBlog = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/blog/${slug}`);
        const data = await response.json();

        if (response.ok) {
          setTitle(data.title);
          setContent(data.content);
          setThumbnail(data.thumbnail || "");
          setCategory(data.category || "");
          setTags(data.tags || []);
          setAuthor(data.author || "");
          setLoading(false);
        } else {
          setMessage(data.message || "Blog not found");
          setLoading(false);
        }
      } catch (error) {
        setMessage("Error fetching blog");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const handleTagChange = (e) => {
    const inputTags = e.target.value.split(",").map((tag) => tag.trim());
    setTags(inputTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blogData = { title, content, category, author, tags, thumbnail };

    try {
      const response = await fetch(`${API_URL}/blogs/update-blog/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Blog updated successfully!");
        toast.success("Blog updated successfully!");
      } else {
        setMessage(data.message || "Failed to update blog");
        toast.error(data.message || "Failed to update blog");
      }
    } catch (error) {
      setMessage("Error updating blog");
      toast.error("Error updating blog");
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <motion.div
      className="container mx-auto py-10 px-6"
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <Helmet>
        <title>Update Blog - My Blog Site</title>
        <meta
          name="description"
          content="Update your blog post and share your knowledge."
        />
        <meta name="keywords" content="blog, update blog, edit blog" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://myblogsite.com/update-blog" />
      </Helmet>

      <PageHeader title="Update a Blog" path="Update Blog" />

      <ToastContainer />

      <div className=" p-8 rounded-xl shadow-xl max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="">
            <label className="text-xl font-semibold text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-4 mt-2 border rounded-md text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter the blog title"
            />
          </div>

          <div className="">
            <label className="text-xl font-semibold text-gray-700">
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              className="w-full h-30 border rounded-md shadow-sm"
              placeholder="Enter blog description..."
              theme="snow"
              required
            />
          </div>

          <div className="">
            <label className="text-xl font-semibold text-gray-700">
              Thumbnail URL
            </label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              required
              className="w-full p-4 mt-2 border rounded-md text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter the image URL"
            />
          </div>

          <div className="">
            <label className="text-xl font-semibold text-gray-700">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-4 mt-2 border rounded-md text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter the category"
            />
          </div>

          <div className="">
            <label className="text-xl font-semibold text-gray-700">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags.join(", ")}
              onChange={handleTagChange}
              className="w-full p-4 mt-2 border rounded-md text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter tags"
            />
          </div>

          <div className="">
            <label className="text-xl font-semibold text-gray-700">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full p-4 mt-2 border rounded-md text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter the author's name"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-700"
          >
            Update Blog
          </button>
        </form>

        <p className="mt-3 text-center text-gray-700">{message}</p>
      </div>
    </motion.div>
  );
};

export default UpdateBlog;
