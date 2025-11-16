import create from 'zustand';

const computeFiltered = (recipes, term) => {
  const q = (term || '').trim().toLowerCase();
  if (!q) return recipes;
  return recipes.filter((r) => {
    const title = (r.title || '').toLowerCase();
    const description = (r.description || '').toLowerCase();
    return title.includes(q) || description.includes(q);
  });
};

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  addRecipe: (newRecipe) => {
    const { recipes, searchTerm } = get();
    const next = [...recipes, newRecipe];
    set({
      recipes: next,
      filteredRecipes: computeFiltered(next, searchTerm),
    });
  },

  setRecipes: (recipes) => {
    const { searchTerm } = get();
    set({
      recipes,
      filteredRecipes: computeFiltered(recipes, searchTerm),
    });
  },

  updateRecipe: (updated) => {
    const { recipes, searchTerm } = get();
    const next = recipes.map((r) => (r.id === updated.id ? updated : r));
    set({
      recipes: next,
      filteredRecipes: computeFiltered(next, searchTerm),
    });
  },

  deleteRecipe: (id) => {
    const { recipes, searchTerm } = get();
    const next = recipes.filter((r) => r.id !== id);
    set({
      recipes: next,
      filteredRecipes: computeFiltered(next, searchTerm),
    });
  },

  setSearchTerm: (term) => {
    const { recipes } = get();
    set({
      searchTerm: term,
      filteredRecipes: computeFiltered(recipes, term),
    });
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    set({
      filteredRecipes: computeFiltered(recipes, searchTerm),
    });
  },
}));