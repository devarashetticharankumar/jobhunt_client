import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const { _id, companyName, companyLogo, jobTitle } = data;

  // Slice the job title to a maximum of 30 characters
  const slicedJobTitle =
    jobTitle.length > 30 ? `${jobTitle.slice(0, 40)}...` : jobTitle;

  return (
    <section className="hover:bg-neutral-100 transition rounded-sm border p-2 flex items-center">
      <Link
        to={`/job/${_id}`}
        className="flex gap-4 flex-col sm:flex-row items-start"
      >
        <img src={companyLogo} alt={companyName} className="w-16" />
        <div>
          {/* <h4 className="text-primary mb-1">{companyName}</h4> */}
          {/* Display the sliced job title */}
          <h3 className="text-lg font-semibold mb-2">{slicedJobTitle}</h3>
        </div>
      </Link>
    </section>
  );
};

export default Card;
