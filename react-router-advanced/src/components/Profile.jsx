import { NavLink, Routes, Route } from "react-router-dom";
import ProfileDetails from "../pages/ProfileDetails.jsx";
import ProfileSettings from "../pages/ProfileSettings.jsx";

export default function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <NavLink to="">Details</NavLink>
        <NavLink to="settings">Settings</NavLink>
      </div>
      <Routes>
        <Route index element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}
