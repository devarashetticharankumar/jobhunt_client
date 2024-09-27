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
    window.gtag("config", "G-XQVWKXQYC9", {
      page_path: location.pathname,
    });
  }, [location]);
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
