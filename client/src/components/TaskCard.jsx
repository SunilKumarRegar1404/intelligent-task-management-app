import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function TaskCard({ _id, title, description, dueDate, priority, status, onDelete }){

  const navigate=useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${_id}`);
      onDelete(); // Call the onDelete prop to update the parent component state
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className='h-full w-full p-4 min-h-[200px] min-w-[300px] text-center border-2 border-blue-400 rounded-lg border-w'>
            <h2 className="text-xl mb-2 font-bold text-red-600">{title}</h2>
            <p className='text-sm text-blue-300 mb-1'>{description}</p>
            <p className='text-yellow-200'>Due: {new Date(dueDate).toLocaleDateString()}</p>
            <p className='text-green-200'>Priority: {priority}</p>
            <p className='text-red-300 mb-4'>Status: {status}</p>
            <Link to={`update/${_id}`} className='text-white text-xs border-2  border-green-400 mt-2  rounded-full px-4 mr-2 py-2 transition duration-300'>Update</Link>
            <Link onClick={(e)=>{handleDelete(_id)}} className='text-white text-xs border-2  border-red-500 mt-2  rounded-full px-4 py-2 transition duration-300'>Delete</Link>
    </div>
  )
}
