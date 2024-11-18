import React, { useState } from "react";
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
    // [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  // "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
  "align",
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
    <motion.div
      className="container mx-auto py-10 px-6"
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeIn" }}
    >
      <Helmet>
        <title>Create Blog - My Blog Site</title>
        <meta
          name="description"
          content="Create a new blog post and share your knowledge."
        />
        <meta name="keywords" content="blog, create blog, post blog" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://myblogsite.com/create-blog" />
      </Helmet>

      <PageHeader title="Create a Blog" path="Create a Blog" />

      <ToastContainer />

      <div className=" p-4 rounded-xl shadow-xl max-w-7xl mx-auto">
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
              placeholder="Enter author's name"
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-all duration-200"
          >
            Create Blog
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">{message}</p>
      </div>
    </motion.div>
  );
};

export default CreateBlog;

// import React, { useState } from "react";
// import { API_URL } from "../data/apiPath";
// import { ToastContainer, toast } from "react-toastify";
// import { motion } from "framer-motion";
// import ReactQuill from "react-quill";
// import PageHeader from "../components/PageHeader";
// import { Helmet } from "react-helmet";
// import "react-toastify/dist/ReactToastify.css";

// import "react-quill/dist/quill.snow.css";

// const modules = {
//   toolbar: [
//     // [{ header: [1, 2, 3, false] }],
//     [{ font: [] }],
//     [{ size: [] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: [] }, { background: [] }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ align: [] }],
//     ["link", "image"],
//     ["clean"],
//   ],
// };

// const formats = [
//   // "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "video",
//   "color",
//   "background",
//   "align",
// ];

// const CreateBlog = () => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [message, setMessage] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [category, setCategory] = useState("");
//   const [tags, setTags] = useState([]);
//   const [author, setAuthor] = useState("");

//   const handleTagChange = (e) => {
//     const inputTags = e.target.value.split(",").map((tag) => tag.trim());
//     setTags(inputTags);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(content);

//     const blogData = { title, content, category, author, tags, thumbnail };

//     try {
//       const response = await fetch(`${API_URL}/blogs/create-blog`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(blogData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Blog created successfully!");
//         toast.success("Blog created successfully!");
//       } else {
//         setMessage(data.message || "Failed to create blog");
//         toast.error(data.message || "Failed to create blog");
//       }
//     } catch (error) {
//       setMessage("Error creating blog");
//       toast.error("Error creating blog");
//     }
//   };

//   return (
//     <motion.div
//       className="container mx-auto py-10 px-6"
//       initial={{ opacity: 0, y: -60 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeIn" }}
//     >
//       <Helmet>
//         <title>Create Blog - My Blog Site</title>
//         <meta
//           name="description"
//           content="Create a new blog post and share your knowledge."
//         />
//         <meta name="keywords" content="blog, create blog, post blog" />
//         <meta name="robots" content="index, follow" />
//         <link rel="canonical" href="https://myblogsite.com/create-blog" />
//       </Helmet>

//       <PageHeader title="Create a Blog" path="Create a Blog" />

//       <ToastContainer />

//       <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-xl shadow-xl max-w-7xl mx-auto">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="">
//             <label className="text-xl font-semibold text-gray-700">Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//               className="w-full p-4 mt-2 border rounded-md text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               placeholder="Enter the blog title"
//             />
//           </div>

//           <div className="">
//             <label className="text-xl font-semibold text-gray-700">
//               Content
//             </label>
//             <ReactQuill
//               value={content}
//               onChange={setContent}
//               modules={modules}
//               formats={formats}
//               className="w-full h-30 border rounded-md shadow-sm"
//               placeholder="Enter blog description..."
//               theme="snow"
//               required
//             />
//           </div>

//           <div className="">
//             <label className="text-xl font-semibold text-gray-700">
//               Thumbnail URL
//             </label>
//             <input
//               type="url"
//               value={thumbnail}
//               onChange={(e) => setThumbnail(e.target.value)}
//               required
//               className="w-full p-4 mt-2 border rounded-md text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               placeholder="Enter the image URL"
//             />
//           </div>

//           <div className="">
//             <label className="text-xl font-semibold text-gray-700">
//               Category
//             </label>
//             <input
//               type="text"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//               className="w-full p-4 mt-2 border rounded-md text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               placeholder="Enter the category"
//             />
//           </div>

//           <div className="">
//             <label className="text-xl font-semibold text-gray-700">
//               Tags (comma separated)
//             </label>
//             <input
//               type="text"
//               value={tags.join(", ")}
//               onChange={handleTagChange}
//               className="w-full p-4 mt-2 border rounded-md text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               placeholder="Enter tags"
//             />
//           </div>

//           <div className="">
//             <label className="text-xl font-semibold text-gray-700">
//               Author
//             </label>
//             <input
//               type="text"
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//               required
//               className="w-full p-4 mt-2 border rounded-md text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
//               placeholder="Enter author's name"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full p-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-all duration-200"
//           >
//             Create Blog
//           </button>
//         </form>

//         <p className="mt-4 text-center text-gray-600">{message}</p>
//       </div>
//     </motion.div>
//   );
// };

// export default CreateBlog;
