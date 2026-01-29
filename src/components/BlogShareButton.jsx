import React from "react";
import { IoShareSocial } from "react-icons/io5";

const BlogShareButton = ({ blogTitle }) => {
  const blogUrl = window.location.href;

  return (
    <div>
      <button
        className="p-3 bg-blue-600 hover:bg-blue-800 text-white rounded-full shadow-md transform transition-all hover:scale-110"
        onClick={() => {
          const shareText = `Check out this interesting article: **${blogTitle}** on JobNirvana!\n\nRead more here: ${blogUrl}`;
          if (navigator.share) {
            navigator
              .share({
                title: blogTitle,
                text: shareText,
                url: blogUrl,
              })
              .then(() => console.log("Shared successfully"))
              .catch((error) => console.error("Error sharing:", error));
          } else {
            navigator.clipboard.writeText(shareText)
              .then(() => alert("Blog link copied to clipboard!"))
              .catch(() => alert("Failed to copy link"));
          }
        }}
      >
        <IoShareSocial size={24} />
      </button>
    </div>
  );
};

export default BlogShareButton;
