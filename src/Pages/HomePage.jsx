import React from "react";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../data/apiPath";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaSearch, FaBriefcase,
  FaArrowRight, FaRegBuilding, FaGlobeAmericas, FaUsers, FaChartLine, FaCheckCircle, FaStar,
  FaMagic, FaChartPie, FaLightbulb
} from "react-icons/fa";
import { MdOutlineWorkOutline, MdOutlineArticle } from "react-icons/md";
import InArticleAd from "../components/InArticleAd";
import InFeedAd from "../components/InFeedAd";

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [email, setEmail] = useState("");
  const [jobs, setJobs] = useState([]);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

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

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return (
    <div className="bg-[#F8F9FA] overflow-x-hidden font-sans">
      <Helmet>
        <title>JobNirvana | India's #1 Premium Job Portal 2026</title>
        <meta name="description" content="Search and apply for top jobs in IT, software, marketing, and more with JobNirvana 2.0." />
      </Helmet>

      {/* ULTRA-PREMIUM HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-18 pb-32 overflow-hidden bg-white">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-60 -mr-96 -mt-96 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-50 to-blue-50 rounded-full blur-3xl opacity-40 -ml-64 -mb-64"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-extrabold tracking-widest uppercase mb-10 shadow-sm border border-blue-100"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Powering India's Future Careers
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#091e42] leading-[1.1] tracking-tight mb-8"
            >
              Land your dream <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">role at scale.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed mb-12 max-w-2xl px-4"
            >
              India's most accurate job matching engine. Build professional resumes, track applications, and get hired by world-class companies.
            </motion.p>

            {/* Glassmorphic Search Unit */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="w-full max-w-2xl p-2 bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-2xl flex flex-col sm:flex-row gap-2"
            >
              <div className="flex-1 relative">
                <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Skills, Designations, Companies..."
                  className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl outline-none text-gray-900 font-medium focus:ring-4 focus:ring-blue-500/10 transition-all border border-transparent focus:border-blue-100"
                />
              </div>
              <button
                onClick={() => navigate('/jobs')}
                className="px-10 py-5 bg-[#091e42] hover:bg-black text-white font-extrabold rounded-2xl transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 active:scale-95"
              >
                Search <FaArrowRight className="text-sm" />
              </button>
            </motion.div>

            {/* Trusted Brand Ticker Placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-20 w-full"
            >
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.3em] mb-8">Trusted by Global Innovators</p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
                <span className="text-2xl font-black italic tracking-tighter">GOOGLE</span>
                <span className="text-2xl font-black italic tracking-tighter">AMAZON</span>
                <span className="text-2xl font-black italic tracking-tighter">NETFLIX</span>
                <span className="text-2xl font-black italic tracking-tighter">MICROSOFT</span>
                <span className="text-2xl font-black italic tracking-tighter">ZOMATO</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS (Data-Dense Row) */}
      <section className="bg-white py-12 border-y border-gray-100 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 items-center">
            {[
              { icon: <FaBriefcase />, value: "25k+", label: "Active Openings" },
              { icon: <FaStar />, value: "1.2k+", label: "Top Employers" },
              { icon: <FaUsers />, value: "450k+", label: "Verified Users" },
              { icon: <FaChartLine />, value: "12k+", label: "Hired Monthly" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-5">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                  {stat.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-[#091e42]">{stat.value}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI RESUME BUILDER PROMO SECTION */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F8F9FA] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -z-0"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-100"
              >
                <FaMagic className="text-xs" /> New: AI 2.0 Feature
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-[#091e42] leading-[1.2] mb-6"
              >
                Build a resume that <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-6xl md:text-7xl">beats the ATS.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-500 font-medium mb-10 max-w-xl mx-auto lg:mx-0"
              >
                Don't just apply. Stand out with AI-optimized summaries, professional action verbs, and real-time ATS scoring.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white shadow-md rounded-xl flex items-center justify-center text-indigo-600 text-lg flex-shrink-0">
                    <FaChartPie />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-[#091e42] text-sm mb-1">ATS Score Analysis</h4>
                    <p className="text-xs text-gray-400">Real-time feedback on your score from 0-100.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white shadow-md rounded-xl flex items-center justify-center text-purple-600 text-lg flex-shrink-0">
                    <FaLightbulb />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-[#091e42] text-sm mb-1">Smart Enhancements</h4>
                    <p className="text-xs text-gray-400">Upgrade weak verbs to professional action verbs.</p>
                  </div>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/resume-builder')}
                className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 mx-auto lg:mx-0 group"
              >
                Build My AI Resume <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Right Visual (Interactive Card) */}
            <div className="flex-1 w-full max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, rotateY: 20 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[40px] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 relative group"
              >
                {/* ATS Score Circle Simulation */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-50" />
                      <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={2 * Math.PI * 58} strokeDashoffset={2 * Math.PI * 58 * (1 - 0.85)} className="text-indigo-600" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-[#091e42]">85</span>
                      <span className="text-[10px] font-bold text-gray-400">SCORE</span>
                    </div>
                  </div>
                  <div className="mt-4 px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                    Highly Optimized
                  </div>
                </div>

                {/* Action Verb Simulation */}
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-[10px] text-gray-400 font-bold mb-2 flex items-center gap-1.5 uppercase">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> Original
                    </div>
                    <p className="text-xs text-gray-400 line-through">I worked on the team and helped with projects.</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 relative">
                    <div className="absolute top-4 right-4 text-indigo-600">
                      <FaMagic className="animate-bounce" />
                    </div>
                    <div className="text-[10px] text-indigo-600 font-bold mb-2 flex items-center gap-1.5 uppercase">
                      <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span> AI Enhanced
                    </div>
                    <p className="text-xs text-[#091e42] font-semibold">I <span className="text-indigo-600 font-black">Developed</span> the team and <span className="text-indigo-600 font-black">Managed</span> critical projects.</p>
                  </div>
                </div>

                {/* Floating Element */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 max-w-[140px] hidden sm:block group-hover:translate-y-[-5px] transition-transform">
                  <p className="text-[10px] font-black text-gray-400 mb-1 tracking-widest uppercase">Summary</p>
                  <p className="text-[11px] text-[#091e42] font-bold leading-tight">"Results-oriented Lead with 5+ years..."</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1240px] mx-auto px-4 py-1">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm overflow-hidden">
          <span className="text-[10px] text-gray-300 uppercase block mb-2 text-center font-bold tracking-widest">JobNirvana Network Sponsor</span>
          <InArticleAd />
        </div>
      </div>

      {/* LATEST JOBS (Modern Grid) */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
            <div>
              <h2 className="text-4xl font-extrabold text-[#091e42] mb-3">Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Opportunities</span></h2>
              <p className="text-gray-500 font-medium">Explore hand-picked roles from industry leaders.</p>
            </div>
            <Link to="/jobs" className="flex items-center gap-3 px-8 py-3 bg-white border border-gray-100 text-[#091e42] font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm group">
              Browse All Jobs <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(n => <div key={n} className="h-64 bg-white rounded-3xl animate-pulse shadow-sm border border-gray-100"></div>)}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {jobs.map((job, idx) => (
                <React.Fragment key={job._id || job.id}>
                  <motion.div
                    variants={itemVariants}
                    className="group bg-white rounded-[32px] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-50 hover:border-blue-100 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 p-3 flex items-center justify-center overflow-hidden border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                        {job.companyLogo ? (
                          <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain" />
                        ) : (
                          <FaRegBuilding className="text-gray-300 text-2xl" />
                        )}
                      </div>
                      <span className="px-4 py-1.5 bg-green-50 text-green-600 text-[10px] font-extrabold rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> {job.employmentType}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#091e42] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                      {job.jobTitle}
                    </h3>
                    <p className="text-sm text-gray-400 font-bold mb-4 flex items-center gap-2">
                      <FaGlobeAmericas className="text-xs" /> {job.companyName} • {job.jobLocation}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {(job.skills && job.skills.length > 0 ? job.skills : [])
                        .slice(0, 3)
                        .map((skill, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-50 text-gray-400 text-[9px] font-bold rounded-lg uppercase tracking-wider group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            {typeof skill === 'object' ? skill.label : skill}
                          </span>
                        ))}
                      {(!job.skills || job.skills.length === 0) && (
                        ["Hiring", "Direct", "New"].map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-50 text-gray-400 text-[9px] font-bold rounded-lg uppercase tracking-wider group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            {tag}
                          </span>
                        ))
                      )}
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="text-blue-600 font-black text-lg">
                        ${job.minPrice}k - ${job.maxPrice}k<span className="text-xs text-gray-400 font-bold">/yr</span>
                      </div>
                      <Link to={`/job/${job.slug || job._id}`}>
                        <button className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                          <FaArrowRight className="text-xs" />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                  {/* Inject Ad every 3rd job card (Safe Density) */}
                  {(idx + 1) % 3 === 0 && (
                    <div className="col-span-1">
                      <InFeedAd />
                    </div>
                  )}
                </React.Fragment>
              ))}

              {/* In-Grid Ad Card */}
              <div className="bg-[#091e42] rounded-[32px] p-8 flex flex-col items-center justify-center text-center text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <h4 className="text-xl font-extrabold mb-4 relative z-10">Premium Placement</h4>
                <p className="text-blue-100/70 text-xs mb-8 font-medium px-4 relative z-10">Get your company featured here and reach 500k+ active candidates within 24 hours.</p>
                <button className="px-8 py-3 bg-white text-[#091e42] font-black rounded-xl text-xs hover:bg-blue-50 transition-all shadow-lg relative z-10">
                  Post Premium Job
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>


      {/* HOW IT WORKS (Modern Steps) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gray-50 -z-0"></div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
          <h2 className="text-4xl font-extrabold text-[#091e42] mb-20">Step-by-Step <span className="text-blue-600">to Success</span></h2>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { title: "Personal Profile", desc: "Build a data-rich profile that systems love." },
              { title: "Smart Discovery", desc: "Our AI matches your passion with the market." },
              { title: "Direct Apply", desc: "Apply with 1-click using ATS-ready formats." },
              { title: "Growth Analytics", desc: "Track progress and land your dream role." }
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 group"
              >
                <div className="w-16 h-16 mx-auto bg-[#091e42] text-white rounded-3xl flex items-center justify-center text-xl font-black mb-8 group-hover:bg-blue-600 transition-colors shadow-xl">
                  {i + 1}
                </div>
                <h3 className="text-lg font-extrabold text-[#091e42] mb-3">{step.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS / INSIGHTS SECTION */}
      <section className="py-28 bg-[#091e42] relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl px-4 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Latest Career <span className="text-blue-400">Insights</span></h2>
              <p className="text-blue-100/70 font-medium">Data-driven advice to accelerate your professional growth.</p>
            </div>
            <Link to="/blogs" className="hidden md:flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest bg-white/10 px-8 py-3 rounded-xl border border-white/10 hover:bg-white/20 transition-all">
              All Stories <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogs.map((blog, idx) => (
              <Link to={`/blog/${blog.slug}`} key={idx} className="group bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-blue-400/30 transition-all duration-500">
                <div className="h-48 overflow-hidden relative">
                  <img src={blog.thumbnail} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091e42] via-transparent to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="text-[10px] font-black text-blue-400 mb-2 uppercase tracking-widest">Industry Analysis</div>
                  <h3 className="font-extrabold text-white leading-snug mb-6 group-hover:text-blue-300 transition-colors line-clamp-2">{blog.title}</h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-white/50">
                    <MdOutlineArticle /> 6 Min Read
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA / NEWSLETTER */}
      <section className="py-5 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[64px] p-12 md:p-24 text-center text-white relative shadow-[0_40px_80px_-20px_rgba(59,130,246,0.3)]">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <FaSearch className="text-[120px]" />
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Ready to evolve?</h2>
            <p className="text-blue-100 text-lg mb-12 font-medium max-w-lg mx-auto leading-relaxed">Join 500,000+ professionals getting weekly market insights and job alerts.</p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto backdrop-blur-xl bg-white/10 p-2 rounded-3xl border border-white/20">
              <input
                type="email"
                placeholder="Work Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-8 py-5 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-400/50 shadow-inner"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-10 py-5 bg-[#091e42] text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95"
              >
                {status === 'loading' ? 'Sending...' : 'Join Now'}
              </button>
            </form>
            {status === 'success' && <p className="mt-6 text-green-300 font-black flex items-center justify-center gap-2"><FaCheckCircle /> Success! Welcome to the loop.</p>}
            {status === 'error' && <p className="mt-6 text-red-300 font-bold">Something went wrong. Let's try again.</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
