import React from "react";
import { IoShareSocial } from "react-icons/io5";

const BlogShareButton = ({ blogTitle }) => {
  const blogUrl = window.location.href;

  return (
    <div>
      <button
        className="p-3 bg-blue-600 hover:bg-blue-800 text-white rounded-full shadow-md transform transition-all hover:scale-110"
        onClick={() => {
          if (navigator.share) {
            navigator
              .share({
                title: `Check out this blog: ${blogTitle}`,
                text: "Found an interesting blog on JobNirvana!",
                url: blogUrl,
              })
              .then(() => console.log("Shared successfully"))
              .catch((error) => console.error("Error sharing:", error));
          } else {
            alert("Sharing not supported on this browser.");
          }
        }}
      >
        <IoShareSocial size={24} />
      </button>
    </div>
  );
};

export default BlogShareButton;
