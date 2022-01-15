import './header.scss';
import { Link } from 'react-router-dom';

function Header ({userData, link_route}) {
  const link = '/' + link_route;
  return (
    <div className="header_box">
      <div className="user_header">
      <div className="logo">
        {/* eventually a logo */}
        <div>Granny Gear Groupetto</div>
      </div>
        <div>{userData.name}</div>
        <div>&#x20AC; {userData.money}</div>
        <div>{userData.score} pts</div>
        <div><Link className="link_league" to={link}>{link_route}</Link></div>
      </div>
    </div>
  )
}

export default Header;