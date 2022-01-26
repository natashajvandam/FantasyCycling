import './header.scss';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { IUser } from '../../interfaces';
import React from 'react';

type HeaderProps = {
  userData: IUser;
  link_route: string;
};

type LogoutArgs = {
  returnTo: string;
};

const Header: React.FC<HeaderProps> = ({userData, link_route}) => {
  const link: string = '/' + link_route;
  const { logout } = useAuth0<(args: LogoutArgs) => {}>();

  return (
    <div className='header_box'>
      <div className='user_header'>
        <div className='logo'>
          <div className='logoImg'></div>
          <div className='logo_name'>Granny Gear Groupetto</div>
        </div>
        <div className='user_header_details'>
          <div>
            <Link className='link_league' to='/home'>
              {userData.nickname}
            </Link>
          </div>
          <div>&#x20AC; {userData.money}</div>
          <div>{userData.score} pts</div>
        </div>
        <Link className='link_league' to={link}>
          {link_route}
        </Link>
        <button
          className='logOutButton'
          onClick={() => logout({ returnTo: 'http://localhost:3000/' })}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
