import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaPlus, FaFileImage } from 'react-icons/fa';
import mediaService from '../services/mediaService';

const ContentList = () => {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);

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
            Swal.fire('Error!', 'Failed to load media from the server.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmColor: '#1e75ff',
                cancelColor: '#ef4444',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                await mediaService.delete(id);
                setMediaItems(mediaItems.filter(item => item._id !== id));
                Swal.fire('Deleted!', 'The record has been deleted.', 'success');
            }
        } catch (error) {
            console.error('Failed to delete media', error);
            Swal.fire('Error!', 'Failed to delete the record.', 'error');
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Manage Media</h2>
                    <p className="text-muted">List of all movies and series in the platform.</p>
                </div>
                <Link to="/admin/medias/new" className="btn btn-primary d-flex align-items-center fw-bold px-4 py-2">
                    <FaPlus className="me-2" /> New Media
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
                                    <th scope="col" className="text-end pe-4">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mediaItems.length > 0 ? (
                                    mediaItems.map((item) => (
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
                                                <Link to={`/admin/medias/edit/${item._id}`} className="btn btn-sm btn-link text-primary me-2 shadow-none" title="Edit">
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
                                            No records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="card-footer bg-transparent border-top py-3 px-4 d-flex justify-content-between align-items-center">
                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>Showing {mediaItems.length} results</span>
                </div>
            </div>
        </div>
    );
};

export default ContentList;
