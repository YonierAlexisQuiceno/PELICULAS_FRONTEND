import React from 'react';
import GenericList from '../components/GenericList';
import GenericForm from '../components/GenericForm';
import productoraService from '../services/productoraService';

export const ProductoraList = () => {
    const columns = [
        { key: 'nombre', label: 'NOMBRE' },
        { key: 'slogan', label: 'SLOGAN' },
        { 
            key: 'estado', 
            label: 'ESTADO',
            render: (val) => (
                <span className={`badge ${val === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                    {val}
                </span>
            )
        }
    ];

    return (
        <GenericList 
            title="Manage Productoras"
            description="Add, edit, or remove production companies."
            addLink="/admin/productoras/new"
            editLinkPrefix="/admin/productoras/edit"
            service={productoraService}
            columns={columns}
        />
    );
};

export const ProductoraForm = () => {
    const fields = [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true },
        { 
            name: 'estado', 
            label: 'Estado', 
            type: 'select', 
            required: true,
            options: [
                { value: 'Activo', label: 'Activo' },
                { value: 'Inactivo', label: 'Inactivo' }
            ],
            defaultValue: 'Activo'
        },
        { name: 'slogan', label: 'Slogan', type: 'text' },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', fullWidth: true }
    ];

    return (
        <GenericForm 
            title="Productora"
            description="Enter the details for the production company."
            backLink="/admin/productoras"
            service={productoraService}
            fields={fields}
        />
    );
};
