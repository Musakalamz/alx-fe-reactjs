import { NavLink, useParams } from 'react-router-dom'

export default function BlogPost() {
  const { id } = useParams()
  return (
    <div>
      <h3>Blog Post {id}</h3>
      <p>This post is rendered via a dynamic route.</p>
      <NavLink to="/blog">Back to Blog</NavLink>
    </div>
  )
}

