import React from 'react';
import Sidebar from './Sidebar';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const DashboardLayout = ({ children }) => {
    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: 'var(--app-bg)' }}>
            <Sidebar />
            <div className="flex-grow-1" style={{ marginLeft: '250px', display: 'flex', flexDirection: 'column' }}>

                {/* Topbar */}
                <div className="border-bottom px-4 py-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--app-bg)', height: '70px' }}>
                    <div className="position-relative" style={{ width: '400px' }}>
                        <FaSearch className="position-absolute" style={{ left: '15px', top: '12px', color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar películas, actores o directores..."
                            style={{ paddingLeft: '40px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                        />
                    </div>
                    <div className="d-flex align-items-center gap-4">
                        <div className="position-relative cursor-pointer">
                            <FaBell size={18} style={{ color: 'var(--text-secondary)' }} />
                            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                <span className="visually-hidden">New alerts</span>
                            </span>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <div className="text-end d-none d-md-block">
                                <span className="d-block fw-bold text-white fs-6 lh-1">Administrador</span>
                                <span className="text-uppercase" style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', letterSpacing: '0.5px' }}>Portal de Gestión</span>
                            </div>
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="rounded-circle" style={{ width: '36px', height: '36px', border: '2px solid var(--border-color)' }} />
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="p-4" style={{ flex: 1, backgroundColor: 'var(--app-bg)' }}>
                    {children}
                </div>

            </div>
        </div>
    );
};

export default DashboardLayout;
