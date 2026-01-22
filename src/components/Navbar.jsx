import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
  } = useAuth0();

  // Force Light Mode Cleanup
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
  }, []);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Close menu on route change (backup)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", title: "Home" },
    { path: "/jobs", title: "Find Jobs" },
    { path: "/salary", title: "Salary" },
    { path: "/blogs", title: "Expert Advice" },
    { path: "/resume-builder", title: "Resume Builder" },
  ];

  if (isAuthenticated) {
    navItems.splice(2, 0, { path: "/my-applications", title: "My Applications" });
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen
        ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3"
        : "bg-transparent py-5"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="46"
            viewBox="0 0 45 46"
            fill="none"
          >
            <path
              d="M35.6392 17.6831C37.1506 17.9768 37.7772 19.7964 36.7673 20.9584L21.9962 37.953C20.9862 39.115 19.097 38.7479 18.5957 37.2923L11.2635 16.0029C10.7621 14.5472 12.0246 13.0946 13.536 13.3883L35.6392 17.6831Z"
              fill="#8B94E7"
            />
            <path
              d="M9.10566 15.7428C8.33756 14.4085 9.30193 12.7431 10.8415 12.745L33.3582 12.7737C34.8978 12.7756 35.8579 14.4435 35.0864 15.7759L23.8033 35.2615C23.0318 36.5939 21.1073 36.5914 20.3392 35.2571L9.10566 15.7428Z"
              fill="#2D42FF"
            />
          </svg>
          <span className="logo font-ChakraPetch font-semibold">
            Job<span className="text-blue-600">N</span>irvana
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map(({ path, title }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => `
                  relative text-sm font-bold transition-colors py-2
                  ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}
                `}
              >
                {({ isActive }) => (
                  <>
                    {title}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-underline"
                        className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-600 rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth Actions */}
        <div className="hidden lg:flex items-center gap-4">

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <span className="text-sm font-bold text-gray-700 text-right hidden xl:block">
                  {user.name} <br />
                  <span className="text-xs text-gray-400 font-normal">Candidate</span>
                </span>
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={user.picture}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer"
                />
              </Link>
              <button
                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                title="Log Out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={() => loginWithRedirect()} className="text-gray-600 font-bold text-sm hover:text-blue-600 transition-colors">
                Log In
              </button>
              <button
                onClick={() => loginWithRedirect()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 text-sm"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBarsStaggered className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 md:hidden z-50 rounded-b-2xl overflow-hidden">
          <ul className="flex flex-col p-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {navItems.map(({ path, title }) => (
              <li key={path} onClick={closeMobileMenu}>
                <NavLink
                  to={path}
                  className={({ isActive }) => `
                    block px-4 py-4 rounded-xl font-bold text-xl transition-colors border border-transparent
                    ${isActive ? "bg-blue-50 text-blue-600 border-blue-100" : "text-gray-600 hover:bg-gray-50 hover:border-gray-100"}
                  `}
                >
                  {title}
                </NavLink>
              </li>
            ))}

            <div className="border-t border-gray-100 my-6 pt-6 px-4 space-y-6">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors" onClick={closeMobileMenu}>
                    <img src={user.picture} alt={user.name} className="w-12 h-12 rounded-full border border-gray-200" />
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{user.name}</p>
                      <p className="text-sm text-gray-500">View Profile</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    className="w-full py-4 rounded-xl bg-red-50 text-red-600 font-bold text-lg border border-red-100 hover:bg-red-100 transition-colors"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={() => loginWithRedirect()}
                    className="w-full py-4 rounded-xl bg-gray-50 text-gray-700 font-bold text-lg border border-gray-200"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => loginWithRedirect()}
                    className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
