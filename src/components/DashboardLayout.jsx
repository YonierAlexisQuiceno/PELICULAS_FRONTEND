import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaSearch, FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa';

const DashboardLayout = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const history = useHistory();

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            if (searchTerm.trim()) {
                history.push(`/admin/medias?search=${encodeURIComponent(searchTerm)}`);
            } else {
                history.push('/admin/medias');
            }
        }
    };
    return (
        <div className="d-flex min-vh-100" style={{ backgroundColor: 'var(--app-bg)' }}>
            <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
            <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
            <div className="main-content-wrapper flex-grow-1 w-100">

                {/* Topbar */}
                <div className="border-bottom px-3 px-md-4 py-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: 'var(--app-bg)', height: '70px', position: 'sticky', top: 0, zIndex: 1030 }}>
                    <div className="d-flex align-items-center flex-grow-1 me-2 me-md-4">
                        <FaBars 
                            className="d-lg-none me-3 cursor-pointer" 
                            size={22} 
                            style={{ color: 'var(--text-primary)' }} 
                            onClick={() => setIsSidebarOpen(true)}
                        />
                        <div className="position-relative w-100" style={{ maxWidth: '400px' }}>
                            <FaSearch className="position-absolute d-none d-sm-block" style={{ left: '15px', top: '12px', color: 'var(--text-secondary)' }} />
                            <FaSearch className="position-absolute d-sm-none" style={{ left: '12px', top: '10px', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar películas o series..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                                style={{ 
                                    paddingLeft: '35px', 
                                    backgroundColor: 'rgba(255,255,255,0.03)', 
                                    border: '1px solid var(--border-color)', 
                                    borderRadius: '8px', 
                                    color: 'var(--text-primary)',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 gap-md-4">
                        <div className="position-relative cursor-pointer" onClick={() => setShowNotifications(!showNotifications)}>
                            <FaBell size={18} style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} />
                            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                <span className="visually-hidden">New alerts</span>
                            </span>
                            {showNotifications && (
                                <div className="position-absolute bg-dark border rounded shadow-lg p-2" style={{ top: '30px', right: 0, width: '250px', zIndex: 1000, borderColor: 'var(--border-color)' }}>
                                    <h6 className="dropdown-header text-white border-bottom pb-2 mb-2">Notificaciones</h6>
                                    <div className="dropdown-item text-white-50 small pe-none">No hay notificaciones nuevas</div>
                                </div>
                            )}
                        </div>
                        <div className="d-flex align-items-center gap-3 position-relative cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                            <div className="text-end d-none d-md-block" style={{ cursor: 'pointer' }}>
                                <span className="d-block fw-bold text-white fs-6 lh-1">Administrador</span>
                                <span className="text-uppercase" style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', letterSpacing: '0.5px' }}>Portal de Gestión</span>
                            </div>
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="rounded-circle" style={{ width: '36px', height: '36px', border: '2px solid var(--border-color)', cursor: 'pointer' }} />
                            
                            {showProfileMenu && (
                                <div className="position-absolute bg-dark border rounded shadow-lg mt-2" style={{ top: '100%', right: 0, width: '200px', zIndex: 1000, borderColor: 'var(--border-color)' }}>
                                    <Link to="/admin/settings" className="dropdown-item text-white py-2 d-flex align-items-center gap-2 hover-bg-light">
                                        <FaCog /> Settings
                                    </Link>
                                    <div className="dropdown-divider my-0 border-secondary"></div>
                                    <div className="dropdown-item text-danger py-2 d-flex align-items-center gap-2 hover-bg-light" style={{ cursor: 'pointer' }}>
                                        <FaSignOutAlt /> Cerrar Sesión
                                    </div>
                                </div>
                            )}
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
