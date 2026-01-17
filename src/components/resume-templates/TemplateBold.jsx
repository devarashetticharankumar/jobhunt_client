import React from "react";

const TemplateBold = ({ data }) => {
    return (
        <div className="bg-white min-h-[800px] font-sans text-gray-900 border-[16px] border-black p-8">
            {/* Massive Header */}
            <header className="mb-12 border-b-8 border-black pb-8">
                <h1 className="text-7xl font-black uppercase tracking-tighter mb-2 leading-none">
                    {data.personalInfo.firstName}
                    <br />
                    {data.personalInfo.lastName}
                </h1>
                {data.wantedJobTitle && (
                    <p className="text-3xl font-bold uppercase tracking-widest bg-black text-white inline-block px-4 py-1 mt-4 transform -rotate-1">
                        {data.wantedJobTitle}
                    </p>
                )}
            </header>

            <div className="grid grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="col-span-8 space-y-12">
                    {/* Summary */}
                    {data.professionalSummary && (
                        <section>
                            <h2 className="text-4xl font-black uppercase mb-4">About Me</h2>
                            <p className="text-lg font-medium leading-relaxed border-l-4 border-black pl-6">
                                {data.professionalSummary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.workExperience?.length > 0 && (
                        <section>
                            <h2 className="text-4xl font-black uppercase mb-8">History</h2>
                            <div className="space-y-10">
                                {data.workExperience.map((exp, idx) => (
                                    <div key={idx}>
                                        <div className="flex items-center gap-4 mb-2">
                                            <h3 className="text-2xl font-bold uppercase">{exp.companyName}</h3>
                                            <span className="bg-black text-white text-xs font-bold px-2 py-1 uppercase">{exp.startDate} - {exp.endDate || "Now"}</span>
                                        </div>
                                        <div className="text-xl font-bold italic mb-3 text-gray-600">{exp.jobTitle}</div>
                                        {exp.description && (
                                            <p className="font-medium text-gray-800 leading-relaxed">
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
                            <h2 className="text-4xl font-black uppercase mb-8">Work</h2>
                            <div className="grid grid-cols-1 gap-8">
                                {data.projects.map((project, idx) => (
                                    <div key={idx} className="border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                        <h3 className="text-xl font-black uppercase mb-2">{project.title}</h3>
                                        <p className="font-medium mb-4">{project.description}</p>
                                        {project.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.slice(0, 3).map((t, i) => (
                                                    <span key={i} className="text-xs font-bold uppercase bg-gray-200 px-2 py-1">{t}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-12">
                    {/* Contact */}
                    <section className="bg-black text-white p-6 -mr-8 -ml-4 transform rotate-1">
                        <h2 className="text-xl font-bold uppercase mb-4 text-yellow-400">Contact</h2>
                        <div className="space-y-2 text-sm font-medium">
                            <div className="break-all">{data.personalInfo.email}</div>
                            <div>{data.personalInfo.phone}</div>
                            <div>{data.personalInfo.location}</div>
                            <div className="pt-2">
                                {Object.entries(data.personalInfo.socialLinks || {}).map(([key, value]) => (
                                    value && <div key={key}><a href={value} className="underline uppercase">{key}</a></div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black inline-block">Skills</h2>
                            <div className="flex flex-col gap-2">
                                {data.skills.map((skill, idx) => (
                                    <span key={idx} className="text-lg font-bold uppercase">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages - Added */}
                    {data.languages?.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black inline-block">Languages</h2>
                            <div className="flex flex-col gap-2">
                                {data.languages.map((lang, idx) => (
                                    <span key={idx} className="text-lg font-bold uppercase">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {data.education?.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black inline-block">Education</h2>
                            <div className="space-y-6">
                                {data.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <div className="font-black text-lg leading-tight mb-1">{edu.degree}</div>
                                        <div className="text- font-medium">{edu.institutionName}</div>
                                        <div className="text-sm font-bold bg-black text-white inline-block px-1 mt-1">{edu.graduationDate}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications - Added */}
                    {data.certifications?.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-black inline-block">Certs</h2>
                            <div className="space-y-4">
                                {data.certifications.map((cert, idx) => (
                                    <div key={idx}>
                                        <div className="font-black text-sm leading-tight mb-1">{cert.name}</div>
                                        <div className="text-xs font-medium">{cert.organization}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Acknowledgment - Added */}
            {data.acknowledgment && (
                <section className="mt-8 pt-6 border-t-4 border-black text-center">
                    <p className="text-sm font-bold italic">
                        {data.acknowledgment}
                    </p>
                </section>
            )}

            <footer className="mt-8 text-center text-xs font-black uppercase tracking-widest pt-4">
                Generated via JobNirvana
            </footer>
        </div>
    );
};

export default TemplateBold;
