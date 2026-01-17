import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const { _id, companyName, companyLogo, jobTitle, slug } = data;

  return (
    <Link
      to={`/job/${slug || _id}`}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
    >
      <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-white border border-gray-100 flex items-center justify-center p-1 shadow-sm">
        <img
          src={companyLogo}
          alt={companyName}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors text-sm mb-0.5">
          {jobTitle}
        </h4>
        <p className="text-xs text-gray-500 truncate">{companyName}</p>
      </div>
    </Link>
  );
};

export default Card;
