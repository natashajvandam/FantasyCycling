import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <React.StrictMode>
      <Auth0Provider
      domain="dev-874owraq.us.auth0.com"
      clientId="HDmFTvFE2h0tUm4r0N1qzUbMB6Ck1BqA"
      redirectUri="http://localhost:3000/home"
      audience="https://dev-874owraq.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
      >
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Auth0Provider>
    </React.StrictMode>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
