import './list.scss';
import Item from '../item/item';
import { User } from '@auth0/auth0-spa-js';
import { IResponse, IRider, IUser } from '../../interfaces';
import React from 'react';

type ListProps = {
  user: User;
  mine: boolean;
  riderList: IRider[];
  addToRoster: (userId: number, riderId: number) => Promise<IResponse>;
  removeFromRoster: (userId: number, riderId: number) => Promise<void>;
  userData: IUser | null;
  booleanObj: { [k: number]: boolean };
  setBooleanObj: React.Dispatch<React.SetStateAction<{ [k: number]: boolean }>>;
};

const List: React.FC<ListProps> = ({
  user,
  mine,
  riderList,
  addToRoster,
  removeFromRoster,
  userData,
  booleanObj,
  setBooleanObj,
}: ListProps) => {
  const class_name = mine ? 'myList' : 'fullList';
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
              user={user}
              userData={userData}
              booleanObj={booleanObj}
              setBooleanObj={setBooleanObj}
            />
          ))
      : 'no riders...';

  return <div className={class_name}>{riders}</div>;
};

export default List;
