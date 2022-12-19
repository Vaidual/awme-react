import axios from 'axios';

const URL_BASE = 'https://localhost:7101/api/'

const instance = axios.create({
    baseURL: URL_BASE,
    withCredentials: true,
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(handleError(error));
    }
);

function handleError(error) {
    return (error.response ?
        {error: error.response.data, code: error.response.status} : {error: 'The server is unavailable', code: 503})
}

export const authAPI = {
    register(data) {
        return instance.post(`auth/register`, data);
    },
    login(data) {
        console.log(instance.post(`auth/login`, data));
        return instance.post(`auth/login`, data);
    }
}
export const userAPI = {
    getMe() {
        return instance.get(`users/me`);
    }
}
