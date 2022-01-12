import './App.css';
import League from './Pages/League/league';
import Login from './Pages/Login/login';
import Team from './Pages/Team/team';
import * as React from "react";

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
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="team" element={<Team />} />
        <Route path="league" element={<League />} />
      </Routes>
    </div>
    
  );
}

export default App;
