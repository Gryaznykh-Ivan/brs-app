import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { store } from './store';
import reportWebVitals from './reportWebVitals';

import './index.css'
import jwtDecode from 'jwt-decode';
import { IJwtDecode } from './types/store';

(() => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const jwt: IJwtDecode = jwtDecode(token);

            const now = Math.floor(Date.now() / 1000);
            if (jwt.exp - now <= 0) {
                return localStorage.removeItem("token")
            }

            store.dispatch({ type: "auth/login", payload: { token, decode: jwt }});
        } catch (e) {
            localStorage.removeItem("token")
        }
    }
})();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
