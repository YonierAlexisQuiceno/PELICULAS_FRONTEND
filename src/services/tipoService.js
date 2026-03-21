import api from './api';

const tipoService = {
    getAll: async () => {
        const response = await api.get('/tipos');
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/tipos/${id}`);
        return response.data.data;
    },
    create: async (data) => {
        const response = await api.post('/tipos', data);
        return response.data.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/tipos/${id}`, data);
        return response.data.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/tipos/${id}`);
        return response.data;
    }
};

export default tipoService;
