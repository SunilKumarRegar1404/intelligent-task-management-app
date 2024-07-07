// backend/src/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  userId: {type:String, required:true},
});

module.exports = mongoose.model('Task', taskSchema);
