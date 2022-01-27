/* eslint-disable import/extensions */
import './login.scss'
import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
// Logos
import socket from './Images/socket-io.svg'
import auth from './Images/auth0.svg'
import react from './Images/react-2.svg'
import cypress from './Images/cypress-io-logo-round.svg'
import elephant from './Images/elephantSQL-logo.png'
import express from './Images/express-109.svg'
import got from './Images/got-logo.svg'
import jsdom from './Images/jsdom-logo.png'
import sass from './Images/sass-1.svg'
import ts from './Images/typescript.svg'

function Login() {
  const { loginWithRedirect } = useAuth0()
  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div />
        <div className="header">
          <div className="name">
            <div className="logoImg" />
            <h1>Fantacycling</h1>
          </div>
          <div>
            <button className="log-in" type="button" onClick={() => loginWithRedirect()}>
              Log In
            </button>
          </div>
        </div>
        <div className="container">
          <h2>Why Fantacycling?</h2>
          <p>
            Fantacycling is a cycling fantasy league game which allows users to buy and sell riders
            in real-time.
            <br />
            <br />
            Due to the lack of cycling APIs available on the market, a webscraper has been used to
            collect the data.
          </p>
        </div>
        <div className="container image-container">
          <h2>What technologies does Fantacycling use?</h2>
          <div className="logos-container">
            <div className="logos">
              <div className="image">
                <img src={react} alt="react" />
              </div>
              <div className="image">
                <img src={sass} alt="sass" />
              </div>
              <div className="image">
                <img src={express} alt="express" />
              </div>
              <div className="image">
                <img src={auth} alt="auth0" />
              </div>
              <div className="image">
                <img src={elephant} alt="elephant" />
              </div>
              <div className="image got">
                <img src={got} alt="got" />
              </div>
              <div className="image jsdom">
                <img src={jsdom} alt="jsdom" />
              </div>
            </div>
            <h3>Recently added:</h3>
            <div className="logos">
              <div className="image">
                <img src={ts} alt="ts" />
              </div>
              <div className="image">
                <img src={socket} alt="socket.io" />
              </div>
              <div className="image">
                <img src={cypress} alt="cypress" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
