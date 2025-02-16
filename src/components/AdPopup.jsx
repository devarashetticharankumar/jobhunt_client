// import React, { useState, useEffect } from "react";
// // import InFeedAd from "./InFeedAd";
// import InArticleAd from "./InArticleAd";

// const AdPopup = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     // Show the popup after 5 seconds
//     const timer = setTimeout(() => {
//       setIsVisible(true);
//       // Initialize AdSense ads
//       (window.adsbygoogle = window.adsbygoogle || []).push({});
//     }, 5000);

//     return () => clearTimeout(timer); // Cleanup timer
//   }, []);

//   const handleClose = () => {
//     setIsVisible(false);
//   };

//   return (
//     <>
//       {isVisible && (
//         <div
//           className="fixed bottom-5 right-5 bg-white shadow-lg rounded-2xl p-4 w-80 z-50 animate-fade-in"
//           style={{
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//             animation: "fadeIn 0.5s",
//             maxHeight: "90vh",
//           }}
//         >
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-semibold text-gray-800">
//               🎉 Support Us!
//             </h3>
//             <button
//               onClick={handleClose}
//               className="text-gray-500 hover:text-gray-800 text-xl font-bold"
//             >
//               ✖
//             </button>
//           </div>
//           <p className="text-gray-600 text-sm mt-2">
//             Liked our content? Explore these ads to keep us running! 🚀
//           </p>

//           {/* Progress Bar */}
//           <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
//             <div
//               className="bg-blue-500 h-2 rounded-full"
//               style={{ width: "70%" }}
//             ></div>
//           </div>
//           <p className="text-xs text-gray-500 mt-1">
//             70% of our goal achieved!
//           </p>

//           <div>
//             {/* In-Feed Ad Component */}
//              <InArticleAd className="w-80 h-52"/> 
// {/*               <ins
//               className="adsbygoogle"
//               style={{
//                 display: "block",
//                 textAlign: "center",
//                 width: "300px",
//                 height: "200px",
//               }}
//               data-ad-client="ca-pub-8430285426081478"
//               data-ad-slot="9016216095"
//               data-ad-format="auto"
//               data-full-width-responsive="true"
//             ></ins> */}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdPopup;

import React, { useState, useEffect } from "react";
// import InFeedAd from "./InFeedAd";
import InArticleAd from "./InArticleAd";

const AdPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState(15); // Countdown timer starting value

  useEffect(() => {
    // Show the popup after 5 seconds
    const popupTimer = setTimeout(() => {
      setIsVisible(true);
      // Initialize AdSense ads
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, 5000);

    return () => clearTimeout(popupTimer); // Cleanup timer
  }, []);

  useEffect(() => {
    if (isVisible && timer > 0) {
      // Countdown logic
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [isVisible, timer]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          className="fixed bottom-5 right-5 bg-white shadow-lg rounded-2xl p-4 w-96 z-50 fade-in-animation"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            animation: "fadeIn 0.5s",
            maxHeight: "90vh",
          }}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">
              🎉 Limited Time Offer!
            </h3>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ✖
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Discover exclusive deals! Click below before the timer runs out! 🚀
          </p>
          {/* Countdown Timer with Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3 relative">
            <div
              className="bg-red-500 h-2 rounded-full"
              style={{ width: `${(timer / 15) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {timer > 0
              ? `Hurry! ${timer} seconds left to claim.`
              : "Time's up! Click the ad to support us."}
          </p>
          <div className="w-96 h-52">
            {/* In-Feed Ad Component */}
            <InArticleAd className="w-96 h-52" /> 
{/*             <ins
              className="adsbygoogle"
              style={{
                display: "block",
                textAlign: "center",
                width: "300px",
                height: "200px",
              }}
              data-ad-client="ca-pub-8430285426081478"
              data-ad-slot="9016216095"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins> */}
          </div>

          {/* Social Proof */}
          <p className="text-gray-500 text-sm mt-3">
            🔥 Over <span className="font-bold">5,000 users</span> have clicked
            this ad!{" "}
          </p>
        </div>
      )}
    </>
  );
};

export default AdPopup;
