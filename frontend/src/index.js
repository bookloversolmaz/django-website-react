import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// document.getElementById('root') is a JavaScript DOM manipulation method that retrieves the DOM element with the id attribute set to 'root'. 
// In this case, it is index.html
// Use createRoot to render the app
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


// Report web vitals
reportWebVitals();