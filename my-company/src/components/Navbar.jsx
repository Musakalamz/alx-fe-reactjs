import { Link } from "react-router-dom";

export default function Navbar() {
  const navStyles = {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    aligbItens: "center",
    backgroundColor: "#333",
    padding: "15px",
  };

  const linkStyles = {
    color: "white",
    margin: "0 15px",
    fontWeight: "bold",
    textDecoration: "none",
  };

  return (
    <nav style={navStyles}>
      <Link to="/" style={linkStyles}>
        Home
      </Link>
      <Link to="/about" style={linkStyles}>
        About
      </Link>
      <Link to="/services" style={linkStyles}>
        Services
      </Link>
      <Link to="/contact" style={linkStyles}>
        Contact
      </Link>
    </nav>
  );
}
