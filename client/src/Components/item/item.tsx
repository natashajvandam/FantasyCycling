import './item.scss';
import React, { useState } from 'react';
import { IResponse, IRider, IUser } from '../../interfaces';


type ItemProps = {
  mine: boolean;
  rider: IRider;
  addToRoster: (userId: number, riderId: number) => Promise<IResponse>;
  removeFromRoster: (userId: number, riderId: number) => Promise<void>;
  userData: IUser;
  booleanObj: { [k: number]: boolean };
  setBooleanObj: React.Dispatch<React.SetStateAction<{ [k: number]: boolean }>>;
};

const Item: React.FC<ItemProps> = ({rider, addToRoster, removeFromRoster, mine, userData, booleanObj, setBooleanObj}) => {

  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [backView, setBackView] = useState<boolean>(false);
  const button_rider_class = mine ? 'button_myRider' : 'button_rider';
  const  rider_name_team = mine ? 'my_name_team' : 'name_team'

  async function toggleRider (riderId: number, rider: IRider): Promise<void> {
    if (!rider.added_at) {
      const result: IResponse = await addToRoster(userData.id, riderId);
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

  function toggleRiderInfo (): void {
    if (!showInfo) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  }

  function toggleBackView (): void {
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
          //added role and aria-label to this div for accessibility and testing purposes. Ideally this should just be
          // an <img> tag with an alt label, rather than a div with a background image set
         ? <div className="rider_image" style={{backgroundImage: `url(${rider.image})`}} role="img" aria-label={`Image of ${rider.name}`}></div>
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
          <div className="detail rider_name">{rider.name} </div>
          <div className="detail rider_team">{rider.team}</div>

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
              <div><span className="pnts green_text">One-day Race Pnts: </span>{rider.classic_pnts}</div>
              <div><span className="pnts red_text">GC Pnts: </span>{rider.gc_pnts}</div>
              <div><span className="pnts blue_text">Time Trial Pnts: </span>{rider.tt_pnts}</div>
              <div><span className="pnts purple_text">Climbing Pnts: </span>{rider.climb_pnts}</div>
              <div><span className="pnts pink_text">Sprint Pnts: </span>{rider.sprint_pnts}</div>
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