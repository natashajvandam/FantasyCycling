import './item.css';


function Item ({rider, addToRoster, removeFromRoster}) {
  function toggleRider (userId, riderId) {
    if (!rider.added) {
      rider.added = true;
      addToRoster(userId, riderId);
    } else {
      rider.added = false;
      removeFromRoster(userId, riderId);
    }
  }

  return (
    <button className="rider" onClick={()=> toggleRider(1, rider.id)}>
      
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