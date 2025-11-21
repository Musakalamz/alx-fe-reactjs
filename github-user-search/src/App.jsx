import "./App.css";
import Search from "./components/Search.jsx";

function App() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28 }}>GitHub User Search</h1>
      </header>
      <section>
        <Search />
      </section>
    </main>
  );
}

export default App;
