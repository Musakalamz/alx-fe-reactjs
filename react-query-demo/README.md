# Advanced Data Handling with React Query

## Objective
- Implement efficient data fetching, caching, and UI updates in a React application using React Query.

## Stack
- `React` 19
- `Vite` 7
- `@tanstack/react-query` 5 (modern React Query)

## Why @tanstack/react-query
- The classic `react-query@3` has peer dependencies on React 16–18. With React 19, install `@tanstack/react-query` and import from `@tanstack/react-query`.

## Setup
- Clone the repository and navigate to `react-query-demo`.
- Install dependencies:
  - `npm install`
  - `npm install @tanstack/react-query`
- Start the app:
  - `npm run dev` (development)
  - `npm run preview` (build + preview server)

## Integration
- Provider is initialized in `src/App.jsx` with `QueryClient` and `QueryClientProvider`.
- `PostsComponent` in `src/components/PostsComponent.jsx` fetches posts from `https://jsonplaceholder.typicode.com/posts` using `useQuery`.
- Caching is configured with `staleTime: 30000` and `refetchOnWindowFocus: false`.
- A `Refetch` button triggers on-demand updates; `isFetching` indicates background refresh.
- App includes a simple view toggle to unmount/mount the posts component so you can observe cached data on return.

## Commands
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – serve the production build
- `npm run lint` – run ESLint

## Files
- Provider: `src/App.jsx`
- Posts component: `src/components/PostsComponent.jsx`

## Testing and Evaluation
- Use React Developer Tools to inspect the React Query cache.
- Watch Network tab: when returning to Posts within `staleTime`, the list renders from cache without an immediate network request.
- Click `Refetch` to manually update; observe `isFetching` and updated timestamp.

## Notes
- JSONPlaceholder endpoint: `https://jsonplaceholder.typicode.com/posts`
- The component renders the first 20 posts for brevity.
