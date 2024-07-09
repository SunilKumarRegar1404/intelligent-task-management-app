// backend/models/Task.js
const mongoose = require('mongoose');

const collaboratorSchema= new mongoose.Schema({
  userId:{
    type:String,
    require:true
  },
  role:{
    type:String,
    enum:['editor','viewer'],
    required:true
  },
})

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  userId: {type:String, required:true},
  collaborators:[collaboratorSchema],
});

module.exports = mongoose.model('Task', taskSchema);
