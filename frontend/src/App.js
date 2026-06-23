import { useEffect, useState } from "react";
import api from "./api";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const getTodos = () => {
    api.get("/todos")
      .then(res => setTodos(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (!text) return;

    await api.post("/todos", { text });
    setText("");
    getTodos();
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    getTodos();
  };

  const toggleTodo = async (id, completed) => {
    await api.put(`/todos/${id}`, {
      completed: !completed
    });

    getTodos();
  };

  return (
    <div className="container">
      <h1>Gestor de Tareas</h1>

      <div className="input-group">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nueva tarea"
        />

        <button className="add-btn" onClick={addTodo}>
          Agregar
        </button>
      </div>

      {todos.map(todo => (
        <div className="todo-item" key={todo._id}>
          <span
            className={todo.completed ? "completed" : ""}
            onClick={() => toggleTodo(todo._id, todo.completed)}
            style={{ cursor: "pointer" }}
          >
            {todo.text}
          </span>

          <button
            className="delete-btn"
            onClick={() => deleteTodo(todo._id)}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;