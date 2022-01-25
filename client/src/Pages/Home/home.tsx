import './home.scss';
import List from '../../Components/list/list';
import Header from '../../Components/header/header';
import Form from '../../Components/form/form';
import { useState, useEffect } from 'react';
import {
  fetchUserRoster,
  addRider,
  fetchUserData,
  removeRider,
} from '../../Services/apiService';
import { useAuth0, User } from '@auth0/auth0-react';
import React from 'react';
import { IResponse, IRider, IUser } from '../../interfaces';

type HomeProps = {
  riderList: IRider[];
  setSearchList: React.Dispatch<React.SetStateAction<IRider[]>>;
  searchList: IRider[];
  booleanObj: { [k: number]: boolean };
  setBooleanObj: React.Dispatch<React.SetStateAction<{ [k: number]: boolean }>>;
};

const Home: React.FC<HomeProps> = ({
  riderList,
  setSearchList,
  searchList,
  booleanObj,
  setBooleanObj,
}) => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0<User>();
  const [token, setToken] = useState<string | null>(null);
  const [myRoster, setMyRoster] = useState<IRider[]>([]);
  const [userData, setUserData] = useState<IUser | null>(null);

  const filterList = (query: string) => {
    if (query) {
      const filteredList = riderList.filter((rider) =>
        rider.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchList(filteredList);
    }
  };

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: 'read:current_user',
        });
        setToken(accessToken);
        user &&
          fetchUserData(user)
            .then((response: IUser) => {
              if (response) {
                setUserData(response);
                return fetchUserRoster(response.id);
              }
            })
            .then((result: IRider[]) => {
              setMyRoster(result);
            });
      } catch (err) {
        console.log(err);
      }
    };
    getUserMetadata();
  }, [getAccessTokenSilently, user]);

  async function addToRoster(
    userId: number,
    riderId: number
  ): Promise<IResponse> {
    const serverResponse: IResponse = await addRider(userId, riderId, token);
    if (userData) {
      fetchUserData(userData).then((result: IUser) =>
        setUserData((prev) => {
          if (prev !== null) {
            return { ...prev, money: result.money };
          } else {
            return null;
          }
        })
      );
      fetchUserRoster(userData.id).then((result: IRider[]) => {
        setMyRoster(result);
      });
    }
    return serverResponse;
  }

  async function removeFromRoster(
    userId: number,
    riderId: number
  ): Promise<void> {
    await removeRider(userId, riderId, token);
    if (userData) {
      fetchUserData(userData).then((result: IUser) =>
        setUserData((prev) => {
          if (prev !== null) {
            return { ...prev, money: result.money };
          } else {
            return null;
          }
        })
      );
      fetchUserRoster(userData.id).then((result: IRider[]) => {
        setMyRoster(result);
      });
    }
  }

  return (
    <>
      {isLoading ? <>loading...</> : null}

      {isAuthenticated && user ? (
        <div className='home_page'>
          <>
            {userData && <Header userData={userData} link_route={'league'} />}
          </>
          <div className='body_home_page'>
            <div className='my_rider_list'>
              <h1 className='list_title'>{user.nickname}</h1>
              <List
                mine={true}
                riderList={myRoster}
                addToRoster={addToRoster}
                removeFromRoster={removeFromRoster}
                user={user}
                userData={userData}
                booleanObj={booleanObj}
                setBooleanObj={setBooleanObj}
              />
            </div>

            <div className='full_rider_list_heading'>
              <h1 className='list_title'>pro cycling riders</h1>
              <Form filterList={filterList} />
            </div>
            <div className='full_rider_list'>
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
      ) : (
        !isLoading && !isAuthenticated && <h2>User not authenticated</h2>
      )}
    </>
  );
};

export default Home;
