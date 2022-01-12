import './App.css';
import League from './Pages/League/league';
import Login from './Pages/Login/login';
import Team from './Pages/Team/team';
//import * as React from "react";

import { useState, useEffect } from 'react';
import { getAllRiders, createUser } from './ApiClient';

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
  const [userData, setUserData] = useState({id:1, name:'natashajv', team_name:'a cool roster name', score:0, money:500 })

  useEffect(() => {
    getAllRiders().then(result => setRiderList(result));
  }, []);

  function changeTeamName (userId, newName) {
    setUserData({id: userId, name: userData.name, team_name: newName, score:userData.score});
  }

  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Team />} />
        <Route path="league" element={<League />} />
      </Routes>
    </div>
    
  );
}

export default App;
