import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import Post from './pages/Post.jsx'
import Profile from './components/Profile.jsx'
import ProfileDetails from './pages/ProfileDetails.jsx'
import ProfileSettings from './pages/ProfileSettings.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:postId" element={<Post />} />
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />}>
              <Route index element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
