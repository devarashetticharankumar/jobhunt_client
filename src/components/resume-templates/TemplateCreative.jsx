import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaLinkedin } from "react-icons/fa";

const TemplateCreative = ({ data }) => {
    return (
        <div className="flex bg-white shadow-sm min-h-[800px] rounded-lg overflow-hidden border border-gray-200">
            {/* Sidebar (Left Column) */}
            <div className="w-1/3 bg-gray-900 text-white p-6 space-y-8">

                {/* Contact Info */}
                <div className="space-y-4">
                    <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold uppercase text-teal-400">
                        {data.personalInfo.firstName[0]}{data.personalInfo.lastName[0]}
                    </div>

                    <h3 className="text-sm font-bold uppercase tracking-widest text-teal-400 border-b border-gray-700 pb-2">
                        Contact
                    </h3>
                    <div className="text-xs space-y-3">
                        <div className="flex items-center gap-3">
                            <FaEnvelope className="text-teal-400" />
                            <span className="break-all">{data.personalInfo.email}</span>
                        </div>
                        {data.personalInfo.phone && (
                            <div className="flex items-center gap-3">
                                <FaPhone className="text-teal-400" />
                                <span>{data.personalInfo.phone}</span>
                            </div>
                        )}
                        {data.personalInfo.location && (
                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-teal-400" />
                                <span>{data.personalInfo.location}</span>
                            </div>
                        )}
                        {Object.entries(data.personalInfo.socialLinks || {}).map(([key, value]) => {
                            if (!value) return null;
                            return (
                                <a
                                    key={key}
                                    href={value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 hover:text-teal-300 transition-colors capitalize"
                                >
                                    <FaGlobe className="text-teal-400" /> {key}
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Education (Moved to sidebar for creative layout) */}
                {data.education?.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-teal-400 border-b border-gray-700 pb-2">
                            Education
                        </h3>
                        <div className="space-y-4">
                            {data.education.map((edu, idx) => (
                                <div key={idx}>
                                    <h4 className="font-bold text-sm text-white">
                                        {edu.degree}
                                    </h4>
                                    <div className="text-xs text-gray-400 mb-1">{edu.institutionName}</div>
                                    <div className="text-[10px] text-teal-400 uppercase">{edu.graduationDate}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-teal-400 border-b border-gray-700 pb-2">
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="bg-gray-800 text-teal-100 text-[11px] px-2 py-1 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {data.languages?.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-teal-400 border-b border-gray-700 pb-2">
                            Languages
                        </h3>
                        <div className="space-y-1 text-xs">
                            {data.languages.map((lang, idx) => (
                                <div key={idx}>• {lang}</div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content (Right Column) */}
            <div className="w-2/3 p-8 bg-white">
                {/* Name Header */}
                <div className="mb-8">
                    <h1 className="text-5xl font-black text-gray-900 leading-tight uppercase">
                        {data.personalInfo.firstName} <br />
                        <span className="text-teal-500">{data.personalInfo.lastName}</span>
                    </h1>
                    {data.wantedJobTitle && (
                        <p className="text-xl font-medium text-gray-400 mt-2 tracking-wide uppercase">
                            {data.wantedJobTitle}
                        </p>
                    )}
                </div>

                <div className="space-y-8">
                    {/* Summary */}
                    {data.professionalSummary && (
                        <section>
                            <div className="w-12 h-1 bg-teal-500 mb-4"></div>
                            <p className="text-sm leading-relaxed text-gray-600">
                                {data.professionalSummary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.workExperience?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-black uppercase text-gray-900 mb-6 flex items-center gap-2">
                                Work Experience
                            </h2>
                            <div className="space-y-8 border-l-2 border-gray-100 pl-6 ml-2">
                                {data.workExperience.map((exp, idx) => (
                                    <div key={idx} className="relative">
                                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-teal-500 border-4 border-white"></div>
                                        <h3 className="font-bold text-lg text-gray-800">
                                            {exp.jobTitle}
                                        </h3>
                                        <div className="flex justify-between items-center text-sm mb-2">
                                            <span className="font-semibold text-teal-600">{exp.companyName}</span>
                                            <span className="text-gray-400 italic font-medium text-xs">{exp.startDate} – {exp.endDate || "Present"}</span>
                                        </div>
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
                            <h2 className="text-xl font-black uppercase text-gray-900 mb-6">
                                Projects
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {data.projects.map((project, idx) => (
                                    <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        <h3 className="font-bold text-gray-900 text-sm mb-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                                            {project.description}
                                        </p>
                                        {project.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {project.technologies.slice(0, 4).map((tech, i) => (
                                                    <span key={i} className="text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded text-gray-500">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications - Moved here if space allows, or rely on sidebar */}
                    {data.certifications?.length > 0 && (
                        <section className="mt-6">
                            <h2 className="text-sm font-bold uppercase text-gray-400 mb-3">Certifications</h2>
                            <div className="flex flex-wrap gap-4">
                                {data.certifications.map((cert, idx) => (
                                    <div key={idx} className="text-sm">
                                        <span className="font-bold text-gray-800">{cert.name}</span>
                                        <span className="text-gray-400 text-xs"> - {cert.organization}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                {/* Acknowledgment */}
                {data.acknowledgment && (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-sm italic text-gray-500">
                            {data.acknowledgment}
                        </p>
                    </div>
                )}
            </div>
            <footer className="absolute bottom-2 right-4 text-[10px] text-gray-300 font-bold uppercase tracking-widest print:text-gray-400">
                Generated via JobNirvana
            </footer>
        </div>
    );
};

export default TemplateCreative;
