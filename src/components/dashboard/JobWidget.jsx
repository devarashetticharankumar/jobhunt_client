import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card';
import InArticleAd from '../InArticleAd'; // Assuming this exists or similar Ad component

const JobWidget = ({ title, jobs, count }) => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="bg-white rounded-xl shadow-[0_0_12px_0_rgba(0,0,0,0.1)] border border-gray-100 mb-6 overflow-hidden">
            {/* Header / Tabs */}
            <div className="flex items-center border-b border-gray-100 px-4">
                <button
                    className={`py-4 px-2 mr-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'profile' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                    onClick={() => setActiveTab('profile')}
                >
                    {title} ({count || 0})
                </button>
                <Link to="/jobs" className="ml-auto text-xs font-semibold text-blue-600 cursor-pointer hover:underline">
                    View All
                </Link>
            </div>

            {/* Content */}
            <div className="p-4">
                {activeTab === 'profile' ? (
                    <div className="space-y-3">
                        {jobs && jobs.length > 0 ? (
                            jobs.map((job, i) => (
                                <React.Fragment key={i}>
                                    <Card data={job} isCompact={true} />
                                    {/* Insert Ad after every 3 items for better balance (i.e., at index 2, 5, 8...) */}
                                    {(i + 1) % 3 === 0 && (
                                        <div className="py-2">
                                            <InArticleAd />
                                        </div>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500 text-sm">
                                No recommendations yet.
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 text-sm">
                        {/* Placeholder for 'You might like' tab */}
                        <p>Loading personalized recommendations...</p>
                        <Link to="/jobs" className="text-blue-600 underline text-xs mt-2 block">Browse all jobs</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobWidget;
