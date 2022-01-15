import './league.scss';
import UserList from '../../Components/userList/userList.js';
import Header from '../../Components/header/header';

function League ({userList, userData}) {

  return (
    
    <div>
     <Header 
        userData={userData}
        link_route={'home'}
      />
      <div className="league_page">
        <div><h1 className="page_title">fantacy league</h1></div>
        <UserList userList={userList} />
      </div>
    </div>
  )
}

export default League;