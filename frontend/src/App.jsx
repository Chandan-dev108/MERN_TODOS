import React, { useState, useEffect } from "react";
import axios from "axios"; // Used for HTTP requests
import "./App.css"
function App() {
  // State to store tasks
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks from backend
  const fetchTasks = async () => {
    const res = await axios.get("https://mern-todos-7i80.onrender.com");
    setTasks(res.data); // Store tasks in state
  };

  // Add new task
  const addTask = async () => {
    if (text === "") return; // Prevent empty tasks
    const res = await axios.post("https://mern-todos-7i80.onrender.com", { text });
    setTasks([...tasks, res.data]); // Add new task to state
    setText(""); // Clear input field
  };

  // Delete a task
  const deleteTask = async (id) => {
    await axios.delete(`https://mern-todos-7i80.onrender.com/${id}`);
    setTasks(tasks.filter((task) => task._id !== id)); // Remove from state
  };

  // Toggle task completion status
  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`https://mern-todos-7i80.onrender.com/${id}`, {
      completed: !completed,
    });
    setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
  };

  return (
    <div className="as" style={{ textAlign: "center" }}>
      <h1>📋 My ToDo List</h1>

      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid gray",
        }}
      />
      <button
        onClick={addTask}
        style={{ marginLeft: "10px", padding: "10px 20px" }}
      >
        Add
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              marginBottom: "10px",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.text}
            <button
              onClick={() => toggleComplete(task._id, task.completed)}
              style={{ marginLeft: "10px" }}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => deleteTask(task._id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
