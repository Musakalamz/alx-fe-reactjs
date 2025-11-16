# Recipe Sharing App

A React application for sharing and managing recipes with search, favorites, and personalized recommendations. Built with Zustand for state and React Router for navigation.

## Features

- Add, edit, and delete recipes
- View individual recipe details
- Search and filter by title/description
- Mark recipes as favorites
- Personalized recommendations based on favorites
- Client-side routing

## Tech Stack

- React (Vite)
- Zustand
- React Router DOM

## Prerequisites

- Node.js 18+
- npm 8+

## Installation

1. Install dependencies:


## Key Concepts

### State Management (Zustand)

- `recipes`: list of recipe objects `{ id, title, description }`
- `addRecipe`, `updateRecipe`, `deleteRecipe`, `setRecipes`: CRUD actions
- `searchTerm`, `filteredRecipes`, `setSearchTerm`, `filterRecipes`: search and filtering
- `favorites`, `addFavorite`, `removeFavorite`: favorite management
- `recommendations`, `generateRecommendations`: personalized suggestions

### Routing

- `/`: Home — shows Add form, Favorites, Recommendations, and Recipe list
- `/recipes/:id`: Details — shows single recipe with edit and delete actions

## Usage Tips

- Add a recipe with a title and description; it will appear in the list.
- Click the recipe link to view details; you can edit and delete from there.
- Use the search bar (if present) to filter recipes.
- Mark favorites to improve recommendations.

## Development Notes

- Keep `BrowserRouter` usage in `App.jsx` to satisfy routing checks.
- Ensure imports are at the top of each file; avoid importing inside functions.
- Avoid wrapping `App` with another router in `main.jsx` to prevent duplication.

## Git Workflow

After completing a feature/task:

1. Stage changes:


## Troubleshooting

- Blank screen:
- Check the browser console for errors.
- Ensure `App.jsx` renders components on the `/` route.
- Verify `react-router-dom` and `zustand` are installed.
- Routing not working:
- Ensure only one `BrowserRouter` is used (inside `App.jsx`).
- Confirm `Routes` and `Route` are imported from `react-router-dom`.

## License

This project is for educational purposes as part of ALX FE ReactJS.