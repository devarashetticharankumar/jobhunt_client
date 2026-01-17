import React from "react";

const TemplateCompact = ({ data }) => {
    return (
        <div className="bg-white p-8 min-h-[800px] font-sans text-gray-800 text-sm">
            {/* 3 Column Layout Header */}
            <header className="border-b-2 border-gray-900 pb-4 mb-4 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold uppercase text-gray-900 leading-none">
                        {data.personalInfo.firstName}
                    </h1>
                    <h1 className="text-3xl font-bold uppercase text-gray-900 leading-none">
                        {data.personalInfo.lastName}
                    </h1>
                    {data.wantedJobTitle && (
                        <p className="text-sm font-semibold text-gray-500 uppercase mt-1">
                            {data.wantedJobTitle}
                        </p>
                    )}
                </div>
                <div className="text-right text-xs leading-5">
                    <div className="break-all">{data.personalInfo.email}</div>
                    <div>{data.personalInfo.phone}</div>
                    <div>{data.personalInfo.location}</div>
                    <div className="flex gap-2 justify-end">
                        {Object.entries(data.personalInfo.socialLinks || {}).map(([key, value]) => (
                            value && <a key={key} href={value} className="text-blue-600 hover:underline capitalize">{key}</a>
                        ))}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">

                {data.professionalSummary && (
                    <div className="col-span-2 mb-2">
                        <h2 className="text-xs font-bold uppercase border-b border-gray-300 mb-2">Profile</h2>
                        <p className="text-xs text-justify leading-snug">{data.professionalSummary}</p>
                    </div>
                )}

                {/* Left Col */}
                <div>
                    {data.workExperience?.length > 0 && (
                        <section className="mb-4">
                            <h2 className="text-xs font-bold uppercase border-b border-gray-300 mb-3">Experience</h2>
                            <div className="space-y-4">
                                {data.workExperience.map((exp, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between font-bold text-xs">
                                            <span>{exp.companyName}</span>
                                            <span className="text-gray-500 text-[10px]">{exp.startDate}-{exp.endDate || "Now"}</span>
                                        </div>
                                        <div className="italic text-xs mb-1">{exp.jobTitle}</div>
                                        {exp.description && (
                                            <p className="text-[10px] leading-snug text-gray-600">{exp.description}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Col */}
                <div>
                    {data.skills?.length > 0 && (
                        <section className="mb-4">
                            <h2 className="text-xs font-bold uppercase border-b border-gray-300 mb-2">Skills</h2>
                            <div className="flex flex-wrap gap-1">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx} className="text-[10px] px-1 py-0.5 bg-gray-100 rounded border border-gray-200">{skill}</span>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.education?.length > 0 && (
                        <section className="mb-4">
                            <h2 className="text-xs font-bold uppercase border-b border-gray-300 mb-3">Education</h2>
                            <div className="space-y-2">
                                {data.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <div className="font-bold text-xs">{edu.institutionName}</div>
                                        <div className="text-[10px] italic">{edu.degree}</div>
                                        <div className="text-[10px] text-gray-500">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.projects?.length > 0 && (
                        <section className="mb-4">
                            <h2 className="text-xs font-bold uppercase border-b border-gray-300 mb-3">Key Projects</h2>
                            <div className="space-y-3">
                                {data.projects.map((project, idx) => (
                                    <div key={idx}>
                                        <div className="font-bold text-xs">{project.title}</div>
                                        <p className="text-[10px] leading-snug text-gray-600">{project.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.languages?.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase border-b border-gray-300 mb-2">Languages</h2>
                            <div className="text-[10px]">{data.languages.join(", ")}</div>
                        </section>
                    )}
                    {data.certifications?.length > 0 && (
                        <section>
                            <h2 className="text-xs font-bold uppercase border-b border-gray-300 mb-2">Certifications</h2>
                            <div className="space-y-2">
                                {data.certifications.map((cert, idx) => (
                                    <div key={idx}>
                                        <div className="font-bold text-[10px]">{cert.name}</div>
                                        <div className="text-[9px] text-gray-500">{cert.organization}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {data.acknowledgment && (
                <div className="mt-6 pt-2 border-t border-gray-200 text-[10px] italic text-gray-500">
                    {data.acknowledgment}
                </div>
            )}

            <footer className="mt-8 text-center text-[8px] text-gray-300 font-bold uppercase tracking-widest">
                Generated via JobNirvana
            </footer>
        </div>
    );
};

export default TemplateCompact;
