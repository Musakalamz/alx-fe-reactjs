import { useState } from "react";

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onAdd(value);
    setText("");
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        aria-label="New todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        className="flex-1 rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none ring-0 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      />
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50"
        disabled={!text.trim()}
      >
        Add
      </button>
    </form>
  );
}
