const backend = 'http://localhost:3005';

const fetchRequest = (path, options) => {
  return fetch(backend + path, options)
  .then(res => res.status < 400 ? res : Promise.reject(res)) //all errors 401, 404, 500 etc.
  .then(res => res.status !== 204? res.json() : res) //204 is when you delete (aka, no body)
  .catch(err => console.log(err));
};

function getTopics () {
  return fetchRequest('/allriders');
};

module.exports = { getTopics };