import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore((s) => s.favorites || []);
  const recipes = useRecipeStore((s) => s.recipes);

  const favoriteRecipes = (favorites || [])
    .map((id) => recipes.find((r) => r.id === id))
    .filter(Boolean);

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favoriteRecipes.map((recipe) => (
          <div key={recipe.id} style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
            <h3 style={{ margin: 0 }}>{recipe.title}</h3>
            <p style={{ marginTop: 4 }}>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;