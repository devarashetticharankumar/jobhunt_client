import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdPopup from "./components/AdPopup";

function App() {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = () => {
      if (window.gtag) {
        window.gtag("config", "G-XQVWKXQYC9", {
          page_path: location.pathname,
        });
      } else {
        console.error("gtag is not loaded yet");
      }
    };

    trackPageView();
  }, [location]);

  // Handle External Script Blocking (AdSense/Offerwall)
  useEffect(() => {
    // Function to clean body attributes
    const cleanBodyAttributes = () => {
      const body = document.body;
      if (body.getAttribute("aria-hidden") === "true") {
        body.removeAttribute("aria-hidden");
        // console.log("Removed aria-hidden from body");
      }
      if (body.style.overflow === "hidden") {
        body.style.overflow = "visible"; // Force visible/auto
        // console.log("Restored body overflow");
      }
      if (body.style.position === "fixed") {
        body.style.position = "static";
        // console.log("Restored body position");
      }
    };

    // Initial clean
    cleanBodyAttributes();

    // Observer to watch for changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "aria-hidden" ||
            mutation.attributeName === "style")
        ) {
          cleanBodyAttributes();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["aria-hidden", "style"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <AdPopup />
      <ScrollToTop />
      <div className="pt-24 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
