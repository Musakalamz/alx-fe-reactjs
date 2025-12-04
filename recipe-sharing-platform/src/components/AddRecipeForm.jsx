import { useState } from "react";
import { Link } from "react-router-dom";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next = {};
    if (!title.trim()) next.title = "Title is required";
    if (!ingredients.trim()) next.ingredients = "Ingredients are required";
    if (!steps.trim()) next.steps = "Preparation steps are required";
    const ingList = ingredients.split("\n").map((i) => i.trim()).filter(Boolean);
    if (ingList.length < 2) next.ingredients = "Add at least two ingredients";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Recipe</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Recipe title"
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border rounded px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="One ingredient per line"
          />
          {errors.ingredients && <p className="text-red-600 text-sm mt-1">{errors.ingredients}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Preparation Steps</label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full border rounded px-3 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="One step per line"
          />
          {errors.steps && <p className="text-red-600 text-sm mt-1">{errors.steps}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      {submitted && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-green-700">Recipe submitted successfully.</p>
        </div>
      )}
      <Link to="/" className="inline-block mt-6 text-blue-600">Back to Home</Link>
    </div>
  );
}

export default AddRecipeForm;
