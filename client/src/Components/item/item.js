import './item.scss';


function Item ({rider, addToRoster, removeFromRoster, mine}) {
  const button_rider_class = mine? 'button_myRider' : 'button_rider';
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
          <div className="rider_image" style={{backgroundImage: `url(${rider.image})`}}></div>
        }
        <p className="rider_name">{rider.name}</p>
        <p className="rider_team">team: {rider.team}</p>
        <p className="rider_price">price: {rider.price}</p>
      </div>
    </button>
  )
}

export default Item;