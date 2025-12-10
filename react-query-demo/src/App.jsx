import "./App.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsComponent from "./components/PostsComponent";

const queryClient = new QueryClient();

function App() {
  const [view, setView] = useState("posts");

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <button onClick={() => setView("posts")}>Posts</button>
          <button onClick={() => setView("about")}>About</button>
        </div>
        {view === "posts" ? (
          <PostsComponent />
        ) : (
          <div>Navigate back to Posts to see cached data.</div>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
