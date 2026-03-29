import React from 'react';
import GenericList from '../components/GenericList';
import GenericForm from '../components/GenericForm';
import directorService from '../services/directorService';

export const DirectorList = () => {
    const columns = [
        { key: 'nombres', label: 'NOMBRES' },
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
            title="Gestionar Directores"
            description="Agrega, edita o elimina directores del sistema."
            addLink="/admin/directores/new"
            editLinkPrefix="/admin/directores/edit"
            service={directorService}
            columns={columns}
        />
    );
};

export const DirectorForm = () => {
    const fields = [
        { name: 'nombres', label: 'Nombres', type: 'text', required: true },
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
        }
    ];

    return (
        <GenericForm 
            title="Director"
            description="Ingresa los datos del director."
            backLink="/admin/directores"
            service={directorService}
            fields={fields}
        />
    );
};
