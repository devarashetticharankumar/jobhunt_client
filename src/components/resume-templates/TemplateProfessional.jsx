import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from "react-icons/fa";

const TemplateProfessional = ({ data }) => {
    return (
        <div className="bg-white p-8 shadow-sm rounded-sm border border-gray-200 min-h-[800px] font-serif text-gray-900">
            {/* Header - Center Aligned, Classic */}
            <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
                    {data.personalInfo.firstName} {data.personalInfo.lastName}
                </h1>
                {data.wantedJobTitle && (
                    <p className="text-lg font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                        {data.wantedJobTitle}
                    </p>
                )}

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-700">
                    <span className="flex items-center gap-2">
                        {data.personalInfo.email}
                    </span>
                    {data.personalInfo.phone && (
                        <span className="flex items-center gap-2">
                            | {data.personalInfo.phone}
                        </span>
                    )}
                    {data.personalInfo.location && (
                        <span className="flex items-center gap-2">
                            | {data.personalInfo.location}
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm">
                    {Object.entries(data.personalInfo.socialLinks || {}).map(([key, value]) => {
                        if (!value) return null;
                        return (
                            <a
                                key={key}
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-black hover:underline capitalize"
                            >
                                {key}
                            </a>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6">
                {/* Summary */}
                {data.professionalSummary && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">
                            Professional Summary
                        </h2>
                        <p className="text-[14px] leading-normal text-justify">
                            {data.professionalSummary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.workExperience?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4 pb-1">
                            Work Experience
                        </h2>
                        <div className="space-y-5">
                            {data.workExperience.map((exp, idx) => (
                                <div key={idx} className="relative">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h3 className="font-bold text-[16px]">
                                                {exp.jobTitle}
                                            </h3>
                                            <div className="text-[14px] italic font-semibold text-gray-700">
                                                {exp.companyName}
                                            </div>
                                        </div>
                                        <span className="text-[13px] font-medium text-gray-600">
                                            {exp.startDate} – {exp.endDate || "Present"}
                                        </span>
                                    </div>
                                    {exp.description && (
                                        <p className="text-[14px] leading-relaxed text-gray-800 whitespace-pre-line mt-1">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4 pb-1">
                            Education
                        </h2>
                        <div className="space-y-3">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-[15px]">
                                            {edu.degree}
                                        </h3>
                                        <div className="text-[14px] italic">{edu.institutionName}</div>
                                    </div>
                                    <span className="text-[13px] text-gray-600">{edu.graduationDate}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Languages (2 Col) */}
                <div className="grid grid-cols-2 gap-8">
                    {data.skills?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">
                                Skills
                            </h2>
                            <div className="text-[14px] leading-relaxed">
                                {data.skills.join(", ")}
                            </div>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-3 pb-1">
                                Languages
                            </h2>
                            <div className="text-[14px] leading-relaxed">
                                {data.languages.join(", ")}
                            </div>
                        </section>
                    )}
                </div>

                {/* Certifications & Projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.projects?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4 pb-1">
                                Key Projects
                            </h2>
                            <div className="space-y-4">
                                {data.projects.map((project, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-bold text-[14px] mb-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-[13px] leading-relaxed mb-1">
                                            {project.description}
                                        </p>
                                        {project.technologies?.length > 0 && (
                                            <p className="text-[12px] italic text-gray-600">
                                                Tech: {project.technologies.join(", ")}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.certifications?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b border-gray-400 mb-4 pb-1">
                                Certifications
                            </h2>
                            <div className="space-y-3">
                                {data.certifications.map((cert, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-bold text-[14px]">
                                            {cert.name}
                                        </h3>
                                        <div className="text-[13px] italic">{cert.organization} | {cert.date}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Acknowledgment */}
                {data.acknowledgment && (
                    <section className="mt-8 pt-6 border-t border-gray-300 text-center">
                        <p className="text-[14px] italic text-gray-600">
                            {data.acknowledgment}
                        </p>
                    </section>
                )}
            </div>
            <footer className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Generated via JobNirvana
            </footer>
        </div >
    );
};

export default TemplateProfessional;
