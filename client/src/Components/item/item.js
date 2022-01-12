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
    <button class="rider" onClick={()=> toggleRider(1, rider.id)}>
      
      {rider.image && 
        <img src={rider.image}></img>
      }
      <p class="rider_name">name: {rider.name}</p>
      <p class="rider_team">team: {rider.team}</p>
      <p class="rider_price">price: {rider.price}</p>
    </button>
  )
}

export default Item;