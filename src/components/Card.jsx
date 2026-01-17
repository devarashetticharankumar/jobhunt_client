import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { MdOutlineCurrencyRupee, MdWorkOutline } from "react-icons/md";
import { motion } from "framer-motion";

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
    slug
  } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white relative rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/job/${slug || _id}`} className="block">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {companyLogo ? (
            <div className="w-14 h-14 min-w-[3.5rem] rounded-xl bg-gray-50 flex items-center justify-center p-2 border border-gray-100">
              <img src={companyLogo} alt={companyName} className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-14 h-14 min-w-[3.5rem] rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 text-xl border border-blue-100">
              <MdWorkOutline />
            </div>
          )}

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-gray-500 text-sm font-medium mb-1">{companyName}</h4>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{jobTitle}</h3>
              </div>
              {minPrice && maxPrice && (
                <div className="text-gray-900 font-bold text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                  <span className="flex items-center gap-1"><MdOutlineCurrencyRupee /> {minPrice}-{maxPrice}{salaryType === "Monthly" ? "k" : "k"}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><FiMapPin className="text-gray-400" /> {jobLocation}</span>
              <span className="flex items-center gap-1.5"><FiClock className="text-gray-400" /> {employmentType}</span>
              <span className="flex items-center gap-1.5"><FiCalendar className="text-gray-400" /> {postingDate || "Recently"}</span>
            </div>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed line-clamp-2" dangerouslySetInnerHTML={{ __html: description?.slice(0, 150) + (description?.length > 150 ? "..." : "") }} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
