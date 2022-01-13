import './item.css';


function Item ({rider, addToRoster, removeFromRoster}) {
  function toggleRider (userId, riderId, rider) {
    if (!rider.added_at) {
      addToRoster(userId, riderId);
    } else {
      removeFromRoster(userId, riderId);
    }
  }

  return (
    <button className="rider" onClick={()=> toggleRider(3, rider.id, rider)}>
      
      {rider.image && 
        <img src={rider.image}></img>
      }
      <p className="rider_name">name: {rider.name}</p>
      <p className="rider_team">team: {rider.team}</p>
      <p className="rider_price">price: {rider.price}</p>
    </button>
  )
}

export default Item;