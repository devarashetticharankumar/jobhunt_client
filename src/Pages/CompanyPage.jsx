import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { Helmet } from "react-helmet-async";
import { FaStar, FaRegStar, FaMapMarkerAlt, FaBriefcase, FaBuilding } from "react-icons/fa";
import { MdVerified, MdRateReview, MdWork, MdPeople } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import { toast, ToastContainer } from "react-toastify";
import InArticleAd from "../components/InArticleAd";

const CompanyPage = () => {
    const { companyName } = useParams();
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("jobs"); // 'about', 'jobs', 'reviews'

    // Review Form State
    const [userRating, setUserRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchCompanyData();
    }, [companyName]);

    const fetchCompanyData = async () => {
        try {
            const response = await fetch(`${API_URL}/reviews/${encodeURIComponent(companyName)}`);
            if (!response.ok) throw new Error("Failed to fetch");
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return loginWithRedirect();

        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_URL}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    companyName,
                    rating: userRating,
                    reviewText,
                    reviewerName: user.name,
                    reviewerEmail: user.email
                })
            });

            if (response.ok) {
                toast.success("Review posted successfully!");
                setReviewText("");
                fetchCompanyData();
            } else {
                toast.error("Failed to post review");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateTimeAgo = (dateString) => {
        const postedDate = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - postedDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) return "1 day ago";
        if (diffDays < 30) return `${diffDays} days ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    };

    if (isLoading) return <div className="min-h-screen flex justify-center items-center"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;

    if (!data) return <div className="text-center py-20 text-gray-500">Company not found.</div>;

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#17171d] pb-20">
            <Helmet>
                <title>{data.companyName} Careers & Reviews | JobNirvana</title>
                <meta name="description" content={`Explore careers at ${data.companyName}. View active jobs, employee reviews, and company culture.`} />
            </Helmet>
            <ToastContainer />

            {/* HEADER HEADER */}
            <div className="bg-white shadow-[0_1px_4px_rgba(0,0,0,0.08)] mb-6">
                {/* Cover Image Placeholder (Optional) */}
                <div className="h-32 md:h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="max-w-[1240px] mx-auto px-4 pb-6">
                    <div className="flex flex-col md:flex-row items-end gap-6 -mt-12 mb-6">
                        {/* Logo */}
                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl shadow-lg border border-gray-100 p-2 flex items-center justify-center relative z-10">
                            <img src={data.companyInfo?.logo || "/default-logo.png"} alt={data.companyName} className="max-w-full max-h-full object-contain" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 md:mb-2">
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl md:text-3xl font-bold text-[#091e42]">{data.companyName}</h1>
                                <MdVerified className="text-blue-500 text-xl" />
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <FaBuilding />
                                    <span>Internet & Tech</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <FaMapMarkerAlt />
                                    <span>{data.activeJobs[0]?.jobLocation?.split(',')[0] || "Global"}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MdPeople />
                                    <span>10k+ Employees</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 md:mb-3">
                            <button onClick={() => document.getElementById("review-form")?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 font-bold text-sm hover:bg-blue-50 transition">
                                Write Review
                            </button>
                            <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition shadow-sm">
                                Follow
                            </button>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-8 border-t border-gray-100 pt-4 hidden md:flex">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-orange-500 font-bold text-xl">
                                <FaStar /> <span>{data.averageRating}</span>
                            </div>
                            <span className="text-sm text-gray-500">({data.reviewCount} Reviews)</span>
                        </div>
                        <div className="h-8 w-[1px] bg-gray-200"></div>
                        <div className="flex flex-col">
                            <span className="font-bold text-gray-900 leading-none">{data.activeJobs.length}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Active Jobs</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="max-w-[1240px] mx-auto px-4 flex flex-col lg:flex-row gap-6">

                {/* LEFT CONTENT */}
                <div className="w-full lg:w-[68%]">

                    {/* Tabs */}
                    <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] mb-6 overflow-hidden sticky top-[72px] z-20">
                        <div className="flex border-b border-gray-100">
                            <button onClick={() => setActiveTab("about")} className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition ${activeTab === "about" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-800"}`}>About</button>
                            <button onClick={() => setActiveTab("jobs")} className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition ${activeTab === "jobs" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-800"}`}>Jobs ({data.activeJobs.length})</button>
                            <button onClick={() => setActiveTab("reviews")} className={`flex-1 py-4 text-sm font-bold text-center border-b-2 transition ${activeTab === "reviews" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-800"}`}>Reviews ({data.reviewCount})</button>
                        </div>
                    </div>

                    {activeTab === "jobs" && (
                        <div className="space-y-4">
                            {data.activeJobs.length > 0 ? (
                                data.activeJobs.map(job => (
                                    <Link to={`/job/${job._id}`} key={job._id} className="block bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-5 hover:shadow-md transition card-hover-effect border border-transparent hover:border-blue-100">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-lg text-[#091e42] mb-1">{job.jobTitle}</h3>
                                                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                                                    <span className="flex items-center gap-1"><FaBriefcase /> {job.experienceLevel || "0-5 Yrs"}</span>
                                                    <span>|</span>
                                                    <span className="flex items-center gap-1"><FaMapMarkerAlt /> {job.jobLocation}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                                    <span className="bg-gray-50 px-2 py-1 rounded">{job.employmentType}</span>
                                                    <span className="bg-gray-50 px-2 py-1 rounded">Posted: {calculateTimeAgo(job.createdAt)}</span>
                                                </div>
                                            </div>
                                            {job.companyLogo && <img src={job.companyLogo} className="w-12 h-12 object-contain border border-gray-100 rounded p-1" alt="logo" />}
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-10 bg-white rounded-xl border border-dashed text-gray-500">No active jobs found.</div>
                            )}
                            <div className="my-6"><InArticleAd /></div>
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div className="space-y-6">
                            {/* Review List */}
                            {data.reviews.map(review => (
                                <div key={review._id} className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-6">
                                    <div className="flex justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">{review.reviewerName?.charAt(0)}</div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{review.reviewerName}</h4>
                                                <div className="flex text-yellow-400 text-xs">
                                                    {[...Array(5)].map((_, i) => <FaStar key={i} className={i < Math.round(review.rating) ? "text-yellow-400" : "text-gray-200"} />)}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">"{review.reviewText}"</p>
                                </div>
                            ))}

                            {/* Write Review Form */}
                            <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-6" id="review-form">
                                <h3 className="font-bold text-lg text-[#091e42] mb-4">Write a Review</h3>
                                {!isAuthenticated ? (
                                    <div className="text-center bg-gray-50 rounded-lg p-6">
                                        <p className="text-sm text-gray-600 mb-4">Please log in to share your experience.</p>
                                        <button onClick={() => loginWithRedirect()} className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold">Log In</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Rate Company</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button type="button" key={star} onClick={() => setUserRating(star)} className="text-2xl hover:scale-110 transition">
                                                        {star <= userRating ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray-300" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">Your Review</label>
                                            <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} className="w-full p-4 border border-gray-200 rounded-xl text-sm focus:border-blue-500 outline-none h-32" placeholder="What's it like working here?" required></textarea>
                                        </div>
                                        <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-sm hover:bg-blue-700 transition disabled:opacity-70">Post Review</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "about" && (
                        <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-6 md:p-8">
                            <h2 className="text-lg font-bold text-[#091e42] mb-4">About {data.companyName}</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {data.companyInfo?.description || `${data.companyName} is a leading company in the Technology sector. We are committed to innovation and excellence. Join us to build the future.`}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase font-bold mb-1">Headquarters</span>
                                    <span className="text-gray-800 font-medium">{data.activeJobs[0]?.jobLocation || "Global"}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase font-bold mb-1">Employees</span>
                                    <span className="text-gray-800 font-medium">10,000+</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-400 uppercase font-bold mb-1">Website</span>
                                    <a href="#" className="text-blue-600 font-medium hover:underline">Visit Website</a>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* RIGHT SIDEBAR */}
                <div className="w-full lg:w-[32%] space-y-6">
                    {/* Benefits / Why Join Us */}
                    <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-6">
                        <h3 className="font-bold text-[#091e42] mb-4">Why Join Us?</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-start gap-3"><span className="text-green-500">✓</span> Innovation-driven culture</li>
                            <li className="flex items-start gap-3"><span className="text-green-500">✓</span> Competitive salary & benefits</li>
                            <li className="flex items-start gap-3"><span className="text-green-500">✓</span> Remote work options</li>
                            <li className="flex items-start gap-3"><span className="text-green-500">✓</span> Career growth opportunities</li>
                        </ul>
                    </div>

                    <div className="sticky top-24">
                        <InArticleAd />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CompanyPage;
