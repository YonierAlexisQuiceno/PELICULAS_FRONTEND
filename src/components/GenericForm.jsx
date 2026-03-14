import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

/**
 * GenericForm Component
 * @param {string} title - Page title prefix (will prepend "Add New" or "Edit")
 * @param {string} description - Page description
 * @param {string} backLink - Navigation link to go back
 * @param {object} service - API service object with getById, create, update methods
 * @param {Array} fields - Array of objects describing fields: { name, label, type, required, options }
 */
const GenericForm = ({ title, description, backLink, service, fields }) => {
    const { id } = useParams();
    const history = useHistory();
    const isEditMode = !!id;

    // Initialize state dynamically based on fields map
    const initialState = fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue !== undefined ? field.defaultValue : (field.type === 'select' ? (field.options[0]?.value || '') : '');
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await service.getById(id);
            setFormData(data);
        } catch (error) {
            Swal.fire('Error!', 'Could not fetch record.', 'error');
            history.push(backLink);
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
                await service.update(id, formData);
                Swal.fire('Updated!', 'The record has been updated.', 'success');
            } else {
                await service.create(formData);
                Swal.fire('Created!', 'New record added successfully.', 'success');
            }
            history.push(backLink);
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
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-1" style={{ fontSize: '0.85rem' }}>
                            <li className="breadcrumb-item"><Link to={backLink} className="text-secondary text-decoration-none">{title}s</Link></li>
                            <li className="breadcrumb-item active text-muted" aria-current="page">{isEditMode ? 'Edit' : 'Add New'}</li>
                        </ol>
                    </nav>
                    <h2 className="fw-bold mb-1">{isEditMode ? `Edit ${title}` : `Add New ${title}`}</h2>
                    <p className="text-muted">{description}</p>
                </div>
            </div>

            <div className="card border-0 p-4 pb-4 shadow-sm" style={{ maxWidth: '800px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="row g-4 mb-4">
                        {fields.map((field, idx) => {
                            const isFullWidth = field.type === 'textarea' || field.fullWidth;
                            
                            return (
                                <div key={idx} className={isFullWidth ? "col-12" : "col-md-6"}>
                                    <label className="form-label text-white fw-bold" style={{ fontSize: '0.9rem' }}>
                                        {field.label} {field.required && <span className="text-danger">*</span>}
                                    </label>
                                    
                                    {field.type === 'textarea' ? (
                                        <textarea 
                                            className="form-control" 
                                            name={field.name} 
                                            rows="4" 
                                            value={formData[field.name] || ''} 
                                            onChange={handleChange} 
                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                            required={field.required}
                                            style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                                        ></textarea>
                                    ) : field.type === 'select' ? (
                                        <select 
                                            className="form-select" 
                                            name={field.name} 
                                            value={formData[field.name] || ''} 
                                            onChange={handleChange}
                                            required={field.required}
                                            style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                                        >
                                            {field.options.map((opt, oIdx) => (
                                                <option key={oIdx} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input 
                                            type={field.type || 'text'} 
                                            className="form-control" 
                                            name={field.name} 
                                            value={formData[field.name] || ''} 
                                            onChange={handleChange} 
                                            placeholder={`Enter ${field.label.toLowerCase()}`}
                                            required={field.required}
                                            style={{ backgroundColor: 'rgba(255,255,255,0.03)' }} 
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="d-flex justify-content-end gap-2 border-top pt-4 mt-2">
                        <Link to={backLink} className="btn btn-secondary px-4">Cancel</Link>
                        <button type="submit" className="btn btn-primary px-4 fw-bold" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Record'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenericForm;
