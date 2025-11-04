import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import Services from "./Services";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const navStyles = {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItens: "center",
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
    <BrowserRouter>
      <div>
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

        <div style={{ marginTop: "60px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
