import { NavLink, useParams } from 'react-router-dom'

const content = {
  '1': 'Intro to routing with basic examples.',
  '2': 'How to structure nested routes effectively.',
  '3': 'Strategies to protect routes with auth checks.',
}

export default function Post() {
  const { postId } = useParams()
  const body = content[postId] || 'Post not found.'
  return (
    <div>
      <h3>Post {postId}</h3>
      <p>{body}</p>
      <NavLink to="/blog">Back to Blog</NavLink>
    </div>
  )
}

