import api from './api';

const generoService = {
    getAll: async () => {
        const response = await api.get('/generos');
        return response.data;
    },
    getActive: async () => {
        const response = await api.get('/generos/activos');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/generos/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/generos', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/generos/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/generos/${id}`);
        return response.data;
    }
};

export default generoService;
