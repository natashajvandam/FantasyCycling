import './home.scss';
import List from '../../Components/list/list';
import Header from '../../Components/header/header';
import Form from '../../Components/form/form';
import { useState } from 'react';

import { useAuth0 } from "@auth0/auth0-react";

function Home ({riderList, myRoster, addToRoster, removeFromRoster, userData, setSearchList, searchList}) {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);



  const filterList = (query) => {
    if (query) {
      const filteredList = riderList.filter(rider => rider.name.toLowerCase().includes(query.toLowerCase()));
      setSearchList(filteredList);
    } 
  } 

   
  



  if (isLoading) {
    return <div>loading...</div>
  }
  return (
    (isAuthenticated &&
    <div className="home_page"> 
    <div>
    <Header 
        userData={userData}
        link_route={'league'}
      />
    </div>
    <div className="body_home_page">
      <div className="my_rider_list">
        <h1 className="list_title">{user.nickname}</h1>
        <List 
          mine={true}
          riderList={myRoster}
          addToRoster={addToRoster}
          removeFromRoster={removeFromRoster}
        />
      </div>
      
        <div className="full_rider_list_heading">
          <h1 className="list_title">pro cycling riders</h1>
          <Form filterList={filterList} />
        </div>
      <div className="full_rider_list">
        <List
          mine={false}
          riderList={searchList}
          addToRoster={addToRoster}
          removeFromRoster={removeFromRoster}
        />
      </div>

    </div>
    </div>
    )
  )
}

export default Home;