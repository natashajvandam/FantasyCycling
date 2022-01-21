import './home.scss'
import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import List from '../../Components/list/list'
import Header from '../../Components/header/header'
import Form from '../../Components/form/form'
import {
  fetchUserRoster,
  addRider,
  fetchUserData,
  removeRider,
  createUser
} from '../../Services/apiService'

function Home({ riderList, setSearchList, searchList, booleanObj, setBooleanObj }) {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [token, setToken] = useState(null)
  const [myRoster, setMyRoster] = useState([])
  const [userData, setUserData] = useState({})

  const filterList = (query) => {
    if (query) {
      const filteredList = riderList.filter((rider) =>
        rider.name.toLowerCase().includes(query.toLowerCase())
      )
      setSearchList(filteredList)
    }
  }

  // useEffect(() => {
  //   console.log(user);
  //   fetchUserData(user.nickname) //hard-coded userId => {id: 3, name: 'natashajv', team_name: 'aCoolTeam', score: 0, money: 490}
  //   .then(result => {
  //     setUserData(result)
  //     return fetchUserRoster(result.id) })
  //   .then(result => setMyRoster(result));
  // }, [])

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = 'dev-sfbx-116.us.auth0.com'
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user'
        })
        setToken(accessToken)
        createUser({ ...user, password: '' })
        fetchUserData(user.nickname)
          .then((response) => {
            setUserData(response)
            return fetchUserRoster(response.id)
          })
          .then((result) => {
            setMyRoster(result)
          })
      } catch (err) {
        throw new Error(err)
      }
    }
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

  const addToRoster = async (userId, riderId) => {
    const res = await addRider(userId, riderId, token)
    fetchUserData(user.nickname).then((result) =>
      setUserData((prev) => ({
        id: prev.id,
        nickname: prev.nickname,
        email: prev.email,
        score: prev.score,
        money: result.money
      }))
    )
    fetchUserRoster(userData.id).then((result) => {
      setMyRoster(result)
    })
    return res
  }

  const removeFromRoster = async (userId, riderId) => {
    await removeRider(userId, riderId, token)
    fetchUserData(user.nickname).then((result) =>
      setUserData((prev) => ({
        id: prev.id,
        nickname: prev.nickname,
        email: prev.email,
        score: prev.score,
        money: result.money
      }))
    )
    fetchUserRoster(userData.id).then((result) => {
      setMyRoster(result)
    })
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  return (
    isAuthenticated && (
      <div className="home_page">
        <div>
          <Header userData={userData} linkRoute="league" />
        </div>
        <div className="body_home_page">
          <div className="my_rider_list">
            <h1 className="list_title">{user.nickname}</h1>
            <List
              mine
              riderList={myRoster}
              addToRoster={addToRoster}
              removeFromRoster={removeFromRoster}
              user={user}
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
              user={user}
              userData={userData}
              booleanObj={booleanObj}
              setBooleanObj={setBooleanObj}
            />
          </div>
        </div>
      </div>
    )
  )
}

export default Home
