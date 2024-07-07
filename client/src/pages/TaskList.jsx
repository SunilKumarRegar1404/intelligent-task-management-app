// frontend/src/pages/TaskList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import { useUser } from '@clerk/clerk-react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const {user}=useUser();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          params: { userId: user.id },
        });
        setTasks(response.data);
        console.log('Fetched tasks for user ID:', user.id);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTask();
  }, []);

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl text-white font-bold mb-4 mt-4">Tasks</h2>
      <div className="w-full flex flex-wrap justify-center">
        {tasks.map((task) => (
          <div key={task._id} className="m-2 shadow">
            <TaskCard {...task} onDelete={() => handleDelete(task._id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
