import axios from 'axios'

export const api = axios.create({
  baseURL: `${import.meta.env.REACT_APP_API_URL}api/`,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  const finalConfig = token
    ? {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${token}` },
      }
    : config

  return finalConfig
}, Promise.reject)

export default api
