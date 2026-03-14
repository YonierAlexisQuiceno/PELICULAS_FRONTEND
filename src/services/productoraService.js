import api from './api';

const productoraService = {
    getAll: async () => {
        const response = await api.get('/productoras');
        return response.data;
    },
    getActive: async () => {
        const response = await api.get('/productoras/activas');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/productoras/${id}`);
        return response.data;
    },
    create: async (data) => {
        const response = await api.post('/productoras', data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await api.put(`/productoras/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/productoras/${id}`);
        return response.data;
    }
};

export default productoraService;
