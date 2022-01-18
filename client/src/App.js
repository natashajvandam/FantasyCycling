import './App.scss';
import League from './Pages/League/league';
import Login from './Pages/Login/login';
import Home from './Pages/Home/home';
import { useState, useEffect } from 'react';
import { getAllRiders, getTheUsers} from './Services/apiService.js';
import { useAuth0 } from "@auth0/auth0-react";

// import { io } from "socket.io-client";

import {
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const [riderList, setRiderList] = useState([]);
  // const [myRoster, setMyRoster] = useState([]);
  // const [userData, setUserData] = useState({});
  const [userList, setUserList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  // const [socket, setSocket] = useState(null);
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

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
    getTheUsers().then(result => setUserList(result));
    getAllRiders().then(result => {
      setSearchList(result);
      setRiderList(result);
    });
    // fetchUserData(1) //hard-coded userId => {id: 3, name: 'natashajv', team_name: 'aCoolTeam', score: 0, money: 490}
    // .then(result => {
    //   setUserData(result)
    //   return fetchUserRoster(result.id) })
    // .then(result => setMyRoster(result));
  }, []);



  return (
    <div className="routes_div">
      <Routes >
        <Route path="/login" element={<Login />} />
    
        <Route path="/home" className="routes_div" element={ (isAuthenticated && user && <Home 
          setSearchList={setSearchList}
          riderList={riderList}
          searchList={searchList}
        />)} />
        <Route path="league" element={<League 
          userList={userList}
          // userData={userData}
        />} />
      
      </Routes>
    </div>
  );
}

export default App;
