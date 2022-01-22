/* eslint-disable import/extensions */
import './league.scss'
import { useAuth0 } from '@auth0/auth0-react'
import React, { useState, useEffect } from 'react'
import UserList from '../../Components/userList/userList'
import Header from '../../Components/header/header.tsx'
import { fetchUserData } from '../../Services/apiService'
import { User } from '../../Types/users'

type leaguePropTypes = {
  userList: UserList
}

function League({ userList }: leaguePropTypes) {
  const { user, getAccessTokenSilently } = useAuth0()
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        fetchUserData(user?.nickname).then((response: User) => {
          setUserData(response)
        })
      } catch (err) {
        throw new Error(`${err}`)
      }
    }
    getUserMetadata()
  }, [getAccessTokenSilently, user?.sub])

  return (
    <div className="league_page">
      <Header userData={userData} link_route="home" />
      <div className="flex_box_title">
        <h1 className="page_title">fantacy league</h1>
      </div>
      <div className="league_page">
        <UserList userList={userList} userData={userData} />
      </div>
    </div>
  )
}

export default League
