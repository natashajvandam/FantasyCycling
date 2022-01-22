/* eslint-disable import/extensions */
import './userList.scss'
import React from 'react'
import UserItem from '../userItem/userItem'
import { User } from '../../Types/users'

type UserList = {
  userList: User[]
  userData: User
}

function UserList({ userList, userData }: UserList) {
  const sortedList = userList.sort((b, a) => a.score - b.score)
  let topScore = 0
  if (sortedList && sortedList.length) {
    topScore = sortedList[0].score
  }
  const users =
    userList && userList.length > 0
      ? userList
          .sort((a, b) => b.score - a.score)
          .map((user) => (
            <UserItem
              key={user.id}
              self={user.id === userData.id}
              topScore={topScore}
              user={user}
            />
          ))
      : 'loading...'

  return <div className="user_list">{users}</div>
}

export default UserList
