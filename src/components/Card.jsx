import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { MdOutlineCurrencyRupee, MdWorkOutline } from "react-icons/md";



const extractSkillsFromTitle = (title) => {
  const commonSkills = [
    "React", "Node.js", "MongoDB", "Tailwind", "Python", "Java", "Angular", "Vue",
    "AWS", "Docker", "Kubernetes", "SQL", "Machine Learning", "Data Science",
    "UI/UX", "Figma", "DevOps", "Cybersecurity", "Blockchain", "Swift", "Flutter",
    "JavaScript", "TypeScript", "C++", "C#", "PHP", "Laravel", "Ruby", "Rails",
    "Quality Assurance", "QA", "Scrum", "Agile", "Product Management", "Marketing",
    "Sales", "HR", "Recruitment", "Finance", "Accounting", "Copywriting", "SEO",
    "Data Analyst", "Business Analyst", "Mobile App", "Android", "iOS", "Cloud"
  ];

  if (!title) return ["General", "Professional"];

  const lowerTitle = title.toLowerCase();
  const found = commonSkills.filter(skill =>
    lowerTitle.includes(skill.toLowerCase())
  );

  if (found.length > 0) return found;

  // Dynamic fallback: use words from title if no matches
  const titleWords = title.split(" ").filter(word => word.length > 3).slice(0, 3);
  return titleWords.length > 0 ? titleWords : ["Communication", "Problem Solving", "Teamwork"];
};

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    companyLogo,
    jobLocation,
    jobTitle,
    minPrice,
    maxPrice,
    postingDate,
    salaryType,
    experienceLevel,
    employmentType,
    description,
    slug,
    skills
  } = data;

  return (
    <div className="group bg-white hover:shadow-[0_0_12px_0_rgba(0,0,0,0.1)] transition-shadow duration-200 p-5 rounded-xl border border-gray-200 mb-3 relative">
      <Link to={`/job/${slug || _id}`} className="block">

        {/* Header: Title & Company */}
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
            {jobTitle}
          </h3>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
            {companyName}
            <span className="text-yellow-400 text-xs">★</span>
            <span className="text-gray-400 text-xs font-normal text-xs">(4.2 Reviews)</span>
          </div>
        </div>

        {/* Metadata Row: Experience | Salary | Location */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <MdWorkOutline className="text-gray-400" />
            {experienceLevel || "0-5 Yrs"}
          </span>
          <span className="hidden w-px h-3 bg-gray-300 sm:block"></span>
          <span className="flex items-center gap-1">
            <MdOutlineCurrencyRupee className="text-gray-400" />
            {minPrice && maxPrice ? `${minPrice}k - ${maxPrice}k PA` : "Not Disclosed"}
          </span>
          <span className="hidden w-px h-3 bg-gray-300 sm:block"></span>
          <span className="flex items-center gap-1">
            <FiMapPin className="text-gray-400" />
            {jobLocation}
          </span>
        </div>

        {/* Description */}
        <div className="flex items-start gap-3 mb-3">
          <div className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-sans">
            <span className="font-medium text-gray-400 mr-1">Job description:</span>
            {description?.replace(/<[^>]*>?/gm, '').substring(0, 180)}...
          </div>
        </div>

        {/* Skills / Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(skills && skills.length > 0 ? skills : extractSkillsFromTitle(jobTitle))
            .filter(s => s)
            .slice(0, 4)
            .map((skill, i) => (
              <span key={i} className="px-3 py-1 text-[10px] font-bold text-blue-600 bg-blue-50 rounded-lg uppercase tracking-wider">
                {skill}
              </span>
            ))}
        </div>

        {/* Footer: Date & Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-100 mt-2">
          <div className="text-xs text-gray-400 font-medium">
            <span className="text-green-600 font-bold mr-1">History</span>
            Posted: {postingDate || "Today"}
          </div>

          {/* CTA is often hidden/subtle on list view until hover, but we'll keep it clean */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-blue-600 font-bold text-sm">View Job</span>
          </div>
        </div>
      </Link>

      {/* Logos often appear on the right in Naukri detailed view, but simpler here */}
      {companyLogo && (
        <div className="absolute top-6 right-6 w-12 h-12 hidden md:block">
          <img src={companyLogo} alt={companyName} className="w-full h-full object-contain" />
        </div>
      )}
    </div>
  );
};

export default Card;
