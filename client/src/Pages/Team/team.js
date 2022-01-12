import './team.css';
import List from '../../Components/list/list';
//import Form from '../Form/form';

function Team ({riderList, changeTeamName, myRoster, addToRoster, removeFromRoster}) {
  
  return (
    <div> 
      <List 
        riderList={myRoster}
        addToRoster={addToRoster}
        removeFromRoster={removeFromRoster}
      />
      <List
        riderList={riderList}
        addToRoster={addToRoster}
        removeFromRoster={removeFromRoster}
      />
    </div>
  )
}

export default Team;