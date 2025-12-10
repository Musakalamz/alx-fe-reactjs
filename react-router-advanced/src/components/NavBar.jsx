import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/context.js";

export default function NavBar() {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ display: "flex", gap: 12, paddingBottom: 16 }}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/blog/1">Sample Post</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </nav>
  );
}
