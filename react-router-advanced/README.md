# Advanced Routing in React with React Router

This project demonstrates advanced routing techniques in a React application using `react-router-dom`, including nested routes, protected routes that require authentication, and dynamic routes with path parameters. It is built with React and Vite.

## Objectives

- Implement nested routes inside a protected `Profile` section
- Add a protected route wrapper that redirects unauthenticated users
- Support dynamic routes for variable paths like blog posts

## Tech Stack

- React `^19`
- Vite `^7`
- `react-router-dom` `^6`
- ESLint with React hooks and refresh rules

## Getting Started

- Prerequisites: Node.js `>=18`
- Install dependencies: `npm install`
- Start dev server: `npm run dev` and open `http://localhost:5173/`
- Lint code: `npm run lint`
- Build: `npm run build`
- Preview build: `npm run preview`

## Project Structure

- `src/main.jsx`: App bootstrap with `BrowserRouter` and `AuthProvider`
- `src/App.jsx`: Route configuration (nested, dynamic, protected)
- `src/components/NavBar.jsx`: Top navigation bar with login/logout actions
- `src/auth/AuthContext.jsx`: Context provider managing auth state
- `src/auth/context.js`: Context and `useAuth` hook
- `src/auth/ProtectedRoute.jsx`: Guard that redirects to `/login` when unauthenticated
- `src/pages/Home.jsx`: Landing page
- `src/pages/Blog.jsx`: List of posts with links
- `src/pages/Post.jsx`: Dynamic route displaying a post by `:postId`
- `src/pages/Profile.jsx`: Protected parent route with nested navigation
- `src/pages/ProfileDetails.jsx`: Default nested route under `/profile`
- `src/pages/ProfileSettings.jsx`: Settings nested route under `/profile`
- `src/pages/Login.jsx`: Login view that redirects to the requested page

## Routing Overview

- `/`: Home
- `/blog`: Blog list
- `/blog/:postId`: Dynamic post route
- `/profile`: Protected section
  - `index`: `ProfileDetails`
  - `/profile/settings`: `ProfileSettings`
- `/login`: Login page used for redirects
- `*`: Fallback that redirects to `/`

## Protected Routes

- `AuthProvider` stores login state in `localStorage` under `auth:isAuthenticated`
- `ProtectedRoute` checks `isAuthenticated` and redirects to `/login` with the original location in `state.from`
- After login, the app navigates back to the original protected page

## Authentication Simulation

- Click `Login` in the navigation bar or use the `Login` page
- Login sets `auth:isAuthenticated` to `true`
- Logout resets it to `false`

## Test Plan

- Navigate to `/profile` while logged out to verify redirect to `/login`
- Click `Sign In` on `/login` and confirm navigation to `/profile`
- Switch between `Details` and `Settings` inside `/profile` to verify nested routing
- Visit `/blog` and open `/blog/1`, `/blog/2`, `/blog/3` to verify dynamic routing
- Try an unknown route and confirm fallback to `/`

## Scripts

- `npm run dev`: Start Vite dev server
- `npm run build`: Build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint

## Notes

- No external state management library is used; authentication is handled via React Context and `localStorage`
- The routing setup uses React Router v6 nested routes and guards
