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
    <div className="in-feed-ad my-4">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-ff-26-6o-g1+1xb"
        data-ad-client="ca-pub-8430285426081478"
        data-ad-slot="9720225381"
      ></ins>
    </div>
  );
};

export default InFeedAd;
