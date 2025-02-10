import { useState, useEffect } from 'react';
import './App.css';
import { addTodoToDB, getTodosFromDB, deleteTodoFromDB, updateTodoInDB } from './db';

function App() {
  // State variables
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newPriority, setNewPriority] = useState("normal");
  const [hoveredTodoId, setHoveredTodoId] = useState(null);

  // Fetch todos from IndexedDB on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const todosFromDB = await getTodosFromDB();
      setTodos(todosFromDB);
    };
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.trim() !== "") {
      const newTodoObj = { text: newTodo, completed: false, priority: newPriority };
      await addTodoToDB(newTodoObj);
      setTodos([...todos, newTodoObj]);
      setNewTodo("");
      setNewPriority("normal");
    }
  };

  // Delete a todo by ID
  const deleteTodo = async (id) => {
    await deleteTodoFromDB(id);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // Toggle the completion status of a todo
  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // Update the priority of a todo
  const updatePriority = async (id, newPriority) => {
    const updatedTodos = todos.map((todo) => 
      todo.id === id ? { ...todo, priority: newPriority } : todo
    );
    setTodos(updatedTodos);
    const updatedTodo = updatedTodos.find((todo) => todo.id === id);
    await updateTodoInDB(id, updatedTodo);
  };

  return (
    <>
      <h1>TODO APP</h1>
      <div>
        {/* Input for adding a new todo */}
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        {/* Dropdown for selecting priority of new todo */}
        <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
          <option value="urgent">Urgent</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </select>
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li 
            key={todo.id}
            onMouseEnter={() => setHoveredTodoId(todo.id)}
            onMouseLeave={() => setHoveredTodoId(null)}
          >
            {/* Checkbox for toggling completion status */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            {/* Display todo text and priority */}
            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
              {todo.text} ({todo.priority})
            </span>
            {/* Dropdown for updating priority, shown only when hovered */}
            {hoveredTodoId === todo.id && (
              <select
                value={todo.priority}
                onChange={(e) => updatePriority(todo.id, e.target.value)}
              >
                <option value="urgent">Urgent</option>
                <option value="normal">Normal</option>
                <option value="low">Low</option>
              </select>
            )}
            {/* Button for deleting a completed todo */}
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
