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