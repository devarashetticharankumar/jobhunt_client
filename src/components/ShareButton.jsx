// import React from "react";
// import { IoShareSocial } from "react-icons/io5";

// const ShareButton = ({ jobTitle }) => {
//   const jobUrl = window.location.href;

//   return (
//     <div>
//       <button
//         className="p-3 bg-blue-600 hover:bg-blue-800 text-white rounded-full shadow-md transform transition-all hover:scale-110"
//         onClick={() => {
//           if (navigator.share) {
//             navigator
//               .share({
//                 title: `Check out this job: ${jobTitle}`,
//                 text: "Found an exciting job opportunity on JobNirvana!",
//                 url: jobUrl,
//               })
//               .then(() => console.log("Shared successfully"))
//               .catch((error) => console.error("Error sharing:", error));
//           } else {
//             alert("Sharing not supported on this browser.");
//           }
//         }}
//       >
//         <IoShareSocial size={24} />
//       </button>
//     </div>
//   );
// };

// export default ShareButton;

import React, { useState } from "react";
import { IoShareSocial } from "react-icons/io5";
import { TbShare3 } from "react-icons/tb";

const ShareButton = ({
  jobTitle,
  companyName,
  jobLocation,
  jobUrl = window.location.href,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      setIsLoading(true);
      navigator
        .share({
          title: `Check out this job: ${jobTitle}`,
          text: `Hi Everyone,\n\nWe’re hiring for ${jobTitle} at ${companyName} in ${jobLocation}.\n\nIf you or someone in your network is interested, check out the details here: ${jobUrl}.\n\nFeel free to share this post.\n\n#hiring #jobopportunity #career #${jobTitle.replace(
            /\s+/g,
            ""
          )} #${companyName.replace(/\s+/g, "")} #${jobLocation.replace(
            /\s+/g,
            ""
          )}`,
          url: jobUrl,
        })
        .then(() => {
          console.log("Shared successfully");
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error sharing:", error);
          setIsLoading(false);
        });
    } else {
      navigator.clipboard
        .writeText(`${jobTitle} at ${companyName} in ${location} - ${jobUrl}`)
        .then(() => alert("Job details copied to clipboard!"))
        .catch(() =>
          alert("Sharing not supported and unable to copy to clipboard.")
        );
    }
  };

  return (
    <div>
      <button
        className={`p-3 bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white rounded-full shadow-md transform transition-transform hover:scale-110 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleShare}
        aria-label={`Share this job: ${jobTitle}`}
        title={`Share this job: ${jobTitle}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="animate-spin">🔄</span>
        ) : (
          <TbShare3 size={24} />
        )}
      </button>
    </div>
  );
};

export default ShareButton;
