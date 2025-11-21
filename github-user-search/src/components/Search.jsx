import { useState } from "react";
import { searchUsers, fetchUserData } from "../services/githubService";

function Search() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  async function runSearch(nextPage = 1, append = false) {
    setLoading(true);
    setError(null);
    const q = query.trim();
    const loc = location.trim();
    const min = minRepos ? Number(minRepos) : undefined;

    let data, error;
    if (nextPage === 1 && q && !loc && !min) {
      const res = await fetchUserData(q);
      data = res.data
        ? { totalCount: 1, users: [res.data] }
        : { totalCount: 0, users: [] };
      error = res.error || null;
    } else {
      const res = await searchUsers({
        query: q,
        location: loc,
        minRepos: min,
        page: nextPage,
        perPage: 30,
      });
      data = res.data;
      error = res.error || null;
    }

    setLoading(false);
    if (error) {
      setError("Looks like we cant find the user");
      return;
    }
    setHasSearched(true);
    setTotalCount(data?.totalCount || 0);
    const list = data?.users || [];
    setResults(append ? [...results, ...list] : list);
    setPage(nextPage);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await runSearch(1, false);
  }

  async function handleLoadMore() {
    await runSearch(page + 1, true);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 mb-4"
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search keyword or username"
          className="md:col-span-2 px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          min="0"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Min repos"
          className="px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="md:col-span-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {!loading && error && <p className="text-red-600">{error}</p>}

      {!loading && !error && hasSearched && results.length === 0 && (
        <p>No users found</p>
      )}

      {!loading && !error && results.length > 0 && (
        <ul className="space-y-3">
          {results.map((u) => (
            <li
              key={u.login}
              className="flex items-center gap-4 p-4 border rounded"
            >
              <img
                src={u.avatar_url}
                alt={u.login}
                width={64}
                height={64}
                className="rounded"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg">{u.name || u.login}</div>
                <div className="text-sm text-gray-600">
                  {u.location ? `Location: ${u.location}` : "Location: N/A"} ·{" "}
                  {u.public_repos != null
                    ? `Repos: ${u.public_repos}`
                    : "Repos: N/A"}
                </div>
                <a
                  href={u.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600"
                >
                  View GitHub Profile
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!loading &&
        !error &&
        results.length > 0 &&
        results.length < totalCount && (
          <div className="mt-4">
            <button
              onClick={handleLoadMore}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded"
            >
              Load more
            </button>
          </div>
        )}
    </div>
  );
}

export default Search;
