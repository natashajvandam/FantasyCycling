import './App.scss';
import League from './Pages/League/league';
import Login from './Pages/Login/login';
import Team from './Pages/Team/team';
//import * as React from "react";

import { useState, useEffect } from 'react';
import { getAllRiders, createUser, changeNameOfTeam, addRider, removeRider, fetchUserRoster, fetchUserData} from './Services/apiService.js';

import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from "react-router-dom";

function App() {
  const [riderList, setRiderList] = useState([]);
  const [myRoster, setMyRoster] = useState([]);
  const [userData, setUserData] = useState({})

  useEffect(() => {
    getAllRiders().then(result => setRiderList(result));
    fetchUserData(3) //hard-coded userId => {id: 3, name: 'natashajv', team_name: 'aCoolTeam', score: 0, money: 490}
      .then(result => {
        setUserData(result)
        return fetchUserRoster(result.id) })
      .then(result => setMyRoster(result));
  }, []);


  async function changeTeamName (userId, newName) {
    setUserData((prev) => {
      return {id: userId, name: prev.name, team_name: newName, score: prev.score, money: prev.money}
    });
    changeNameOfTeam();
  }

  async function addToRoster (userId, riderId) {
    addRider(userId, riderId)
      .then(result => fetchUserRoster(userId))
      .then(result => setMyRoster(result))
      .then(result => fetchUserData(userId))
      .then(result => setUserData((prev) => {
        return {id: userId, name: prev.name, team_name: prev.team_name, score:prev.score, money: result.money}
      }));
  };

  async function removeFromRoster (userId, riderId) {
    removeRider(userId, riderId)
      .then(result => fetchUserRoster(userId))
      .then(result => setMyRoster(result))
      .then(result => fetchUserData(userId))
      .then(result => setUserData((prev) => {
        return {id: userId, name: prev.name, team_name: prev.team_name, score:prev.score, money: result.money}
      }));
  }

  return (
    <div className="routes_div">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/team" className="path_team_page" element={<Team 
          userData={userData}
          riderList={riderList}
          changeTeamName={changeTeamName}
          myRoster={myRoster}
          addToRoster={addToRoster}
          removeFromRoster={removeFromRoster}
        />} />
        <Route path="league" element={<League />} />
      </Routes>
    </div>
    
  );
}

export default App;
