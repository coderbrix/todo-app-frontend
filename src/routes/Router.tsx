import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../components/Authentication/Login/Login";
import SignUp from "../components/Authentication/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />   
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/home",
    element: <Main />,   
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
]);

export default router;