import { useEffect, useMemo, useState } from "react";
import AddTodoForm from "./AddTodoForm.jsx";

function createTodo(text) {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now() + Math.random());
  return { id, text, completed: false, createdAt: Date.now(), priority: "medium", dueDate: null, tags: [] };
}

const initialTodos = ["Read documentation", "Write tests", "Ship features"];
const STORAGE_KEY = "todo-app.todos";

export default function TodoList() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return initialTodos.map((t) => createTodo(t));
  });
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState(() => new Set());
  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      }
    } catch {}
  }, [todos]);

  const add = (text) => setTodos((prev) => [createTodo(text), ...prev]);
  const toggle = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const remove = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));
  const clearCompleted = () => setTodos((prev) => prev.filter((t) => !t.completed));
  const updateTodo = (id, updates) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  const toggleSelect = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const bulkDelete = () => {
    setTodos((prev) => prev.filter((t) => !selected.has(t.id)));
    setSelected(new Set());
  };
  const bulkComplete = () => {
    setTodos((prev) => prev.map((t) => (selected.has(t.id) ? { ...t, completed: true } : t)));
    setSelected(new Set());
  };

  const itemsLeft = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

  const visibleTodos = useMemo(() => {
    let list = [...todos];
    if (filter === "active") list = list.filter((t) => !t.completed);
    if (filter === "completed") list = list.filter((t) => t.completed);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((t) => t.text.toLowerCase().includes(q));
    }
    if (sort === "newest") list.sort((a, b) => b.createdAt - a.createdAt);
    if (sort === "oldest") list.sort((a, b) => a.createdAt - b.createdAt);
    if (sort === "priority") {
      const rank = { high: 3, medium: 2, low: 1 };
      list.sort((a, b) => (rank[b.priority] || 0) - (rank[a.priority] || 0));
    }
    if (sort === "due") {
      const val = (d) => (d ? new Date(d).getTime() : Number.POSITIVE_INFINITY);
      list.sort((a, b) => val(a.dueDate) - val(b.dueDate));
    }
    return list;
  }, [todos, filter, search, sort]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Todo List</h1>
          <div className="flex items-center gap-2">
            <button
              aria-label="toggle theme"
              onClick={() => setDarkMode((v) => !v)}
              className="rounded-md bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>
        </div>

        <AddTodoForm onAdd={add} />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              aria-pressed={filter === "all"}
              className={`rounded-md px-3 py-1 text-xs font-medium ${
                filter === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              aria-pressed={filter === "active"}
              className={`rounded-md px-3 py-1 text-xs font-medium ${
                filter === "active"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              aria-pressed={filter === "completed"}
              className={`rounded-md px-3 py-1 text-xs font-medium ${
                filter === "completed"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
              }`}
            >
              Completed
            </button>
            <select
              aria-label="sort todos"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-md border border-gray-300 bg-white/90 px-3 py-1 text-xs outline-none ring-0 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="priority">Priority</option>
              <option value="due">Due Date</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              aria-label="search todos"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search todos"
              className="rounded-md border border-gray-300 bg-white/90 px-3 py-2 text-sm outline-none ring-0 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">{itemsLeft} items left</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Selected: {selected.size}
          </div>
          <div className="flex gap-2">
            <button
              onClick={bulkComplete}
              disabled={selected.size === 0}
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
            >
              Complete Selected
            </button>
            <button
              onClick={bulkDelete}
              disabled={selected.size === 0}
              className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
            >
              Delete Selected
            </button>
          </div>
        </div>

        <ul className="mt-6 space-y-2" aria-label="todos">
          {visibleTodos.map((t) => {
            const priorityClass =
              t.priority === "high"
                ? "bg-rose-100 text-rose-800"
                : t.priority === "low"
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800";
            return (
              <li
                key={t.id}
                className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    aria-label={`select ${t.text}`}
                    checked={selected.has(t.id)}
                    onChange={() => toggleSelect(t.id)}
                  />
                  {editingId === t.id ? (
                    <div className="flex flex-col gap-2">
                      <input
                        value={editDraft?.text || ""}
                        onChange={(e) => setEditDraft((d) => ({ ...d, text: e.target.value }))}
                        className="rounded-md border border-gray-300 bg-white/90 px-3 py-1 text-sm outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                      />
                      <div className="flex items-center gap-2">
                        <select
                          value={editDraft?.priority || "medium"}
                          onChange={(e) =>
                            setEditDraft((d) => ({ ...d, priority: e.target.value }))
                          }
                          className="rounded-md border border-gray-300 bg-white/90 px-2 py-1 text-xs outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                        <input
                          type="date"
                          value={editDraft?.dueDate || ""}
                          onChange={(e) =>
                            setEditDraft((d) => ({ ...d, dueDate: e.target.value }))
                          }
                          className="rounded-md border border-gray-300 bg-white/90 px-2 py-1 text-xs outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        />
                        <input
                          value={(editDraft?.tags || []).join(", ")}
                          onChange={(e) =>
                            setEditDraft((d) => ({
                              ...d,
                              tags: e.target.value
                                .split(",")
                                .map((x) => x.trim())
                                .filter(Boolean),
                            }))
                          }
                          placeholder="tags"
                          className="rounded-md border border-gray-300 bg-white/90 px-2 py-1 text-xs outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                        />
                        <button
                          onClick={() => {
                            const payload = {
                              text: editDraft.text.trim(),
                              priority: editDraft.priority,
                              dueDate: editDraft.dueDate || null,
                              tags: editDraft.tags || [],
                            };
                            if (payload.text) updateTodo(t.id, payload);
                            setEditingId(null);
                            setEditDraft(null);
                          }}
                          className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditDraft(null);
                          }}
                          className="rounded-md bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggle(t.id)}
                      className={`flex-1 text-left ${
                        t.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {t.text}
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {t.dueDate ? (
                    <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-100">
                      {t.dueDate}
                    </span>
                  ) : null}
                  <span className={`rounded-md px-2 py-1 text-xs ${priorityClass}`}>
                    {t.priority}
                  </span>
                  {t.tags && t.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-gray-100 px-2 py-1 text-[10px] text-gray-700 dark:bg-gray-700 dark:text-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <button
                    onClick={() => {
                      setEditingId(t.id);
                      setEditDraft({
                        text: t.text,
                        priority: t.priority || "medium",
                        dueDate: t.dueDate || "",
                        tags: t.tags || [],
                      });
                    }}
                    className="rounded-md bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(t.id)}
                    className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {todos.length === 0 && (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No todos yet</p>
        )}

        {todos.some((t) => t.completed) && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearCompleted}
              className="rounded-md bg-gray-200 px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              Clear Completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
