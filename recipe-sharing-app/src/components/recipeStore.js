import { create } from "zustand";

const computeFiltered = (recipes, term) => {
  const q = (term || "").trim().toLowerCase();
  if (!q) return recipes;
  return recipes.filter((r) => {
    const title = (r.title || "").toLowerCase();
    const description = (r.description || "").toLowerCase();
    return title.includes(q) || description.includes(q);
  });
};

const computeRecommendations = (recipes, favorites) => {
  if (!favorites || favorites.length === 0) return [];
  const favSet = new Set(favorites);
  const favText = recipes
    .filter((r) => favSet.has(r.id))
    .map(
      (r) =>
        `${(r.title || "").toLowerCase()} ${(
          r.description || ""
        ).toLowerCase()}`
    )
    .join(" ");
  const tokens = new Set(favText.split(/\W+/).filter((t) => t.length > 2));

  return recipes
    .filter((r) => !favSet.has(r.id))
    .map((r) => {
      const text = `${(r.title || "").toLowerCase()} ${(
        r.description || ""
      ).toLowerCase()}`;
      const score = [...tokens].reduce(
        (acc, t) => (text.includes(t) ? acc + 1 : acc),
        0
      );
      return { recipe: r, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((x) => x.recipe);
};

export const useRecipeStore = create((set, get) => ({
  // Base state
  recipes: [],
  searchTerm: "",
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  // CRUD
  addRecipe: (newRecipe) => {
    const { recipes, searchTerm, favorites } = get();
    const next = [...recipes, newRecipe];
    set({
      recipes: next,
      filteredRecipes: computeFiltered(next, searchTerm),
      recommendations: computeRecommendations(next, favorites),
    });
  },
  setRecipes: (recipes) => {
    const { searchTerm, favorites } = get();
    set({
      recipes,
      filteredRecipes: computeFiltered(recipes, searchTerm),
      recommendations: computeRecommendations(recipes, favorites),
    });
  },
  updateRecipe: (updated) => {
    const { recipes, searchTerm, favorites } = get();
    const next = recipes.map((r) => (r.id === updated.id ? updated : r));
    set({
      recipes: next,
      filteredRecipes: computeFiltered(next, searchTerm),
      recommendations: computeRecommendations(next, favorites),
    });
  },
  deleteRecipe: (id) => {
    const { recipes, searchTerm, favorites } = get();
    const nextRecipes = recipes.filter((r) => r.id !== id);
    const nextFavorites = favorites.filter((fid) => fid !== id);
    set({
      recipes: nextRecipes,
      filteredRecipes: computeFiltered(nextRecipes, searchTerm),
      favorites: nextFavorites,
      recommendations: computeRecommendations(nextRecipes, nextFavorites),
    });
  },

  // Search
  setSearchTerm: (term) => {
    const { recipes } = get();
    set({
      searchTerm: term,
      filteredRecipes: computeFiltered(recipes, term),
    });
  },
  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    set({ filteredRecipes: computeFiltered(recipes, searchTerm) });
  },

  // Favorites & recommendations
  addFavorite: (recipeId) => {
    const { favorites, recipes } = get();
    if (favorites.includes(recipeId)) return;
    const nextFavorites = [...favorites, recipeId];
    set({
      favorites: nextFavorites,
      recommendations: computeRecommendations(recipes, nextFavorites),
    });
  },
  removeFavorite: (recipeId) => {
    const { favorites, recipes } = get();
    const nextFavorites = favorites.filter((fid) => fid !== recipeId);
    set({
      favorites: nextFavorites,
      recommendations: computeRecommendations(recipes, nextFavorites),
    });
  },
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    set({ recommendations: computeRecommendations(recipes, favorites) });
  },
}));
