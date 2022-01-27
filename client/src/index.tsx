import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENTID || ''}
      redirectUri={process.env.REACT_APP_AUTH0_REDIRECT_URL}
      audience={`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`}
      scope='read:current_user update:current_user_metadata'
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,

  document.getElementById('root')
);
