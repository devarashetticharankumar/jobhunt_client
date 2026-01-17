import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaLinkedin } from "react-icons/fa";

const TemplateMinimalist = ({ data }) => {
    return (
        <div className="bg-white p-12 shadow-sm rounded-sm min-h-[800px] font-sans text-gray-800">
            {/* Header - Left Aligned, Very Clean */}
            <header className="mb-12">
                <h1 className="text-5xl font-light text-gray-900 mb-2 tracking-tight">
                    {data.personalInfo.firstName} <span className="font-bold">{data.personalInfo.lastName}</span>
                </h1>
                {data.wantedJobTitle && (
                    <p className="text-xl text-gray-500 font-light mb-6">
                        {data.wantedJobTitle}
                    </p>
                )}

                <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-400">EMAIL</span> <span className="break-all">{data.personalInfo.email}</span>
                    </div>
                    {data.personalInfo.phone && (
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-400">PHONE</span> {data.personalInfo.phone}
                        </div>
                    )}
                    {data.personalInfo.location && (
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-400">LOC</span> {data.personalInfo.location}
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-6 mt-3 text-sm">
                    {Object.entries(data.personalInfo.socialLinks || {}).map(([key, value]) => {
                        if (!value) return null;
                        return (
                            <a
                                key={key}
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-black hover:underline capitalize"
                            >
                                {key}
                            </a>
                        );
                    })}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="md:col-span-8 space-y-10">
                    {/* Summary */}
                    {data.professionalSummary && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                                Profile
                            </h2>
                            <p className="text-sm leading-7 text-gray-700">
                                {data.professionalSummary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.workExperience?.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
                                Experience
                            </h2>
                            <div className="space-y-8">
                                {data.workExperience.map((exp, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="font-bold text-gray-900 text-lg">
                                                {exp.jobTitle}
                                            </h3>
                                            <span className="text-xs text-gray-400 font-medium">
                                                {exp.startDate} – {exp.endDate || "Present"}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-gray-800 mb-3">
                                            {exp.companyName}
                                        </div>
                                        {exp.description && (
                                            <p className="text-sm leading- relaxed text-gray-600 whitespace-pre-line">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects?.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
                                Projects
                            </h2>
                            <div className="space-y-6">
                                {data.projects.map((project, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-bold text-gray-900 text-base mb-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {project.description}
                                        </p>
                                        {project.technologies?.length > 0 && (
                                            <div className="text-xs text-gray-400 flex gap-2">
                                                {project.technologies.join(" / ")}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="md:col-span-4 space-y-10">
                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
                                Education
                            </h2>
                            <div className="space-y-6">
                                {data.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-bold text-gray-900 text-sm">
                                            {edu.degree}
                                        </h3>
                                        <div className="text-sm text-gray-600 mt-1">{edu.institutionName}</div>
                                        <div className="text-xs text-gray-400 mt-1">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx} className="text-sm text-gray-700 border-b border-gray-200 pb-0.5">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {data.languages?.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
                                Languages
                            </h2>
                            <div className="space-y-1">
                                {data.languages.map((lang, idx) => (
                                    <div key={idx} className="text-sm text-gray-700">
                                        {lang}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications?.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
                                Certifications
                            </h2>
                            <div className="space-y-3">
                                {data.certifications.map((cert, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-bold text-gray-900 text-xs">
                                            {cert.name}
                                        </h3>
                                        <div className="text-xs text-gray-500">{cert.organization}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                    {/* Acknowledgment */}
                    {data.acknowledgment && (
                        <section>
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">
                                Note
                            </h2>
                            <p className="text-xs italic text-gray-600">
                                {data.acknowledgment}
                            </p>
                        </section>
                    )}
                </div>
            </div>

            <footer className="mt-16 pt-8 border-t border-gray-100 text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                Generated via JobNirvana
            </footer>
        </div>
    );
};

export default TemplateMinimalist;
