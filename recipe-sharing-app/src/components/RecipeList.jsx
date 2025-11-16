import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

function RecipeList() {
  const recipes = useRecipeStore((s) => s.recipes);
  const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const filterRecipes = useRecipeStore((s) => s.filterRecipes);

  useEffect(() => {
    filterRecipes();
  }, [recipes, searchTerm, filterRecipes]);

  return (
    <div>
      {filteredRecipes.length === 0 && <p>No recipes yet. Add one above!</p>}
      {filteredRecipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{ borderBottom: "1px solid #ddd", padding: "8px 0" }}
        >
          <h3 style={{ margin: 0 }}>{recipe.title}</h3>
          <p style={{ marginTop: 4 }}>{recipe.description}</p>
          <Link to={`/recipes/${recipe.id}`}>View details</Link>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
