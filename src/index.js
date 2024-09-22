import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { MyProvider } from './context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
  <React.StrictMode>
  <MyProvider>
    <App />
  </MyProvider>
  </React.StrictMode>
  </HashRouter>
);



reportWebVitals();
