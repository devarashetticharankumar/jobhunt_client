import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../data/apiPath";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph } from "docx";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import { FaDownload, FaFilePdf, FaFileWord, FaEdit, FaChevronLeft } from "react-icons/fa";
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
