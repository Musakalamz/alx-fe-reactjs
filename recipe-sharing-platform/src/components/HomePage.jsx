import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/data.json");
        const base = await res.json();
        const stored = JSON.parse(localStorage.getItem("recipes") || "[]");
        setRecipes([...base, ...stored]);
      } catch {
        const stored = JSON.parse(localStorage.getItem("recipes") || "[]");
        setRecipes(stored);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recipes</h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Recipe
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((r) => (
          <Link
            key={r.id}
            to={`/recipe/${r.id}`}
            className="bg-white rounded-lg shadow hover:shadow-md transition p-4"
          >
            {r.image && (
              <img
                src={r.image}
                alt={r.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            )}
            <div className="text-lg font-semibold">{r.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
