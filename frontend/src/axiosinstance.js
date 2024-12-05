import axios from 'axios';

// Set the base URL for the deployed Django backend using NODE_ENV
let baseURL;

if (process.env.REACT_APP_URL_DEVELOPMENT === 'development') {
    baseURL = 'http://127.0.0.1:8000';  // Development URL
} else if (process.env.REACT_APP_URL_PRODUCTION=== 'production') {
    baseURL = 'https://solmazpurser.com';  // Production URL
} else {
    baseURL = 'http://127.0.0.1:8000';  // Default to development if NODE_ENV is unknown
}

// Create an Axios instance with the dynamic baseURL
const AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10000, // Optional: Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

export default AxiosInstance;


// NODE_ENV https://create-react-app.dev/docs/adding-custom-environment-variables. 
// npm start = development. npm test = test. npm run build = production.