import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { API_URL } from '../data/apiPath';
import { FiRefreshCw, FiTrash2, FiActivity, FiServer, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const AdminAggregator = () => {
    const { getAccessTokenSilently, user } = useAuth0();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const isAdmin = user?.email === "jobhunt2580@gmail.com";

    const fetchStats = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${API_URL}/jobs/admin/aggregator/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error("Error fetching aggregator stats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAdmin) fetchStats();
    }, [isAdmin]);

    const handleTrigger = async () => {
        setActionLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${API_URL}/jobs/admin/aggregator/trigger`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setMessage({ type: 'success', text: data.message });
            setTimeout(fetchStats, 2000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to trigger aggregator' });
        } finally {
            setActionLoading(false);
        }
    };

    const handleCleanup = async () => {
        if (!window.confirm("Are you sure you want to delete all expired jobs?")) return;
        setActionLoading(true);
        setMessage({ type: '', text: '' });
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`${API_URL}/jobs/admin/aggregator/cleanup`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            setMessage({ type: 'success', text: data.message });
            setTimeout(fetchStats, 2000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to run cleanup' });
        } finally {
            setActionLoading(false);
        }
    };

    if (!isAdmin) {
        return <div className="text-center py-20 text-red-500 font-bold">Unauthorized Access</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <FiServer className="text-indigo-600" /> Aggregator Dashboard
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Monitor and control automated job ingestion runs.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleTrigger}
                            disabled={actionLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md active:scale-95"
                        >
                            <FiRefreshCw className={actionLoading ? 'animate-spin' : ''} />
                            Trigger Fetch Now
                        </button>
                        <button
                            onClick={handleCleanup}
                            disabled={actionLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg font-bold text-sm hover:bg-red-50 disabled:opacity-50 transition-all shadow-sm active:scale-95"
                        >
                            <FiTrash2 />
                            Cleanup Expired
                        </button>
                    </div>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                        }`}>
                        {message.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                        {message.text}
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>)}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total Jobs In DB</p>
                                <h2 className="text-3xl font-black text-gray-900">{stats?.totalJobs || 0}</h2>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Aggregated Jobs</p>
                                <h2 className="text-3xl font-black text-indigo-600">{stats?.aggregatedJobs || 0}</h2>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Automation Health</p>
                                <div className="flex items-center gap-2 text-green-600 font-bold">
                                    <FiActivity className="animate-pulse" /> Active
                                </div>
                            </div>
                        </div>

                        {/* Source Breakdown */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="font-bold text-gray-900">Jobs by Source</h3>
                                <span className="text-xs text-gray-400 font-medium italic">Refreshed just now</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-bold">
                                        <tr>
                                            <th className="px-6 py-3">Source Name</th>
                                            <th className="px-6 py-3">Job Count</th>
                                            <th className="px-6 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {stats?.bySource?.map((s) => (
                                            <tr key={s._id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-gray-700">{s._id}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">{s.count}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="flex items-center gap-1.5 text-green-500 text-xs font-bold">
                                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Synced
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {(!stats?.bySource || stats.bySource.length === 0) && (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-10 text-center text-gray-400 text-sm italic">No aggregated jobs found yet.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminAggregator;
