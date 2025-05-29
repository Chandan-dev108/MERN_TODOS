// Importing necessary modules
const express = require("express"); // Used to create server
const mongoose = require("mongoose"); // Used to connect and interact with MongoDB
const cors = require("cors"); // Allows backend to accept requests from a different domain (like React frontend)

// Creating the app
const app = express();

const PORT = process.env.PORT

// Enabling JSON parsing and CORS for the app
app.use(cors());
app.use(express.json()); // So server can read JSON in requests
// oesQKX4RpDVbVESh
// Connecting to MongoDB Database
 mongoose
   .connect(
     process.env.MONGODB_URI
   )
   .then(() => {
     console.log("you are connected with database");
   })
   .catch((err) => {
     console.log(
       `some error occured while connecting to db or check your internet ${err}`
     );
   });
// Importing the Task model
const Task = require("./Models/Task");

// Route to Get All Tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find(); // Fetches all tasks from the database
  res.json(tasks); // Sends back to frontend as JSON
});

// Route to Add New Task
app.post("/tasks", async (req, res) => {
  const newTask = new Task({ text: req.body.text, completed: false });
  await newTask.save(); // Saves new task to MongoDB
  res.json(newTask);
});

// Route to Delete Task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id); // Deletes task by ID
  res.json({ message: "Task Deleted ✅" });
});

// Route to Update Task Status
app.put("/tasks/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(updatedTask); // Returns updated task
});

// Server listens on port 5000
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} 🚀`)
});
