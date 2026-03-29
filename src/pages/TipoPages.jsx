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
            title="Gestionar Tipos de Media"
            description="Agrega, edita o elimina tipos de media (ej. Película, Serie)."
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
            description="Ingresa los datos del tipo de media."
            backLink="/admin/tipos"
            service={tipoService}
            fields={fields}
        />
    );
};
