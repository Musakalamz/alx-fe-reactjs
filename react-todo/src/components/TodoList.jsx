import { useMemo, useState } from 'react'
import AddTodoForm from './AddTodoForm.jsx'

function createTodo(text) {
  return { id: crypto.randomUUID(), text, completed: false }
}

export default function TodoList() {
  const initial = useMemo(
    () => [
      createTodo('Read documentation'),
      createTodo('Write tests'),
      createTodo('Ship features'),
    ],
    [],
  )
  const [todos, setTodos] = useState(initial)

  const add = (text) => setTodos((prev) => [createTodo(text), ...prev])
  const toggle = (id) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  const remove = (id) => setTodos((prev) => prev.filter((t) => t.id !== id))

  return (
    <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">Todo List</h1>
      <AddTodoForm onAdd={add} />
      <ul className="mt-6 space-y-2" aria-label="todos">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <button
              aria-label={`toggle-${t.text}`}
              onClick={() => toggle(t.id)}
              className={`flex-1 text-left ${t.completed ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-gray-100'}`}
            >
              {t.text}
            </button>
            <button
              aria-label={`delete-${t.text}`}
              onClick={() => remove(t.id)}
              className="ml-3 rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No todos yet</p>
      )}
    </div>
  )
}
