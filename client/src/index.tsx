import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-sfbx-116.us.auth0.com"
      clientId="huLpHGSwa4GNH5DX4rH9sUlGMf3NKQxg"
      redirectUri="http://localhost:3000/home"
      audience="https://dev-sfbx-116.us.auth0.com/api/v2/"
      scope="read:current_user update:current_user_metadata"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,

  document.getElementById('root')
)
