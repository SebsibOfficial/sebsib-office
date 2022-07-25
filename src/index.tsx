import React, { Suspense, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './screens/App/App';
import './custom.scss';
import axios from 'axios';
import {AuthContext} from './states/AuthContext';

axios.defaults.baseURL =
  process.env.NODE_ENV == "development"
    ? process.env.REACT_APP_DEV_API_URL
    : process.env.REACT_APP_PROD_API_URL;
//axios.defaults.baseURL = process.env.REACT_APP_PROD_API_URL;
//axios.defaults.baseURL = "http://192.168.0.128:3000";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div></div>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
