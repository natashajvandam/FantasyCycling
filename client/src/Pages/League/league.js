import './league.scss';
import UserList from '../../Components/userList/userList.js';
import Header from '../../Components/header/header';

function League ({userList, userData}) {

  return (
    
    <div className="league_page">
     <Header 
        userData={userData}
        link_route={'home'}
      />
      <div className="flex_box_title">
        <h1 className="page_title">fantacy league</h1>
      </div>
      <div className="league_page">
        <UserList userList={userList} userData={userData}/>
      </div>
    </div>
  )
}

export default League;