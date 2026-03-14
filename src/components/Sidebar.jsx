import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLayerGroup, FaPlayCircle, FaFilm, FaCog, FaUserTie, FaBuilding, FaTags } from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname.startsWith(path) ? 'active-link' : '';
    };

    return (
        <div className="sidebar-container border-end p-3 vh-100 d-flex flex-column" style={{ width: '250px', position: 'fixed', top: 0, left: 0, backgroundColor: 'var(--panel-bg)', overflowY: 'auto' }}>
            <div className="d-flex align-items-center mb-5 px-3 pt-2">
                <div className="bg-primary text-white rounded p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                    <FaFilm size={18} />
                </div>
                <div>
                    <h5 className="mb-0 fw-bold" style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>StreamAdmin</h5>
                    <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Management Portal</small>
                </div>
            </div>

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-1">
                    <Link to="/admin/dashboard" className={`nav-link sidebar-link ${isActive('/admin/dashboard')}`}>
                        <FaLayerGroup className="me-3" /> Dashboard Overview
                    </Link>
                </li>
                
                <li className="nav-item mb-1 mt-4">
                    <small className="px-3 fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', letterSpacing: '1px' }}>Content Modules</small>
                </li>
                
                <li className="nav-item mb-1">
                    <Link to="/admin/generos" className={`nav-link sidebar-link ${isActive('/admin/generos')}`}>
                        <FaTags className="me-3" /> Géneros
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <Link to="/admin/directores" className={`nav-link sidebar-link ${isActive('/admin/directores')}`}>
                        <FaUserTie className="me-3" /> Directores
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <Link to="/admin/productoras" className={`nav-link sidebar-link ${isActive('/admin/productoras')}`}>
                        <FaBuilding className="me-3" /> Productoras
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <Link to="/admin/tipos" className={`nav-link sidebar-link ${isActive('/admin/tipos')}`}>
                        <FaLayerGroup className="me-3" /> Tipos
                    </Link>
                </li>
                <li className="nav-item mb-1">
                    <Link to="/admin/medias" className={`nav-link sidebar-link ${isActive('/admin/medias')}`}>
                        <FaPlayCircle className="me-3" /> Media (Películas/Series)
                    </Link>
                </li>

                <li className="nav-item mb-1 mt-4">
                    <small className="px-3 fw-bold text-uppercase" style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', letterSpacing: '1px' }}>System</small>
                </li>
                <li className="nav-item mb-1">
                    <Link to="#" className={`nav-link sidebar-link`}>
                        <FaCog className="me-3" /> Settings
                    </Link>
                </li>
            </ul>

            <div className="mt-auto pt-3 border-top px-3 d-flex align-items-center">
                <div className="rounded-circle bg-secondary me-3" style={{ width: '35px', height: '35px', backgroundImage: 'url("https://i.pravatar.cc/150?u=a042581f4e29026704d")', backgroundSize: 'cover' }}></div>
                <div>
                    <h6 className="mb-0 fw-bold" style={{ fontSize: '0.9rem' }}>Alma Mater</h6>
                    <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Administrator</small>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .sidebar-link {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        .sidebar-link:hover {
          color: var(--text-primary);
          background-color: rgba(255,255,255,0.05);
        }
        .active-link {
          color: var(--primary) !important;
          background-color: rgba(30, 117, 255, 0.1) !important;
        }
        .sidebar-container::-webkit-scrollbar {
          width: 5px;
        }
        .sidebar-container::-webkit-scrollbar-thumb {
          background-color: rgba(255,255,255,0.1);
          border-radius: 5px;
        }
      `}} />
        </div>
    );
};

export default Sidebar;
