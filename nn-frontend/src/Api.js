import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerUser = (userData) => API.post('/register/', userData);
export const loginUser = (userData) => API.post('/login/', userData);
export const getUserInfo = (token) => API.get('/api/user/', {
    headers: { Authorization: `Token ${token}` }
});
export const updateUser = (userData, token) => API.put('/api/user/', userData, {
    headers: { Authorization: `Token ${token}` }
});

export default API;
