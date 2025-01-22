import axios from 'axios';
import { getCSRFToken } from './csrf';


const baseURL = window.location.hostname === 'www.solmazpurser.com'
  ? 'https://www.solmazpurser.com'  // Production backend if the host is production, this is the baseurl
  : 'http://127.0.0.1:8000';  // Local backend for development if not, use this as the baseurl

const AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken(),
    },
    withCredentials: true,
});
export default AxiosInstance;