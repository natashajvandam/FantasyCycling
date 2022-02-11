import { IUser, fetchOptions, SimpleUser, IRider } from "../interfaces";
const backend = "http://localhost:3005";

const fetchRequest = async (path: string, options?: fetchOptions) => {
  //use await - async syntac with try catch
  return fetch(backend + path, options)
    .then((res) => (res.status < 400 ? res : Promise.reject(res))) //all errors 401, 404, 500 etc.
    .then((res) => (res.status !== 204 ? res.json() : res)) //204 is when you delete (aka, no body)
    .catch((err) => console.log(err));
};

const fetchUser = async (token: string) => {
  return fetch("https://dev-874owraq.us.auth0.com", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => (res.status < 400 ? res : Promise.reject(res)))
    .catch((err) => console.log(err));
};

async function getAllRiders(): Promise<IRider[]> {
  return fetchRequest("/allriders");
}

async function getTheUsers(): Promise<IUser[]> {
  return fetchRequest("/allUsers");
}

// async function createUser(body) {
//   return fetchRequest('/newTeam', {
//     method: 'POST',
//     body: JSON.stringify(body),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// }

async function changeNameOfTeam(userId: number, newName: string): Promise<any> {
  return fetchRequest(`/team/${userId}`, {
    method: "PUT",
    body: `{"newName": "${newName}"}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function addRider(
  userId: number,
  riderId: number,
  token: string | null
): Promise<any> {
  return fetchRequest(`/team/add/${userId}/${riderId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function removeRider(
  userId: number,
  riderId: number,
  token: string | null
): Promise<any> {
  return fetchRequest(`/team/delete/${userId}/${riderId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function fetchUserRoster(userId: number): Promise<any> {
  return fetchRequest(`/team/${userId}`);
}

async function fetchUserData(user: SimpleUser): Promise<IUser> {
  return fetchRequest(`/user/details`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export {
  getAllRiders,
  // createUser,
  addRider,
  removeRider,
  fetchUserRoster,
  fetchUserData,
  changeNameOfTeam,
  getTheUsers,
  fetchUser,
};
