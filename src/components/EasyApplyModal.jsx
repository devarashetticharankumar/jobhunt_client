import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdUploadFile, MdCheckCircle, MdSend } from "react-icons/md";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const EasyApplyModal = ({ isOpen, onClose, job }) => {
    const { user } = useAuth0();
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resume) {
            toast.error("Please upload your resume.");
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("jobId", job._id || job.id); // Handle both id formats
        formData.append("jobTitle", job.jobTitle);
        formData.append("companyName", job.companyName);
        formData.append("postedBy", job.postedBy); // Recruiter email
        formData.append("applicantName", user?.name || "Anonymous");
        formData.append("applicantEmail", user?.email);
        formData.append("coverLetter", coverLetter);
        formData.append("resume", resume);

        try {
            const response = await fetch("http://localhost:5001/applications/apply", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Application submitted successfully!");
                onClose();
            } else {
                toast.error(data.message || "Failed to submit application.");
            }
        } catch (error) {
            console.error("Application error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
                        <div>
                            <h2 className="text-xl font-bold">Easy Apply</h2>
                            <p className="text-blue-100 text-sm">Applying for {job?.jobTitle}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
                            <MdClose className="text-2xl" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                        {/* User Info (Read-only) */}
                        <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Name</span>
                                <span className="font-semibold text-gray-800">{user?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Email</span>
                                <span className="font-semibold text-gray-800">{user?.email}</span>
                            </div>
                        </div>

                        {/* Resume Upload */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Upload Resume (PDF)</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-blue-50/50 hover:border-blue-400 transition-all group relative cursor-pointer">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setResume(e.target.files[0])}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                />
                                {resume ? (
                                    <div className="flex items-center gap-2 text-green-600 font-medium">
                                        <MdCheckCircle className="text-xl" />
                                        {resume.name}
                                    </div>
                                ) : (
                                    <>
                                        <MdUploadFile className="text-4xl text-gray-300 group-hover:text-blue-500 mb-2 transition-colors" />
                                        <span className="text-sm text-gray-500">Click to browse</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Cover Letter */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Cover Letter (Optional)</label>
                            <textarea
                                value={coverLetter}
                                onChange={(e) => setCoverLetter(e.target.value)}
                                placeholder="Why are you a good fit for this role?"
                                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32 text-sm"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? "Sending..." : <>Send Application <MdSend /></>}
                        </button>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default EasyApplyModal;
