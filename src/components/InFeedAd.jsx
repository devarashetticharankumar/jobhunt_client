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
      className="w-full overflow-hidden my-4 flex flex-col items-center min-h-[120px]"
    >
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
