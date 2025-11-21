import axios from 'axios'

const token = import.meta.env.VITE_APP_GITHUB_API_KEY

const client = axios.create({
  baseURL: 'https://api.github.com',
  headers: token ? { Authorization: `Bearer ${token}` } : undefined,
})

export async function fetchUserData(username) {
  if (!username) return { data: null }
  try {
    const res = await client.get(`/users/${encodeURIComponent(username)}`)
    return { data: res.data }
  } catch (err) {
    const status = err?.response?.status
    if (status === 404) return { data: null, error: 'not_found' }
    return { data: null, error: 'network_error' }
  }
}