import './league.scss';
import UserList from '../../Components/userList/userList.js';
import Header from '../../Components/header/header.js';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { fetchUserData } from '../../Services/apiService.js';
import { IUser } from '../../interfaces';
import React from 'react';

type Props = {
  userList: IUser[];
};

function League({ userList }: Props) {
  const { user, getAccessTokenSilently } = useAuth0<any>();
  const [userData, setUserData] = useState<IUser>({
    id: 0,
    email: '',
    nickname: '',
    score: 0,
    money: 0,
  });

  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        fetchUserData(user).then((response: IUser) => {
          setUserData(response);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <div className='league_page'>
      <Header userData={userData} link_route={'home'} />
      <div className='flex_box_title'>
        <h1 className='page_title'>fantacy league</h1>
      </div>
      <div className='league_page'>
        <UserList userList={userList} userData={userData} />
      </div>
    </div>
  );
}

export default League;
