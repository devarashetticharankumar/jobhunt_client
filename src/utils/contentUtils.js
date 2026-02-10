export const getContentBlocks = (job) => {
    const { jobTitle, jobLocation, skills = [] } = job;

    // Ensure we are working with strings for the join logic
    const skillList = skills.slice(0, 3).map(s => typeof s === 'object' ? s.label : s);

    return {
        interviewPrep: [
            `How to prepare for the ${jobTitle} interview at ${job.companyName}?`,
            `Research the company culture and recent projects of ${job.companyName}.`,
            `Practice technical questions related to ${skillList.join(", ") || 'your core skills'}.`,
            "Be prepared to discuss your past projects and how they align with this role.",
            "Prepare 2-3 questions for the interviewer about the team growth and future roadmap."
        ],
        careerAdvice: [
            `A career as a ${jobTitle} is highly rewarding in today's market.`,
            `Professionals in ${jobLocation} often see strong networking opportunities and competitive compensation.`,
            `Mastering ${skillList[0] || 'modern technologies'} is key to long-term success in this field.`,
            "Continuous learning and obtaining industry certifications can significantly boost your profile."
        ],
        locationInsights: jobLocation.toLowerCase().includes("remote")
            ? "Remote work offers flexibility and access to global opportunities without geographical constraints."
            : `${jobLocation} is a thriving hub for professionals. Working on-site allows for direct collaboration and immersion in the local industry ecosystem.`
    };
};
