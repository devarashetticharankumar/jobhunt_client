import React, { useEffect } from "react";

const InArticleAd = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <div
      className="w-full overflow-hidden rounded-2xl my-4 flex justify-center bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 min-h-[120px] items-center"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center", width: "100%" }}
        data-ad-client="ca-pub-8430285426081478"
        data-ad-slot="9016216095"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default InArticleAd;
