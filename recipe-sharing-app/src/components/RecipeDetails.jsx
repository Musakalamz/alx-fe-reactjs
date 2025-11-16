import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = useMemo(() => Number(id), [id]);
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId));
  const navigate = useNavigate();

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ marginBottom: 8 }}>{recipe.title}</h1>
      <p style={{ marginBottom: 8 }}><strong>ID:</strong> {recipe.id}</p>
      <p style={{ marginBottom: 16 }}>{recipe.description}</p>

      <h2>Edit Recipe</h2>
      <EditRecipeForm recipeId={recipeId} />

      <div style={{ marginTop: 16 }}>
        <DeleteRecipeButton recipeId={recipeId} onDeleted={() => navigate('/')} />
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/">Back to list</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;