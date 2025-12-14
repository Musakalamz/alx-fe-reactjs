import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "../App.jsx";

describe("Todo App Flow", () => {
  test("renders heading and initial demo todos", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /todo list/i })).toBeInTheDocument();
    expect(screen.getByText("Read documentation")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("Ship features")).toBeInTheDocument();
    const list = screen.getByLabelText("todos");
    const items = within(list).getAllByRole("listitem");
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  test("adds, toggles, and deletes todos; shows empty state", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeDisabled();
    fireEvent.change(input, { target: { value: "  Build CI  " } });
    expect(addButton).not.toBeDisabled();
    const form = addButton.closest("form");
    fireEvent.submit(form);
    expect(screen.getByText("Build CI")).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(addButton).toBeDisabled();

    const list = screen.getByLabelText("todos");
    const items = within(list).getAllByRole("listitem");
    const firstItemText = within(items[0]).getByRole("button", { name: "Build CI" });
    expect(firstItemText).toBeInTheDocument();

    fireEvent.click(firstItemText);
    expect(firstItemText).toHaveClass("line-through");
    fireEvent.click(firstItemText);
    expect(firstItemText).not.toHaveClass("line-through");

    const liForNew = firstItemText.closest("li");
    const deleteButtonForNew = within(liForNew).getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtonForNew);
    expect(screen.queryByText("Build CI")).toBeNull();

    const remainingListItems = within(list).getAllByRole("listitem");
    for (const li of remainingListItems) {
      const del = within(li).getByRole("button", { name: /delete/i });
      fireEvent.click(del);
    }
    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
  });
});
