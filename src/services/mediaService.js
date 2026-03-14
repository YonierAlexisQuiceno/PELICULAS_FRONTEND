import api from './api';

const mediaService = {
    getAll: async () => {
        const response = await api.get('/medias');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/medias/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/medias', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/medias/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/medias/${id}`);
        return response.data;
    }
};

export default mediaService;
