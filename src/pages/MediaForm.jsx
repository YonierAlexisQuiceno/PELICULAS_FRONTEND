import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import mediaService from '../services/mediaService';
import generoService from '../services/generoService';
import directorService from '../services/directorService';
import productoraService from '../services/productoraService';
import tipoService from '../services/tipoService';

const MediaForm = () => {
    const { id } = useParams();
    const history = useHistory();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        imagenPortada: '',
        anioEstreno: '',
        genero: '',
        director: '',
        productora: '',
        tipo: ''
    });

    const [loading, setLoading] = useState(false);
    
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        fetchDependencies();
        if (isEditMode) {
            fetchMediaData();
        }
    }, [id]);

    const fetchDependencies = async () => {
        try {
            const [gen, dir, prod, tip] = await Promise.all([
                generoService.getActive(),
                directorService.getActive(),
                productoraService.getActive(),
                tipoService.getAll()
            ]);
            setGeneros(gen);
            setDirectores(dir);
            setProductoras(prod);
            setTipos(tip);
        } catch (error) {
            console.error("Error loading dependencies", error);
            Swal.fire('Error', 'Could not load dependencies from server. Make sure API is running.', 'error');
        }
    };

    const fetchMediaData = async () => {
        try {
            setLoading(true);
            const data = await mediaService.getById(id);
            // Handle populated fields by extracting the name/nombres
            const processedData = {
                ...data,
                genero: data.genero?.nombre || data.genero || '',
                director: data.director?.nombres || data.director || '',
                productora: data.productora?.nombre || data.productora || '',
                tipo: data.tipo?.nombre || data.tipo || '',
            };
            setFormData(processedData);
        } catch (error) {
            Swal.fire('Error!', 'Could not fetch the media record', 'error');
            history.push('/admin/medias');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (isEditMode) {
                await mediaService.update(id, formData);
                Swal.fire('Updated!', 'Media has been updated.', 'success');
            } else {
                await mediaService.create(formData);
                Swal.fire('Created!', 'New media added.', 'success');
            }
            history.push('/admin/medias');
        } catch (error) {
            Swal.fire('Error!', error.response?.data?.message || 'Could not save data.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) {
        return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
    }

    return (
        <div className="container-fluid p-0">
            <div className="mb-4">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-1" style={{ fontSize: '0.85rem' }}>
                        <li className="breadcrumb-item"><Link to="/admin/medias" className="text-secondary text-decoration-none">Media Library</Link></li>
                        <li className="breadcrumb-item active text-muted" aria-current="page">{isEditMode ? 'Edit' : 'Add New'}</li>
                    </ol>
                </nav>
                <h2 className="fw-bold mb-1">{isEditMode ? 'Edit Movie/Series' : 'Add New Movie/Series'}</h2>
                <p className="text-muted">Create a new media entry for the streaming library.</p>
            </div>

            <div className="card border-0 p-4 pb-4 shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="row g-4 mb-4">
                        <div className="col-md-4">
                            <label className="form-label text-white fw-bold" style={{ fontSize: '0.9rem' }}>Serial Number <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="serial" value={formData.serial} onChange={handleChange} placeholder="e.g. MOV-2024-001" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }} required />
                        </div>
                        <div className="col-md-8">
                            <label className="form-label text-white fw-bold" style={{ fontSize: '0.9rem' }}>Título <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="Enter movie or series title" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }} required />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label text-white fw-bold" style={{ fontSize: '0.9rem' }}>Sinopsis</label>
                        <textarea className="form-control" name="sinopsis" rows="4" value={formData.sinopsis} onChange={handleChange} placeholder="Briefly describe the plot and themes..." style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}></textarea>
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-md-8">
                            <label className="form-label text-white fw-bold" style={{ fontSize: '0.9rem' }}>Media URL <span className="text-danger">*</span></label>
                            <input type="url" className="form-control" name="url" value={formData.url} onChange={handleChange} placeholder="https://stream.provider.com/watch/..." style={{ backgroundColor: 'rgba(255,255,255,0.03)' }} required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label text-white fw-bold" style={{ fontSize: '0.9rem' }}>Año Estreno</label>
                            <input type="number" className="form-control" name="anioEstreno" value={formData.anioEstreno} onChange={handleChange} placeholder="e.g. 2024" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }} />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label text-white fw-bold" style={{ fontSize: '0.9rem' }}>Imagen Portada URL</label>
                        <input type="url" className="form-control" name="imagenPortada" value={formData.imagenPortada} onChange={handleChange} placeholder="https://..." style={{ backgroundColor: 'rgba(255,255,255,0.03)' }} />
                    </div>

                    <div className="row g-4 mb-5">
                        <div className="col-md-3">
                            <label className="form-label text-white fw-bold" style={{ fontSize: '0.9rem' }}>Género <span className="text-danger">*</span></label>
                            <select className="form-select" name="genero" value={formData.genero} onChange={handleChange} style={{ backgroundColor: 'rgba(255,255,255,0.03)' }} required>
                                <option value="">Select Genre</option>
                                {generos.map(g => (
                                    <option key={g._id} value={g.nombre}>{g.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label text-white fw-bold" style={{ fontSize: '0.9rem' }}>Director <span className="text-danger">*</span></label>
                            <select className="form-select" name="director" value={formData.director} onChange={handleChange} style={{ backgroundColor: 'rgba(255,255,255,0.03)' }} required>
                                <option value="">Select Director</option>
                                {directores.map(d => (
                                    <option key={d._id} value={d.nombres}>{d.nombres}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label text-white fw-bold" style={{ fontSize: '0.9rem' }}>Productora <span className="text-danger">*</span></label>
                            <select className="form-select" name="productora" value={formData.productora} onChange={handleChange} style={{ backgroundColor: 'rgba(255,255,255,0.03)' }} required>
                                <option value="">Select Producer</option>
                                {productoras.map(p => (
                                    <option key={p._id} value={p.nombre}>{p.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label text-white fw-bold" style={{ fontSize: '0.9rem' }}>Tipo <span className="text-danger">*</span></label>
                            <select className="form-select" name="tipo" value={formData.tipo} onChange={handleChange} style={{ backgroundColor: 'rgba(255,255,255,0.03)' }} required>
                                <option value="">Select Type</option>
                                {tipos.map(t => (
                                    <option key={t._id} value={t.nombre}>{t.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 border-top pt-4">
                        <Link to="/admin/medias" className="btn btn-secondary px-4">Cancel</Link>
                        <button type="submit" className="btn btn-primary px-4 fw-bold" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Media'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MediaForm;
