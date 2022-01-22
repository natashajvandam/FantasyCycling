/* eslint-disable import/extensions */
import './list.scss'
import React from 'react'
import Item from '../item/item'
import { ListProps } from '../../Types/props'

function List({
  mine,
  riderList,
  addToRoster,
  removeFromRoster,
  userData,
  booleanObj,
  setBooleanObj
}: ListProps) {
  const className = mine ? 'myList' : 'fullList'
  const riders =
    riderList && riderList.length > 0
      ? riderList
          .sort((r1, r2) => r2.price - r1.price)
          .map((rider) => (
            <Item
              mine={mine}
              key={rider.id}
              rider={rider}
              addToRoster={addToRoster}
              removeFromRoster={removeFromRoster}
              userData={userData}
              booleanObj={booleanObj}
              setBooleanObj={setBooleanObj}
            />
          ))
      : 'no riders...'

  return <div className={className}>{riders}</div>
}

export default List
