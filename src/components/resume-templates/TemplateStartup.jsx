import React from "react";
import { FaRocket, FaCode, FaLaptop } from "react-icons/fa";

const TemplateStartup = ({ data }) => {
    return (
        <div className="bg-white p-8 min-h-[800px] font-sans text-gray-800">
            {/* Header - Startup Vibe */}
            <header className="flex items-center justify-between mb-12 border-b-2 border-indigo-500 pb-6">
                <div>
                    <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-2">
                        {data.personalInfo.firstName} <span className="text-indigo-600">{data.personalInfo.lastName}</span>
                    </h1>
                    {data.wantedJobTitle && (
                        <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                            {data.wantedJobTitle}
                        </div>
                    )}
                </div>
                <div className="text-right text-sm space-y-1 font-medium text-gray-500">
                    <div>{data.personalInfo.email}</div>
                    <div>{data.personalInfo.phone}</div>
                    <div>{data.personalInfo.location}</div>
                    <div className="flex gap-3 justify-end pt-2">
                        {Object.entries(data.personalInfo.socialLinks || {}).map(([key, value]) => (
                            value && <a key={key} href={value} className="text-gray-400 hover:text-indigo-600 transition-colors uppercase text-xs font-bold">{key}</a>
                        ))}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-10">
                {/* Left Col (Main) */}
                <div className="col-span-8 space-y-10">
                    {/* Summary */}
                    {data.professionalSummary && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-1 bg-indigo-500 rounded"></span> About
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-600 font-light">
                                {data.professionalSummary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.workExperience?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-indigo-500 rounded"></span> Experience
                            </h2>
                            <div className="space-y-8">
                                {data.workExperience.map((exp, idx) => (
                                    <div key={idx} className="relative pl-8 border-l-2 border-indigo-100">
                                        <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-indigo-500"></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-xl text-gray-800">{exp.companyName}</h3>
                                            <span className="text-xs font-bold uppercase text-gray-400 tracking-wide">{exp.startDate} - {exp.endDate || "Present"}</span>
                                        </div>
                                        <div className="text-indigo-600 font-bold text-sm uppercase mb-3 tracking-wide">{exp.jobTitle}</div>
                                        {exp.description && (
                                            <p className="text-sm text-gray-600 leading-relaxed">
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
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <span className="w-8 h-1 bg-indigo-500 rounded"></span> Built
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {data.projects.map((project, idx) => (
                                    <div key={idx} className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                                        <h3 className="font-bold text-lg text-gray-900 mb-2">{project.title}</h3>
                                        <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                                        {project.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 4).map((t, i) => (
                                                    <span key={i} className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Col (Sidebar) */}
                <div className="col-span-4 space-y-10">
                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase text-gray-400 tracking-widest mb-4">Stack</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx} className="bg-gray-900 text-white px-3 py-1.5 rounded text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase text-gray-400 tracking-widest mb-4">Education</h2>
                            <div className="space-y-4">
                                {data.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <div className="font-bold text-gray-900">{edu.degree}</div>
                                        <div className="text-sm text-gray-500">{edu.institutionName}</div>
                                        <div className="text-xs font-bold text-indigo-500 mt-1">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {data.languages?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase text-gray-400 tracking-widest mb-4">Languages</h2>
                            <div className="space-y-1 font-medium text-gray-800">
                                {data.languages.map((lang, idx) => (
                                    <div key={idx}>{lang}</div>
                                ))}
                            </div>
                        </section>
                    )}
                    {data.certifications?.length > 0 && (
                        <section>
                            <h2 className="text-sm font-bold uppercase text-gray-400 tracking-widest mb-4">Certifications</h2>
                            <div className="space-y-3">
                                {data.certifications.map((cert, idx) => (
                                    <div key={idx}>
                                        <div className="font-bold text-gray-900 text-sm">{cert.name}</div>
                                        <div className="text-xs text-gray-500">{cert.organization}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Acknowledgment */}
            {data.acknowledgment && (
                <section className="mt-12 pt-6 border-t border-gray-100 text-center">
                    <p className="text-xs italic text-gray-400">
                        {data.acknowledgment}
                    </p>
                </section>
            )}

            <footer className="mt-16 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
                Generated via JobNirvana
            </footer>
        </div>
    );
};

export default TemplateStartup;
