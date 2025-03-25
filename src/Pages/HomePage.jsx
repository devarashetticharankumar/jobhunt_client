import React from "react";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../data/apiPath";
import {
  FaUserPlus,
  FaSearch,
  FaPaperPlane,
  FaBriefcase,
} from "react-icons/fa";

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [email, setEmail] = useState("");
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    // Fetch job data and extract company logos
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${API_URL}/jobs/all-jobs`);
        const data = await response.json();
        const logos = [
          ...new Set(data.map((job) => job.companyLogo).filter(Boolean)),
        ].slice(0, 6);
        setCompanies(logos);
      } catch (error) {
        console.error("Error fetching company logos:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
    fetchCompanies();
  }, [API_URL]);

  useEffect(() => {
    // Fetch blogs data
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/blogs/all-blogs`);
        const data = await response.json();
        setBlogs(data.slice(0, 4)); // Limit to 4 blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
    fetchBlogs();
  }, [API_URL]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(`${API_URL}/subscriptions/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail(""); // Clear the input
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");
    }
  };

  // Clear status message after 5 seconds
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timeout = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timeout); // Cleanup timeout on component unmount
    }
  }, [status]);

  // fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_URL}/jobs/all-jobs`);
        if (response.ok) {
          const data = await response.json();
          setJobs(data.slice(0, 6)); // Display only the first 6 jobs
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <Helmet>
        <title>
          Find Top Jobs & Build Your Career - Job Portal | JobNirvana
        </title>
        <meta
          name="description"
          content="Search and apply for top jobs in IT, software development, marketing, design, and more. Explore high-paying job opportunities and advance your career with JobNirvana."
        />
        <meta
          name="keywords"
          content="top jobs, job portal, IT jobs, software development jobs, marketing jobs, design jobs, high-paying jobs, career opportunities, JobNirvana"
        />
        <meta name="author" content="CharanKumar" />
        <meta
          property="og:title"
          content="JobNirvana - Your Trusted Job Portal"
        />
        <meta
          property="og:description"
          content="Discover top jobs in leading industries like IT, marketing, and design. Build your career with JobNirvana's trusted job portal."
        />
        <meta property="og:url" content="https://jobnirvana.netlify.app" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta property="og:image" content="https://i.imgur.com/0qGt7qj.png" />
        <link rel="canonical" href={`${window.location.href}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "JobNirvana",
            url: "https://jobnirvana.netlify.app",
            description:
              "Search and apply for top jobs in IT, software development, marketing, design, and more. Explore high-paying job opportunities and advance your career with JobNirvana.",
            author: {
              "@type": "Organization",
              name: "JobNirvana",
            },
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://jobnirvana.netlify.app/jobs?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>
      {/* hero section */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center px-6 py-6 md:py-16 gap-8 bg-gradient-to-r from-blue-50 via-white to-blue-100">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-800">
            Connecting Talent with Opportunities
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Discover your dream job through our platform, designed to bridge the
            gap between talented individuals and top companies across
            industries.
          </p>
          <div className=" flex gap-3">
            <div className="bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg max-w-80 text-center text-base">
              Join thousands of satisfied users who found their dream jobs with
              JobNirvana!
            </div>
            <div className="flex items-center space-x-2 bg-red-200 rounded-md p-4">
              {/* Stacked Images */}
              <div className="flex -space-x-3">
                <img
                  src="https://cdn.pixabay.com/photo/2022/10/02/09/40/girl-7493088_1280.jpg"
                  alt="user"
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://cdn.pixabay.com/photo/2018/04/26/16/05/sunglasses-3352288_1280.jpg"
                  alt="user"
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://cdn.pixabay.com/photo/2018/04/26/16/05/sunglasses-3352289_1280.jpg"
                  alt="user"
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                />
              </div>

              {/* Text */}
              <div className="text-gray-800 text-lg font-semibold">
                10K Users
              </div>
            </div>
          </div>
          <button
            onClick={() => (window.location.href = "/jobs")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-blue-700 transition"
          >
            Explore Jobs
          </button>
        </div>

        {/* Right Content */}
        <div className="flex justify-center items-center relative">
          {/* Card */}
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-xl shadow-lg w-96 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              What type of job are you looking for?
            </h2>
            <div className="flex gap-3 flex-wrap">
              {["Design", "Developer", "Sales", "Software"].map(
                (tag, index) => (
                  <span
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                      index === 0
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    } transition`}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Statistics Section */}
      <section className="bg-gray-50 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 text-center gap-6">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">10K+</h3>
            <p className="text-gray-700">Active Users</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">15K+</h3>
            <p className="text-gray-700">Job Listings</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">2K+</h3>
            <p className="text-gray-700">Jobs Filled</p>
          </div>
        </div>
      </section>
      {/* Featured Companies Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Featured Companies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
            {isLoading ? (
              // Skeleton Loader
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-24 h-16 bg-gray-300 animate-pulse mx-auto rounded-md"
                ></div>
              ))
            ) : companies.length > 0 ? (
              companies.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`Company ${index + 1}`}
                  className="w-24 mx-auto grayscale hover:grayscale-0 transition duration-300"
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-4">
                No featured companies available.
              </p>
            )}
          </div>
        </div>
      </section>{" "}
      {/* latest jobs */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-6">Latest Jobs</h2>
          <p className="text-center text-gray-600 mb-6">
            Discover some of the latest job opportunities. Click the button
            below to see more jobs.
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Skeleton Loading */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-lg h-40 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <Link
                  to={`/job/${job._id}`}
                  key={job._id}
                  className="p-4 bg-white shadow rounded-lg border border-gray-200 flex gap-4 items-start hover:shadow-lg transition"
                >
                  {/* Company Logo */}
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt={`${job.companyName} logo`}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                      No Logo
                    </div>
                  )}

                  {/* Job Details */}
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {job.jobTitle}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {job.companyName} - {job.jobLocation}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate("/jobs")}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              View More Jobs
            </button>
          </div>
        </div>
      </section>{" "}

      {/* blogs section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>
          <p className="text-center text-gray-600 mb-6">
            Discover the latest trends, tips, and insights from our expert
            blogs. Stay informed and inspired!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              // Skeleton Loader for Blogs
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-200 rounded-lg p-4"
                >
                  <div className="h-32 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded-md"></div>
                </div>
              ))
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="border border-gray-200 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{blog.title}</h3>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-4">
                This will take some time. Sorry for the delay.
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/blogs")}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            View More Blogs
          </button>
        </div>
      </section>
      {/* signup section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Find Your Dream Job?
        </h2>
        <p className="text-lg mb-8">
          Sign up today and connect with top companies hiring right now!
        </p>
        <button
          onClick={() =>
            loginWithRedirect({
              screen_hint: "signup", // Directs the user to the signup page
            })
          }
          className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
        >
          Get Started Now
        </button>
      </section>{" "}
      {/* How it works */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-8">How JobNirvana Works</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow">
            <FaUserPlus className="text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Step 1: Sign Up</h3>
            <p className="text-gray-600">
              Create an account easily using your email or social login.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow">
            <FaSearch className="text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Step 2: Search Jobs</h3>
            <p className="text-gray-600">
              Browse jobs based on your skills, preferences, and location.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow">
            <FaPaperPlane className="text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Step 3: Apply</h3>
            <p className="text-gray-600">
              Submit your application directly to the company in one click.
            </p>
          </div>
          {/* Step 4 */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow">
            <FaBriefcase className="text-blue-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Step 4: Get Hired</h3>
            <p className="text-gray-600">
              Track your applications and secure your dream job!
            </p>
          </div>
        </div>
      </section>{" "}
      {/* news letter */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Job Alerts</h2>
          <p className="text-gray-600 mb-6">
            Stay updated with the latest job opportunities directly in your
            inbox.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row justify-center items-center gap-4"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className={`px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${
                status === "loading" && "opacity-50 cursor-not-allowed"
              }`}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {status === "success" && (
            <p className="mt-4 text-green-600">Subscribed successfully!</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-red-600">
              Failed to subscribe. Please try again.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
