import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaPlus, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

/**
 * GenericList Component
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} addLink - Link to the add form
 * @param {object} service - API service object with getAll and delete methods
 * @param {Array} columns - Array of objects describing columns: { key, label, render }
 * @param {string} editLinkPrefix - Prefix to append the ID to for editing
 */
const GenericList = ({ title, description, addLink, service, columns, editLinkPrefix }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const data = await service.getAll();
            setItems(data);
        } catch (error) {
            console.error('Failed to load items', error);
            Swal.fire('Error!', 'No se pudieron cargar los datos del servidor.', 'error');
        } finally {
            setLoading(false);
        }
    };

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
                await service.delete(id);
                setItems(items.filter(item => item._id !== id));
                Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
            }
        } catch (error) {
            console.error('Failed to delete item', error);
            Swal.fire('Error!', 'No se pudo eliminar el registro. Es posible que esté en uso.', 'error');
        }
    };

    return (
        <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: '4px' }}>{title}</h2>
                    <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.9rem' }}>{description}</p>
                </div>
                <Link to={addLink} className="btn btn-primary d-flex align-items-center fw-bold px-4 py-2">
                    <FaPlus className="me-2" /> Nuevo Registro
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
                                    {columns.map((col, idx) => (
                                        <th key={idx} scope="col" className={idx === 0 ? "ps-4" : ""}>{col.label}</th>
                                    ))}
                                    <th scope="col" className="text-end pe-4">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length > 0 ? (
                                    items.map((item) => (
                                        <tr key={item._id} style={{ height: '70px' }}>
                                            {columns.map((col, idx) => (
                                                <td key={idx} className={idx === 0 ? "fw-bold ps-4" : ""} style={idx === 0 ? { color: 'var(--text-primary)' } : {}}>
                                                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                                                </td>
                                            ))}
                                            <td className="text-end pe-4">
                                                <Link to={`${editLinkPrefix}/${item._id}`} className="btn btn-sm btn-link text-primary me-2 shadow-none" title="Edit">
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
                                        <td colSpan={columns.length + 1} className="text-center py-5 text-muted">
                                            Sin registros.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                <div style={{ borderTop: '1px solid #2e364f', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.82rem' }}>Mostrando {items.length} resultados</span>
                </div>
            </div>
        </div>
    );
};

export default GenericList;
