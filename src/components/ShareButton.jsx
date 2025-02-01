import React from "react";
import { IoShareSocial } from "react-icons/io5";

const ShareButton = ({ jobTitle }) => {
  const jobUrl = window.location.href;

  return (
    <div>
      <button
        className="p-4 bg-blue-600 hover:bg-blue-800 text-white rounded-full shadow-md transform transition-all hover:scale-110"
        onClick={() => {
          if (navigator.share) {
            navigator
              .share({
                title: `Check out this job: ${jobTitle}`,
                text: "Found an exciting job opportunity on JobNirvana!",
                url: jobUrl,
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

export default ShareButton;
