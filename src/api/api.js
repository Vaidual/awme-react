import axios from 'axios';

const URL_BASE = 'https://localhost:7101/api/'

const instance = axios.create({
    baseURL: URL_BASE,
    withCredentials: true
});

export const authAPI = {
    register(data) {
        return instance.post(`auth/register`, data);
    },
    login(data) {
        return instance.post(`auth/login`, data);
    }
}