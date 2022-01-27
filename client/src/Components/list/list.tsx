import './list.scss';
import Item from '../item/item';
import { IResponse, IRider, IUser } from '../../interfaces';
import React from 'react';

type ListProps = {
  mine: boolean;
  riderList: IRider[];
  addToRoster: (userId: number, riderId: number) => Promise<IResponse>;
  removeFromRoster: (userId: number, riderId: number) => Promise<void>;
  userData: IUser;
  booleanObj: { [k: number]: boolean };
  setBooleanObj: React.Dispatch<React.SetStateAction<{ [k: number]: boolean }>>;
};

const List: React.FC<ListProps> = ({mine, riderList, addToRoster, removeFromRoster, userData, booleanObj, setBooleanObj}) => {
  const class_name: string = mine ? 'myList' : 'fullList';
  const riders: JSX.Element[] =
    (riderList && riderList.length > 0 && userData)
      ?
      riderList
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
      : [<div key="no-riders">no riders...</div>]

  return <div className={class_name}>{riders}</div>;
};

export default List;
