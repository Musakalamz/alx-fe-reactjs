import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRecipeForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const ing = ingredientsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const steps = stepsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const errs = {};
    if (!title.trim()) errs.title = "Title is required";
    if (ing.length < 2)
      errs.ingredientsText = "Provide at least two ingredients";
    if (steps.length < 1) errs.stepsText = "Provide at least one step";
    setErrors(errs);
    return { valid: Object.keys(errs).length === 0, ing, steps };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { valid, ing, steps } = validate();
    if (!valid) return;
    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      image: "",
      ingredients: ing,
      steps,
    };
    const existing = JSON.parse(localStorage.getItem("recipes") || "[]");
    const updated = [newRecipe, ...existing];
    localStorage.setItem("recipes", JSON.stringify(updated));
    navigate(`/recipe/${newRecipe.id}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Recipe title"
          />
          {errors.title && (
            <div className="text-red-600 text-sm mt-1">{errors.title}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ingredients</label>
          <textarea
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 h-32 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="One ingredient per line"
          />
          {errors.ingredientsText && (
            <div className="text-red-600 text-sm mt-1">
              {errors.ingredientsText}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Preparation Steps
          </label>
          <textarea
            value={stepsText}
            onChange={(e) => setStepsText(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 h-32 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="One step per line"
          />
          {errors.stepsText && (
            <div className="text-red-600 text-sm mt-1">{errors.stepsText}</div>
          )}
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
