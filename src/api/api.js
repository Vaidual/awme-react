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
        {message: error.response.data, code: error.response.status} : {message: 'The server is unavailable', code: 503})
}

export const authAPI = {
    register(data) {
        return instance.post(`auth/register`, data);
    },
    login(data) {
        return instance.post(`auth/login`, data);
    },
    logout() {
        return instance.delete(`auth/logout`);
    }
}
export const userAPI = {
    getMe() {
        return instance.get(`users/me`);
    },
    getUsers() {
        return instance.get(`users`);
    },
    patchUser(id, data) {
        return instance.patch(`users/${id}/${data}`);
    }
}

export const collarAPI = {
    getCollars() {
        return instance.get(`collars`);
    },
    postCollar(data) {
        const config = { headers: {'Content-Type': 'application/json'} };
        return instance.post(`collars`, data, config);
    },
    deleteCollar(id) {
        return instance.delete(`collars/${id}`);
    }
}

export const profilesAPI = {
    getProfiles() {
        return instance.get(`profiles`);
    },
    patchProfileBan(id, data) {
        return instance.patch(`profiles/ban/${id}`, data);
    }
}

