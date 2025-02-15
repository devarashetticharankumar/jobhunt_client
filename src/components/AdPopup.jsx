import React, { useState, useEffect } from "react";
// import InFeedAd from "./InFeedAd";
import InArticleAd from "./InArticleAd";

const AdPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Initialize AdSense ads
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          className="fixed bottom-5 right-5 bg-white shadow-lg rounded-2xl p-4 w-80 z-50 animate-fade-in"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            animation: "fadeIn 0.5s",
          }}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              🎉 Support Us!
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ✖
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Liked our content? Explore these ads to keep us running! 🚀
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: "70%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            70% of our goal achieved!
          </p>

          <div className="flex justify-center mt-4">
            {/* In-Feed Ad Component */}
            <InArticleAd />
          </div>
        </div>
      )}
    </>
  );
};

export default AdPopup;

// import React, { useState, useEffect } from "react";
// import InFeedAd from "./InFeedAd";

// const AdPopup = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // Show the popup after 3 seconds
//     const timer = setTimeout(() => {
//       setIsVisible(true);
//       // Initialize AdSense ads
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     }, 3000);

//     return () => clearTimeout(timer); // Cleanup timer
//   }, []);

//   const handleClose = () => {
//     setIsVisible(false);
//   };

//   return (
//     <>
//       {isVisible && (
//         <div
//           className="fixed bottom-5 right-5 bg-white shadow-lg rounded-2xl p-4 w-80 z-50"
//           style={{ animation: "fadeIn 0.5s" }}
//         >
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-semibold text-gray-800">Support Us!</h3>
//             <button
//               onClick={handleClose}
//               className="text-gray-500 hover:text-gray-800 text-xl font-bold"
//             >
//               ✖
//             </button>
//           </div>
//           <p className="text-gray-600 text-sm mt-2">
//             Like our content? Explore ads to help us grow!{" "}
//           </p>
//           <div className="flex justify-center mt-4">
//             {/* <ins
//               className="adsbygoogle"
//               style={{ display: "block", textAlign: "center" }}
//               data-ad-client="ca-pub-8430285426081478"
//               data-ad-slot="2195791299"
//               data-ad-format="auto" //0r "link"
//               data-full-width-responsive="true"
//             ></ins> */}
//             <InFeedAd />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdPopup;
