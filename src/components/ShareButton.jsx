// import React, { useState } from "react";
// import { IoShareSocial } from "react-icons/io5";
// import { TbShare3 } from "react-icons/tb";

// const ShareButton = ({
//   jobTitle,
//   companyName,
//   jobLocation,
//   jobUrl = window.location.href,
// }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleShare = () => {
//     if (navigator.share) {
//       setIsLoading(true);
//       navigator
//         .share({
//           title: `Check out this job: ${jobTitle}`,
//           text: `Hi Everyone,\n\nWe’re hiring for ${jobTitle} at ${companyName} in ${jobLocation}.\n\nIf you or someone in your network is interested, check out the details here: ${jobUrl}.\n\nFeel free to share this post.\n\n#hiring #jobopportunity #career #${jobTitle.replace(
//             /\s+/g,
//             ""
//           )} #${companyName.replace(/\s+/g, "")} #${jobLocation.replace(
//             /\s+/g,
//             ""
//           )}`,
//           url: jobUrl,
//         })
//         .then(() => {
//           console.log("Shared successfully");
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error sharing:", error);
//           setIsLoading(false);
//         });
//     } else {
//       navigator.clipboard
//         .writeText(`${jobTitle} at ${companyName} in ${location} - ${jobUrl}`)
//         .then(() => alert("Job details copied to clipboard!"))
//         .catch(() =>
//           alert("Sharing not supported and unable to copy to clipboard.")
//         );
//     }
//   };

//   return (
//     <div>
//       <button
//         className={`p-3 bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white rounded-full shadow-md transform transition-transform hover:scale-110 ${
//           isLoading ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         onClick={handleShare}
//         aria-label={`Share this job: ${jobTitle}`}
//         title={`Share this job: ${jobTitle}`}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <span className="animate-spin">🔄</span>
//         ) : (
//           <TbShare3 size={24} />
//         )}
//       </button>
//     </div>
//   );
// };

// export default ShareButton;

import React, { useState } from "react";
import { TbShare3 } from "react-icons/tb";

const ShareButton = ({
  jobTitle,
  companyName,
  jobLocation,
  minPrice,
  maxPrice,
  experienceLevel,
  description,
  jobUrl = window.location.href,
  companyLogo,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = () => {
    const shareText = `
Hi Everyone,

🚀 We’re hiring for **${jobTitle}** at **${companyName}**, located in **${jobLocation}**!

📌 Job Details: ${jobUrl}

If you or someone in your network is interested, please check out the details.

Feel free to share this opportunity within your network.

#hiring #jobopportunity #career #${jobTitle.replace(
      /\s+/g,
      ""
    )} #${companyName.replace(/\s+/g, "")} #${jobLocation.replace(/\s+/g, "")}`;

    if (navigator.share) {
      setIsLoading(true);
      navigator
        .share({
          title: `Check out this job: ${jobTitle}`,
          text: shareText,
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
        .writeText(shareText)
        .then(() => alert("Job details copied to clipboard!"))
        .catch(() =>
          alert("Sharing not supported and unable to copy to clipboard.")
        );
    }
  };

  return (
    <div className="flex items-center gap-2">
      {companyLogo && (
        <img
          src={companyLogo}
          alt={`${companyName} logo`}
          className="w-10 h-10 rounded-full"
        />
      )}
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
