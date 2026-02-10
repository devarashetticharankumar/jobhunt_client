import React, { useEffect } from "react";

const GoogleAds = () => {
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
      className="w-full min-h-[280px] flex flex-col items-center justify-center text-center overflow-hidden my-2"
    >
      <span className="text-[7px] text-gray-400 font-bold self-end mb-1 mr-2 uppercase tracking-tight">
        SPONSORED
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8430285426081478"
        data-ad-slot="2195791299"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAds;
