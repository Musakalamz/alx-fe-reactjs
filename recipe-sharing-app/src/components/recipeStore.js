import create from 'zustand';

const computeFiltered = (recipes, term) => {
  const q = term.trim().toLowerCase();
  if (!q) return recipes;
  return recipes.filter((recipe) => {
    const title = (recipe.title || '').toLowerCase();
    const description = (recipe.description || '').toLowerCase();
    // Extend here to include ingredients or prep time if those fields exist.
    return title.includes(q) || description.includes(q);
  });
};

// Simple content-based recommendation using title/description keywords of favorites
const computeRecommendations = (recipes, favorites) => {
  if (!favorites || favorites.length === 0) return [];
  const favoriteSet = new Set(favorites);
  const favoriteTexts = recipes
    .filter((r) => favoriteSet.has(r.id))
    .map((r) => `${(r.title || '').toLowerCase()} ${(r.description || '').toLowerCase()}`)
    .join(' ');
  const tokens = new Set(favoriteTexts.split(/\W+/).filter((t) => t.length > 2));

  return recipes
    .filter((r) => !favoriteSet.has(r.id))
    .map((r) => {
      const text = `${(r.title || '').toLowerCase()} ${(r.description || '').toLowerCase()}`;
      const score = [...tokens].reduce((acc, t) => (text.includes(t) ? acc + 1 : acc), 0);
      return { recipe: r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((x) => x.recipe);
};

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],
  addFavorite: (recipeId) => {
    const { favorites, recipes } = get();
    if (favorites.includes(recipeId)) return;
    const nextFavs = [...favorites, recipeId];
    set({
      favorites: nextFavs,
      recommendations: computeRecommendations(recipes, nextFavs),
    });
  },
  removeFavorite: (recipeId) => {
    const { favorites, recipes } = get();
    const nextFavs = favorites.filter((id) => id !== recipeId);
    set({
      favorites: nextFavs,
      recommendations: computeRecommendations(recipes, nextFavs),
    });
  },
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    set({ recommendations: computeRecommendations(recipes, favorites) });
  },
  setRecipes: (recipes) => {
    const { favorites } = get();
    set({
      recipes,
      recommendations: computeRecommendations(recipes, favorites),
    });
  },
  deleteRecipe: (id) => {
    const { recipes, favorites } = get();
    const nextRecipes = recipes.filter((r) => r.id !== id);
    const nextFavs = favorites.filter((fid) => fid !== id);
    set({
      recipes: nextRecipes,
      favorites: nextFavs,
      recommendations: computeRecommendations(nextRecipes, nextFavs),
    });
  },
  updateRecipe: (updated) => {
    const { recipes, favorites } = get();
    const nextRecipes = recipes.map((r) => (r.id === updated.id ? updated : r));
    set({
      recipes: nextRecipes,
      recommendations: computeRecommendations(nextRecipes, favorites),
    });
  },
  filterRecipes: () => {
    const state = get();
    set({
      filteredRecipes: computeFiltered(state.recipes, state.searchTerm),
    });
  },
}));