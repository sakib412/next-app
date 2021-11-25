import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://express-api-task.herokuapp.com/',
    timeout: 3000,
    withCredentials: true,
    credentials: 'include',
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;