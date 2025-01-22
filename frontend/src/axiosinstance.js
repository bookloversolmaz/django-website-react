import axios from 'axios';

const baseURL = window.location.hostname === 'www.solmazpurser.com'
  ? 'https://www.solmazpurser.com'  // Production backend
  : 'http://127.0.0.1:8000';  // Local backend for development

const AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken(),
    },
    withCredentials: true,
});
export default AxiosInstance;