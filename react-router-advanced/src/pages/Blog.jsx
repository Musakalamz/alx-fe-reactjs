import { NavLink } from 'react-router-dom'

const posts = [
  { id: '1', title: 'Getting Started with Routing' },
  { id: '2', title: 'Nested Routes Explained' },
  { id: '3', title: 'Protected Routes Patterns' },
]

export default function Blog() {
  return (
    <div>
      <h2>Blog</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <NavLink to={`/blog/${p.id}`}>{p.title}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

