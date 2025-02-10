import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { addTodoToDB, getTodosFromDB, deleteTodoFromDB } from './db';

function App() {
  const [todos, setTodos] = useState([]); // State to hold the list of todos
  const [newTodo, setNewTodo] = useState(""); // State to hold the new todo input

  useEffect(() => {
    const fetchTodos = async () => {
      const todosFromDB = await getTodosFromDB(); // Fetch todos from the database
      setTodos(todosFromDB); // Set the fetched todos to state
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      const newTodoObj = { text: newTodo, completed: false }; // Create a new todo object
      await addTodoToDB(newTodoObj); 
      setTodos([...todos, newTodoObj]); // Update the state with the new todo
      setNewTodo(""); 
    }
  };

  const deleteTodo = async (id) => {
    await deleteTodoFromDB(id); // Delete the todo from the database
    const newTodos = todos.filter((todo) => todo.id !== id); // Filter out the deleted todo
    setTodos(newTodos); // Update the state with the remaining todos
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo // Toggle the completed status
    );
    setTodos(newTodos); // Update the state with the toggled todo
  };

  return (
    <>
      <h1>TODO APP</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} // Update the new todo input state
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button> {/* Add the new todo */}
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)} // Toggle the completed status
            />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.text}
            </span>
            {todo.completed && (
              <button onClick={() => deleteTodo(todo.id)}>Delete</button> // Delete the todo
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
