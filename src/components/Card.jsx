import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { MdOutlineCurrencyRupee } from "react-icons/md";
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
  } = data;
  return (
    <section className="card">
      <Link
        to={`/job/${_id}`}
        className="flex gap-4 flex-col sm:flex-row items-start"
      >
        <img src={companyLogo} alt={companyName} className="w-16" />
        <div>
          <h4 className="text-primary mb-1">{companyName}</h4>
          <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
          <div className="flex gap-2 text-primary/70 text-base flex-wrap mb-2">
            <span className="flex items-center gap-2">
              <FiMapPin /> {jobLocation}
            </span>
            <span className="flex items-center gap-2">
              <FiClock /> {employmentType}
            </span>
            <span className="flex items-center gap-2">
              <MdOutlineCurrencyRupee />
              {minPrice}-{maxPrice}k
            </span>
            <span className="flex items-center gap-2">
              <FiCalendar /> {postingDate}
            </span>
          </div>
          <p className="text-base text-primary/70">
            {description.slice(0, 250)}...
          </p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
