import './userList.scss';
import UserItem from '../userItem/userItem';

function userList ({userList}) {
  const users = (userList && userList.length > 0) ? userList.sort((user1, user2) => user1.score - user2.score).map(user => <UserItem 
    key={user.id}         
    user={user}
    />) : 'loading...';
  
  return (
    <div className="user_list">
      {users}
    </div>
  )
}

export default userList;