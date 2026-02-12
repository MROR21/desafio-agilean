import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5142/api',
});

export default api;