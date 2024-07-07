// backend/src/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  userId: {type:String, required:true},
  collaborators: [
    {
      userId: String,
      role: { type: String, enum: ['editor', 'viewer'] }
    }
  ]
});

module.exports = mongoose.model('Task', taskSchema);
