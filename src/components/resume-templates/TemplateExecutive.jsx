import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaLinkedin } from "react-icons/fa";

const TemplateExecutive = ({ data }) => {
    return (
        <div className="bg-slate-50 p-0 shadow-xl min-h-[800px] font-serif text-gray-900 flex flex-col">
            {/* Header - Distinctive Dark Top */}
            <header className="bg-slate-900 text-white p-12 text-center">
                <h1 className="text-4xl font-bold uppercase tracking-widest mb-3">
                    {data.personalInfo.firstName} {data.personalInfo.lastName}
                </h1>
                {data.wantedJobTitle && (
                    <p className="text-xl text-slate-300 font-light uppercase tracking-wide">
                        {data.wantedJobTitle}
                    </p>
                )}
            </header>

            {/* Contact Bar */}
            <div className="bg-slate-200 py-3 px-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-slate-700 border-b border-slate-300">
                <span className="font-semibold">{data.personalInfo.email}</span>
                {data.personalInfo.phone && <span className="font-semibold">• {data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span className="font-semibold">• {data.personalInfo.location}</span>}
                {Object.entries(data.personalInfo.socialLinks || {}).map(([key, value]) => (
                    value && (
                        <a key={key} href={value} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 capitalize">
                            • {key}
                        </a>
                    )
                ))}
            </div>

            <div className="p-12 space-y-8 flex-grow">
                {/* Summary */}
                {data.professionalSummary && (
                    <section>
                        <h2 className="text-xl font-bold uppercase text-slate-800 border-b-2 border-slate-800 mb-4 pb-1">
                            Executive Profile
                        </h2>
                        <p className="text-justify leading-relaxed text-slate-700 text-base">
                            {data.professionalSummary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.workExperience?.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold uppercase text-slate-800 border-b-2 border-slate-800 mb-6 pb-1">
                            Professional Experience
                        </h2>
                        <div className="space-y-8">
                            {data.workExperience.map((exp, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-slate-900">
                                            {exp.jobTitle}
                                        </h3>
                                        <span className="text-sm font-bold text-slate-600">
                                            {exp.startDate} – {exp.endDate || "Present"}
                                        </span>
                                    </div>
                                    <div className="text-base font-semibold text-slate-700 italic mb-2">
                                        {exp.companyName}
                                    </div>
                                    {exp.description && (
                                        <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-800 mb-4 pb-1">
                                Education
                            </h2>
                            <div className="space-y-4">
                                {data.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-bold text-base text-slate-900">{edu.degree}</h3>
                                        <div className="text-sm text-slate-700">{edu.institutionName}</div>
                                        <div className="text-xs text-slate-500 font-bold uppercase mt-1">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-800 mb-4 pb-1">
                                Core Competencies
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx} className="bg-slate-200 text-slate-800 px-3 py-1 text-sm font-semibold rounded-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Languages - Added */}
                    {data.languages?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-800 mb-4 pb-1">
                                Languages
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {data.languages.join(", ")}
                            </div>
                        </section>
                    )}

                    {/* Certifications - Added */}
                    {data.certifications?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-800 mb-4 pb-1">
                                Certifications
                            </h2>
                            <div className="space-y-2">
                                {data.certifications.map((cert, idx) => (
                                    <div key={idx}>
                                        <div className="font-bold text-sm text-slate-900">{cert.name}</div>
                                        <div className="text-xs text-slate-500">{cert.organization}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Projects */}
                {data.projects?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase text-slate-800 border-b-2 border-slate-800 mb-4 pb-1">
                            Key Initiatives
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            {data.projects.map((project, idx) => (
                                <div key={idx}>
                                    <h3 className="font-bold text-base text-slate-900 mb-1">{project.title}</h3>
                                    <p className="text-sm text-slate-700 mb-1">{project.description}</p>
                                    {project.technologies?.length > 0 && (
                                        <span className="text-xs text-slate-500 italic">Example Tech: {project.technologies.join(", ")}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Acknowledgment - Added */}
                {data.acknowledgment && (
                    <section className="text-center pt-4 border-t border-slate-200">
                        <p className="text-sm italic text-slate-600">
                            {data.acknowledgment}
                        </p>
                    </section>
                )}
            </div>

            <footer className="py-6 bg-slate-100 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest border-t border-slate-200">
                Generated via JobNirvana
            </footer>
        </div>
    );
};

export default TemplateExecutive;
