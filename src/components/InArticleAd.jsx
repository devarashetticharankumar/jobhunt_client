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
      className="w-full overflow-hidden flex flex-col items-center bg-gray-50/50 rounded-xl p-2 border border-gray-100/50"
    >
      <span className="text-[7px] text-gray-400 font-bold self-end mb-1 mr-2 uppercase tracking-tight">
        SPONSORED
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
