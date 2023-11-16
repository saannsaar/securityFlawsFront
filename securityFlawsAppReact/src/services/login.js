/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'https://security-issues-backened.onrender.com/api/login'

const login = async (cred) => {
  const response = await axios.post(baseUrl, cred)
  return response.data
}

export default { login }