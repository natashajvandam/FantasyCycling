import './userItem.scss';

//300
//210
//2
function userItem ({user, topScore, userData}) {
  const persent = (user.score * 90)/topScore;
  return (
    <div className="league_page">
     
      <div className="road">
        <div className="road_rider_image" style={{transform: `translate(${persent}vw, 10px)`}}></div>
        <div className="road_div_grey"></div>
        <div className="road_div_orange"></div>
        <div className="road_div_grey"></div>
      </div>
      <div className='user_item'>
        <div className="user_item_score"><span className="small_text">pts: </span>{user.score}</div>
        <div className="user_item_name_team">
          <div className="user_item_name">{user.nickname}
          </div>
        </div>
      </div>
    </div>
  )
}

export default userItem;