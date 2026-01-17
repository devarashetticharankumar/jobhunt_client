import React from "react";

const TemplateCorporate = ({ data }) => {
    return (
        <div className="bg-white min-h-[800px] font-serif text-gray-900">
            {/* Header: Blue Top Bar */}
            <div className="bg-[#1e3a8a] text-white p-12 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold uppercase tracking-wide mb-1">
                        {data.personalInfo.firstName} {data.personalInfo.lastName}
                    </h1>
                    {data.wantedJobTitle && (
                        <p className="text-lg text-blue-200 uppercase tracking-wider font-semibold">
                            {data.wantedJobTitle}
                        </p>
                    )}
                </div>
            </div>

            <div className="p-12 grid grid-cols-12 gap-10">
                {/* Left Column (Main) */}
                <div className="col-span-8 space-y-8">
                    {/* Summary */}
                    {data.professionalSummary && (
                        <section>
                            <h2 className="text-lg font-bold text-[#1e3a8a] uppercase border-b-2 border-[#1e3a8a] mb-3 pb-1">
                                Executive Profile
                            </h2>
                            <p className="text-sm leading-relaxed text-justify text-gray-800">
                                {data.professionalSummary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.workExperience?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-[#1e3a8a] uppercase border-b-2 border-[#1e3a8a] mb-5 pb-1">
                                Work History
                            </h2>
                            <div className="space-y-6">
                                {data.workExperience.map((exp, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold text-base text-gray-900">{exp.jobTitle}</h3>
                                            <span className="text-sm font-semibold text-gray-500">{exp.startDate} - {exp.endDate || "Present"}</span>
                                        </div>
                                        <div className="text-sm font-bold text-[#1e3a8a] mb-2">{exp.companyName}, {data.personalInfo.location || "Location"}</div>
                                        {exp.description && (
                                            <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
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
                            <h2 className="text-lg font-bold text-[#1e3a8a] uppercase border-b-2 border-[#1e3a8a] mb-5 pb-1">
                                Key Projects
                            </h2>
                            <div className="space-y-4">
                                {data.projects.map((project, idx) => (
                                    <div key={idx}>
                                        <h3 className="font-bold text-sm text-gray-900 mb-1">{project.title}</h3>
                                        <p className="text-sm text-gray-700 leading-relaxed mb-1">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Sidebar) */}
                <div className="col-span-4 bg-gray-50 p-6 -mt-6 rounded-b">
                    {/* Contact */}
                    <section className="mb-8 text-sm space-y-3">
                        <h2 className="text-base font-bold text-[#1e3a8a] uppercase mb-3">Contact</h2>
                        <div className="border-b border-gray-200 pb-2">
                            <span className="block text-xs font-bold text-gray-400 uppercase">Email</span>
                            <span className="break-all">{data.personalInfo.email}</span>
                        </div>
                        {data.personalInfo.phone && (
                            <div className="border-b border-gray-200 pb-2">
                                <span className="block text-xs font-bold text-gray-400 uppercase">Phone</span>
                                {data.personalInfo.phone}
                            </div>
                        )}
                        {data.personalInfo.location && (
                            <div className="border-b border-gray-200 pb-2">
                                <span className="block text-xs font-bold text-gray-400 uppercase">Address</span>
                                {data.personalInfo.location}
                            </div>
                        )}
                    </section>

                    {/* Core Competencies (Skills) */}
                    {data.skills?.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-base font-bold text-[#1e3a8a] uppercase mb-3">Competencies</h2>
                            <ul className="list-disc list-inside text-sm space-y-1 ml-1">
                                {data.skills.map((skill, idx) => (
                                    <li key={idx} className="text-gray-700">{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-base font-bold text-[#1e3a8a] uppercase mb-3">Education</h2>
                            <div className="space-y-4">
                                {data.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <div className="font-bold text-sm">{edu.degree}</div>
                                        <div className="text-xs text-gray-600 mb-1">{edu.institutionName}</div>
                                        <div className="text-xs text-gray-400 uppercase">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {data.certifications?.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-base font-bold text-[#1e3a8a] uppercase mb-3">Certifications</h2>
                            <div className="space-y-3">
                                {data.certifications.map((cert, idx) => (
                                    <div key={idx}>
                                        <div className="font-bold text-xs">{cert.name}</div>
                                        <div className="text-[10px] text-gray-500">{cert.organization}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages - Added */}
                    {data.languages?.length > 0 && (
                        <section className="mb-8">
                            <h2 className="text-base font-bold text-[#1e3a8a] uppercase mb-3">Languages</h2>
                            <ul className="list-disc list-inside text-sm space-y-1 ml-1">
                                {data.languages.map((lang, idx) => (
                                    <li key={idx} className="text-gray-700">{lang}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </div>

            {/* Acknowledgment - Added */}
            {data.acknowledgment && (
                <section className="px-12 pb-6 text-center">
                    <p className="text-xs italic text-gray-500">
                        {data.acknowledgment}
                    </p>
                </section>
            )}

            <footer className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest pb-8">
                Generated via JobNirvana
            </footer>
        </div>
    );
};

export default TemplateCorporate;
