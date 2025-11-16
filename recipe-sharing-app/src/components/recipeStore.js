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

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  setRecipes: (recipes) => {
    const term = get().searchTerm;
    set({
      recipes,
      filteredRecipes: computeFiltered(recipes, term),
    });
  },

  setSearchTerm: (term) => {
    const recipes = get().recipes;
    set({
      searchTerm: term,
      filteredRecipes: computeFiltered(recipes, term),
    });
  },

  addRecipe: (newRecipe) => {
    const state = get();
    const next = [...state.recipes, newRecipe];
    set({
      recipes: next,
      filteredRecipes: computeFiltered(next, state.searchTerm),
    });
  },

  updateRecipe: (updated) => {
    const state = get();
    const next = state.recipes.map((r) => (r.id === updated.id ? updated : r));
    set({
      recipes: next,
      filteredRecipes: computeFiltered(next, state.searchTerm),
    });
  },

  deleteRecipe: (id) => {
    const state = get();
    const next = state.recipes.filter((r) => r.id !== id);
    set({
      recipes: next,
      filteredRecipes: computeFiltered(next, state.searchTerm),
    });
  },

  filterRecipes: () => {
    const state = get();
    set({
      filteredRecipes: computeFiltered(state.recipes, state.searchTerm),
    });
  },
}));