import axios from 'axios';

const api = axios.create({
    // Change this to match the host on EXPO (and the port on the backend)
    baseURL: 'http://192.168.0.100:3003'
})

export default api;