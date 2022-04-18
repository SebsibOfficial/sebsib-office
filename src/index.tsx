import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './screens/App/App';
import './custom.scss';
import axios from 'axios';
import {AuthProvider} from './states/AuthContext';

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;
axios.defaults.headers.common['X-API-KEY'] = process.env.REACT_APP_API_KEY as string;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);