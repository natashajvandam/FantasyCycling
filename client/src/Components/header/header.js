import './header.scss';
import { Link } from 'react-router-dom';

function Header ({userData}) {
  return (
    <div className="header_box">
      <div className="user_header">
        <div>{userData.name}</div>
        <div>money: {userData.money}</div>
        <div>points: {userData.score}</div>
        <div><Link className="link_league" to='/league'>league</Link></div>
      </div>
    </div>
  )
}

export default Header;