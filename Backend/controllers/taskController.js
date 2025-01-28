const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res) => {
  const { lead, description, dueDate, status } = req.body;

  try {
    const newTask = new Task({
      lead,
      description,
      dueDate,
      status,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Get tasks for a specific lead
exports.getTasksForLead = async (req, res) => {
  try {
    const tasks = await Task.find({ lead: req.params.leadId });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
