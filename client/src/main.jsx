import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Profile from "./pages/Profile";
import TaskList from "./pages/TaskList";
import CreateTask from "./pages/CreateTask.jsx"
import UpdateTask from './pages/UpdateTask.jsx'




// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index element={<Profile/>}/>   
      <Route path="create-task" element={<CreateTask/>}/>
      <Route path="tasks" element={<TaskList/>}/>
      <Route path="tasks/update/:id" element={<UpdateTask/>}/>
      
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router}/>
    </ClerkProvider>
  </React.StrictMode>,
)
