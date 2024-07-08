// frontend/src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    
    <nav className="bg-transparent text-lg px-10 py-1 flex items-start text-black border-2 rounded-lg border-blue-400 ">
      <ul className="flex flex-row space-x-8 w-50 relative h-16 items-center justify-between">
        <li>
          <Link to="/" className="text-white hover:text-yellow-500 flex w-10">Profile</Link>
        </li>
        <li>
          <Link to="/create-task" className="text-white hover:text-yellow-500 w-10">Create Task</Link>
        </li>
        <li>
          <Link to="/tasks" className="text-white hover:text-yellow-500 w-10">Tasks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
