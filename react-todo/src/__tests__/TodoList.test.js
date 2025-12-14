import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import TodoList from "../components/TodoList.js";

describe("TodoList", () => {
  test("Initial Render Test", () => {
    render(<TodoList />);
    expect(
      screen.getByRole("heading", { name: /todo list/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Read documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/Write tests/i)).toBeInTheDocument();
    expect(screen.getByText(/Ship features/i)).toBeInTheDocument();
  });

  test("renders AddTodoForm controls", () => {
    render(<TodoList />);
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  test("Test Adding Todos", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "Learn React Testing" } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Learn React Testing/i)).toBeInTheDocument();
  });

  test("Test Toggling Todos", () => {
    render(<TodoList />);
    const item = screen.getByText("Read documentation");
    expect(item).toBeInTheDocument();

    fireEvent.click(item);
    expect(item).toHaveClass("line-through");

    fireEvent.click(item);
    expect(item).not.toHaveClass("line-through");
  });

  test("Test Deleting Todos", () => {
    render(<TodoList />);
    const itemText = screen.getByText("Write tests");
    const li = itemText.closest("li");
    const deleteButton = within(li).getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(itemText).not.toBeInTheDocument();
  });
});
