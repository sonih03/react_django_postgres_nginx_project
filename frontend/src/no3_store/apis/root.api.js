import axios from "axios";

export const rootApi = axios.create({
    baseURL: "http://localhost:8000",
});

rootApi.interceptors.request.use((config) => {

    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});