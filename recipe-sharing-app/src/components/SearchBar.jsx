import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  return (
    <input
      type="text"
      value={searchTerm}
      placeholder="Search recipes..."
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ display: 'block', marginBottom: 12, width: '100%', padding: 8 }}
    />
  );
};

export default SearchBar;