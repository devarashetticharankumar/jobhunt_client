import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram } from "react-icons/fi";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-6 ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row  justify-between gap-6 ">
        <div className="mb-8 md:mb-0">
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
          <p className="mt-2 text-gray-400 text-sm  ">
            {
              "JobHunt is more than just a job board - it's a community of job seekers, employers, and career experts dedicated to helping you succeed. Join the movement today!"
            }
          </p>
        </div>
        <div className="mb-8 md:mb-0 ">
          <h3 className="text-xl font-semibold text-white">Contact</h3>
          <p className="mt-2 text-gray-400 text-sm">
            <span>9-63B Balaji Nagar, Hyderabad Telangana 514872</span>
            <br />
            <a href="#" className="text-gray-200 text-sm">
              jobhunt@gmail.com
            </a>
          </p>
        </div>
        <div className="mb-8 md:mb-0 text-sm ">
          <h3 className="text-xl font-semibold text-white">Quick Link</h3>
          <ul className="mt-2 text-gray-600">
            <li>
              <Link to="/about-us" className="hover:text-blue text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-blue text-gray-400">
                Terms of use
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-blue text-gray-400">
                Recent Jobs
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-blue text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-8 md:mb-0 ">
          <h3 className="text-xl font-semibold text-white">Social Share</h3>
          <div className="mt-2 flex   space-x-4 text-gray-400">
            <Link href="#" className="hover:text-blue">
              <FiInstagram size={22} />
            </Link>
            <Link href="#" className="hover:text-blue">
              <FaSquareFacebook size={22} />
            </Link>
            <Link href="#" className="hover:text-blue">
              <IoLogoLinkedin size={22} />
            </Link>
            <Link href="#" className="hover:text-blue">
              <FaTwitter size={22} />
            </Link>
            <Link href="#" className="hover:text-blue">
              <FaTelegram size={22} />
            </Link>
            <Link href="#" className="hover:text-blue">
              <FaYoutube size={22} />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-8 pt-4 ">
        <p className="text-center text-gray-400">
          &copy; Copyright 2024. Powered By
          <span className="font-bold text-blue"> JobHunt</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
