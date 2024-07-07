// backend/src/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
// require('dotenv').config();

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"]
//     }
// });

// app.use(cors());
// app.use(ClerkExpressWithAuth({
//     apiKey: process.env.CLERK_API_KEY
// }));

// //Mongodb Connection
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }).then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// //Task Schema
// const taskSchema = new mongoose.Schema({
//     userId: String,
//     task: String
// });

// const Task = mongoose.model('Task', taskSchema);

// // Update a task by ID
// app.put('/tasks/:id', async (req, res) => {
//     const { id } = req.params;
//     const { task } = req.body;
    
//     try {
//         const updatedTask = await Task.findByIdAndUpdate(id, { task }, { new: true });
//         res.json(updatedTask);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Delete a task by ID
// app.delete('/tasks/:id', async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         const deletedTask = await Task.findByIdAndDelete(id);
//         res.json({ message: 'Task deleted successfully', deletedTask });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// //Load Tasks
// io.on('connection', (socket) => {
//     console.log('New client connected');
    
//     // Send existing tasks to the client
//     // socket.emit('loadTasks', tasks);
//     socket.emit('loadTasks',async (userId)=>{
//         const tasks=await Task.find({userId});
//         socket.emit('loadTasks',tasks);
//     });

//     // Listen for new tasks
//     // socket.on('newTask', (task) => {
//     //     tasks.push(task);
//     //     io.emit('loadTasks', tasks);
//     // });
//     socket.on('newTask', async (data) => {
//         const { userId, task } = data;
//         const newTask = new Task({ userId, task });
//         await newTask.save();
//         const tasks = await Task.find({ userId });
//         io.emit('loadTasks', tasks);
//     });

//     // Disconnect listener
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// app.get('/', (req, res) => {
//     res.send("Task Management System Backend");
// });

// const PORT = process.env.PORT || 4000;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });