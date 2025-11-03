import React, { useContext } from "react";
import UserContext from "../UserContext"; // adjust path if needed

function UserProfile() {
  const userData = useContext(UserContext);

  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h2 style={{ color: "blue" }}>Name: {userData.name}</h2>
      <p style={{ fontWeight: "bold" }}>Email: {userData.email}</p>
    </div>
  );
}

export default UserProfile;
