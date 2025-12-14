import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App.jsx";

describe("App", () => {
  test("renders TodoList heading", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /todo list/i })
    ).toBeInTheDocument();
  });

  test("adds a todo via the form", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.change(input, { target: { value: "App-level Task" } });
    const form = addButton.closest("form");
    fireEvent.submit(form);
    expect(screen.getByText("App-level Task")).toBeInTheDocument();
  });
});
