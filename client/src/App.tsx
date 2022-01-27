/* eslint-disable no-console */
/* eslint-disable import/extensions */
import './App.scss'
import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Routes, Route } from 'react-router-dom'
// SOCKET
import io from 'socket.io-client'

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
  const [riderList, setRiderList] = useState([] as RiderList)
  const [userList, setUserList] = useState([])
  const [searchList, setSearchList] = useState([] as RiderList)
  const [booleanObj, setBooleanObj] = useState({})

  const { user, isAuthenticated } = useAuth0()

  // const [response, setResponse] = useState('')

  useEffect(() => {
    const socket = io('http://localhost:3005')

    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`)
    })
    socket.on('connection', () => {
      console.log('Connected to server')
    })
    socket.on('fetchRiders', (riders) => {
      setRiderList(riders)
      setSearchList(riders)
      const newBoolObj: ObjectBool = {}
      riders.forEach((el: Rider) => {
        newBoolObj[el.id] = !!el.added_at
      })
      setBooleanObj(newBoolObj)
    })
    return () => {
      socket.disconnect()
    }
  }, [])

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
