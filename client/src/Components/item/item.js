import './item.scss';


function Item ({rider, addToRoster, removeFromRoster, mine}) {
  let button_rider_class;
  if (mine) {
    button_rider_class = 'button_myRider';
  } else if (rider.added_at) {
    button_rider_class = 'taken';
  } else {
    button_rider_class = 'button_rider';
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
        <div className="detail rider_price">value: {rider.price}</div>
        <div className="rider_name_team">
          <div className="detail rider_name">{rider.name}</div>
          <div className="detail rider_team">{rider.team}</div>
        </div>
      </div>
    </button>
  )
}

export default Item;