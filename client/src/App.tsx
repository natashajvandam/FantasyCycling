import './App.scss'
import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Routes, Route } from 'react-router-dom'
import League from './Pages/League/league'
import Login from './Pages/Login/login'
import Home from './Pages/Home/home'
import { getAllRiders, getTheUsers } from './Services/apiService'

// import { io } from "socket.io-client";

function App() {
  const [riderList, setRiderList] = useState([])
  const [userList, setUserList] = useState([])
  const [searchList, setSearchList] = useState([])
  const [booleanObj, setBooleanObj] = useState([])
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
    getTheUsers().then((result) => setUserList(result))
    getAllRiders().then((result) => {
      setSearchList(result)
      setRiderList(result)
      const newBoolObj = {}
      result.forEach((el) => {
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
          className="routes_div"
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
