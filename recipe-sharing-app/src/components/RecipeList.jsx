import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div>
      {recipes.length === 0 && <p>No recipes yet. Add one above!</p>}
      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
          <h3 style={{ margin: 0 }}>{recipe.title}</h3>
          <p style={{ marginTop: 4 }}>{recipe.description}</p>
          <Link to={`/recipes/${recipe.id}`}>View details</Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;