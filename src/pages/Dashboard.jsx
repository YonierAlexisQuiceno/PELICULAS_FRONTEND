import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaPlayCircle, FaUsers, FaLayerGroup, FaPlusCircle, FaUserPlus, FaExclamationCircle, FaSyncAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const data = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 2000 },
    { name: 'Thu', value: 2780 },
    { name: 'Fri', value: 1890 },
    { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
];

const Dashboard = () => {
    return (
        <div className="container-fluid p-0">
            <div className="mb-4">
                <h2 className="fw-bold mb-1">Dashboard Overview</h2>
                <p className="text-muted">Welcome back, Alex. Here's what's happening on your platform today.</p>
            </div>

            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className="card h-100 p-3">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="bg-primary bg-opacity-10 p-2 rounded text-primary">
                                <FaPlayCircle size={20} />
                            </div>
                            <span className="text-success fw-bold p-1 bg-success bg-opacity-10 rounded shadow-sm" style={{ fontSize: '0.8rem' }}>↗ +12%</span>
                        </div>
                        <div className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Total Movies</div>
                        <h2 className="fw-bold mb-0">12,450</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 p-3">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="p-2 rounded text-white" style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa' }}>
                                <FaUsers size={20} color="#a78bfa" />
                            </div>
                            <span className="text-success fw-bold p-1 bg-success bg-opacity-10 rounded shadow-sm" style={{ fontSize: '0.8rem' }}>↗ +5.4%</span>
                        </div>
                        <div className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Total Users</div>
                        <h2 className="fw-bold mb-0">856,231</h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 p-3">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="p-2 rounded text-white" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}>
                                <FaLayerGroup size={20} color="#fcd34d" />
                            </div>
                            <span className="text-muted fw-bold p-1 bg-light bg-opacity-10 rounded shadow-sm" style={{ fontSize: '0.8rem' }}>— 0%</span>
                        </div>
                        <div className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Active Genres</div>
                        <h2 className="fw-bold mb-0">24</h2>
                    </div>
                </div>
            </div>

            <div className="row g-4 border-0">
                <div className="col-lg-8 border-0">
                    <div className="card h-100 p-4 border-0">
                        <div className="d-flex justify-content-between align-items-center mb-4 border-0">
                            <h5 className="fw-bold mb-0">Streaming Analytics</h5>
                            <select className="form-select form-select-sm w-auto border-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <div style={{ height: '280px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e364f" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{ backgroundColor: '#161d2f', borderColor: '#2e364f', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Bar dataKey="value" fill="#1e75ff" radius={[4, 4, 0, 0]} barSize={35} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card h-100 p-4">
                        <h5 className="fw-bold mb-4">Recent Activity</h5>

                        <div className="position-relative">
                            {/* Timeline Item */}
                            <div className="d-flex mb-4">
                                <div className="me-3 position-relative">
                                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                        <FaPlusCircle size={14} color="#fff" />
                                    </div>
                                    <div className="position-absolute bg-success rounded-circle" style={{ width: '10px', height: '10px', bottom: '-2px', right: '-2px', border: '2px solid var(--panel-bg)' }}></div>
                                </div>
                                <div>
                                    <h6 className="mb-1 text-white" style={{ fontSize: '0.9rem', fontWeight: 600 }}>New movie added</h6>
                                    <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Interstellar (4K UHD)</p>
                                    <small className="text-secondary fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>2 MINS AGO</small>
                                </div>
                            </div>

                            {/* Timeline Item */}
                            <div className="d-flex mb-4">
                                <div className="me-3">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
                                        <FaUserPlus size={14} color="#a78bfa" />
                                    </div>
                                </div>
                                <div>
                                    <h6 className="mb-1 text-white" style={{ fontSize: '0.9rem', fontWeight: 600 }}>New User Registration</h6>
                                    <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Sarah Jenkins joined Premium Plan</p>
                                    <small className="text-secondary fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>45 MINS AGO</small>
                                </div>
                            </div>

                            {/* Timeline Item */}
                            <div className="d-flex mb-4">
                                <div className="me-3">
                                    <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                        <FaExclamationCircle size={14} color="#fff" />
                                    </div>
                                </div>
                                <div>
                                    <h6 className="mb-1 text-white" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Content Report</h6>
                                    <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>Subtitle issue reported in "The Dark Knight"</p>
                                    <small className="text-secondary fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>2 HOURS AGO</small>
                                </div>
                            </div>

                            {/* Timeline Item */}
                            <div className="d-flex mb-0">
                                <div className="me-3">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', backgroundColor: 'rgba(55, 65, 81, 0.5)' }}>
                                        <FaSyncAlt size={14} className="text-muted" />
                                    </div>
                                </div>
                                <div>
                                    <h6 className="mb-1 text-white" style={{ fontSize: '0.9rem', fontWeight: 600 }}>System Update</h6>
                                    <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>v2.4.1 deployment successful</p>
                                    <small className="text-secondary fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>5 HOURS AGO</small>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <Link to="#" className="text-decoration-none fw-bold" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>View All Activity</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-5 mb-3 text-muted" style={{ fontSize: '0.8rem' }}>
                StreamAdmin Dashboard v2.4.1 © 2024. All system logs are encrypted.
            </div>
        </div>
    );
};

export default Dashboard;
