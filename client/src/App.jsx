import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import React, {useState } from 'react';
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";




function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const {user}=useUser();

 
 
  return (
    <div className="container h-[100vh] overflow-hidden w-full flex justify-center bg-slate-900">
      <SignedOut>
        <span className="flex flex-col items-center  justify-center">
        <h1 className=" text-3xl text-blue-400">You Are Not Singed In.</h1>
        <SignInButton  className="text-white text-2xl border-2  border-blue-500 mt-4 rounded-full px-4 py-2"/>
        </span>
      </SignedOut>
    <SignedIn>
      <div className="container h-[100vh] w-full  justify-center bg-slate-900">
      <Navbar/>
      <Outlet/>
    </div>
    </SignedIn>
  </div>
  );
}

export default App;
