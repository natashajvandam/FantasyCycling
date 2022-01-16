import './item.scss';

function Item ({rider, addToRoster, removeFromRoster, mine}) {

  let button_rider_class;
  let rider_name_team;
  if (mine) {
    button_rider_class = 'button_myRider';
    rider_name_team = 'my_name_team'
  } else if (rider.added_at) {
    button_rider_class = 'taken';
    rider_name_team = 'name_team';
  } else {
    button_rider_class = 'button_rider';
    rider_name_team = 'name_team';
  }
  
  function toggleRider (userId, riderId, rider) {
    console.log(rider.added_at);
    if (!rider.added_at) {
      addToRoster(userId, riderId);
    } else {
      removeFromRoster(userId, riderId);
    }
  }

  return (
    <button className={button_rider_class} onClick={()=> toggleRider(3, rider.id, rider)}>
      <div className='rider'>
          {rider.image && mine && 
        <div className="rider_image" style={{backgroundImage: `url(${rider.image})`}}>
        </div> 
          }
          {!mine && 
        <div className="detail rider_price">&#x20AC; {rider.price}
        </div>
          }
        <div className={rider_name_team}>
          <div className="detail rider_name">{rider.name}</div>
          <div className="detail rider_team">{rider.team}</div>
            {mine && 
          <div className="detail rider_price">Sell for &#x20AC; {rider.price}</div>
            }
        </div>
          {!mine &&
        <div className="detail rider_points">
          <div><span className="green_text">One-day Race Pnts: </span>{rider.classic_pnts}</div>
          <div><span className="red_text">GC Pnts: </span>{rider.gc_pnts}</div>
          <div><span className="blue_text">Time Trial Pnts: </span>{rider.tt_pnts}</div>
          <div><span className="purple_text">Climbing Pnts: </span>{rider.climb_pnts}</div>
          <div><span className="pink_text">Sprint Pnts: </span>{rider.sprint_pnts}</div> 
        </div>
          }
          <div className="detail rider_race"></div>
      </div>
    </button>
  )
}

export default Item;