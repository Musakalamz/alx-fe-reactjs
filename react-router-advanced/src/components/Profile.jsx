import { NavLink, Outlet } from 'react-router-dom'

export default function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <NavLink to="">Details</NavLink>
        <NavLink to="settings">Settings</NavLink>
      </div>
      <Outlet />
    </div>
  )
}

