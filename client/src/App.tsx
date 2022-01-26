/* eslint-disable import/extensions */
import './App.scss'
import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Routes, Route } from 'react-router-dom'
import League from './Pages/League/league'
import Login from './Pages/Login/login'
import Home from './Pages/Home/home'
import apiService from './Services/apiService'

import { Rider, RiderList } from './Types/riders'

// import { io } from "socket.io-client";

type ObjectBool = {
  [id: number]: boolean
}

function App() {
  const [riderList, setRiderList] = useState([])
  const [userList, setUserList] = useState([])
  const [searchList, setSearchList] = useState([] as RiderList)
  const [booleanObj, setBooleanObj] = useState({})

  // const [socket, setSocket] = useState(null);
  const { user, isAuthenticated } = useAuth0()

  // const socket = io();
  // socket.on("connect", () => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  // });

  // useEffect(() => {
  //   const newSocket = io(`http://${window.location.hostname}:3000`);
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, [setSocket]);

  useEffect(() => {
    apiService.getTheUsers().then((result) => setUserList(result))
    apiService.getAllRiders().then((result) => {
      setSearchList(result)
      setRiderList(result)

      const newBoolObj: ObjectBool = {}
      result.forEach((el: Rider) => {
        newBoolObj[el.id] = !!el.added_at
      })
      setBooleanObj(newBoolObj)
    })
  }, [])

  return (
    <div className="routes_div">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            isAuthenticated &&
            user && (
              <Home
                setSearchList={setSearchList}
                riderList={riderList}
                searchList={searchList}
                booleanObj={booleanObj}
                setBooleanObj={setBooleanObj}
              />
            )
          }
        />

        <Route path="league" element={<League userList={userList} />} />
      </Routes>
    </div>
  )
}

export default App
