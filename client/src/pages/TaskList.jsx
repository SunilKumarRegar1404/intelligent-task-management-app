// frontend/src/pages/TaskList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import { useUser } from '@clerk/clerk-react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const {user}=useUser();


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_BASE_PATH}/api/tasks`, {
          params: { userId: user.id },
        });
        console.log(response.data);
        setTasks(response.data);
        console.log('Fetched tasks for current user!');
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  //Handle delete filteration
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task._id !== id));
  };

    // Filter tasks based on selected priority
    const filteredTasks = tasks.filter((task) => 
      selectedPriority === '' || task.priority === selectedPriority
    );

  return (
    <div className="w-full flex flex-col ">


      <div className="mb-4 flex text-white items-center justify-between px-20">
      <h2 className="text-2xl text-white font-bold mb-4 mt-4">TASKS</h2>
      <span className='text-xl text-white font-bold mb-4 mt-4'>
      <label className="text-white mr-2">Priority:</label>
        <select 
          value={selectedPriority} 
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="w-[10vw] h-10 px-3 text-center items-center outline-none rounded-md bg-slate-900 border-2 border-blue-400"
          >
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        </span>
      <input
            type="text"
            value={search}
            placeholder='Search Task By Name'
            onChange={(e) => setSearch(e.target.value)}
            className="w-[20vw] h-10 px-3 py-2 outline-none rounded-md bg-transparent border-2 border-blue-400"
      />
      </div>
      <div className="w-full max-h-[80vh] overflow-y-auto flex flex-wrap justify-evenly">
        {filteredTasks
        .filter((task)=>{
          return search.toLowerCase()===''?task
          :task.title.toLowerCase().includes(search);  
        })
        .map((task) => (
          <div key={task._id} className="m-2 shadow">
            <TaskCard {...task} onDelete={() => handleDelete(task._id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
