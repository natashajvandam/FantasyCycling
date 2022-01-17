import './item.scss';
import { useState
 } from 'react';
function Item ({rider, addToRoster, removeFromRoster, mine}) {
  const [showInfo, setShowInfo] = useState(false);
  const [taken, setTaken] = useState(false);
  const [backView, setBackView] = useState(false);

  let button_rider_class;
  let rider_name_team;
  if (mine) {
    button_rider_class = 'button_myRider';
    rider_name_team = 'my_name_team'
  } else {
    button_rider_class = 'button_rider';
    rider_name_team = 'name_team';
  }
  
  function toggleRider (userId, riderId, rider) {
    if (!rider.added_at) {
      setTaken(true);
      addToRoster(userId, riderId);
    } else {
      setTaken(false);
      removeFromRoster(userId, riderId);
    }
  }

  function toggleRiderInfo (e) {
    if (!showInfo) {
      setShowInfo(true); 
    } else {
      setShowInfo(false);
    }
  }

  function toggleBackView () {
    if (!backView) {
      setBackView(true);
    } else {
      setBackView(false);
    }
  }

  return (
    <div className={button_rider_class} >
      <div className='rider'>
          {rider.image && mine && !backView &&
        <div className="rider_image" style={{backgroundImage: `url(${rider.image})`}}></div> 
          }
          {!mine && !taken && !rider.added_at && !backView &&
        <div className="detail rider_price">&#x20AC; {rider.price}
        <button className="BuyRider" onClick={() => toggleRider(3, rider.id, rider)}>buy</button>
        </div>
          }
        <div className={rider_name_team}>
          <div className="detail rider_name">{rider.name}</div>
          <div className="detail rider_team">{rider.team}</div>
          {/* {showInfo &&
            <div>rider.nationality</div> 
          } */}
            {mine && !backView &&
          <div className="my_rider_buttons">
            <button className="SellRider" onClick={() => toggleRider(3, rider.id, rider)}>sell: &#x20AC; {rider.price}</button>
            {/* <div className="detail rider_race">upcoming race: {rider.next_race}</div> */}
            <button className="SellRider More_button" onClick={toggleBackView}>&#43;</button>
          </div>
            }
        </div>
          {!mine && !showInfo &&
        <button className="toggleRiderInfo" onClick={toggleRiderInfo}>show more</button>
          }
        { (showInfo || backView ) && 
       <div className="detail rider_points">
          <div><span className="pnts green_text">One-day Race Pnts: </span>{rider.classic_pnts}</div>
          <div><span className="pnts red_text">GC Pnts: </span>{rider.gc_pnts}</div>
          <div><span className="pnts blue_text">Time Trial Pnts: </span>{rider.tt_pnts}</div>
          <div><span className="pnts purple_text">Climbing Pnts: </span>{rider.climb_pnts}</div>
          <div><span className="pnts pink_text">Sprint Pnts: </span>{rider.sprint_pnts}</div> 
          {rider.next_race != 'undefined' &&
          <div className="pnts nextRace">next race: {rider.next_race}</div>
          }
          {!backView &&
          <button className="toggleRiderInfo" onClick={toggleRiderInfo}>show less</button>
          }
        </div>
          }
          {backView && 
          <button className="SellRider" onClick={toggleBackView}>back</button>
          }
          <div className="detail rider_race"></div>
      </div>
    </div>
  )
}

export default Item;