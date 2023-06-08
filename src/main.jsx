import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AuthProvider from './providers/AuthProvider';
import PrivateRoute from './route/PrivateRoute';
import Dashboard from './layout/Dashboard';
import AddClass from './components/Dashboard/InstructorDashboard/AddClass';
import MyClass from './components/Dashboard/InstructorDashboard/MyClass';
import ManageUsers from './components/Dashboard/AdminDashboard/ManageUsers/ManageUsers';
import ManageClass from './components/Dashboard/AdminDashboard/ManageClass/ManageClass';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminRoute from './route/AdminRoute';
import InstructorRoute from './route/InstructorRoute';

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      
    ]
  },
  {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        {
          path: 'admin/manageClass',
          element: <AdminRoute><ManageClass></ManageClass></AdminRoute>,
          loader: () => fetch('http://localhost:5000/class')
        },
        {
          path: 'admin/manageUsers',
          element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: 'instructor/addClass',
          element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
        },
        {
          path: 'instructor/myClass',
          element: <InstructorRoute><MyClass></MyClass></InstructorRoute>,
          loader: () => fetch('http://localhost:5000/class')
        },
      ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
