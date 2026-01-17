import React from "react";

const TemplateSimple = ({ data }) => {
    return (
        <div className="bg-white p-10 min-h-[800px] font-sans text-gray-900 border-t-8 border-blue-600">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    {data.personalInfo.firstName} {data.personalInfo.lastName}
                </h1>
                {data.wantedJobTitle && (
                    <p className="text-lg text-blue-600 font-medium mb-3">
                        {data.wantedJobTitle}
                    </p>
                )}

                <div className="text-sm text-gray-600 flex flex-wrap gap-4 py-2 border-y border-gray-100">
                    <span>{data.personalInfo.email}</span>
                    {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                    {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
                    {Object.entries(data.personalInfo.socialLinks || {}).map(([key, value]) => (
                        value && (
                            <a key={key} href={value} className="text-blue-500 hover:underline capitalize">
                                • {key}
                            </a>
                        )
                    ))}
                </div>
            </header>

            <div className="space-y-6">
                {/* Summary */}
                {data.professionalSummary && (
                    <section>
                        <p className="text-sm leading-relaxed text-gray-700">
                            {data.professionalSummary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.workExperience?.length > 0 && (
                    <section>
                        <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-4">
                            Work Experience
                        </h2>
                        <div className="space-y-6">
                            {data.workExperience.map((exp, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between font-bold text-sm mb-1">
                                        <span>{exp.jobTitle}, {exp.companyName}</span>
                                        <span className="text-gray-500 text-xs font-normal">{exp.startDate} – {exp.endDate || "Present"}</span>
                                    </div>
                                    {exp.description && (
                                        <p className="text-sm text-gray-600 whitespace-pre-line">
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
                        <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-4">
                            Education
                        </h2>
                        <div className="space-y-2">
                            {data.education.map((edu, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between font-bold text-sm">
                                        <span>{edu.institutionName}</span>
                                        <span className="text-gray-500 text-xs font-normal">{edu.graduationDate}</span>
                                    </div>
                                    <div className="text-sm text-gray-700">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && (
                    <section>
                        <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-3">
                            Skills
                        </h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {data.skills.join(", ")}
                        </p>
                    </section>
                )}

                {/* Languages - Added */}
                {data.languages?.length > 0 && (
                    <section>
                        <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-3">
                            Languages
                        </h2>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {data.languages.join(", ")}
                        </p>
                    </section>
                )}

                {/* Certifications - Added */}
                {data.certifications?.length > 0 && (
                    <section>
                        <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-4">
                            Certifications
                        </h2>
                        <div className="space-y-2">
                            {data.certifications.map((cert, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between font-bold text-sm">
                                        <span>{cert.name}</span>
                                        <span className="text-gray-500 text-xs font-normal">{cert.date}</span>
                                    </div>
                                    <div className="text-sm text-gray-700">{cert.organization}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects?.length > 0 && (
                    <section>
                        <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-4">
                            Projects
                        </h2>
                        <div className="space-y-4">
                            {data.projects.map((project, idx) => (
                                <div key={idx}>
                                    <h3 className="font-bold text-sm text-gray-900">{project.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        {project.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Acknowledgment - Added */}
                {data.acknowledgment && (
                    <section className="pt-6 mt-6 border-t border-gray-100">
                        <p className="text-xs italic text-gray-500">
                            {data.acknowledgment}
                        </p>
                    </section>
                )}
            </div>

            <footer className="mt-12 text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                Generated via JobNirvana
            </footer>
        </div>
    );
};

export default TemplateSimple;
