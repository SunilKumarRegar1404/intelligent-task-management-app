// frontend/src/pages/CreateTask.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const { user} = useUser();

  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', {
        title,
        description,
        dueDate,
        priority,
        status,
        userId:user.id,
      });
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('');
      setStatus('');
      console.log('Task created successfully');
      navigate('/tasks')
      
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className='w-full h-full flex justify-center text-center text-white p-4'>
      <div className="w-[55vh]">
      <h1 className="text-2xl font-bold my-8">Create A Task</h1>
      <form className=' w-full border-2 border-yellow-500 rounded-lg p-4' onSubmit={handleSubmit}>
        <div className="mb-4 flex justify-between">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[250px] px-3 py-2 outline-none rounded-md bg-transparent border-2 border-blue-400"
          />
        </div>
        <div className="mb-4 flex justify-between">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2 outline-none rounded-md bg-transparent border-2 border-blue-400"
          />
        </div>
        <div className="mb-4 flex justify-between">
          <label className="block mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-3 py-2 outline-none rounded-md bg-transparent border-2 border-blue-400"
          />
        </div>
        <div className="mb-4 flex justify-between ">
          <label className="block mb-2">Priority</label>
          <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-3 py-2  outline-none rounded-md bg-slate-900 border-2 border-blue-400"
              
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
        </div>
        <div className="mb-4 flex justify-between">
          <label className="block mb-2">Status</label>
          <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 outline-none rounded-md bg-slate-900  border-2 border-blue-400"
            >
              <option value="">Select Status</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>  
              <option value="Completed">Completed</option>
            </select>
        </div>
        
        <button type="submit" className="text-white text-2xl border-2  border-blue-400 mt-2  rounded-full px-4 py-2 transition duration-300">
          Create Task
        </button>
      </form>
      </div>
    </div>
  );
};

export default CreateTask;
