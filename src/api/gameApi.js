import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const gameApi = {
    createSession: async (wordLength = 4) => {
        const response = await apiClient.post('/create', { wordLength });
        return response.data;
    },
    makeGuess: async (sessionId, word) => {
        const response = await apiClient.post('/guess', { sessionId, word });
        return response.data;
    },
};