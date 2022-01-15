import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
// import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        {/* <Auth0Provider
        domain="http://dev-874owraq.us.auth0.com"
        clientId="HDmFTvFE2h0tUm4r0N1qzUbMB6Ck1BqA"
        redirectUri={window.location.origin}
        > */}
        <App />
        {/* </Auth0Provider> */}
      </BrowserRouter>
    </React.StrictMode>,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
