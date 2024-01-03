/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'https://security-issues-backened.onrender.com/api/login'

const login = async (cred) => {
 try {
  console.log(document.cookie)
  const csrfCookie = document.cookie
  .split('; ')
  .find((cookie) => cookie.startsWith('XSRF-TOKEN='))
  if (!csrfCookie) {
    throw new Error('XSRF-TOKEN cookie not found');
  }
  const csrfToken = csrfCookie.split('=')[1];

  const response = await axios.post(baseUrl, cred,  {

    headers:{'XSRF-TOKEN': csrfToken,
    'Content-Type': 'application/json',},
    withCredentials: true,
    credentials: 'include',

  })
  console.log(response)
  return response.data
 } catch (error) {
  console.log(error)
  throw error
 }
 
}

export default { login }