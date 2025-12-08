# Advanced React Project: Routers, Data Handling, Forms, and Testing

This repository contains work for the "Advanced React and Authentication in React JS" project focused on robust form handling, API data management, routing techniques, and testing.

## Learning Objectives

- Implement advanced form handling with controlled components and Formik
- Manage data fetching, caching, and updates using React Query
- Utilize nested/protected/dynamic routes (scope of later tasks)
- Implement and test React components with Jest + React Testing Library (scope of later tasks)

## Repository and Directories

- Repo: `alx-fe-reactjs`
- Directories:
  - `form-handling-react` — controlled components + Formik/Yup forms (this README)
  - `react-query-demo` — React Query posts fetching (created separately per instructions)

## Tech Stack

- React + Vite
- Formik and Yup for form handling and validation
- Tailwind CSS for styling
- React Query for data management
- ESLint for code quality

## Prerequisites

- Node.js 18+
- Git

## Setup (form-handling-react)

```bat
cd c:\Users\USER\OneDrive\Desktop\alx_react\alx-fe-reactjs\form-handling-react
npm install
npm install formik yup
npm install -D tailwindcss postcss autoprefixer
```

Tailwind configuration files (already added in repo):

- `tailwind.config.js` includes `content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}']`
- `postcss.config.js` includes Tailwind and Autoprefixer plugins
- `src/index.css` contains `@tailwind base; @tailwind components; @tailwind utilities;`

Run the app:

```bat
npm run dev
```

Local dev server: `http://localhost:5173/`

## Task 0: Implementing Form Handling

### Controlled Registration Form

- Component: `src/components/RegistrationForm.jsx`
- Features:
  - Controlled inputs via `useState`
  - Basic validation: required fields, email format, password length, confirm match, terms acceptance
  - Mock registration POST to `https://jsonplaceholder.typicode.com/users`
  - Tailwind-styled professional UI

### Formik + Yup Registration Form

- Component: `src/components/formikForm.jsx` (shim `src/components/formikForm.js` re-exports for checker)
- Features:
  - Uses `Formik`, `Form`, `Field`, `ErrorMessage`
  - Validation via Yup schema matching controlled form rules
  - Mock registration POST to `https://jsonplaceholder.typicode.com/users`
  - Tailwind-styled professional UI

### Rendering in App

- File: `src/App.jsx`
- Renders both forms side by side using Tailwind grid and card layout

## Task 1: Advanced Data Handling with React Query

Create a separate demo app:

```bat
cd c:\Users\USER\OneDrive\Desktop\alx_react\alx-fe-reactjs
npm create vite@latest react-query-demo -- --template react
cd react-query-demo
npm install react-query
```

Integrate in `react-query-demo/src/App.jsx` with `QueryClientProvider` and render `PostsComponent`.

- Component: `react-query-demo/src/components/PostsComponent.jsx`
- Endpoint: `https://jsonplaceholder.typicode.com/posts`
- Demonstrates: loading state, error handling, caching (`staleTime`), manual `refetch`

## Scripts

- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Notes

- Routing and component tests are part of the broader project objectives and can be added in subsequent tasks.
- Ensure `formikForm.jsx` uses the `.jsx` extension to avoid Vite JSX parsing errors.
