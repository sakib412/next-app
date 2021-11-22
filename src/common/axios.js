import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://user-taskapi.herokuapp.com/',
    timeout: 3000,
    headers: {
        "Content-Type": "application/json",
    },
});

// var access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hem11c2FraWI0MTJAZ21haWwuY29tIiwiaWF0IjoxNjM3NTgxMjk4LCJleHAiOjE2MzgxODYwOTh9.d4LHN2m--SUBmdq-r332KyINXJrm7NUXBP4yHqp9unk";

// if (access_token) {
//     axiosInstance.defaults.headers.common[
//         "Authorization"
//     ] = `Bearer ${access_token}`;
// } else {
//     delete axiosInstance.defaults.headers.common["Authorization"];
// }

export default axiosInstance;