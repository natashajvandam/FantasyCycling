
const backend = 'http://localhost:3005';

const fetchRequest = async (path, options) => {
  //use await - async syntac with try catch
  return fetch(backend + path, options)
  .then(res => res.status < 400 ? res : Promise.reject(res)) //all errors 401, 404, 500 etc.
  .then(res => res.status !== 204? res.json() : res) //204 is when you delete (aka, no body)
  .catch(err => console.log(err));
};

const fetchUser = async (token) => {
  return fetch('https://dev-874owraq.us.auth0.com/userinfo', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => res.status < 400 ? res: Promise.reject(res))
  .catch(err => console.log(err))
}

async function getAllRiders () {
  return fetchRequest('/allriders');
};

async function getTheUsers () {
  return fetchRequest('/allUsers');
}

async function createUser (body) {
  return fetchRequest('/newTeam', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

async function changeNameOfTeam (userId, newName) {
  return fetchRequest(`/team/${userId}`, {
    method: 'PUT',
    body: `{"newName": "${newName}"}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

async function addRider (userId, riderId, token) {
  return fetchRequest(`/team/add/${userId}/${riderId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

async function removeRider (userId, riderId, token) {
  return fetchRequest(`/team/delete/${userId}/${riderId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

async function fetchUserRoster (userId) {
  return fetchRequest(`/team/${userId}`);
}

async function fetchUserData (nickname) {
  return fetchRequest(`/team/details/${nickname}`);
}

export { getAllRiders, createUser, addRider, removeRider, fetchUserRoster, fetchUserData, changeNameOfTeam, getTheUsers, fetchUser};