import { useQuery } from '@tanstack/react-query'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

async function fetchPosts() {
  const res = await fetch(POSTS_URL)
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  return res.json()
}

export default function PostsComponent() {
  const {
    data,
    error,
    isPending,
    isFetching,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  })

  if (isPending) {
    return <div>Loading posts...</div>
  }

  if (error) {
    return <div>Something went wrong</div>
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button onClick={() => refetch()}>Refetch</button>
        {isFetching && <span>Updating…</span>}
        <span>
          Last updated: {new Date(dataUpdatedAt || Date.now()).toLocaleTimeString()}
        </span>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        {data.slice(0, 20).map((post) => (
          <li
            key={post.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: '0.75rem',
              marginBottom: '0.75rem',
              background: '#fafafa',
            }}
          >
            <h3 style={{ margin: 0 }}>{post.title}</h3>
            <p style={{ margin: '0.5rem 0 0' }}>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
