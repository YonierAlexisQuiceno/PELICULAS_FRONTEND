import api from './api';

const directorService = {
    getAll: async () => {
        const response = await api.get('/directores');
        return response.data.data;
    },
    getActive: async () => {
        const response = await api.get('/directores/activos');
        return response.data.data;
    },
    getById: async (id) => {
        const response = await api.get(`/directores/${id}`);
        return response.data.data;
    },
    create: async (data) => {
        const response = await api.post('/directores', data);
        return response.data.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/directores/${id}`, data);
        return response.data.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/directores/${id}`);
        return response.data;
    }
};

export default directorService;
