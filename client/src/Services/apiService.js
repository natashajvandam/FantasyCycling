const backend = 'http://localhost:3005';

const fetchRequest = async (path, options) => {
  return fetch(backend + path, options)
  .then(res => res.status < 400 ? res : Promise.reject(res)) //all errors 401, 404, 500 etc.
  .then(res => res.status !== 204? res.json() : res) //204 is when you delete (aka, no body)
  .catch(err => console.log(err));
};

async function getAllRiders () {
  return fetchRequest('/allriders');
};

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

async function addRider (userId, riderId) {
  return fetchRequest(`/team/add/${userId}/${riderId}`, {method: 'PUT'});
}

async function removeRider (userId, riderId) {
  return fetchRequest(`/team/delete/${userId}/${riderId}`, {method: 'PUT'});
}

async function fetchUserRoster (userId) {
  return fetchRequest(`/team/${userId}`);
}

async function fetchUserData (userId) {
  return fetchRequest(`/team/details/${userId}`);
}

export { getAllRiders, createUser, addRider, removeRider, fetchUserRoster, fetchUserData, changeNameOfTeam};