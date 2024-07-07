// backend/src/server.js

const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Add more event listeners here
});

// Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
console.log('MongoDB URI:', uri);

if (!uri) {
  throw new Error('The MONGODB_URI environment variable is not set.');
}

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports=io;