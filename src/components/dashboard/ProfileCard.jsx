import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiBriefcase, FiSettings } from 'react-icons/fi';
import { useAuth0 } from '@auth0/auth0-react';

const ProfileCard = ({ user: manualUser }) => {
    const { user: auth0User, isAuthenticated, isLoading } = useAuth0();

    // Prioritize auth0User, then manualUser prop, then fallbacks
    const userToDisplay = auth0User || manualUser;

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-gray-100 animate-pulse">
                <div className="h-16 bg-gray-100"></div>
                <div className="pt-10 pb-6 px-4 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-24 bg-gray-100 rounded"></div>
                </div>
            </div>
        );
    }

    const displayName = userToDisplay?.name || userToDisplay?.nickname || "Guest User";
    const displayRole = userToDisplay?.role === 'recruiter' ? "Recruiter" : "Job Seeker";
    const displayLocation = userToDisplay?.location || "India";
    const photoUrl = userToDisplay?.picture || userToDisplay?.photoUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    return (
        <div className="bg-white rounded-xl shadow-[0_0_12px_0_rgba(0,0,0,0.05)] overflow-hidden mb-6 border border-gray-100 transition-all hover:shadow-md">
            {/* Header Pattern/Color */}
            <div className="h-16 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-white shadow-sm">
                        <img
                            src={photoUrl}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-10 pb-6 px-4 text-center border-b border-gray-100">
                <h3 className="font-bold text-[#091e42] text-lg capitalize truncate">{displayName}</h3>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">{displayRole}</p>
                <p className="text-[10px] text-gray-400 font-medium">{displayLocation}</p>

                <div className="mt-4">
                    <Link to="/profile" className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-full hover:bg-blue-100 transition-colors">
                        View Profile
                    </Link>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="py-2">
                <Link to="/jobs" className="flex items-center gap-3 px-6 py-3 text-sm font-bold text-blue-600 border-r-4 border-blue-600 bg-blue-50/50">
                    <FiUser className="text-lg" /> Jobs Feed
                </Link>
                <Link to="/my-applications" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[#091e42] transition-colors">
                    <FiBriefcase className="text-lg" /> Applications
                </Link>
                <Link to="/profile" className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[#091e42] transition-colors">
                    <FiSettings className="text-lg" /> Settings
                </Link>
            </div>
        </div>
    );
};

export default ProfileCard;
