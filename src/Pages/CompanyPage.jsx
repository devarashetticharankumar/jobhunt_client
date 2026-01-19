import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FaStar, FaRegStar } from "react-icons/fa";
import { MdWork, MdRateReview, MdVerified } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import { toast, ToastContainer } from "react-toastify";

const CompanyPage = () => {
    const { companyName } = useParams();
    const { user, isAuthenticated, loginWithRedirect } = useAuth0();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("jobs"); // 'jobs' or 'reviews'

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
                fetchCompanyData(); // Refresh data
            } else {
                toast.error("Failed to post review");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div></div>;

    if (!data) return <div className="text-center py-20">Company not found.</div>;

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} className={`text-lg ${i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}`}>
                ★
            </span>
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Helmet>
                <title>{data.companyName} Careers, Reviews & Salaries | JobNirvana</title>
                <meta name="description" content={`Explore careers at ${data.companyName}. Read employee reviews, view active job openings, and check salary insights on JobNirvana.`} />
                <meta property="og:title" content={`${data.companyName} Careers & Reviews | JobNirvana`} />
                <meta property="og:description" content={`See what it's like to work at ${data.companyName}. Browse ${data.activeJobs.length} active jobs and read employee reviews.`} />
                <meta property="og:image" content={data.companyInfo?.logo || "/default-logo.png"} />
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <ToastContainer />

            {/* Hero Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-center gap-8"
                    >
                        <div className="w-32 h-32 bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center border border-gray-100">
                            {/* Assuming logo is available in data.companyInfo or we use first job's logo */}
                            <img src={data.companyInfo?.logo || "/default-logo.png"} alt={data.companyName} className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center md:justify-start gap-2">
                                {data.companyName}
                                <MdVerified className="text-blue-500 text-2xl" />
                            </h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-600">
                                <div className="flex items-center gap-1">
                                    <span className="font-bold text-gray-900 text-lg">{data.averageRating}</span>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className={i < Math.round(data.averageRating) ? "text-yellow-400" : "text-gray-300"} />
                                        ))}
                                    </div>
                                    <span className="text-sm">({data.reviewCount} Reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MdWork className="text-blue-600" />
                                    <span className="font-bold text-gray-900">{data.activeJobs.length}</span> Active Jobs
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => document.getElementById("review-form")?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg flex items-center gap-2"
                            >
                                <MdRateReview /> Write a Review
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                    <button
                        onClick={() => setActiveTab("jobs")}
                        className={`px-8 py-4 font-semibold text-lg border-b-2 transition-colors ${activeTab === "jobs" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                    >
                        Active Jobs ({data.activeJobs.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`px-8 py-4 font-semibold text-lg border-b-2 transition-colors ${activeTab === "reviews" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                    >
                        Employee Reviews ({data.reviewCount})
                    </button>
                </div>

                {activeTab === "jobs" ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {data.activeJobs.length > 0 ? (
                            data.activeJobs.map(job => (
                                <Link to={`/job/${job._id}`} key={job._id} className="block group">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all">
                                        <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 mb-2">{job.jobTitle}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                            <span>Rs. {job.minPrice}-{job.maxPrice}k</span>
                                            <span>•</span>
                                            <span>{job.jobLocation}</span>
                                            <span>•</span>
                                            <span>{job.employmentType}</span>
                                        </div>
                                        <span className="text-blue-600 font-medium text-sm group-hover:underline">View Details →</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-500">No active jobs found.</p>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Reviews List */}
                        <div className="flex-1 space-y-6">
                            {data.reviews.length > 0 ? (
                                data.reviews.map(review => (
                                    <div key={review._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                                                    {review.reviewerName?.charAt(0) || "U"}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{review.reviewerName || "Anonymous"}</h4>
                                                    <div className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                            <div className="flex">{renderStars(review.rating)}</div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{review.reviewText}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
                                    <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
                                </div>
                            )}
                        </div>

                        {/* Review Form */}
                        <div className="w-full md:w-1/3">
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 sticky top-4" id="review-form">
                                <h3 className="font-bold text-xl text-gray-900 mb-4">Write a Review</h3>
                                {!isAuthenticated ? (
                                    <div className="text-center py-6">
                                        <p className="text-gray-600 mb-4">Please log in to post a review.</p>
                                        <button onClick={() => loginWithRedirect()} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Log In</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Rating</label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <button
                                                        type="button"
                                                        key={star}
                                                        onClick={() => setUserRating(star)}
                                                        className="text-2xl focus:outline-none transform hover:scale-110 transition"
                                                    >
                                                        {star <= userRating ? <FaStar className="text-yellow-400" /> : <FaRegStar className="text-gray-300" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Your Experience</label>
                                            <textarea
                                                value={reviewText}
                                                onChange={(e) => setReviewText(e.target.value)}
                                                placeholder="Share your experience working here..."
                                                required
                                                className="w-full p-4 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-32"
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 transition disabled:opacity-70"
                                        >
                                            {isSubmitting ? "Posting..." : "Post Review"}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyPage;
