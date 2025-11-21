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

export async function searchUsers({ query, location, minRepos, page = 1, perPage = 30 }) {
  const parts = []
  if (query) parts.push(query)
  if (location) parts.push(`location:${location}`)
  if (minRepos) parts.push(`repos:>=${minRepos}`)
  const q = parts.join(' ').trim()
  if (!q) return { data: { users: [], totalCount: 0 } }
  try {
    const res = await client.get('/search/users', { params: { q, per_page: perPage, page } })
    const items = res?.data?.items || []
    const details = await Promise.all(
      items.map((u) => client.get(`/users/${u.login}`).then((r) => r.data).catch(() => null))
    )
    const users = items.map((u, i) => {
      const d = details[i]
      return {
        login: d?.login ?? u.login,
        avatar_url: d?.avatar_url ?? u.avatar_url,
        html_url: d?.html_url ?? u.html_url,
        name: d?.name ?? null,
        location: d?.location ?? null,
        public_repos: d?.public_repos ?? null,
      }
    })
    return { data: { users, totalCount: res?.data?.total_count ?? users.length } }
  } catch (err) {
    const status = err?.response?.status
    if (status === 404) return { data: { users: [], totalCount: 0 }, error: 'not_found' }
    if (status === 403) return { data: { users: [], totalCount: 0 }, error: 'rate_limited' }
    return { data: { users: [], totalCount: 0 }, error: 'network_error' }
  }
}