import './userList.scss';
import UserItem from '../userItem/userItem';

function userList ({userList, userData}) {
  let sortedList = userList.sort((b, a) =>  a.score - b.score);
  let topScore = 0;
  if (sortedList && sortedList.length) {
    topScore = sortedList[0].score;
  }
  const users = (userList && userList.length > 0) ? userList.map(user => <UserItem 
    key={user.id}
    topScore={topScore}         
    user={user}
    userData={userData}
    />) : 'loading...';

  return (
    <div className="user_list">
      {users}
    </div>
  )
}

export default userList;