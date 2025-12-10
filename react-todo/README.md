# React Todo List — Implemented and Tested

A fully functional Todo List built with React and styled using TailwindCSS, with comprehensive tests written in Jest and React Testing Library.

## Features

- Add new todos via a form
- Toggle todos between completed and not completed
- Delete individual todos
- Initial demo todos rendered on load
- TailwindCSS styling for a clean, accessible UI
- Unit tests for render, add, toggle, and delete behaviors

## Tech Stack

- React (Vite)
- TailwindCSS
- Jest + React Testing Library

## Prerequisites

- Node.js 18+ recommended
- npm

## Installation

```bash
npm install
```

## Available Scripts

- `npm run dev` — start local development server
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npm test` — run unit tests with Jest

## Testing

The project is configured to use Jest with a `jsdom` environment and Babel transforms for JSX.

Structure:

- Config: `jest.config.cjs`, `babel.config.cjs`, `src/setupTests.js`
- Tests: `src/__tests__/TodoList.test.jsx`

Run tests:

```bash
npm test
```

## TailwindCSS

Tailwind is configured via `tailwind.config.js` and `postcss.config.js`. The directives are included in `src/index.css`.

Content paths:

- `index.html`
- `src/**/*.{js,jsx,ts,tsx}`

## Component Structure

- `src/components/AddTodoForm.jsx` — controlled input and submit button
- `src/components/TodoList.jsx` — manages state and renders list

Integrate in `src/App.jsx` to display the Todo List on the page.

## Project Structure

```
react-todo/
  src/
    components/
      AddTodoForm.jsx
      TodoList.jsx
    __tests__/
      TodoList.test.jsx
    setupTests.js
    index.css
    App.jsx
    main.jsx
  tailwind.config.js
  postcss.config.js
  jest.config.cjs
  babel.config.cjs
  package.json
```

## Notes

- Tests rely on the `jsdom` environment; ensure dev dependencies are installed.
- IDs use `crypto.randomUUID()` when available, with a runtime fallback for compatibility in tests.

## License

MIT
