/* eslint-disable import/extensions */
import './item.scss'
import React, { useState } from 'react'
import { Rider } from '../../Types/riders'
import { User } from '../../Types/users'

type itemProps = {
  rider: Rider
  addToRoster: (userId: number, riderId: number) => Promise<Rider>
  removeFromRoster: (userId: number, riderId: number) => Promise<void>
  mine: boolean
  userData: User
  booleanObj: { [id: number]: boolean }
  setBooleanObj: React.Dispatch<React.SetStateAction<{ [id: number]: boolean }>>
}

function Item({
  rider,
  addToRoster,
  removeFromRoster,
  mine,
  userData,
  booleanObj,
  setBooleanObj
}: itemProps) {
  const [showInfo, setShowInfo] = useState(false)
  // const [taken, setTaken] = useState(false);
  const [backView, setBackView] = useState(false)

  let buttonRiderClass
  let riderNameTeam
  if (mine) {
    buttonRiderClass = 'button_myRider'
    riderNameTeam = 'my_name_team'
  } else {
    buttonRiderClass = 'button_rider'
    riderNameTeam = 'name_team'
  }

  async function toggleRider(riderId: number, riderParam: Rider): Promise<void> {
    if (!riderParam.added_at) {
      const result = await addToRoster(userData.id, riderId)
      if (result.ok) {
        setBooleanObj((prev) => ({
          ...prev,
          [riderId]: true
        }))
      }
    } else {
      removeFromRoster(userData.id, riderId)
      setBooleanObj((prev) => ({
        ...prev,
        [riderId]: false
      }))
    }
  }

  function toggleRiderInfo() {
    if (!showInfo) {
      setShowInfo(true)
    } else {
      setShowInfo(false)
    }
  }

  function toggleBackView() {
    if (!backView) {
      setBackView(true)
    } else {
      setBackView(false)
    }
  }

  return (
    <div id={rider.id.toString()} className={buttonRiderClass}>
      <div className="rider">
        {rider.image && mine && !backView && (
          <div className="rider_image" style={{ backgroundImage: `url(${rider.image})` }} />
        )}
        {!mine && !backView && (
          <div className="detail rider_price">
            {!booleanObj[rider.id] && (
              <div>
                &#x20AC; {rider.price}
                <button
                  type="button"
                  className="BuyRider"
                  onClick={() => toggleRider(rider.id, rider)}
                >
                  buy
                </button>
              </div>
            )}
          </div>
        )}
        <div className={riderNameTeam}>
          <div className="detail rider_name">{rider.name}</div>
          <div className="detail rider_team">{rider.team}</div>
          {/* {showInfo &&
            <div>rider.nationality</div> 
          } */}
          {mine && !backView && (
            <div className="my_rider_buttons">
              <button
                type="button"
                name="sell"
                className="SellRider"
                onClick={() => toggleRider(rider.id, rider)}
              >
                sell: &#x20AC; {rider.price}
              </button>
              <button type="button" className="SellRider More_button" onClick={toggleBackView}>
                i
              </button>
            </div>
          )}
        </div>
        {!mine && !showInfo && (
          <button type="button" className="toggleRiderInfo" onClick={toggleRiderInfo}>
            show more
          </button>
        )}
        {(showInfo || backView) && (
          <div className="detail rider_points">
            <div>
              <span className="pnts green_text">One-day Race Pnts: </span>
              {rider.classic_pnts}
            </div>
            <div>
              <span className="pnts red_text">GC Pnts: </span>
              {rider.gc_pnts}
            </div>
            <div>
              <span className="pnts blue_text">Time Trial Pnts: </span>
              {rider.tt_pnts}
            </div>
            <div>
              <span className="pnts purple_text">Climbing Pnts: </span>
              {rider.climb_pnts}
            </div>
            <div>
              <span className="pnts pink_text">Sprint Pnts: </span>
              {rider.sprint_pnts}
            </div>
            {rider.next_race !== 'undefined' && (
              <div className="pnts nextRace">next race: {rider.next_race}</div>
            )}
            {!backView && (
              <button type="button" className="toggleRiderInfo" onClick={toggleRiderInfo}>
                show less
              </button>
            )}
          </div>
        )}
        {backView && (
          <button type="button" className="SellRider" onClick={toggleBackView}>
            back
          </button>
        )}
        <div className="detail rider_race" />
      </div>
    </div>
  )
}

export default Item
