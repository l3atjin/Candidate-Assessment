import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import SignInAdmin from './pages/admin/sign-in.jsx';
import SignInCandidate from './pages/candidate/sign-in.jsx';
import SignUpAdmin from './pages/admin/sign-up.jsx';
import SignUpCandidate from './pages/candidate/sign-up.jsx';
import Dashboard from './pages/admin/dashboard.jsx';
import Assignments from './pages/candidate/assignments.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "candidate/sign-in",
    element: <SignInCandidate />,
  },
  {
    path: "admin/sign-in",
    element: <SignInAdmin />,
  },
  {
    path: "candidate/sign-up",
    element: <SignUpCandidate />,
  },
  {
    path: "admin/sign-up",
    element: <SignUpAdmin />,
  },
  {
    path: "admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "candidate/assignments",
    element: <Assignments />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
