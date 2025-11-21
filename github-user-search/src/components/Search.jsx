import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const username = input.trim();
    if (!username) return;
    setLoading(true);
    setError(null);
    setUser(null);
    const { data, error } = await fetchUserData(username);
    setLoading(false);
    if (error) {
      setError("Looks like we cant find the user");
      return;
    }
    setUser(data);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter GitHub username"
          style={{ flex: 1, padding: 10, fontSize: 16 }}
        />
        <button type="submit" style={{ padding: "10px 16px", fontSize: 16 }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {!loading && error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && user && (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img
            src={user.avatar_url}
            alt={user.login}
            width={80}
            height={80}
            style={{ borderRadius: 8 }}
          />
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              {user.name || user.login}
            </div>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
