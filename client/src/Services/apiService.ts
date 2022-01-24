/* eslint-disable import/extensions */

const backend = 'http://127.0.0.1:3005'

type Options = {
  method: string
  headers: {
    [key: string]: string
  }
  body?: string
}

const fetchRequest = async (path: string, options?: Options) =>
  // use await - async syntac with try catch
  fetch(backend + path, options)
    .then((res) => (res.status < 400 ? res : Promise.reject(res))) // all errors 401, 404, 500 etc.
    .then((res) => (res.status !== 204 ? res.json() : res)) // 204 is when you delete (aka, no body)
    .catch((err) => {
      throw new Error(err)
    })

const fetchUser = async (token: string) =>
  fetch('https:/dev-sfbx-116.us.auth0.com/userinfo', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .catch((err) => {
      throw new Error(err)
    })

async function getAllRiders() {
  return fetchRequest('/allriders')
}

async function getTheUsers() {
  return fetchRequest('/allUsers')
}

async function createUser(body: { email?: string; nickname?: string; password: string }) {
  return fetchRequest('/newTeam', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: ''
    }
  }).catch((err) => {
    throw new Error(err)
  })
}

async function changeNameOfTeam(userId: number, newName: string) {
  return fetchRequest(`/team/${userId}`, {
    method: 'PUT',
    body: `{"newName": "${newName}"}`,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

async function addRider(userId: number, riderId: number, token: string) {
  return fetchRequest(`/team/add/${userId}/${riderId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

async function removeRider(userId: number, riderId: number, token: string) {
  return fetchRequest(`/team/delete/${userId}/${riderId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

async function fetchUserRoster(userId: number) {
  return fetchRequest(`/team/${userId}`)
}

async function fetchUserData(nickname?: string) {
  return fetchRequest(`/team/details/${nickname}`)
}

export {
  getAllRiders,
  createUser,
  addRider,
  removeRider,
  fetchUserRoster,
  fetchUserData,
  changeNameOfTeam,
  getTheUsers,
  fetchUser
}
