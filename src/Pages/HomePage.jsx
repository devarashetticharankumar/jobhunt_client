import React from "react";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../data/apiPath";
import { motion } from "framer-motion";
import {
  FaUserPlus, FaSearch, FaPaperPlane, FaBriefcase,
  FaArrowRight, FaRocket, FaRegBuilding, FaGlobeAmericas
} from "react-icons/fa";
import { MdOutlineWorkOutline, MdOutlineArticle } from "react-icons/md";

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [email, setEmail] = useState("");
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  // Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesRes, blogsRes, jobsRes] = await Promise.all([
          fetch(`${API_URL}/jobs/featured-companies`),
          fetch(`${API_URL}/blogs/all-blogs`),
          fetch(`${API_URL}/jobs/recent-jobs`)
        ]);

        if (companiesRes.ok) setCompanies(await companiesRes.json());
        if (blogsRes.ok) {
          const data = await blogsRes.json();
          setBlogs(Array.isArray(data) ? data.slice(0, 4) : []);
        }
        if (jobsRes.ok) setJobs(await jobsRes.json());
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch(`${API_URL}/subscriptions/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timeout = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  // Animation Variants
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <div className="bg-white overflow-x-hidden font-sans">
      <Helmet>
        <title>JobNirvana | Find Your Dream Career</title>
        <meta name="description" content="Search and apply for top jobs in IT, software, marketing, and more." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-purple-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                #1 Job Portal in 2026
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                Find a job that <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">suits your passion</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Connecting premium talent with top-tier companies. Your next big career move starts right here.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/jobs')}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl transition-all flex items-center justify-center gap-2 text-lg"
                >
                  <FaSearch /> Search Jobs
                </button>
                <button
                  onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-lg"
                >
                  How it works
                </button>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-12 h-12 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden`}>
                      <img src={`https://randomuser.me/api/portraits/men/${i * 10}.jpg`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-900">10k+ Candidates</p>
                  <p className="text-sm text-gray-500">Placed this month</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

              {/* Illustration Card */}
              <div className="relative bg-white/60 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Job Recommendation</h3>
                    <p className="text-gray-500">Based on your profile</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                    <MdOutlineWorkOutline />
                  </div>
                </div>
                <div className="space-y-4">
                  {['Senior React Developer', 'Product Designer', 'Marketing Manager'].map((job, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-purple-500' : 'bg-orange-500'}`}>
                        {job[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{job}</h4>
                        <p className="text-sm text-gray-400">$120k - $150k • Remote</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-gray-100 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
            {[
              { label: "Active Jobs", value: "25k+", icon: <FaBriefcase /> },
              { label: "Companies", value: "1.2k+", icon: <FaRegBuilding /> },
              { label: "Active Users", value: "100k+", icon: <FaUserPlus /> },
              { label: "Countries", value: "15+", icon: <FaGlobeAmericas /> }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-4">
                <div className="text-3xl text-gray-900 font-extrabold mb-1">{stat.value}</div>
                <div className="text-gray-500 font-medium flex items-center gap-2">{stat.icon} {stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest <span className="text-blue-600">Opportunities</span></h2>
              <p className="text-gray-600 max-w-xl">Explore the most recent openings from top companies. Your next challenge awaits.</p>
            </div>
            <Link to="/jobs" className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
              View All Jobs <FaArrowRight />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(n => <div key={n} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>)}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {jobs.map((job) => (
                <motion.div
                  key={job._id || job.id}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-blue-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                    <FaRocket className="text-6xl text-blue-500 transform rotate-12" />
                  </div>

                  <div className="flex items-start gap-4 mb-6 relative">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                      {job.companyLogo ? (
                        <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain p-2" />
                      ) : (
                        <FaBriefcase className="text-gray-400 text-2xl" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{job.jobTitle}</h3>
                      <p className="text-sm text-gray-500">{job.companyName}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                        {job.employmentType}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100 relative">
                    <span>{job.jobLocation}</span>
                    <span className="font-semibold text-gray-900">${job.minPrice}k - ${job.maxPrice}k/yr</span>
                  </div>

                  <Link to={`/job/${job.slug || job._id}`}>
                    <button className="w-full mt-6 py-3 rounded-lg bg-gray-50 text-gray-900 font-semibold hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      Apply Now
                    </button>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link to="/jobs" className="btn-primary">View All Jobs</Link>
          </div>
        </div>
      </section>

      {/* How It Works (Re-styled) */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">How JobNirvana Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <FaUserPlus />, title: "Create Account", desc: "Sign up in seconds and build your professional profile." },
              { icon: <FaSearch />, title: "Search Jobs", desc: "Filter jobs by salary, location, and role to find your match." },
              { icon: <FaPaperPlane />, title: "Apply Easily", desc: "One-click application to top companies worldwide." },
              { icon: <FaBriefcase />, title: "Get Hired", desc: "Track your applications and land your dream job." }
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="w-20 h-20 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-3xl mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed px-4">{step.desc}</p>

                {/* Connector Line (Desktop) */}
                {idx !== 3 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-100 -z-10 transform translate-x-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest <span className="text-purple-600">Insights</span></h2>
            <p className="text-gray-600">Expert advice and trends to help you navigate your career.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs.map((blog, idx) => (
              <Link to={`/blog/${blog.slug}`} key={idx} className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-purple-600 mb-2 uppercase tracking-wide">Career Tips</div>
                  <h3 className="font-bold text-gray-900 leading-snug mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">{blog.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MdOutlineArticle /> Read Article
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Never Miss an Opportunity</h2>
          <p className="text-blue-100 text-lg mb-10">Join our newsletter to get weekly updates on new jobs and career advice.</p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              {status === 'loading' ? 'Sending...' : 'Subscribe Now'}
            </button>
          </form>
          {status === 'success' && <p className="mt-4 text-green-400 font-medium">Subscribed successfully!</p>}
          {status === 'error' && <p className="mt-4 text-red-400 font-medium">Something went wrong. Try again.</p>}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
