import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { addTodoToDB, getTodosFromDB, deleteTodoFromDB } from './db';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const todosFromDB = await getTodosFromDB();
      setTodos(todosFromDB);
    };
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      const newTodoObj = { text: newTodo, completed: false };
      await addTodoToDB(newTodoObj);
      setTodos([...todos, newTodoObj]);
      setNewTodo("");
    }
  };

  const deleteTodo = async (id) => {
    await deleteTodoFromDB(id);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  return (
    <>
      <h1>TODO APP</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.text}
            </span>
            {todo.completed && (
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
