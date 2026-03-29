import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import mediaService from '../services/mediaService';
import { FaArrowLeft, FaPlay, FaCalendarAlt, FaLayerGroup, FaTags, FaUserTie, FaBuilding } from 'react-icons/fa';

const MediaDetailView = () => {
    const { id } = useParams();
    const history = useHistory();
    const [media, setMedia] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMediaDetail();
    }, [id]);

    const fetchMediaDetail = async () => {
        try {
            setLoading(true);
            const data = await mediaService.getById(id);
            setMedia(data);
        } catch (err) {
            console.error('Error fetching media details:', err);
            setError('No se pudo cargar la información de la película.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error || !media) {
        return (
            <div className="container-fluid py-4 text-center">
                <h3 className="text-white mb-3">{error || 'Media no encontrada'}</h3>
                <button className="btn btn-outline-light mt-3" onClick={() => history.push('/admin/medias')}>
                    <FaArrowLeft className="me-2" /> Volver al listado
                </button>
            </div>
        );
    }

    return (
        <div className="container-fluid p-0 pb-5" style={{ minHeight: '100vh', backgroundColor: 'var(--app-bg)' }}>
            {/* Header / Hero Section */}
            <div className="position-relative w-100 mb-5" style={{ height: '50vh', minHeight: '400px', backgroundColor: '#0f172a', overflow: 'hidden', borderRadius: '0 0 20px 20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                {media.imagenPortada && (
                    <div 
                        className="position-absolute w-100 h-100" 
                        style={{ 
                            backgroundImage: `url(${media.imagenPortada})`, 
                            backgroundSize: 'cover', 
                            backgroundPosition: 'top center', 
                            filter: 'blur(15px) brightness(0.3)', 
                            transform: 'scale(1.05)' 
                        }} 
                    />
                )}
                <div className="position-absolute top-0 start-0 p-4 z-2">
                    <button className="btn btn-outline-light d-flex align-items-center fw-bold" onClick={() => history.goBack()} style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                        <FaArrowLeft className="me-2" /> Volver
                    </button>
                </div>
                
                <div className="position-absolute bottom-0 start-0 w-100 p-4 p-md-5 z-1 d-flex gap-4 align-items-end flex-wrap flex-md-nowrap" style={{ background: 'linear-gradient(to top, var(--app-bg) 0%, transparent 100%)' }}>
                    <div className="flex-shrink-0 shadow-lg" style={{ width: '200px', height: '300px', borderRadius: '12px', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.2)' }}>
                        {media.imagenPortada ? (
                            <img src={media.imagenPortada} alt={media.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-secondary text-white-50 flex-column">
                                <FaPlay size={32} className="mb-2" />
                                <span>Sin Portada</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex-grow-1 pb-3 text-white">
                        <div className="mb-3 d-flex gap-2">
                            <span className="badge bg-primary fs-6 py-2 px-3 fw-bold rounded-pill shadow-sm">{media.tipo?.nombre || 'Desconocido'}</span>
                            <span className="badge bg-dark border border-secondary fs-6 py-2 px-3 rounded-pill text-light">{media.genero?.nombre || 'Sin Género'}</span>
                        </div>
                        <h1 className="display-4 fw-bolder mb-2" style={{ textShadow: '2px 4px 10px rgba(0,0,0,0.8)' }}>{media.titulo}</h1>
                        <div className="d-flex align-items-center text-white-50 gap-3 fs-5 mt-3 fw-medium">
                            <span><FaCalendarAlt className="me-2" /> {media.anioEstreno}</span>
                            <span>•</span>
                            <span>Serial: {media.serial}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="row mt-4 px-3 px-md-5">
                <div className="col-lg-8 pe-lg-5">
                    <h3 className="fw-bold mb-3 d-flex align-items-center" style={{ color: 'var(--text-primary)' }}>
                        <FaLayerGroup className="me-2 text-primary" /> Sinopsis
                    </h3>
                    <p className="fs-5 lh-lg" style={{ color: 'var(--text-secondary)' }}>
                        {media.sinopsis || 'No hay sinopsis disponible para esta producción.'}
                    </p>
                    
                    <div className="mt-5">
                        <a 
                            href={media.url || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`btn btn-lg ${media.url ? 'btn-primary' : 'btn-secondary disabled'}`} 
                            style={{ padding: '12px 32px', borderRadius: '50px', fontWeight: 'bold' }}
                        >
                            <FaPlay className="me-2" /> Reproducir Contenido
                        </a>
                        {!media.url && <p className="text-danger mt-2 small">URL de reproducción no disponible.</p>}
                    </div>
                </div>

                <div className="col-lg-4 mt-5 mt-lg-0">
                    <div className="card shadow-sm border-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', borderRadius: '12px' }}>
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4 text-white border-bottom border-secondary pb-3">Detalles de Producción</h5>
                            
                            <div className="mb-4">
                                <label className="text-muted small fw-bold text-uppercase d-block mb-1"><FaUserTie className="me-1"/> Director Principal</label>
                                <div className="fs-5 text-white">{media.director?.nombres || 'No especificado'}</div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="text-muted small fw-bold text-uppercase d-block mb-1"><FaBuilding className="me-1"/> Productora</label>
                                <div className="fs-5 text-white">{media.productora?.nombre || 'No especificada'}</div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="text-muted small fw-bold text-uppercase d-block mb-1"><FaTags className="me-1"/> Género Principal</label>
                                <div className="fs-5 text-white">{media.genero?.nombre || 'No especificado'}</div>
                            </div>

                            <div className="mt-4 pt-3 border-top border-secondary">
                                <div className="d-flex justify-content-between text-muted small">
                                    <span>Creado: {new Date(media.fechaCreacion).toLocaleDateString()}</span>
                                    <span>Actualizado: {new Date(media.fechaActualizacion).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default MediaDetailView;
