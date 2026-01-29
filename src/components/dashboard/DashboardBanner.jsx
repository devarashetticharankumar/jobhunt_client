import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { MdVerified } from "react-icons/md";

const DashboardBanner = () => {
    const { user, isAuthenticated } = useAuth0();
    const displayName = user?.given_name || user?.nickname || user?.name?.split(' ')[0];

    return (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-orange-100 flex items-center justify-between shadow-sm mb-6 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl -mr-10 -mt-10 opacity-50"></div>

            <div className="relative z-10 flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {isAuthenticated ? `${displayName}, you are missing out on Pro features` : "Boost your career with Pro features"}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                    Get <span className="font-bold text-gray-800">3X more profile views</span> and faster responses from recruiters.
                </p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-4 rounded-full transition-colors shadow-sm shadow-orange-200 flex items-center gap-1">
                    <MdVerified className="text-yellow-200" /> Get Premium
                </button>
            </div>

            <div className="relative z-10 hidden sm:block">
                {/* Simple Illustration or Icon */}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-orange-100">
                    <span className="text-2xl">🚀</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardBanner;
