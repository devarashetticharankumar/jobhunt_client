import React from "react";

const TemplateClassic = ({ data }) => {
    return (
        <div className="bg-white p-12 min-h-[800px] font-serif text-black">
            {/* Header - Traditional Centered Caps */}
            <header className="text-center mb-8 pb-4 border-b-2 border-black">
                <h1 className="text-2xl font-bold uppercase tracking-widest mb-2">
                    {data.personalInfo.firstName} {data.personalInfo.lastName}
                </h1>

                <div className="text-sm flex justify-center gap-4 flex-wrap mb-2">
                    <span>{data.personalInfo.location}</span>
                    <span>{data.personalInfo.email}</span>
                    <span>{data.personalInfo.phone}</span>
                </div>
                {data.personalInfo.socialLinks && Object.values(data.personalInfo.socialLinks).some(v => v) && (
                    <div className="text-sm flex justify-center gap-4">
                        {Object.entries(data.personalInfo.socialLinks).map(([key, value]) => (
                            value && <a key={key} href={value} className="underline capitalize">{key}</a>
                        ))}
                    </div>
                )}
            </header>

            <div className="space-y-5">
                {/* Summary */}
                {data.professionalSummary && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Summary</h2>
                        <p className="text-sm text-justify leading-snug">
                            {data.professionalSummary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.workExperience?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Experience</h2>
                        <div className="space-y-4">
                            {data.workExperience.map((exp, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-sm uppercase">{exp.companyName}</h3>
                                        <span className="text-xs">{exp.startDate} - {exp.endDate || "Present"}</span>
                                    </div>
                                    <div className="italic text-sm mb-1">{exp.jobTitle}</div>
                                    {exp.description && (
                                        <p className="text-sm leading-snug pl-4">
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
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Education</h2>
                        <div className="space-y-2">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="flex justify-between items-baseline">
                                    <div>
                                        <span className="font-bold text-sm">{edu.institutionName}</span>
                                        <span className="text-sm"> - {edu.degree}</span>
                                    </div>
                                    <span className="text-xs">{edu.graduationDate}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Skills</h2>
                        <p className="text-sm leading-snug">
                            {data.skills.join(" • ")}
                        </p>
                    </section>
                )}

                {/* Languages - Added */}
                {data.languages?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-2">Languages</h2>
                        <p className="text-sm leading-snug">
                            {data.languages.join(" • ")}
                        </p>
                    </section>
                )}

                {/* Certifications - Added */}
                {data.certifications?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Certifications</h2>
                        <div className="space-y-2">
                            {data.certifications.map((cert, idx) => (
                                <div key={idx} className="flex justify-between items-baseline">
                                    <span className="font-bold text-sm">{cert.name}</span>
                                    <span className="text-xs italic">{cert.organization} | {cert.date}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects?.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase border-b border-black mb-3">Projects</h2>
                        <div className="space-y-3">
                            {data.projects.map((project, idx) => (
                                <div key={idx}>
                                    <h3 className="font-bold text-sm mb-0.5">{project.title}</h3>
                                    <p className="text-sm leading-snug">
                                        {project.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Acknowledgment - Added */}
                {data.acknowledgment && (
                    <section className="mt-6 pt-4 border-t border-gray-200">
                        <p className="text-xs italic text-center">
                            {data.acknowledgment}
                        </p>
                    </section>
                )}
            </div>

            <footer className="mt-12 text-center text-[10px] text-gray-500 uppercase tracking-widest pt-4 border-t border-gray-100">
                Generated via JobNirvana
            </footer>
        </div>
    );
};

export default TemplateClassic;
