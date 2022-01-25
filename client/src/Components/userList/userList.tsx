import './userList.scss';
import UserItem from '../userItem/userItem';
import React from 'react';
import { IUser } from '../../interfaces';

type Props = {
  userList: IUser[];
  userData: IUser;
};

function userList({ userList, userData }: Props) {
  const sortedList: IUser[] = userList.sort(
    (b: IUser, a: IUser) => a.score - b.score
  );
  let topScore: number = 0;
  if (sortedList && sortedList.length) {
    topScore = sortedList[0].score;
  }
  const users: JSX.Element[] | string =
    userList && userList.length > 0
      ? userList
          .sort((a: IUser, b: IUser) => b.score - a.score)
          .map((user: IUser) => (
            <UserItem
              key={user.id}
              self={user.id === userData.id}
              topScore={topScore}
              user={user}
            />
          ))
      : 'loading...';

  return <div className='user_list'>{users}</div>;
}

export default userList;
