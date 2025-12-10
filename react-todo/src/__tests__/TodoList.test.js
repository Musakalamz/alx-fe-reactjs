import { render, screen, fireEvent } from '@testing-library/react'
import TodoList from '../components/TodoList.jsx'

describe('TodoList', () => {
  test('renders with initial demo todos', () => {
    render(<TodoList />)
    expect(screen.getByRole('heading', { name: /todo list/i })).toBeInTheDocument()
    expect(screen.getByText(/Read documentation/i)).toBeInTheDocument()
    expect(screen.getByText(/Write tests/i)).toBeInTheDocument()
    expect(screen.getByText(/Ship features/i)).toBeInTheDocument()
  })

  test('adds a new todo', () => {
    render(<TodoList />)
    const input = screen.getByPlaceholderText(/add a new task/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    fireEvent.change(input, { target: { value: 'Learn React Testing' } })
    fireEvent.click(addButton)

    expect(screen.getByText(/Learn React Testing/i)).toBeInTheDocument()
  })

  test('toggles a todo to completed and back', () => {
    render(<TodoList />)
    const toggleButton = screen.getByLabelText('toggle-Read documentation')
    expect(toggleButton).toBeInTheDocument()

    fireEvent.click(toggleButton)
    expect(toggleButton).toHaveClass('line-through')

    fireEvent.click(toggleButton)
    expect(toggleButton).not.toHaveClass('line-through')
  })

  test('deletes a todo', () => {
    render(<TodoList />)
    const itemText = screen.getByText('Write tests')
    const deleteButton = screen.getByLabelText('delete-Write tests')
    fireEvent.click(deleteButton)

    expect(itemText).not.toBeInTheDocument()
  })
})
