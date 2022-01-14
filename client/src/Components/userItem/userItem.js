import './userItem.scss';


function userItem ({user}) {

  return (
    <div>
      <div className='user_item'>
        <div className="user_item_score"><span className="small_text">pts: </span>{user.score}</div>
        <div className="user_item_name_team">
          <div className="user_item_name">
            <span className="small_text">{user.name}'s Team:</span>
          </div>
          <div className="user_item_team">{user.team_name}</div>
        </div>
      </div>
          <div className="road_div_grey"></div>
          <div className="road_div_orange"></div>
          <div className="road_div_grey"></div>
    </div>
  )
}

export default userItem;