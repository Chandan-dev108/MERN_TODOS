const mongoose = require("mongoose");


// Defining schema for a Task
const taskSchema = new mongoose.Schema({
  text: { type: String, required: true }, // Task description
  completed: { type: Boolean, default: false }, // Task status
});

// Exporting the model
module.exports = mongoose.model("Task", taskSchema);
