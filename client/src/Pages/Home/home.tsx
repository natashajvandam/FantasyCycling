/* eslint-disable import/extensions */
import './home.scss'
import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

// Components
import List from '../../Components/list/list'
import Header from '../../Components/header/header'
import Form from '../../Components/form/form'

// Services
import apiService from '../../Services/apiService'

// TS Types
import { RiderList, Rider } from '../../Types/riders'
import { User } from '../../Types/users'

type homePropTypes = {
  riderList: RiderList
  setSearchList: React.Dispatch<React.SetStateAction<Rider[]>>
  searchList: Rider[]
  booleanObj: { [id: number]: boolean }
  setBooleanObj: React.Dispatch<React.SetStateAction<{ [id: number]: boolean }>>
}

function Home({ riderList, setSearchList, searchList, booleanObj, setBooleanObj }: homePropTypes) {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [token, setToken] = useState('')
  const [myRoster, setMyRoster] = useState([] as RiderList)
  const [userData, setUserData] = useState({} as User)

  const filterList = (query: string) => {
    if (query) {
      const filteredList = riderList.filter((rider) =>
        rider.name.toLowerCase().includes(query.toLowerCase())
      )
      setSearchList(filteredList)
    }
  }

  const getUserMetadata = async () => {
    const domain = 'dev-sfbx-116.us.auth0.com'
    try {
      const accessToken = await getAccessTokenSilently({
        audience: `https://${domain}/api/v2/`,
        scope: 'read:current_user'
      })
      setToken(accessToken)
      apiService.createUser({ nickname: user?.nickname, email: user?.email, password: '' })
      apiService
        .fetchUserData(user?.nickname)
        .then((response: User) => {
          setUserData(response)
          return apiService.fetchUserRoster(response.id)
        })
        .then((result: RiderList) => {
          setMyRoster(result)
        })
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  useEffect(() => {
    getUserMetadata()
  }, [getAccessTokenSilently, user?.sub])

  // async function changeTeamName(userId, newName) {
  //   setUserData((prev) => {
  //     return {
  //       id: userId,
  //       name: prev.name,
  //       team_name: newName,
  //       score: prev.score,
  //       money: prev.money,
  //     };
  //   });
  //   changeNameOfTeam();
  // }

  const addToRoster = async (userId: number, riderId: number): Promise<Rider> => {
    const res = await apiService.addRider(userId, riderId, token)
    apiService.fetchUserData(user?.nickname).then((result: User) =>
      setUserData((prev) => ({
        id: prev.id,
        nickname: prev.nickname,
        email: prev.email,
        score: prev.score,
        money: result.money
      }))
    )
    apiService.fetchUserRoster(userData?.id).then((result: RiderList) => {
      setMyRoster(result)
    })
    return res
  }

  const removeFromRoster = async (userId: number, riderId: number) => {
    await apiService.removeRider(userId, riderId, token)
    apiService.fetchUserData(user?.nickname).then((result: User) =>
      setUserData((prev) => ({
        id: prev.id,
        nickname: prev.nickname,
        email: prev.email,
        score: prev.score,
        money: result.money
      }))
    )
    apiService.fetchUserRoster(userData?.id).then((result: RiderList) => {
      setMyRoster(result)
    })
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  return !isAuthenticated ? (
    <h1>Not authenticated!</h1>
  ) : (
    <div className="home_page">
      <div>
        <Header userData={userData} linkRoute="league" />
      </div>
      <div className="body_home_page">
        <div className="my_rider_list">
          <h1 className="list_title">{user?.nickname}</h1>
          <List
            mine
            riderList={myRoster}
            addToRoster={addToRoster}
            removeFromRoster={removeFromRoster}
            userData={userData}
            booleanObj={booleanObj}
            setBooleanObj={setBooleanObj}
          />
        </div>

        <div className="full_rider_list_heading">
          <h1 className="list_title">pro cycling riders</h1>
          <Form filterList={filterList} />
        </div>
        <div className="full_rider_list">
          <List
            mine={false}
            riderList={searchList}
            addToRoster={addToRoster}
            removeFromRoster={removeFromRoster}
            userData={userData}
            booleanObj={booleanObj}
            setBooleanObj={setBooleanObj}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
