import React from "react";

function Footer() {
  const footerStyle = {
    backgroundColor: "#333",
    color: "white",
    textAlign: "center",
    padding: "15px 0",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
  };

  return (
    <footer style={footerStyle}>
      <p>© {new Date().getFullYear()} My Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;