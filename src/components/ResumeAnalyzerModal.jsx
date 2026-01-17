import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose, MdUploadFile, MdDescription, MdCheckCircle, MdWarning, MdLightbulbOutline, MdAutoAwesome } from "react-icons/md";
import { API_URL } from "../data/apiPath";
import { toast } from "react-toastify";

const ResumeAnalyzerModal = ({ isOpen, onClose, jobTitle, jobDescription }) => {
    const [activeTab, setActiveTab] = useState("upload"); // 'upload' or 'text'
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleAnalyze = async () => {
        if (!file && !text.trim()) {
            setError("Please provide a resume to analyze.");
            return;
        }
        setIsLoading(true);
        setError("");
        setResult(null);

        const formData = new FormData();
        formData.append("jobTitle", jobTitle);
        formData.append("jobDescription", jobDescription);
        if (file) {
            formData.append("resume", file);
        } else {
            formData.append("resumeText", text);
        }

        try {
            // Note: Using a direct fetch to the AI endpoint. 
            // Ensure your API_URL points to the backend (e.g., http://localhost:5001)
            const response = await fetch(`${API_URL}/ai/analyze-resume`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Analysis failed. Please try again.");
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error(err);
            const errorMessage = err.message || "Something went wrong.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const scoreColor = (score) => {
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const progressCircle = (score) => {
        const radius = 30;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (score / 100) * circumference;

        return (
            <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                    />
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className={scoreColor(score)}
                        strokeLinecap="round"
                    />
                </svg>
                <span className={`absolute text-xl font-bold ${scoreColor(score)}`}>{score}%</span>
            </div>
        )
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center text-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <MdAutoAwesome className="text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">AI Resume Scorer</h2>
                                <p className="text-blue-100 text-sm">See how well you match this job!</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
                            <MdClose className="text-2xl" />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                        {!result ? (
                            <>
                                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                                    <button
                                        onClick={() => { setActiveTab("upload"); setFile(null); }}
                                        className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === "upload" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                            }`}
                                    >
                                        Upload PDF
                                    </button>
                                    <button
                                        onClick={() => { setActiveTab("text"); setText(""); }}
                                        className={`flex-1 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === "text" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                            }`}
                                    >
                                        Paste Text
                                    </button>
                                </div>

                                {activeTab === "upload" ? (
                                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-blue-50/50 hover:border-blue-400 transition-all group">
                                        <MdUploadFile className="text-6xl text-gray-300 group-hover:text-blue-500 mb-4 transition-colors" />
                                        <p className="text-gray-600 font-medium mb-2">Drag & Drop or Click to Upload</p>
                                        <p className="text-gray-400 text-sm">Supported Format: PDF (Max 5MB)</p>
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        {file && (
                                            <div className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold flex items-center gap-2">
                                                <MdCheckCircle /> {file.name}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <textarea
                                        className="w-full h-48 p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm bg-gray-50"
                                        placeholder="Paste your resume content here..."
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    ></textarea>
                                )}

                                {error && (
                                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center gap-2 text-red-600 text-sm font-semibold animate-pulse">
                                        <MdWarning className="text-xl shrink-0" />
                                        {error}
                                    </div>
                                )}

                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={handleAnalyze}
                                        disabled={isLoading}
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center gap-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>Analyze My Resume <MdAutoAwesome /></>
                                        )}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="flex items-center gap-8 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                    {progressCircle(result.score)}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Match Score Analysis</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{result.match_summary}</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="flex items-center gap-2 font-bold text-green-700 mb-3">
                                            <MdCheckCircle /> Matching Skills
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {result.matching_skills?.map((skill, i) => (
                                                <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="flex items-center gap-2 font-bold text-red-600 mb-3">
                                            <MdWarning /> Missing / To Improve
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {result.missing_skills?.map((skill, i) => (
                                                <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                                    <h4 className="flex items-center gap-2 font-bold text-yellow-800 mb-4">
                                        <MdLightbulbOutline className="text-xl" /> AI Improvement Tips
                                    </h4>
                                    <ul className="space-y-3">
                                        {result.improvement_tips?.map((tip, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                                <span className="mt-1.5 w-1.5 h-1.5 bg-yellow-400 rounded-full shrink-0"></span>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        onClick={() => setResult(null)}
                                        className="text-gray-500 font-semibold hover:text-gray-800 transition px-6 py-2"
                                    >
                                        Analyze Another
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="ml-4 px-6 py-2 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ResumeAnalyzerModal;
