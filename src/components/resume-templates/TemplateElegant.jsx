import React from "react";

const TemplateElegant = ({ data }) => {
    return (
        <div className="bg-[#fdfbf7] p-16 min-h-[800px] font-serif text-[#2c3e50] border border-[#e0e0e0]">
            {/* Centered Elegant Header */}
            <header className="text-center mb-16 relative">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#d4af37]"></div>
                <div className="relative inline-block bg-[#fdfbf7] px-8 py-2 border border-[#d4af37]">
                    <h1 className="text-4xl font-normal uppercase tracking-[0.2em] mb-2 text-[#d4af37]">
                        {data.personalInfo.firstName} {data.personalInfo.lastName}
                    </h1>
                    {data.wantedJobTitle && (
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2c3e50]">
                            {data.wantedJobTitle}
                        </p>
                    )}
                </div>
            </header>

            <div className="flex justify-center text-[11px] uppercase tracking-widest text-gray-500 gap-8 mb-12">
                <span>{data.personalInfo.email}</span>
                {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
            </div>

            {data.professionalSummary && (
                <section className="mb-12 text-center max-w-2xl mx-auto">
                    <p className="text-sm leading-8 italic font-light text-gray-600">
                        {data.professionalSummary}
                    </p>
                </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Left Col */}
                <div className="space-y-12">
                    {/* Experience */}
                    {data.workExperience?.length > 0 && (
                        <section>
                            <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] mb-8 text-[#d4af37] border-b border-[#e0e0e0] pb-2">
                                Experience
                            </h2>
                            <div className="space-y-10">
                                {data.workExperience.map((exp, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-lg font-medium text-gray-900 mb-1">{exp.jobTitle}</h3>
                                        <div className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">
                                            {exp.companyName} | {exp.startDate} – {exp.endDate || "Present"}
                                        </div>
                                        {exp.description && (
                                            <p className="text-xs leading-relaxed text-gray-600 text-justify">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Col */}
                <div className="space-y-12">
                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>
                            <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] mb-8 text-[#d4af37] border-b border-[#e0e0e0] pb-2">
                                Education
                            </h2>
                            <div className="space-y-6 text-center">
                                {data.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <div className="text-base font-medium text-gray-900">{edu.degree}</div>
                                        <div className="text-xs italic text-gray-500 mb-1">{edu.institutionName}</div>
                                        <div className="text-[10px] uppercase tracking-wider text-gray-400">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section>
                            <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] mb-6 text-[#d4af37] border-b border-[#e0e0e0] pb-2">
                                Expertise
                            </h2>
                            <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx}>{skill}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages - Added */}
                    {data.languages?.length > 0 && (
                        <section>
                            <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] mb-6 text-[#d4af37] border-b border-[#e0e0e0] pb-2">
                                Languages
                            </h2>
                            <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-gray-600 uppercase tracking-wider">
                                {data.languages.join(" • ")}
                            </div>
                        </section>
                    )}

                    {/* Certifications - Added */}
                    {data.certifications?.length > 0 && (
                        <section>
                            <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] mb-8 text-[#d4af37] border-b border-[#e0e0e0] pb-2">
                                Certifications
                            </h2>
                            <div className="space-y-4 text-center">
                                {data.certifications.map((cert, idx) => (
                                    <div key={idx}>
                                        <div className="text-sm font-medium text-gray-900">{cert.name}</div>
                                        <div className="text-xs italic text-gray-500">{cert.organization}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.projects?.length > 0 && (
                        <section>
                            <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] mb-8 text-[#d4af37] border-b border-[#e0e0e0] pb-2">
                                Projects
                            </h2>
                            <div className="space-y-6">
                                {data.projects.map((project, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="font-bold text-sm text-gray-900 mb-1">{project.title}</div>
                                        <p className="text-xs leading-relaxed text-gray-600">
                                            {project.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Acknowledgment - Added */}
            {data.acknowledgment && (
                <section className="mt-12 pt-6 border-t border-[#e0e0e0] text-center max-w-xl mx-auto">
                    <p className="text-xs italic text-gray-500 font-light">
                        {data.acknowledgment}
                    </p>
                </section>
            )}

            <footer className="mt-16 pt-8 text-center text-[9px] text-gray-300 font-bold uppercase tracking-[0.3em] font-sans">
                Generated via JobNirvana
            </footer>
        </div>
    );
};

export default TemplateElegant;
