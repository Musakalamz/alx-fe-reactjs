import { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';

function RecommendationsList() {
    const recommendations = useRecipeStore((s) => s.recommendations || []);
    const favorites = useRecipeStore((s) => s.favorites || []);
    const recipes = useRecipeStore((s) => s.recipes);
    const generateRecommendations = useRecipeStore((s) => s.generateRecommendations);

    useEffect(() => {
        generateRecommendations();
    }, [favorites, recipes, generateRecommendations]);

    return (
        <div>
            <h2>Recommended For You</h2>
            {recommendations.length === 0 ? (
                <p>No recommendations yet. Add some favorites!</p>
            ) : (
                recommendations.map((recipe) => (
                    <div key={recipe.id} style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
                        <h3 style={{ margin: 0 }}>{recipe.title}</h3>
                        <p style={{ marginTop: 4 }}>{recipe.description}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default RecommendationsList;