import axios from "axios";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://localhost:5000/api";

const apiCLient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

apiCLient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

export default apiCLient;