import React from "react";
import { FaUser, FaBriefcase, FaGraduationCap, FaWrench, FaCertificate, FaProjectDiagram, FaGlobe, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const TemplateModern = ({ data }) => {
    return (
        <div className="bg-white p-8 shadow-sm rounded-lg border border-gray-100 min-h-[800px]">
            {/* Header */}
            <div className="border-b-2 border-indigo-600 pb-6 mb-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2 uppercase">
                    {data.personalInfo.firstName} {data.personalInfo.lastName}
                </h1>
                {data.wantedJobTitle && (
                    <p className="text-xl font-medium text-indigo-600 mb-4 tracking-wide">
                        {data.wantedJobTitle}
                    </p>
                )}

                <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600 font-medium">
                    <span className="flex items-center gap-2">
                        <FaEnvelope className="text-indigo-400" />
                        {data.personalInfo.email}
                    </span>
                    {data.personalInfo.phone && (
                        <span className="flex items-center gap-2">
                            <FaPhone className="text-indigo-400" />
                            {data.personalInfo.phone}
                        </span>
                    )}
                    {data.personalInfo.location && (
                        <span className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-indigo-400" />
                            {data.personalInfo.location}
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                    {Object.entries(data.personalInfo.socialLinks || {}).map(([key, value]) => {
                        if (!value) return null;
                        return (
                            <a
                                key={key}
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-indigo-500 hover:text-indigo-700 underline capitalize font-semibold flex items-center gap-1"
                            >
                                <FaGlobe /> {key}
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-8">
                {/* Summary */}
                {data.professionalSummary && (
                    <section>
                        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3 border-b border-gray-100 pb-1 flex items-center gap-2">
                            <FaBriefcase /> Professional Summary
                        </h2>
                        <p className="text-[14px] leading-relaxed text-gray-700 whitespace-pre-line">
                            {data.professionalSummary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.workExperience?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 border-b border-gray-100 pb-1 flex items-center gap-2">
                            <FaBriefcase /> Experience
                        </h2>
                        <div className="space-y-6">
                            {data.workExperience.map((exp, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900 text-[16px]">
                                            {exp.jobTitle}
                                        </h3>
                                        <span className="text-xs font-bold text-gray-500 uppercase bg-gray-50 px-2 py-0.5 rounded">
                                            {exp.startDate} — {exp.endDate || "Present"}
                                        </span>
                                    </div>
                                    <div className="text-indigo-600 font-bold text-sm mb-2">
                                        {exp.companyName}
                                    </div>
                                    {exp.description && (
                                        <p className="text-[13px] text-gray-600 leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {/* Education */}
                        {data.education?.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 border-b border-gray-100 pb-1 flex items-center gap-2">
                                    <FaGraduationCap /> Education
                                </h2>
                                <div className="space-y-4">
                                    {data.education.map((edu, idx) => (
                                        <div key={idx}>
                                            <h3 className="font-bold text-gray-900 text-sm">
                                                {edu.degree}
                                            </h3>
                                            <div className="text-gray-600 text-[13px]">{edu.institutionName}</div>
                                            <div className="text-gray-400 text-[11px] font-bold mt-1 uppercase">
                                                Graduated: {edu.graduationDate}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages */}
                        {data.languages?.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3 border-b border-gray-100 pb-1 flex items-center gap-2">
                                    <FaGlobe /> Languages
                                </h2>
                                <div className="flex flex-wrap gap-2 text-[13px] text-gray-700 font-medium">
                                    {data.languages.join(" • ")}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="space-y-8">
                        {/* Skills */}
                        {data.skills?.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3 border-b border-gray-100 pb-1 flex items-center gap-2">
                                    <FaWrench /> Skills & Expertises
                                </h2>
                                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                                    {data.skills.map((skill, idx) => (
                                        <span key={idx} className="text-[13px] text-gray-700 font-medium bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {data.certifications?.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-3 border-b border-gray-100 pb-1 flex items-center gap-2">
                                    <FaCertificate /> Certifications
                                </h2>
                                <div className="space-y-3">
                                    {data.certifications.map((cert, idx) => (
                                        <div key={idx}>
                                            <h3 className="font-bold text-gray-900 text-[13px]">
                                                {cert.name}
                                            </h3>
                                            <div className="text-gray-600 text-[12px]">{cert.organization}</div>
                                            <div className="text-gray-400 text-[10px] font-bold uppercase">{cert.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* Projects */}
                {data.projects?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 border-b border-gray-100 pb-1 flex items-center gap-2">
                            <FaProjectDiagram /> Notable Projects
                        </h2>
                        <div className="space-y-5">
                            {data.projects.map((project, idx) => (
                                <div key={idx}>
                                    <h3 className="font-bold text-gray-900 text-[15px] mb-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-[13px] text-gray-600 leading-relaxed mb-2">
                                        {project.description}
                                    </p>
                                    {project.technologies?.length > 0 && (
                                        <div className="text-[11px] font-bold text-indigo-500 uppercase flex gap-2 overflow-hidden items-center">
                                            <span className="shrink-0">Tech Stack:</span>
                                            <span className="truncate">{project.technologies.join(", ")}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Acknowledgment */}
                {data.acknowledgment && (
                    <section className="pt-8 mt-12 border-t border-gray-100 italic text-gray-500 text-xs text-center">
                        <p>{data.acknowledgment}</p>
                    </section>
                )}
            </div>

            <footer className="mt-8 text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                Generated via JobNirvana
            </footer>
        </div>
    );
};

export default TemplateModern;
