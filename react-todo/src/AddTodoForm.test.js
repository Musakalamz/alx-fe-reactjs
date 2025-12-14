import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import AddTodoForm from "./components/AddTodoForm.js";

describe("AddTodoForm", () => {
  test("renders input and Add button", () => {
    const onAdd = jest.fn();
    render(<AddTodoForm onAdd={onAdd} />);
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeDisabled();
  });

  test("enables button when text entered and clears after submit", () => {
    const onAdd = jest.fn();
    render(<AddTodoForm onAdd={onAdd} />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.change(input, { target: { value: "  Task A  " } });
    expect(addButton).not.toBeDisabled();
    const form = addButton.closest("form");
    fireEvent.submit(form);
    expect(onAdd).toHaveBeenCalledWith("Task A");
    expect(input).toHaveValue("");
    expect(addButton).toBeDisabled();
  });
});
