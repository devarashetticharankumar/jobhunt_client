import React, { useEffect } from "react";

const FixedBannerAd = () => {
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
            className="w-full overflow-hidden flex flex-col items-center bg-gray-50/50 rounded-lg p-1 border border-gray-100/50"
            style={{ minHeight: "50px", maxHeight: "150px" }}
        >
            <span className="text-[6px] text-gray-400 font-bold self-end mr-1 uppercase tracking-tight">
                SPONSORED
            </span>
            <ins
                className="adsbygoogle"
                style={{ display: "block", width: "100%" }}
                data-ad-client="ca-pub-8430285426081478"
                data-ad-slot="7826589202"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div >
    );
};

export default FixedBannerAd;
