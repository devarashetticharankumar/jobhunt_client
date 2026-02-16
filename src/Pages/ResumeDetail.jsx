import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph } from "docx";
import { useAuth0 } from "@auth0/auth0-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaFilePdf, FaFileWord, FaEdit, FaChevronLeft, FaChartLine, FaCheckCircle, FaExclamationTriangle, FaLightbulb, FaSearch, FaMagic } from "react-icons/fa";
import TemplateModern from "../components/resume-templates/TemplateModern";
import TemplateProfessional from "../components/resume-templates/TemplateProfessional";
import TemplateCreative from "../components/resume-templates/TemplateCreative";
import TemplateMinimalist from "../components/resume-templates/TemplateMinimalist";
import TemplateExecutive from "../components/resume-templates/TemplateExecutive";
import TemplateSimple from "../components/resume-templates/TemplateSimple";
import TemplateAcademic from "../components/resume-templates/TemplateAcademic";
import TemplateTech from "../components/resume-templates/TemplateTech";
import TemplateDesigner from "../components/resume-templates/TemplateDesigner";
import TemplateCompact from "../components/resume-templates/TemplateCompact";
import TemplateBold from "../components/resume-templates/TemplateBold";
import TemplateCorporate from "../components/resume-templates/TemplateCorporate";
import TemplateElegant from "../components/resume-templates/TemplateElegant";
import TemplateStartup from "../components/resume-templates/TemplateStartup";
import TemplateClassic from "../components/resume-templates/TemplateClassic";

const ResumeDetail = () => {
  const { id } = useParams();
  const { getAccessTokenSilently, isAuthenticated, isLoading: authLoading } = useAuth0();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [atsData, setAtsData] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const resumeRef = useRef();

  // Fetch the resume details from the backend
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${API_URL}/resumes/resume/${id}?t=${Date.now()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
          },
        });
        const data = await response.json();

        if (response.ok) {
          setResume(data.data);
        } else {
          toast.error(data.message || "Failed to fetch resume details");
        }
      } catch (error) {
        toast.error("Error fetching resume details");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchResume();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [id, isAuthenticated, authLoading]);

  useEffect(() => {
    if (resume && resume.atsScore !== undefined) {
      setAtsData({
        score: resume.atsScore,
        breakdown: resume.atsBreakdown,
        suggestions: [] // Backend stores breakdown but we can re-analyze for fresh suggestions
      });
      setShowAnalysis(true);
    }
  }, [resume]);

  const analyzeATS = async () => {
    setAnalyzing(true);
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/ai-resume/ats-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          resumeId: id,
          jobDescription
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setAtsData(result);
        setShowAnalysis(true);
        toast.success("Resume analysis complete!");
      } else {
        toast.error(result.message || "Analysis failed");
      }
    } catch (error) {
      console.error("ATS analysis error:", error);
      toast.error("Failed to analyze resume");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!resume) {
    return <div className="text-center">Resume not found.</div>;
  }

  // Function to download as PDF in A4 size
  // Function to download as PDF (High Fidelity - Matches UI)
  const downloadPDF = async () => {
    if (!resumeRef.current) {
      toast.error("Resume content not found");
      return;
    }

    const toastId = toast.loading("Generating professional PDF...");

    try {
      // Capture the element as a canvas
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, // Good balance between quality and file size
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: resumeRef.current.scrollWidth,
        windowHeight: resumeRef.current.scrollHeight
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF("p", "mm", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // If the content is longer than one page, handle splitting
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_Resume.pdf`);
      toast.update(toastId, { render: "Resume Downloaded successfully!", type: "success", isLoading: false, autoClose: 3000 });
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.update(toastId, { render: "Failed to generate PDF. Please try again.", type: "error", isLoading: false, autoClose: 3000 });
    }
  };







  // Function to download as DOCX
  const downloadDOCX = () => {
    try {
      const children = [
        new Paragraph({
          text: `${resume.personalInfo.firstName} ${resume.personalInfo.lastName}`,
          heading: "Heading1",
          spacing: { after: 200 }
        }),
        new Paragraph({ text: `Email: ${resume.personalInfo.email || "N/A"}` }),
        new Paragraph({ text: `Phone: ${resume.personalInfo.phone || "N/A"}` }),
        new Paragraph({ text: `Location: ${resume.personalInfo.location || "N/A"}` }),
        new Paragraph({ text: "", spacing: { after: 400 } }),

        new Paragraph({ text: "Professional Summary", heading: "Heading2" }),
        new Paragraph({ text: resume.professionalSummary || "N/A", spacing: { after: 300 } }),

        new Paragraph({ text: "Work Experience", heading: "Heading2" }),
        ...(resume.workExperience || []).flatMap(exp => [
          new Paragraph({ text: `${exp.jobTitle} at ${exp.companyName}`, bullet: { level: 0 } }),
          new Paragraph({ text: `${exp.startDate} - ${exp.endDate}`, bullet: { level: 1 } }),
          new Paragraph({ text: exp.description || "", bullet: { level: 1 }, spacing: { after: 150 } }),
        ]),
        new Paragraph({ text: "", spacing: { after: 200 } }),

        new Paragraph({ text: "Education", heading: "Heading2" }),
        ...(resume.education || []).flatMap(edu => [
          new Paragraph({ text: `${edu.degree} from ${edu.institutionName} (Graduated: ${edu.graduationDate})`, bullet: { level: 0 } }),
        ]),
        new Paragraph({ text: "", spacing: { after: 200 } }),

        new Paragraph({ text: "Skills", heading: "Heading2" }),
        new Paragraph({ text: (resume.skills || []).join(", "), spacing: { after: 300 } }),

        new Paragraph({ text: "Certifications", heading: "Heading2" }),
        ...(resume.certifications || []).flatMap(cert => [
          new Paragraph({ text: `${cert.name} from ${cert.organization} (${cert.date})`, bullet: { level: 0 } }),
        ]),
        new Paragraph({ text: "", spacing: { after: 200 } }),

        new Paragraph({ text: "Projects", heading: "Heading2" }),
        ...(resume.projects || []).flatMap(proj => [
          new Paragraph({ text: `${proj.title}: ${proj.description}`, bullet: { level: 0 } }),
          new Paragraph({ text: `Technologies: ${(proj.technologies || []).join(", ")}`, bullet: { level: 1 }, spacing: { after: 150 } }),
        ]),
        new Paragraph({ text: "", spacing: { after: 200 } }),

        new Paragraph({ text: "Acknowledgment", heading: "Heading2" }),
        new Paragraph({ text: resume.acknowledgment || "N/A" }),
      ];

      const doc = new Document({
        title: `${resume.personalInfo.firstName} Resume`,
        creator: "JobNirvana",
        description: "Professional Resume generated via JobNirvana",
        sections: [{
          children: children,
        }],
      });

      Packer.toBlob(doc).then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_Resume.docx`;
        link.click();
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error("DOCX Export Error:", error);
      toast.error("Failed to generate Word document. Please ensure all data is valid.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-12 font-['Inter',sans-serif]">
      {/* Control Bar */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm">
          <Link
            to="/resume-builder"
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors font-medium"
          >
            <FaChevronLeft className="text-sm" /> My Resumes
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className={`flex items-center gap-2 px-4 py-2 ${showAnalysis ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'} rounded-xl transition-all font-semibold text-sm border border-indigo-100`}
            >
              <FaChartLine /> {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-semibold text-sm border border-red-100"
            >
              <FaFilePdf /> PDF
            </button>
            <button
              onClick={downloadDOCX}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all font-semibold text-sm border border-blue-100"
            >
              <FaFileWord /> Word
            </button>
            <Link
              to={`/create-resume?id=${id}`}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all font-semibold text-sm"
            >
              <FaEdit /> Edit
            </Link>
          </div>
        </div>
      </div>

      {/* ATS Analysis Section */}
      <AnimatePresence>
        {showAnalysis && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="max-w-4xl mx-auto px-4 mb-8 overflow-hidden"
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Score Circle */}
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={364.4}
                        strokeDashoffset={364.4 - (364.4 * (atsData?.score || 0)) / 100}
                        className={`${(atsData?.score || 0) > 70 ? 'text-green-500' : (atsData?.score || 0) > 40 ? 'text-orange-500' : 'text-red-500'} transition-all duration-1000 ease-out`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-3xl font-black text-gray-800">{atsData?.score || 0}</span>
                  </div>
                  <h3 className="font-bold text-gray-800">ATS Score</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Overall Strength</p>
                </div>

                {/* Score Breakdown */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <FaChartLine className="text-indigo-600" /> Optimization Breakdown
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(atsData?.breakdown || {
                      wordCount: 0,
                      skillsCount: 0,
                      actionVerbsCount: 0,
                      measurableAchievements: 0,
                      keywordMatch: 0
                    }).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-gray-500">
                          <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span>{value}/20</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(value / 20) * 100}%` }}
                            className={`h-full ${value >= 15 ? 'bg-green-500' : value >= 8 ? 'bg-orange-400' : 'bg-red-400'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Keyword Matcher Input */}
              <div className="mt-8 pt-8 border-t border-gray-50">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <FaSearch className="text-blue-600" /> Optimize for Job Description
                    </h4>
                    <textarea
                      placeholder="Paste the Job Description here to check for keyword matches and optimize your resume..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="w-full h-32 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm focus:bg-white focus:border-blue-300 outline-none transition-all resize-none"
                    />
                    <button
                      onClick={analyzeATS}
                      disabled={analyzing}
                      className="mt-3 w-full py-3 bg-gray-800 text-white rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {analyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FaMagic /> Analyze Matching & Score
                        </>
                      )}
                    </button>
                  </div>

                  <div className="md:w-1/3">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <FaLightbulb className="text-orange-500" /> AI Suggestions
                    </h4>
                    <div className="space-y-3">
                      {atsData?.suggestions?.length > 0 ? (
                        atsData.suggestions.map((s, i) => (
                          <div key={i} className="flex items-start gap-2 p-3 bg-blue-50/50 rounded-lg border border-blue-50 text-[11px] text-blue-700 font-medium leading-relaxed">
                            <FaCheckCircle className="mt-0.5 shrink-0" /> {s}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-400 italic">Hit analyze to see professional improvement suggestions.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Content (A4 Style) */}
      <motion.div
        ref={resumeRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-[0_0_50px_-12px_rgba(0,0,0,0.1)] rounded-sm text-gray-800 relative overflow-hidden"
      >
        <div id="resume-preview-content" className="h-full w-full">
          {(!resume.template || resume.template === "modern") && <TemplateModern data={resume} />}
          {resume.template === "professional" && <TemplateProfessional data={resume} />}
          {resume.template === "creative" && <TemplateCreative data={resume} />}
          {resume.template === "minimalist" && <TemplateMinimalist data={resume} />}
          {resume.template === "executive" && <TemplateExecutive data={resume} />}
          {resume.template === "simple" && <TemplateSimple data={resume} />}
          {resume.template === "academic" && <TemplateAcademic data={resume} />}
          {resume.template === "tech" && <TemplateTech data={resume} />}
          {resume.template === "designer" && <TemplateDesigner data={resume} />}
          {resume.template === "compact" && <TemplateCompact data={resume} />}
          {resume.template === "bold" && <TemplateBold data={resume} />}
          {resume.template === "corporate" && <TemplateCorporate data={resume} />}
          {resume.template === "elegant" && <TemplateElegant data={resume} />}
          {resume.template === "startup" && <TemplateStartup data={resume} />}
          {resume.template === "classic" && <TemplateClassic data={resume} />}
        </div>

        {/* Subtle Watermark or Print Footer */}
        <footer className="absolute bottom-4 right-8 text-[10px] text-gray-300 font-bold uppercase tracking-widest print:hidden">
          Generated via JobNirvana
        </footer>
      </motion.div>
    </div>
  );
};

export default ResumeDetail;
