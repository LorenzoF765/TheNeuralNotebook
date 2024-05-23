import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const registerUser = (userData) => API.post('/register/', userData);
export const loginUser = (userData) => API.post('/login/', userData);
export const getConversations = (token) => API.get('/conversations/', {
    headers: { Authorization: `Token ${token}` }
});
export const saveConversation = (data, token) => API.post('/conversations/save/', data, {
    headers: { Authorization: `Token ${token}` }

});
export const updateUser = async (userData, token) => {
    try {
        const response = await API.put('/api/user/', userData, {
            headers: { Authorization: `Token ${token}` }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export default API;