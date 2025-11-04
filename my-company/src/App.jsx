import { BrowserRouter, Router, Route, Routes, Link } from "react-router-dom";
import About from "./About";
import Contact from "./components/Contact";
import Home from "./Home";
import Services from "./Services";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />

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
