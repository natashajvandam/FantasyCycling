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
          <div className="detail rider_price">&#x20AC; {rider.price}</div>
        }
        <div className={rider_name_team}>
          <div className="detail rider_name">{rider.name}</div>
          <div className="detail rider_team">{rider.team}</div>
          {mine && 
            <div className="detail rider_price">Sell for &#x20AC; {rider.price}</div>
          }
        </div>
      </div>
    </button>
  )
}

export default Item;