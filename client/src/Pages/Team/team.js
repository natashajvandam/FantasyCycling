import './team.scss';
import List from '../../Components/list/list';
import Header from '../../Components/header/header';
//import Form from '../Form/form';

function Team ({riderList, changeTeamName, myRoster, addToRoster, removeFromRoster, userData}) {
  
  return (
    <div className="team_page"> 
      <Header 
        userData={userData}
        link_route={'league'}
      />
      <div className="my_rider_list">
        <h1 className="list_title">{userData.team_name}</h1>
        <List 
          mine={true}
          riderList={myRoster}
          addToRoster={addToRoster}
          removeFromRoster={removeFromRoster}
        />
      </div>
      <div className="full_rider_list">
        <h1 className="list_title">riders</h1>
        <List
          mine={false}
          riderList={riderList}
          addToRoster={addToRoster}
          removeFromRoster={removeFromRoster}
        />
      </div>
    </div>
  )
}

export default Team;