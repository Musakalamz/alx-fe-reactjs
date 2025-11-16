import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ recipeId, onDeleted }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    if (typeof onDeleted === 'function') {
      onDeleted();
    } else {
      navigate('/');
    }
  };

  return (
    <button onClick={handleDelete} style={{ backgroundColor: '#d33', color: '#fff' }}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;