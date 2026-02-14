// src/components/MultiplexAd.jsx
import React, { useEffect } from "react";

const MultiplexAd = () => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className="multiplex-ad">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="autorelaxed"
        data-ad-client="ca-pub-8430285426081478"
        data-ad-slot="4178186291"
      ></ins>
    </div>
  );
};

export default MultiplexAd;
