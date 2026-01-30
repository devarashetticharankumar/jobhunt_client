import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const showMax = 5; // Target number of page buttons to show in the middle

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 4) {
                pages.push("...");
            }

            // Calculate start and end such that we try to show a window of 5 pages
            let start = Math.max(2, currentPage - 2);
            let end = Math.min(totalPages - 1, currentPage + 2);

            // Shift window if near the start or end to maintain consistent button count
            if (currentPage <= 4) {
                end = 5;
            } else if (currentPage > totalPages - 4) {
                start = totalPages - 4;
            }

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }

            if (currentPage < totalPages - 3 && end < totalPages - 1) {
                pages.push("...");
            }

            // Always show last page
            if (!pages.includes(totalPages)) pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-1 sm:gap-2 py-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-4 sm:py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-600 disabled:opacity-30 hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100 shadow-sm"
            >
                <FaChevronLeft className="text-[10px]" /> <span className="hidden sm:inline">Prev</span>
            </button>

            <div className="flex items-center gap-1 sm:gap-1.5">
                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {page === "..." ? (
                            <span className="px-1 text-gray-400 font-bold text-xs sm:text-base">...</span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all ${currentPage === page
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 shadow-sm"
                                    }`}
                            >
                                {page}
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-4 sm:py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-600 disabled:opacity-30 hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100 shadow-sm"
            >
                <span className="hidden sm:inline">Next</span> <FaChevronRight className="text-[10px]" />
            </button>
        </div>
    );
};

export default Pagination;
