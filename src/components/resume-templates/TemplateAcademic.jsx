import React from "react";

const TemplateAcademic = ({ data }) => {
    return (
        <div className="bg-white p-12 min-h-[800px] font-serif text-gray-900">
            {/* Header - Traditional Centered */}
            <header className="text-center mb-8 border-b border-gray-300 pb-4">
                <h1 className="text-3xl font-bold mb-2">
                    {data.personalInfo.firstName} {data.personalInfo.lastName}
                </h1>

                <div className="text-sm text-gray-700 flex flex-col items-center gap-1">
                    <div>
                        {data.personalInfo.location || "Location not provided"} • {data.personalInfo.email} • {data.personalInfo.phone}
                    </div>
                    <div className="flex gap-4">
                        {Object.entries(data.personalInfo.socialLinks || {}).map(([key, value]) => (
                            value && (
                                <a key={key} href={value} className="text-blue-800 hover:underline capitalize">
                                    {key}
                                </a>
                            )
                        ))}
                    </div>
                </div>
            </header>

            <div className="space-y-6">
                {/* Education First for Academic */}
                {data.education?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3">
                            Education
                        </h2>
                        <div className="space-y-4">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="flex justify-between">
                                    <div>
                                        <div className="font-bold text-base">{edu.institutionName}</div>
                                        <div className="italic text-sm">{edu.degree}</div>
                                        {edu.coursework && edu.coursework.length > 0 && (
                                            <div className="text-xs text-gray-600 mt-1">Relevant Coursework: {edu.coursework.join(", ")}</div>
                                        )}
                                    </div>
                                    <div className="text-sm font-medium">{edu.graduationDate}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Research/Projects Interests */}
                {data.projects?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3">
                            Research & Projects
                        </h2>
                        <div className="space-y-4">
                            {data.projects.map((project, idx) => (
                                <div key={idx}>
                                    <div className="font-bold text-base mb-1">{project.title}</div>
                                    <p className="text-sm text-gray-800 leading-relaxed text-justify">
                                        {project.description}
                                    </p>
                                    {project.technologies?.length > 0 && (
                                        <div className="text-xs text-gray-600 italic mt-1">Tools: {project.technologies.join(", ")}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {data.workExperience?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3">
                            Professional Experience
                        </h2>
                        <div className="space-y-5">
                            {data.workExperience.map((exp, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-base">{exp.companyName}</h3>
                                        <span className="text-sm italic">{exp.startDate} – {exp.endDate || "Present"}</span>
                                    </div>
                                    <div className="italic text-sm mb-1">{exp.jobTitle}</div>
                                    {exp.description && (
                                        <ul className="list-disc list-inside text-sm text-gray-800 pl-2">
                                            {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line}</li>)}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Langs */}
                {(data.skills?.length > 0 || data.languages?.length > 0) && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3">
                            Skills & Languages
                        </h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {data.skills?.length > 0 && (
                                <div>
                                    <span className="font-bold">Technical Skills:</span> {data.skills.join(", ")}
                                </div>
                            )}
                            {data.languages?.length > 0 && (
                                <div>
                                    <span className="font-bold">Languages:</span> {data.languages.join(", ")}
                                </div>
                            )}
                        </div>
                    </section>
                )}
                {/* Certifications - Added */}
                {data.certifications?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3">
                            Certifications
                        </h2>
                        <div className="space-y-3">
                            {data.certifications.map((cert, idx) => (
                                <div key={idx}>
                                    <div className="font-bold text-base">{cert.name}</div>
                                    <div className="text-sm italic text-gray-700">{cert.organization} | {cert.date}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Acknowledgment */}
                {data.acknowledgment && (
                    <section className="mt-6 pt-4 border-t border-gray-300">
                        <p className="text-sm italic text-gray-600">
                            {data.acknowledgment}
                        </p>
                    </section>
                )}
            </div>

            <footer className="mt-8 pt-4 border-t border-gray-200 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                Generated via JobNirvana
            </footer>
        </div>
    );
};

export default TemplateAcademic;
