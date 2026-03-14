import React from 'react';
import GenericList from '../components/GenericList';
import GenericForm from '../components/GenericForm';
import generoService from '../services/generoService';

export const GeneroList = () => {
    const columns = [
        { key: 'nombre', label: 'NOMBRE' },
        { 
            key: 'estado', 
            label: 'ESTADO',
            render: (val) => (
                <span className={`badge ${val === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                    {val}
                </span>
            )
        },
        { key: 'descripcion', label: 'DESCRIPCION' }
    ];

    return (
        <GenericList 
            title="Manage Géneros"
            description="Add, edit, or remove movie categories from your database."
            addLink="/admin/generos/new"
            editLinkPrefix="/admin/generos/edit"
            service={generoService}
            columns={columns}
        />
    );
};

export const GeneroForm = () => {
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
        { name: 'descripcion', label: 'Descripción', type: 'textarea', fullWidth: true }
    ];

    return (
        <GenericForm 
            title="Género"
            description="Fill out the details to create or update a category."
            backLink="/admin/generos"
            service={generoService}
            fields={fields}
        />
    );
};
