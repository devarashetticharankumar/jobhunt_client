import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdNotificationsActive, MdClose, MdEmail } from "react-icons/md";
import { API_URL } from "../data/apiPath";
import { toast } from "react-toastify";

const JobAlertModal = ({ isOpen, onClose, jobTitle, skills }) => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/subscriptions/subscribe-alerts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    jobRole: jobTitle,
                    skills: skills?.map(s => typeof s === 'object' ? s.label : s) || []
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                setEmail("");
                onClose();
            } else {
                toast.error(data.message || "Failed to subscribe");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white text-center relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <MdClose className="text-xl" />
                        </button>
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30">
                            <MdNotificationsActive className="text-4xl" />
                        </div>
                        <h2 className="text-2xl font-bold mb-1">Get Job Alerts</h2>
                        <p className="text-indigo-100 text-sm px-4">
                            Stay updated specifically for <br />
                            <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded-md mt-1 inline-block border border-white/20">
                                {jobTitle}
                            </span>
                        </p>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
                                <div className="relative">
                                    <MdEmail className="absolute left-3 top-3.5 text-gray-400 text-xl" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    "Activate Alerts"
                                )}
                            </button>

                            <p className="text-xs text-center text-gray-400">
                                You can unsubscribe at any time.
                            </p>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default JobAlertModal;
