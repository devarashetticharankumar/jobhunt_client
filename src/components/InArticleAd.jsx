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
      className="w-full overflow-hidden my-2 flex flex-col items-center min-h-[140px]"
    >
      <span className="text-[9px] text-blue-500/40 font-bold self-end mb-1 mr-2 flex items-center gap-1">
        <span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></span>
        RECOMMENDED FOR YOU
      </span>
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
