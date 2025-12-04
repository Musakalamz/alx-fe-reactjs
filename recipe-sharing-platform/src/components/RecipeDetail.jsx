import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data.json";

function RecipeDetail() {
  const { id } = useParams();
  const recipe = useMemo(() => data.find((r) => String(r.id) === String(id)), [id]);

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-600">Recipe not found.</p>
        <Link to="/" className="text-blue-600">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="w-full h-56 object-cover" />
        <div className="p-6">
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <p className="text-gray-700 mt-2">{recipe.summary}</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded">
              <h2 className="text-lg font-semibold">Ingredients</h2>
              <ul className="mt-2 list-disc list-inside space-y-1">
                {recipe.ingredients?.map((item, idx) => (
                  <li key={idx} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h2 className="text-lg font-semibold">Instructions</h2>
              <ol className="mt-2 list-decimal list-inside space-y-2">
                {recipe.instructions?.map((step, idx) => (
                  <li key={idx} className="text-gray-700">{step}</li>
                ))}
              </ol>
            </div>
          </div>
          <Link to="/" className="inline-block mt-6 text-blue-600">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
