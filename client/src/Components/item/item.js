import './item.scss';


function Item ({rider, addToRoster, removeFromRoster, mine}) {
  function toggleRider (userId, riderId, rider) {
    if (!rider.added_at) {
      addToRoster(userId, riderId);
    } else {
      removeFromRoster(userId, riderId);
    }
  }

  return (
    <button className="button_rider" onClick={()=> toggleRider(3, rider.id, rider)}>
      <div className="rider">
        {rider.image && mine && 
          <img className="rider_image" src={rider.image}></img>
        }
        <p className="rider_name">{rider.name}</p>
        <p className="rider_team">team: {rider.team}</p>
        <p className="rider_price">price: {rider.price}</p>
      </div>
    </button>
  )
}

export default Item;