// backend/routes/taskRoutes.js
const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const {clerkClient}=require('@clerk/clerk-sdk-node')

// Get all tasks of user by userid
router.get('/', async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }
  try {
    const tasks = await Task.find({ userId });
    console.log(tasks);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get all users
router.get('/getUsers', async (req, res) => {

  try {
    const users = await clerkClient.users.getUserList();
    console.log(users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ "error fetching users": err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    status: req.body.status,
    userId:req.body.userId,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a task by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const io=req.app.get('socketio');

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    io.emit('taskUpdated',task);//To emit task update to all connected sockets

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    io.emit('taskDeleted',task._id);

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// // Add a collaborator to a task
// router.post('/:id/collaborators', async (req, res) => {
//   const { userId, role } = req.body;
//   const io = req.app.get('socketio');

//   try {
//     const task = await Task.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: 'Task not found' });

//     if (task.collaborators.some(collab => collab.userId === userId)) {
//       return res.status(400).json({ message: 'User already a collaborator' });
//     }

//     task.collaborators.push({ userId, role });
//     await task.save();

//     io.emit('collaboratorAdded', { taskId: task._id, collaborator: { userId, role } }); // Emit collaborator added event

//     res.status(201).json(task);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

module.exports = router;
