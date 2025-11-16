const DeleteRecipeButton = ({ recipeId, onDeleted }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);

  const handleDelete = () => {
    deleteRecipe(recipeId);
    if (typeof onDeleted === 'function') onDeleted();
  };

  return (
    <button onClick={handleDelete} style={{ backgroundColor: '#d33', color: '#fff' }}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;