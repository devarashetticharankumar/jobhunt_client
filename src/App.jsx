import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="pt-24 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
