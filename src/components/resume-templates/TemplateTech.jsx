import React from "react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const TemplateTech = ({ data }) => {
    return (
        <div className="bg-gray-100 p-8 min-h-[800px] font-mono text-gray-800">
            <div className="bg-white shadow-lg p-8 rounded-lg">
                {/* Header - Code Style */}
                <header className="mb-8 border-b-2 border-green-500 pb-6">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        <span className="text-green-600">&lt;</span>
                        {data.personalInfo.firstName} {data.personalInfo.lastName}
                        <span className="text-green-600">/&gt;</span>
                    </h1>
                    {data.wantedJobTitle && (
                        <p className="text-xl text-gray-600 mb-4 font-semibold">
                            {data.wantedJobTitle}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 font-medium">
                        <div className="break-all">{data.personalInfo.email}</div>
                        {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
                        {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
                        <div className="flex gap-4">
                            {Object.entries(data.personalInfo.socialLinks || {}).map(([key, value]) => (
                                value && (
                                    <a key={key} href={value} className="text-green-600 hover:underline capitalize flex items-center gap-1">
                                        {key}
                                    </a>
                                )
                            ))}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Col: Skills & Tech */}
                    <div className="md:col-span-1 space-y-8">
                        {data.skills?.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-green-500 pl-2">
                                    Tech Stack
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {data.skills.map((skill, idx) => (
                                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded border border-gray-200 font-mono">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.education?.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-green-500 pl-2">
                                    Education
                                </h2>
                                <div className="space-y-4">
                                    {data.education.map((edu, idx) => (
                                        <div key={idx} className="text-sm">
                                            <div className="font-bold">{edu.degree}</div>
                                            <div className="text-gray-600">{edu.institutionName}</div>
                                            <div className="text-gray-400 text-xs mt-1">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.languages?.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-green-500 pl-2">
                                    Languages
                                </h2>
                                <div className="text-sm space-y-1">
                                    {data.languages.map((lang, idx) => (
                                        <div key={idx}>{lang}</div>
                                    ))}
                                </div>
                            </section>
                        )}
                        {data.certifications?.length > 0 && (
                            <section>
                                <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-green-500 pl-2">
                                    Certs
                                </h2>
                                <div className="space-y-2">
                                    {data.certifications.map((cert, idx) => (
                                        <div key={idx} className="text-sm">
                                            <div className="font-bold">{cert.name}</div>
                                            <div className="text-gray-500 text-xs">{cert.organization}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Col: Exp & Projects */}
                    <div className="md:col-span-2 space-y-8">
                        {data.professionalSummary && (
                            <section className="bg-gray-50 p-4 rounded border border-gray-100">
                                <p className="text-sm leading-relaxed text-gray-700 font-sans">
                                    {data.professionalSummary}
                                </p>
                            </section>
                        )}

                        {data.workExperience?.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-green-500 text-sm">01.</span> Experience
                                </h2>
                                <div className="space-y-6">
                                    {data.workExperience.map((exp, idx) => (
                                        <div key={idx} className="relative pl-6 border-l border-gray-200">
                                            <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-green-500 rounded-full"></div>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                                                <span className="text-xs text-gray-500 font-sans">{exp.startDate} - {exp.endDate || "Present"}</span>
                                            </div>
                                            <div className="text-green-700 font-semibold text-sm mb-2 font-sans">{exp.companyName}</div>
                                            {exp.description && (
                                                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line font-sans">
                                                    {exp.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {data.projects?.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="text-green-500 text-sm">02.</span> Projects
                                </h2>
                                <div className="space-y-6">
                                    {data.projects.map((project, idx) => (
                                        <div key={idx} className="bg-gray-50 p-4 rounded border border-gray-200">
                                            <h3 className="font-bold text-base mb-1 flex justify-between">
                                                {project.title}
                                                {project.projectLink && <a href={project.projectLink} target="_blank" className="text-xs text-blue-500 hover:underline font-normal font-sans">View Project</a>}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2 font-sans">{project.description}</p>
                                            {project.technologies?.length > 0 && (
                                                <div className="text-xs text-green-600 flex gap-2 font-bold">
                                                    {project.technologies.join(" :: ")}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                <footer className="mt-12 text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest font-sans">
                    Generated via JobNirvana
                </footer>

                {data.acknowledgment && (
                    <div className="mt-4 text-center">
                        <p className="text-xs italic text-gray-400 font-mono">
                            {data.acknowledgment}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TemplateTech;
