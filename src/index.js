import "bootstrap/dist/css/bootstrap.min.css";
import "glightbox/dist/css/glightbox.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from "./components/pages/redux/app/store";
import App from './App';
import "./assets/sass/main.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <Provider store={store}>
      <App />
    </Provider>
);

