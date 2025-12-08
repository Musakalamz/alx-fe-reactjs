import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/data.json");
        const base = await res.json();
        const stored = JSON.parse(localStorage.getItem("recipes") || "[]");
        const all = [...base, ...stored];
        const found = all.find((r) => String(r.id) === String(id));
        setRecipe(found || null);
      } catch {
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return <div className="max-w-3xl mx-auto p-6">Loading...</div>;
  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-red-600 font-semibold mb-4">Recipe not found</div>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline">
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold mt-2 mb-4">{recipe.title}</h1>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc pl-6 space-y-1">
          {(recipe.ingredients || []).map((ing, i) => (
            <li key={i} className="text-gray-700">
              {ing}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-3">Steps</h2>
        <ol className="list-decimal pl-6 space-y-2">
          {(recipe.steps || []).map((step, i) => (
            <li key={i} className="text-gray-700">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
