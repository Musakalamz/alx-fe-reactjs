import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import FavoriteToggleButton from './FavoriteToggleButton';

function RecipeList() {
  const { recipes, filteredRecipes, filterRecipes, searchTerm } = useRecipeStore((state) => ({
    recipes: state.recipes,
    filteredRecipes: state.filteredRecipes,
    filterRecipes: state.filterRecipes,
    searchTerm: state.searchTerm,
  }));

  useEffect(() => {
    filterRecipes();
  }, [recipes, searchTerm, filterRecipes]);

  return (
    <div>
      {filteredRecipes.length === 0 && <p>No matching recipes.</p>}
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id} style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
          <h3 style={{ margin: 0 }}>{recipe.title}</h3>
          <p style={{ marginTop: 4 }}>{recipe.description}</p>
          <FavoriteToggleButton recipeId={recipe.id} />
          <Link to={`/recipes/${recipe.id}`}>View details</Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;