import React from "react";

const SkeletonLoading = () => {
  return (
    <div className="m-4">
      <div>
        {" "}
        <div className="animate-pulse space-y-4">
          {/* Skeleton Header Section */}{" "}
          <div className="flex items-center mb-6 mt-6 space-x-4">
            {" "}
            <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-300 rounded-lg"></div>{" "}
            <div className="space-y-2">
              {" "}
              <div className="h-5 bg-gray-300 rounded w-36 md:w-48 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-28 md:w-32"></div>{" "}
            </div>{" "}
          </div>
          {/* Skeleton Content Section */}{" "}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/5 md:w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/4 md:w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>{" "}
          </div>
          {/* Skeleton Large Content Block */}
          <div className="my-6 h-32 md:h-40 bg-gray-300 rounded"></div>
          {/* Skeleton Small Content Section */}{" "}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-2/5 md:w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3 md:w-1/4"></div>{" "}
          </div>
          {/* Skeleton Button */}{" "}
          <div className="h-10 md:h-12 bg-gray-300 rounded w-full mt-6"></div>{" "}
        </div>{" "}
        <div className="animate-pulse space-y-4">
          {/* Skeleton Header Section */}{" "}
          <div className="flex items-center mb-6 mt-6 space-x-4">
            {" "}
            <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-300 rounded-lg"></div>{" "}
            <div className="space-y-2">
              {" "}
              <div className="h-5 bg-gray-300 rounded w-36 md:w-48 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-28 md:w-32"></div>{" "}
            </div>{" "}
          </div>
          {/* Skeleton Content Section */}{" "}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/5 md:w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/4 md:w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>{" "}
          </div>
          {/* Skeleton Large Content Block */}
          <div className="my-6 h-32 md:h-40 bg-gray-300 rounded"></div>
          {/* Skeleton Small Content Section */}{" "}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-2/5 md:w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3 md:w-1/4"></div>{" "}
          </div>
          {/* Skeleton Button */}{" "}
          <div className="h-10 md:h-12 bg-gray-300 rounded w-full mt-6"></div>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default SkeletonLoading;
