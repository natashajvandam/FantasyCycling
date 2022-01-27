/* eslint-disable import/extensions */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'

import 'dotenv/config'

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.AUTH_DOMAIN as string}
      clientId={process.env.AUTH_CLIENT_ID as string}
      redirectUri={process.env.AUTH_REDIRECT_URI}
      audience={process.env.AUTH_AUDIENCE}
      scope={process.env.AUTH_SCOPE}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,

  document.getElementById('root')
)
