// import axios from 'axios';

// // Set the base URL for the deployed Django backend using REACT_APP_URL_DEVELOPMENT and REACT_APP_URL_PRODUCTION
// let baseURL;

// if (process.env.NODE_ENV === 'development') {
//     baseURL = process.env.REACT_APP_URL_DEVELOPMENT;  // Development URL
// } else if (process.env.NODE_ENV === 'production') {
//     baseURL = process.env.REACT_APP_URL_PRODUCTION;  // Production URL
// } else {
//     baseURL = 'http://127.0.0.1:8000';  // Default to development if no specific environment variable is found
// }

// // Create an Axios instance with the dynamic baseURL
// const AxiosInstance = axios.create({
//     withCredentials: true,
//     baseURL: baseURL, // Use the dynamic baseURL variable here
//     timeout: 10000, // Optional: Set a timeout for requests
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export default AxiosInstance;

import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000', // or your production URL
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken(), // Function to fetch CSRF token
    },
    withCredentials: true,
});

// function getCSRFToken() {
//     const name = 'csrftoken';
//     const cookies = document.cookie.split(';');
//     for (let cookie of cookies) {
//         const [key, value] = cookie.trim().split('=');
//         if (key === name) return value;
//     }
//     return null;
// }

export default AxiosInstance;
