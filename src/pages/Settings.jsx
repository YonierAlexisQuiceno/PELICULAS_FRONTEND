import React, { useState } from 'react';
import { FaUserCircle, FaMoon, FaGlobe, FaShieldAlt, FaKey, FaSave } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Settings = () => {
    const [darkMode, setDarkMode] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);

    const handleSave = () => {
        Swal.fire({
            icon: 'success',
            title: '¡Guardado!',
            text: 'Las configuraciones se han actualizado correctamente.',
            confirmButtonColor: '#1e75ff'
        });
    };

    return (
        <div className="container-fluid p-0">
            <div className="mb-4">
                <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: '4px' }}>Configuración del Sistema</h2>
                <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.9rem' }}>Administra las preferencias generales y tu perfil.</p>
            </div>

            <div className="row g-4">
                {/* Profile Settings */}
                <div className="col-12 col-xl-8">
                    <div className="card border-0 shadow-sm" style={{ backgroundColor: 'var(--panel-bg)' }}>
                        <div className="card-header border-bottom border-secondary bg-transparent py-3">
                            <h5 className="mb-0 text-white d-flex align-items-center">
                                <FaUserCircle className="me-2 text-primary" /> Perfil del Administrador
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-4 pb-4 border-bottom border-secondary">
                                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="rounded-circle" style={{ width: '80px', height: '80px', border: '3px solid var(--border-color)' }} />
                                <div className="ms-4">
                                    <h4 className="text-white mb-1">Super Administrador</h4>
                                    <p className="text-muted mb-2">admin@iudigital.edu.co</p>
                                    <button className="btn btn-sm btn-outline-light">Cambiar Foto</button>
                                </div>
                            </div>
                            
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label text-white-50">Nombres</label>
                                        <input type="text" className="form-control" defaultValue="Super" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)' }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-white-50">Apellidos</label>
                                        <input type="text" className="form-control" defaultValue="Administrador" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)' }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-white-50">Correo Electrónico</label>
                                        <input type="email" className="form-control" defaultValue="admin@iudigital.edu.co" readOnly style={{ backgroundColor: 'rgba(255,255,255,0.02)', color: 'white', border: '1px solid var(--border-color)' }} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label text-white-50">Rol</label>
                                        <input type="text" className="form-control" defaultValue="Administrador Global" readOnly style={{ backgroundColor: 'rgba(255,255,255,0.02)', color: 'white', border: '1px solid var(--border-color)' }} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="card border-0 shadow-sm mt-4" style={{ backgroundColor: 'var(--panel-bg)' }}>
                        <div className="card-header border-bottom border-secondary bg-transparent py-3">
                            <h5 className="mb-0 text-white d-flex align-items-center">
                                <FaShieldAlt className="me-2 text-primary" /> Seguridad
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <h6 className="text-white mb-1">Contraseña</h6>
                                    <p className="text-muted small mb-0">Última actualización: hace 3 meses</p>
                                </div>
                                <button className="btn btn-outline-light d-flex align-items-center">
                                    <FaKey className="me-2" /> Actualizar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="col-12 col-xl-4">
                    <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'var(--panel-bg)' }}>
                        <div className="card-header border-bottom border-secondary bg-transparent py-3">
                            <h5 className="mb-0 text-white d-flex align-items-center">
                                <FaGlobe className="me-2 text-primary" /> Preferencias
                            </h5>
                        </div>
                        <div className="card-body p-4">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-white mb-1"><FaMoon className="me-2 text-warning" /> Modo Oscuro</h6>
                                        <p className="text-muted small mb-0">Interfaz de usuario en tema oscuro</p>
                                    </div>
                                    <div className="form-check form-switch fs-4">
                                        <input className="form-check-input" type="checkbox" role="switch" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                                    </div>
                                </div>
                            </div>
                            
                            <hr className="border-secondary mb-4" />
                            
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="text-white mb-1">Alertas por Correo</h6>
                                        <p className="text-muted small mb-0">Recibir resumen semanal de sistema</p>
                                    </div>
                                    <div className="form-check form-switch fs-4">
                                        <input className="form-check-input" type="checkbox" role="switch" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-secondary mb-4" />

                            <div className="mt-4 pt-2">
                                <label className="form-label text-white-50">Idioma de Interfaz</label>
                                <select className="form-select w-100" defaultValue="es" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)' }}>
                                    <option value="es">Español (Latinoamérica)</option>
                                    <option value="en">English (US)</option>
                                </select>
                            </div>
                        </div>
                        <div className="card-footer border-top border-secondary bg-transparent p-4 text-end">
                            <button className="btn btn-primary px-4 py-2 fw-bold d-flex align-items-center ms-auto" onClick={handleSave}>
                                <FaSave className="me-2" /> Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
