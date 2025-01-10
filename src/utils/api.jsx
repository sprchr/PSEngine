import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3001", // Your backend URL
});

export default api;
