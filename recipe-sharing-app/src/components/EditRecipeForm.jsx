import { useState, useEffect } from 'react';
import { useRecipeStore } from './recipeStore';

function EditRecipeForm({ recipeId }) {
    const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId));
    const updateRecipe = useRecipeStore((s) => s.updateRecipe);
    const [title, setTitle] = useState(recipe ? recipe.title : '');
    const [description, setDescription] = useState(recipe ? recipe.description : '');

    useEffect(() => {
        if (recipe) {
            setTitle(recipe.title);
            setDescription(recipe.description);
        }
    }, [recipe]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!recipe) return;
        const updated = { ...recipe, title: title.trim(), description: description.trim() };
        updateRecipe(updated);
    };

    if (!recipe) return <p>Cannot edit: recipe not found.</p>;

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                style={{ display: 'block', marginBottom: 8, width: '100%', padding: 8 }}
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                style={{ display: 'block', marginBottom: 8, width: '100%', padding: 8, minHeight: 80 }}
            />
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default EditRecipeForm;