import './team.scss';
import List from '../../Components/list/list';
//import Form from '../Form/form';

function Team ({riderList, changeTeamName, myRoster, addToRoster, removeFromRoster}) {
  
  return (
    <div className="team_page"> 
      <div className="my_rider_list">
        <h1>my team</h1>
        <List 
          mine={true}
          riderList={myRoster}
          addToRoster={addToRoster}
          removeFromRoster={removeFromRoster}
        />
      </div>
      <div className="full_rider_list">
        <h1>riders</h1>
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