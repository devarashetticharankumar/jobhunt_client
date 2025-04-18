import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
// import { MdOutlineCurrencyRupee } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";

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
    <section className="card hover:bg-neutral-100 transition rounded-md">
      <Link
        to={`/job/${_id}`}
        className="flex gap-4 flex-col sm:flex-row items-start"
      >
        <img src={companyLogo} alt={companyName} className="w-16 rounded-lg" />
        <div>
          <h4 className="text-primary mb-1">{companyName}</h4>
          <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
          <div className="flex gap-2 text-primary/70 text-base flex-wrap mb-2">
            <span className="flex items-center gap-2">
              <FiMapPin />
              {jobLocation}
            </span>
            <span className="flex items-center gap-2">
              <FiClock />
              {employmentType}
            </span>
            <span className="flex items-center gap-2">
              <BsCurrencyDollar />
              {minPrice}-{maxPrice}
              {salaryType === "Monthly" ? "k" : "LPA"}
            </span>
            <span className="flex items-center gap-2">
              <FiCalendar />
              {postingDate}
            </span>
          </div>
          {/* <p
            dangerouslySetInnerHTML={{ __html: description.slice(0, 250) }}
            className="text-base text-primary/70"
          ></p> */}
          <p
            dangerouslySetInnerHTML={{
              __html: `${description.slice(0, 250)}${
                description.length > 250 ? "..." : ""
              }`,
            }}
            className="text-base text-primary/70"
          ></p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
