import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://localhost:44324/api/'
});

export const authAPI = {
    register(data) {
        return instance.post(`Auth/register`, data);
    },
    login(data) {
        return instance.post(`Auth/login`, data);
    }
}