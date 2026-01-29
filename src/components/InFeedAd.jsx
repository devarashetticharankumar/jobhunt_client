import React, { useEffect } from "react";

const InFeedAd = () => {
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
      className="w-full overflow-hidden rounded-2xl my-4 flex flex-col items-center bg-yellow-50/30 border border-yellow-100/50 p-3 min-h-[120px]"
    >
      <span className="text-[10px] text-blue-600/60 uppercase font-black tracking-widest mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
        Professional Insight
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center", width: "100%" }}
        data-ad-client="ca-pub-8430285426081478"
        data-ad-slot="2195791299"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default InFeedAd;
