import { render, fireEvent, screen } from '@testing-library/svelte';
import { tick } from 'svelte'; // Import tick
import App from './App.svelte';

describe('App.svelte', () => {
  beforeEach(() => {
    // Render the component before each test
    render(App);
  });

  test('renders the heading', () => {
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  test('adds a new todo item', async () => {
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByText('Add');

    // Initial state check (optional, based on default todos in App.svelte)
    // For this test, let's assume we start clean or ignore predefined todos for simplicity of add test
    // Or, ensure the new todo is different from existing ones.
    const newTodoText = 'A brand new task';
    await fireEvent.input(input, { target: { value: newTodoText } });
    await fireEvent.click(addButton);

    expect(screen.getByText(newTodoText)).toBeInTheDocument();
  });

  test('toggles a todo item completion status', async () => {
    // Assuming the component has at least one todo item by default, or add one first.
    // Let's use one of the default items: 'Build a to-do app'
    const todoText = 'Build a to-do app';
    const todoItemSpan = screen.getByText(todoText);
    // Find the checkbox associated with this todo item.
    // Checkboxes don't have text, so we need to find it relative to the span.
    const checkbox = todoItemSpan.previousElementSibling; // Assuming checkbox is immediately before span

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked(); // Default 'Build a to-do app' is not completed

    await fireEvent.click(checkbox);
    await tick(); // Add tick
    expect(checkbox).toBeChecked();
    expect(todoItemSpan).toHaveStyle('text-decoration: line-through');

    await fireEvent.click(checkbox);
    await tick(); // Add tick
    expect(checkbox).not.toBeChecked();
    expect(todoItemSpan).toHaveStyle('text-decoration: none');
  });

  test('deletes a todo item', async () => {
    // Let's try to delete 'Learn Svelte' which is initially present.
    const todoTextToDelete = 'Learn Svelte';
    const todoItemSpan = screen.getByText(todoTextToDelete);

    // The delete button is the next sibling of the span in the current App.svelte structure
    const deleteButton = todoItemSpan.nextElementSibling;
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton.tagName).toBe('BUTTON'); // Make sure it's the button

    await fireEvent.click(deleteButton);

    // Check if the item is removed from the document
    expect(screen.queryByText(todoTextToDelete)).not.toBeInTheDocument();
  });

  test('does not add an empty todo', async () => {
    const input = screen.getByPlaceholderText('Add a new todo');
    const addButton = screen.getByText('Add');
    const initialTodoCount = screen.getAllByRole('listitem').length;

    await fireEvent.input(input, { target: { value: '   ' } }); // Input with only spaces
    await fireEvent.click(addButton);

    const finalTodoCount = screen.getAllByRole('listitem').length;
    expect(finalTodoCount).toBe(initialTodoCount);
  });
});
