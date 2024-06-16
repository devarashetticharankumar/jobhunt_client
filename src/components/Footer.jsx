import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FiInstagram } from "react-icons/fi";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {
  const navItems = [
    {
      path: "/",
      title: "Start a search",
    },
    {
      path: "/my-job",
      title: "My Jobs",
    },
    {
      path: "/salary",
      title: "Salary Estimate",
    },
    {
      path: "/post-job",
      title: "Post a Job",
    },
  ];

  return (
    <footer className="bg-gray-900  pt-12 pb-6">
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center mb-4">
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
            <a
              href="/"
              className="flex items-center gap-1 text-2xl text-black-500"
            >
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
              <span className="logo text-white">JobHunt</span>
            </a>
            <p className="text-sm text-gray-400">
              JobHunt is more than just a job board - it's a community of job
              seekers, employers, and career experts dedicated to helping you
              succeed. Join the movement today!
            </p>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
            <h2 className="text-lg font-bold text-white mb-2">
              Important Links
            </h2>
            <ul>
              <li>
                <Link
                  to="/about-us"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/3 p-6">
            <h2 className="text-lg font-bold text-white mb-2">Social Links</h2>
            <ul>
              <li>
                <Link to="" className="text-sm text-gray-400 hover:text-white">
                  <IoLogoLinkedin size={24} />
                </Link>
              </li>
              <li className="py-2">
                <Link
                  to="https://www.instagram.com/jobhunt.pro/"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  <FiInstagram size={24} />
                </Link>
              </li>
              <li>
                <Link to="" className="text-sm text-gray-400 hover:text-white">
                  <FaSquareFacebook size={24} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-gray-400 text-center">
          &copy; 2024 JobHunt. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
