/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'https://security-issues-backened.onrender.com/api/diaries'

// Initialize the token as null first
// let token = null

// Initialize the token when logged in and get the hashed password
// const setToken = newToken => {
//   token = `bearer ${newToken}`
// }


const getAll = (user) => {
    // const config = {
    //     headers: { Authorization: token },
    //   }
    // Should send config with the get method

    const csrfToken = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('XSRF-TOKEN='))
    .split('=')[1];
  

  const request = axios.get(baseUrl, user, {
    headers:{'XSRF-TOKEN': csrfToken,
    'Content-Type': 'application/json',},
    withCredentials: true,
    credentials: 'include',

  })
  return request.then(response => response.data)
}

const create = async newObject => {
  const csrfToken = document.cookie
  .split('; ')
  .find((cookie) => cookie.startsWith('XSRF-TOKEN='))
  .split('=')[1];
  console.log('diaries.js')
  // const config = {
  //   headers: { Authorization: token },
  // }
  // Should send config with the post method
  const response = await axios.post(baseUrl, newObject, {
    headers:{'XSRF-TOKEN': csrfToken,
    'Content-Type': 'application/json',},
    withCredentials: true,
    credentials: 'include',

  })
  return response.data
}

const update = async (id, newObject) => {
  console.log(newObject)
  // const config = {
  //   headers: { Authorization: token },
  // }
  // Should send the config with the put method
  const address = baseUrl.concat('/').concat(id)


  const request = axios.put(address, newObject)
  return request.then(response => response.data)
}

const remove = async (id) => {
  // const config = {
  //   headers: { Authorization: token },
  // }
  // Should send the config with the delete method
  const address = baseUrl.concat('/').concat(id)

  const response = await axios.delete(address)
  return response.data
}


export default { getAll, create, update, remove }