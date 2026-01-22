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
      className="group bg-white dark:bg-gray-800 relative rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <Link to={`/job/${slug || _id}`} className="block">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          {companyLogo ? (
            <div className="w-14 h-14 min-w-[3.5rem] rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-2 border border-gray-100 dark:border-gray-600">
              <img src={companyLogo} alt={companyName} loading="lazy" className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-14 h-14 min-w-[3.5rem] rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 text-xl border border-blue-100 dark:border-blue-800">
              <MdWorkOutline />
            </div>
          )}

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{companyName}</h4>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">{jobTitle}</h3>
              </div>
              {minPrice && maxPrice && (
                <div className="text-gray-900 dark:text-gray-100 font-bold text-sm bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full whitespace-nowrap">
                  <span className="flex items-center gap-1"><MdOutlineCurrencyRupee /> {minPrice}-{maxPrice}{salaryType === "Monthly" ? "k" : "k"}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5"><FiMapPin className="text-gray-400 dark:text-gray-500" /> {jobLocation}</span>
              <span className="flex items-center gap-1.5"><FiClock className="text-gray-400 dark:text-gray-500" /> {employmentType}</span>
              <span className="flex items-center gap-1.5"><FiCalendar className="text-gray-400 dark:text-gray-500" /> {postingDate || "Recently"}</span>
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2" dangerouslySetInnerHTML={{ __html: description?.slice(0, 150) + (description?.length > 150 ? "..." : "") }} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
