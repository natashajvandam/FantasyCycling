import './item.scss';
import { useState
 } from 'react';
function Item ({user, rider, addToRoster, removeFromRoster, mine, userData, booleanObj, setBooleanObj}) {
  const [showInfo, setShowInfo] = useState(false);
  // const [taken, setTaken] = useState(false);
  const [backView, setBackView] = useState(false);

  const button_rider_class = mine ? 'button_myRider' : 'button_rider';
  const  rider_name_team = mine ? 'my_name_team' : 'name_team'

  async function toggleRider (riderId, rider) {
    if (!rider.added_at) {
      const result = await addToRoster(userData.id, riderId);
      if (result.ok) {
        setBooleanObj(prev => ({
          ...prev,
          [riderId]: true
        }))
      }
    } else {
      removeFromRoster(userData.id, riderId);
      setBooleanObj((prev) => ({
        ...prev,
        [riderId]: false
      }))
    }
  }

  function toggleRiderInfo () {
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
          {rider.image && mine && !backView
         ? <div className="rider_image" style={{backgroundImage: `url(${rider.image})`}}></div>
          : null
        }

          {!mine && !backView
            ? <div className="detail rider_price">
              {!booleanObj[rider.id]
                ? <div>
                    &#x20AC; {rider.price}
                    <button className="BuyRider" onClick={() => toggleRider(rider.id, rider)}>buy</button>
                   </div>
                : null
              }
            </div>
            : null
          }

        <div className={rider_name_team}>
          <div className="detail rider_name">{rider.name}</div>
          <div className="detail rider_team">{rider.team}</div>
          {/* {showInfo &&
            <div>rider.nationality</div>
          } */}
          {mine && !backView
            ? <div className="my_rider_buttons">
                <button className="SellRider" onClick={() => toggleRider(rider.id, rider)}>sell: &#x20AC; {rider.price}</button>
                <button className="SellRider More_button" onClick={toggleBackView}>i</button>
              </div>
            : null
          }
        </div>

          {!mine && !showInfo ?
          <button className="toggleRiderInfo" onClick={toggleRiderInfo}>show more</button>
          : null
          }
        { (showInfo || backView )
          ? <div className="detail rider_points">
              <><span className="pnts green_text">One-day Race Pnts: </span>{rider.classic_pnts}</>
              <><span className="pnts red_text">GC Pnts: </span>{rider.gc_pnts}</>
              <><span className="pnts blue_text">Time Trial Pnts: </span>{rider.tt_pnts}</>
              <><span className="pnts purple_text">Climbing Pnts: </span>{rider.climb_pnts}</>
              <><span className="pnts pink_text">Sprint Pnts: </span>{rider.sprint_pnts}</>
              {rider.next_race !== 'undefined'
                ? <div className="pnts nextRace">next race: {rider.next_race}</div>
                : <div className="pnts nextRace">next race: unknown</div>
              }
              {!backView
                ? <button className="toggleRiderInfo" onClick={toggleRiderInfo}>show less</button>
                : <button className="SellRider" onClick={toggleBackView}>back</button>
              }
          </div>
          : null
          }
          <div className="detail rider_race"></div>
      </div>
    </div>
  )
}

export default Item;