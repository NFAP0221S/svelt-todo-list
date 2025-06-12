<script>
  let todos = [
    { id: 1, text: 'Learn Svelte', completed: true },
    { id: 2, text: 'Build a to-do app', completed: false },
    { id: 3, text: 'Deploy the app', completed: false }
  ];

  let newTodoText = '';

  function addTodo() {
    if (newTodoText.trim() === '') return;
    todos = [...todos, { id: Date.now(), text: newTodoText, completed: false }];
    newTodoText = '';
  }

  function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
  }

  function toggleComplete(id) {
    todos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
  }
</script>

<main>
  <h1>Todo List</h1>

  <form on:submit|preventDefault={addTodo}>
    <input type="text" bind:value={newTodoText} placeholder="Add a new todo" />
    <button type="submit">Add</button>
  </form>

  <ul>
    {#each todos as todo (todo.id)}
      <li>
        <input type="checkbox" bind:checked={todo.completed} on:click={() => toggleComplete(todo.id)} />
        <span style:text-decoration={todo.completed ? 'line-through' : 'none'}>
          {todo.text}
        </span>
        <button on:click={() => removeTodo(todo.id)}>Delete</button>
      </li>
    {/each}
  </ul>
</main>

<style>
  main {
    font-family: sans-serif;
    max-width: 500px;
    margin: 2rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  h1 {
    text-align: center;
    color: #333;
  }

  form {
    display: flex;
    margin-bottom: 1rem;
  }

  form input[type="text"] {
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  form button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin-left: 0.5rem;
  }

  form button:hover {
    background-color: #0056b3;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }

  li:last-child {
    border-bottom: none;
  }

  li input[type="checkbox"] {
    margin-right: 0.5rem;
  }

  li span {
    flex-grow: 1;
  }

  li button {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    margin-left: 0.5rem;
  }

  li button:hover {
    background-color: #c82333;
  }

  li:hover {
    background-color: #f9f9f9;
  }
</style>
