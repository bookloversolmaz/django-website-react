import axios from 'axios';

// Set the base URL for the deployed Django backend
const AxiosInstance = axios.create({
    baseURL: process.env.NODE_ENV,
    timeout: 10000, // Optional: Set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});

export default AxiosInstance;

// NODE_ENV https://create-react-app.dev/docs/adding-custom-environment-variables. 
// npm start = development. npm test = test. npm run build = production.