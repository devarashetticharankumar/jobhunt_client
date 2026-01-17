import React from "react";

const TemplateDesigner = ({ data }) => {
    return (
        <div className="bg-white min-h-[800px] font-sans text-gray-900 relative">
            <div className="absolute top-0 left-0 w-full h-80 bg-purple-600 transform -skew-y-3 origin-top-left z-0"></div>

            <div className="relative z-10 px-12 pt-16">
                {/* Header */}
                <header className="mb-16 text-white">
                    <h1 className="text-6xl font-black tracking-tighter mb-2">
                        {data.personalInfo.firstName}
                    </h1>
                    <h1 className="text-6xl font-black tracking-tighter text-purple-200 mb-4 opacity-90">
                        {data.personalInfo.lastName}
                    </h1>
                    {data.wantedJobTitle && (
                        <p className="text-2xl font-light tracking-widest uppercase opacity-90">
                            {data.wantedJobTitle}
                        </p>
                    )}
                </header>

                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-4 space-y-12">
                        {/* Contact */}
                        <section className="text-sm text-gray-600 space-y-2">
                            <div className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-3 border-b-2 border-purple-600 pb-1 w-12">Info</div>
                            <div className="break-all">{data.personalInfo.email}</div>
                            <div>{data.personalInfo.phone}</div>
                            <div>{data.personalInfo.location}</div>
                            <div className="pt-2 flex flex-col gap-1">
                                {Object.entries(data.personalInfo.socialLinks || {}).map(([key, value]) => (
                                    value && <a key={key} href={value} className="text-purple-600 hover:text-purple-800 font-bold">{key}</a>
                                ))}
                            </div>
                        </section>

                        {/* Skills */}
                        {data.skills?.length > 0 && (
                            <section>
                                <div className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-4 border-b-2 border-purple-600 pb-1 w-12">Skills</div>
                                <div className="space-y-2">
                                    {data.skills.map((skill, idx) => (
                                        <div key={idx} className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="absolute top-0 left-0 h-full bg-purple-500 w-3/4 opacity-20"></div> {/* Visual bar simulation */}
                                            <span className="absolute top-0 left-2 text-xs font-bold leading-6 text-gray-800">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Languages - Added */}
                        {data.languages?.length > 0 && (
                            <section>
                                <div className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-4 border-b-2 border-purple-600 pb-1 w-12">Langs</div>
                                <div className="space-y-1">
                                    {data.languages.map((lang, idx) => (
                                        <div key={idx} className="text-sm font-bold text-gray-700">{lang}</div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {data.education?.length > 0 && (
                            <section>
                                <div className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-4 border-b-2 border-purple-600 pb-1 w-12">Edu</div>
                                <div className="space-y-4">
                                    {data.education.map((edu, idx) => (
                                        <div key={idx}>
                                            <div className="font-bold text-sm">{edu.degree}</div>
                                            <div className="text-xs text-gray-500">{edu.institutionName}</div>
                                            <div className="text-xs text-purple-500 font-bold">{edu.graduationDate}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications - Added */}
                        {data.certifications?.length > 0 && (
                            <section>
                                <div className="font-bold text-gray-900 uppercase tracking-widest text-xs mb-4 border-b-2 border-purple-600 pb-1 w-12">Certs</div>
                                <div className="space-y-3">
                                    {data.certifications.map((cert, idx) => (
                                        <div key={idx}>
                                            <div className="font-bold text-sm leading-tight">{cert.name}</div>
                                            <div className="text-xs text-gray-500">{cert.organization}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <div className="col-span-8 space-y-10">
                        {/* Summary */}
                        {data.professionalSummary && (
                            <section>
                                <p className="text-xl font-light text-gray-800 leading-relaxed italic">
                                    "{data.professionalSummary}"
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {data.workExperience?.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                                    Experience <span className="h-1 flex-grow bg-gray-100"></span>
                                </h2>
                                <div className="space-y-8">
                                    {data.workExperience.map((exp, idx) => (
                                        <div key={idx} className="group">
                                            <div className="flex justify-between items-end mb-2">
                                                <h3 className="text-xl font-bold text-purple-600 group-hover:text-purple-800 transition-colors">
                                                    {exp.companyName}
                                                </h3>
                                                <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                                    {exp.startDate} - {exp.endDate || "Present"}
                                                </span>
                                            </div>
                                            <div className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                                                {exp.jobTitle}
                                            </div>
                                            {exp.description && (
                                                <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-purple-100 pl-4">
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
                                <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-4">
                                    Portfolio <span className="h-1 flex-grow bg-gray-100"></span>
                                </h2>
                                <div className="grid grid-cols-2 gap-6">
                                    {data.projects.map((project, idx) => (
                                        <div key={idx} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow">
                                            <h3 className="font-bold text-gray-900 mb-2">{project.title}</h3>
                                            <p className="text-xs text-gray-500 mb-3 line-clamp-3">{project.description}</p>
                                            {project.technologies?.length > 0 && (
                                                <div className="flex flex-wrap gap-1">
                                                    {project.technologies.slice(0, 3).map((t, i) => (
                                                        <span key={i} className="text-[9px] font-bold text-purple-500 uppercase">{t}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Acknowledgment - Added */}
                        {data.acknowledgment && (
                            <section className="mt-8 pt-4 border-t border-gray-100">
                                <p className="text-sm italic text-gray-400 text-right">
                                    {data.acknowledgment}
                                </p>
                            </section>
                        )}
                    </div>
                </div>

                <footer className="mt-20 text-center text-[10px] text-gray-300 font-bold uppercase tracking-widest pb-8">
                    Generated via JobNirvana
                </footer>
            </div>
        </div>
    );
};

export default TemplateDesigner;
