import React from 'react';
import GenericList from '../components/GenericList';
import GenericForm from '../components/GenericForm';
import tipoService from '../services/tipoService';

export const TipoList = () => {
    const columns = [
        { key: 'nombre', label: 'NOMBRE' },
        { key: 'descripcion', label: 'DESCRIPCIÓN' }
    ];

    return (
        <GenericList 
            title="Manage Tipos de Media"
            description="Add, edit, or remove media types (e.g. Movie, Series)."
            addLink="/admin/tipos/new"
            editLinkPrefix="/admin/tipos/edit"
            service={tipoService}
            columns={columns}
        />
    );
};

export const TipoForm = () => {
    const fields = [
        { name: 'nombre', label: 'Nombre', type: 'text', required: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', fullWidth: true }
    ];

    return (
        <GenericForm 
            title="Tipo"
            description="Enter the details of the media type."
            backLink="/admin/tipos"
            service={tipoService}
            fields={fields}
        />
    );
};
