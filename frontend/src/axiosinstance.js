import axios from 'axios';

function getCSRFToken() {
    const csrfCookie = document.cookie.match(/csrftoken=([\w-]+)/);
    if (!csrfCookie) {
        console.warn('CSRF token not found in cookies.');
    }
    return csrfCookie ? csrfCookie[1] : '';
}

const baseURL = window.location.hostname === 'localhost'
  ? 'https://django-website-react.onrender.com'
  : 'http://127.0.0.1:8000';

const AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken(),
    },
    withCredentials: true,
});
export default AxiosInstance;