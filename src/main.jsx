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
import UpdateClass from './components/Dashboard/InstructorDashboard/UpdateClass';
import ManageUsers from './components/Dashboard/AdminDashboard/ManageUsers/ManageUsers';
import ManageClass from './components/Dashboard/AdminDashboard/ManageClass/ManageClass';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminRoute from './route/AdminRoute';
import InstructorRoute from './route/InstructorRoute';
import Instructors from './components/Instructors/Instructors';
import ApprovedClass from './components/ApprovedClass/ApprovedClass';
import MySelectedClass from './components/Dashboard/StudentDashoard/MySelectedClass';
import MyEnrolledClass from './components/Dashboard/StudentDashoard/MyEnrolledClass';
import StudentPayment from './components/Dashboard/StudentDashoard/StudentPayment/StudentPayment';
import PaymentHistory from './components/Dashboard/StudentDashoard/StudentPayment/PaymentHistory';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';




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
      {
        path: '/instructors',
        element: <Instructors></Instructors>,
      },
      {
        path: '/classes',
        element: <ApprovedClass></ApprovedClass>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'student/mySelectedClass',
        element: <MySelectedClass></MySelectedClass>,
      },
      {
        path: 'student/myEnrolledClass',
        element: <MyEnrolledClass></MyEnrolledClass>,
      },
      {
        path: 'student/paymentHistory',
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: 'student/payment/:id',
        element: <StudentPayment></StudentPayment>,
        loader: ({ params }) => fetch(`https://summer-camp-server-main.vercel.app/carts/${params.id}`)
      },
      {
        path: 'admin/manageClass',
        element: <AdminRoute><ManageClass></ManageClass></AdminRoute>,
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
        element: <InstructorRoute><MyClass></MyClass></InstructorRoute>
      },
      {
        path: 'instructor/update/:id',
        element: <InstructorRoute><UpdateClass /></InstructorRoute>,
        loader: ({ params }) => fetch(`https://summer-camp-server-main.vercel.app/class/${params.id}`)
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage></NotFoundPage>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
)
