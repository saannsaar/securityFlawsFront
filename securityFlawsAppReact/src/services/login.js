/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/login'

const login = async (cred) => {

  console.log(document.cookie)
  const csrfToken = document.cookie
  .split('; ')
  .find((cookie) => cookie.startsWith('XSRF-TOKEN='))
  .split('=')[1];

  const config = {
    headers: {'XSRF-TOKEN': csrfToken}
  }

  console.log(config)
  const response = await axios.post(baseUrl, cred,  {
    headers:{'XSRF-TOKEN': csrfToken,
    'Content-Type': 'application/json',},
    withCredentials: true,
    credentials: 'include',

  })
  return response.data
}

export default { login }