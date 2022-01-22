import './header.scss'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
// eslint-disable-next-line import/extensions
import { User } from '../../Types/Users'

type headerProps = {
  userData: User
  linkRoute: string
}

function Header({ userData, linkRoute }: headerProps) {
  const link = `/${linkRoute}`
  const { logout } = useAuth0()

  return (
    <div className="header_box">
      <div className="user_header">
        <div className="logo">
          <div className="logoImg" />
          <div className="logo_name">Granny Gear Groupetto</div>
        </div>
        <div className="user_header_details">
          <div>
            <Link className="link_league" to="/home">
              {userData.nickname}
            </Link>
          </div>
          <div className="money">&#x20AC; {userData.money}</div>
          <div>{userData.score} pts</div>
        </div>
        <Link className="link_league" to={link}>
          {linkRoute}
        </Link>
        <button
          type="submit"
          className="logOutButton"
          onClick={() => logout({ returnTo: 'http://localhost:3000/' })}
        >
          Log Out
        </button>
      </div>
    </div>
  )
}

export default Header
