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
      className="w-full overflow-hidden rounded-2xl my-6 flex flex-col items-center bg-blue-50/20 border border-blue-100/50 p-4 min-h-[140px] shadow-sm"
    >
      <span className="text-[10px] text-blue-600/60 uppercase font-black tracking-widest mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
        Recommended for you
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
