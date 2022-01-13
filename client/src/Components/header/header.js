import './header.scss';

function Header ({userData}) {
  return (
    <div className="header_box">
      <div className="user_header">
        <div>
          {userData.name}
        </div>
        <div>money: {userData.money}</div>
        <div>points: {userData.score}</div>
      </div>
    </div>
  )
}

export default Header;