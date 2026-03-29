import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaPlus, FaFileImage, FaEye } from 'react-icons/fa';
import mediaService from '../services/mediaService';

const ContentList = () => {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // Extract search query if present
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            setLoading(true);
            const data = await mediaService.getAll();
            setMediaItems(data);
        } catch (error) {
            console.error('Failed to load media', error);
            Swal.fire('Error!', 'No se pudieron cargar los medios del servidor.', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Filter media items based on search query
    const filteredItems = useMemo(() => {
        if (!searchQuery) return mediaItems;
        const lowerQuery = searchQuery.toLowerCase();
        return mediaItems.filter(item => 
            item.titulo?.toLowerCase().includes(lowerQuery) ||
            item.serial?.toLowerCase().includes(lowerQuery) ||
            item.director?.nombres?.toLowerCase().includes(lowerQuery) ||
            item.productora?.nombre?.toLowerCase().includes(lowerQuery)
        );
    }, [mediaItems, searchQuery]);

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Esta acción no se puede deshacer.",
                icon: 'warning',
                showCancelButton: true,
                confirmColor: '#1e75ff',
                cancelColor: '#ef4444',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await mediaService.delete(id);
                setMediaItems(mediaItems.filter(item => item._id !== id));
                Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
            }
        } catch (error) {
            console.error('Failed to delete media', error);
            Swal.fire('Error!', 'No se pudo eliminar el registro.', 'error');
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: '4px' }}>Gestionar Media</h2>
                    <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.9rem' }}>Listado de todas las películas y series en la plataforma.</p>
                    {searchQuery && (
                        <span className="badge bg-primary bg-opacity-10 text-primary border border-primary mt-2">
                           Búsqueda: "{searchQuery}"
                        </span>
                    )}
                </div>
                <Link to="/admin/medias/new" className="btn btn-primary d-flex align-items-center fw-bold px-4 py-2">
                    <FaPlus className="me-2" /> Nueva Media
                </Link>
            </div>

            <div className="card border-0 mb-4 shadow-sm">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table mb-0 align-middle table-hover">
                            <thead>
                                <tr>
                                    <th scope="col" className="ps-4">IMAGEN</th>
                                    <th scope="col">SERIAL</th>
                                    <th scope="col">TITULO</th>
                                    <th scope="col">AÑO</th>
                                    <th scope="col">TIPO</th>
                                    <th scope="col">GENERO</th>
                                    <th scope="col">DIR/PROD</th>
                                    <th scope="col" className="text-end pe-4">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.length > 0 ? (
                                    filteredItems.map((item) => (
                                        <tr key={item._id} style={{ height: '70px' }}>
                                            <td className="ps-4">
                                                {item.imagenPortada ? (
                                                    <img src={item.imagenPortada} alt={item.titulo} style={{ width: '40px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                                ) : (
                                                    <div className="bg-secondary d-flex align-items-center justify-content-center text-white" style={{ width: '40px', height: '60px', borderRadius: '4px' }}>
                                                        <FaFileImage />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="text-muted" style={{ fontSize: '0.85rem' }}>{item.serial}</td>
                                            <td className="fw-bold" style={{ color: 'var(--text-primary)' }}>{item.titulo}</td>
                                            <td>{item.anioEstreno}</td>
                                            <td>
                                                <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25">{item.tipo?.nombre || item.tipo}</span>
                                            </td>
                                            <td>{item.genero?.nombre || item.genero}</td>
                                            <td>
                                                <div style={{ fontSize: '0.85rem' }}>{item.director?.nombres || item.director}</div>
                                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>{item.productora?.nombre || item.productora}</div>
                                            </td>
                                            <td className="text-end pe-4">
                                                <Link to={`/admin/medias/view/${item._id}`} className="btn btn-sm btn-link text-info me-2 shadow-none" title="Ver Detalles">
                                                    <FaEye size={16} />
                                                </Link>
                                                <Link to={`/admin/medias/edit/${item._id}`} className="btn btn-sm btn-link text-primary me-2 shadow-none" title="Editar">
                                                    <FaEdit size={16} />
                                                </Link>
                                                <button onClick={() => handleDelete(item._id)} className="btn btn-sm btn-link text-danger shadow-none" title="Delete">
                                                    <FaTrash size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center py-5 text-muted">
                                            Sin registros.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                <div style={{ borderTop: '1px solid #2e364f', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.82rem' }}>Mostrando {filteredItems.length} {filteredItems.length === 1 ? 'resultado' : 'resultados'}</span>
                </div>
            </div>
        </div>
    );
};

export default ContentList;
