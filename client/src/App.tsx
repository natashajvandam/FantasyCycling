import './App.scss';
import League from './Pages/League/league';
import Home from './Pages/Home/home';
import { useState, useEffect } from 'react';
import { getAllRiders, getTheUsers } from './Services/apiService';
import { useAuth0, User } from '@auth0/auth0-react';
import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { IRider, IUser } from './interfaces';

const App: React.FC = () => {
  const [riderList, setRiderList] = useState<IRider[]>([]);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [searchList, setSearchList] = useState<IRider[]>([]);
  const [booleanObj, setBooleanObj] = useState<{ [k: number]: boolean }>([]);
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0<User>();


  useEffect(() => {
    getTheUsers().then((result: IUser[]) => setUserList(result));
    getAllRiders().then((result: IRider[]) => {
      setSearchList(result);
      setRiderList(result);
      const newBoolObj: { [k: number]: boolean } = {};
      result.forEach((el: IRider) => {
        newBoolObj[el.id] = el.added_at ? true : false;
      });
      setBooleanObj(newBoolObj);
    });
  }, []);

  return (
    <div className='routes_div'>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated && !isLoading ? (
              <Navigate to='/home' />
            ) : (
              !isAuthenticated && !isLoading && loginWithRedirect()
            )
          }
        />
        <Route
          path='/home'
          element={
            <Home
              setSearchList={setSearchList}
              riderList={riderList}
              searchList={searchList}
              booleanObj={booleanObj}
              setBooleanObj={setBooleanObj}
            />
          }
        />
        <Route path='league' element={<League userList={userList} />} />
      </Routes>
    </div>
  );
};

export default App;
